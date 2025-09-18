import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const LoginPage = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [touched, setTouched] = useState({ username: false, phone: false });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Username tekshirish
  const validateUsername = (value) => {
    if (value.length > 20) {
      return "Username juda uzun bo‘lishi mumkin emas (20 ta belgidan kam bo‘lishi kerak)";
    }
    const regex = /^[a-zA-Z0-9_]{3,16}$/;
    if (!regex.test(value)) {
      return "Username harf va raqam bo‘lishi kerak (3-16 ta belgi)";
    }
    return "";
  };

  // Phone tekshirish
  const validatePhone = (value) => {
    if (!value || value.length < 12) {
      return "Telefon raqam to‘liq kiritilishi kerak";
    }
    return "";
  };

  const handleContinue = () => {
    const usernameErr = validateUsername(username);
    const phoneErr = validatePhone(phone);

    setUsernameError(usernameErr);
    setPhoneError(phoneErr);
    setTouched({ username: true, phone: true });

    if (!usernameErr && !phoneErr) {
      alert(`✅ Username: ${username}, Phone: ${phone}`);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#208a00]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F4F6]">
      <div className="h-screen flex items-center justify-center sm:mx-auto mx-4">
        <div className="btn-gradient w-full max-w-sm p-1 rounded-xl">
          <div className="bg-white shadow-lg rounded-xl p-6 w-full flex flex-col">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              const val = e.target.value;
              setUsername(val);
              setUsernameError(validateUsername(val)); // har yozishda tekshiradi
              setTouched((prev) => ({ ...prev, username: true })); // yozilganda touched = true
            }}
            className={`border-2 outline-none px-4 py-3 my-2 rounded-lg ${
              usernameError && touched.username
                ? "border-[#00000073]"
                : "border-[#D1D5DB] focus:ring-[#208a00]"
            }`}
          />
          {usernameError && touched.username && (
            <p className="text-[#000] text-sm mb-1">{usernameError}</p>
          )}

          {/* Phone */}
          <PhoneInput
            value={phone}
            onChange={(val) => {
              setPhone(val);
              setPhoneError(validatePhone(val)); // har yozishda tekshiradi
              setTouched((prev) => ({ ...prev, phone: true })); // yozilganda touched = true
            }}
            onFocus={() => {
              if (!phone) {
                setPhone("+998");
              }
            }}
            placeholder="+998 99-999-99-99"
            inputProps={{
              name: "phone",
              required: true,
              className: `border-2 outline-none w-full px-4 py-3 my-2 rounded-lg ${
                phoneError && touched.phone
                  ? "border-[#00000073]"
                  : "border-[#D1D5DB] focus:ring-[#208a00]"
              }`,
            }}
          />

          {phoneError && touched.phone && (
            <p className="text-[#000] text-sm">{phoneError}</p>
          )}

          {/* Button */}
          <button
            onClick={handleContinue}
            className={`w-full mt-5 text-white py-2 rounded-lg font-semibold transition cursor-pointer
                bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700
            `}
          >
            Continue
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
