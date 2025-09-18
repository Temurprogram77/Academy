import { useState, useEffect } from "react";

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

  // username tekshirish
  const validateUsername = (value) => {
    if (value.length > 20) {
      return "Username juda uzun bo‘lishi mumkin emas (20 ta belgidan kam bo‘lishi kerak)";
    }

    const regex = /^[a-zA-Z0-9_]{3,16}$/;
    if (!regex.test(value)) {
      return "Username raqam va harf bo‘lishi kerak (3-16 ta belgi)";
    }

    return "";
  };
  // phone mask va tekshirish
  const formatPhone = (value) => {
    const onlyNums = value.replace(/\D/g, "").slice(0, 12); // faqat raqam
    let formatted = "+998";

    if (onlyNums.length > 3) formatted += " " + onlyNums.slice(3, 5);
    if (onlyNums.length > 5) formatted += "-" + onlyNums.slice(5, 8);
    if (onlyNums.length > 8) formatted += "-" + onlyNums.slice(8, 10);
    if (onlyNums.length > 10) formatted += "-" + onlyNums.slice(10, 12);

    return formatted;
  };

  const validatePhone = (value) => {
    const raw = value.replace(/\D/g, ""); // faqat raqam
    if (raw.length !== 12) {
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
      alert(`✅ Username: ${username}, Phone: ${phone.replace(/\D/g, "")}`);
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
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm flex flex-col">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError(validateUsername(e.target.value)); // yozishda ham tekshirish
            }}
            onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
            className={`border-2 outline-none px-4 py-3 my-2 rounded-lg ${
              usernameError && touched.username
                ? "border-[#F97316]"
                : "border-[#D1D5DB] focus:ring-[#208a00]"
            }`}
          />
          {usernameError && touched.username && (
            <p className="text-[#F97316] text-sm mb-1">{usernameError}</p>
          )}

          {/* Phone */}
          <input
            type="text"
            placeholder="+998 99-999-99-99"
            value={phone}
            onChange={(e) => {
              const formatted = formatPhone(e.target.value);
              setPhone(formatted);
              setPhoneError(validatePhone(formatted)); // yozishda ham tekshirish
            }}
            onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
            className={`border-2 outline-none px-4 py-3 my-2 rounded-lg ${
              phoneError && touched.phone
                ? "border-[#F97316]"
                : "border-[#D1D5DB] focus:ring-[#208a00]"
            }`}
          />
          {phoneError && touched.phone && (
            <p className="text-[#F97316] text-sm">{phoneError}</p>
          )}

          {/* Button */}
          <button
            onClick={handleContinue}
            className="btn-gradient cursor-pointer w-full mt-5 text-white py-2 rounded-lg font-semibold hover:bg-[#208a00] transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
