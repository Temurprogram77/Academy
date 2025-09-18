import React, { useEffect, useState } from "react";

const initialData = [
  {
    id: 1,
    name: "Nayzullayev Temur",
    grades: ["", "", "", "", ""],
  },
  {
    id: 2,
    name: "Baxtiyorov Maxsad",
    grades: ["", "", "", "", ""],
  },
  {
    id: 3,
    name: "Qurbonov Jonibek",
    grades: ["", "", "", "", ""],
  },
  {
    id: 4,
    name: "Muhammadiyev Bobur",
    grades: ["", "", "", "", ""],
  },
];

const times = ["04.09", "05.09", "11.09", "12.09", "18.09"];

const LandingTeacher = () => {
  const [team, setTeam] = useState("");
  const [students, setStudents] = useState(initialData);

  useEffect(() => {
    setTeam(localStorage.getItem("Team"));
  }, []);

  const handleGradeChange = (id, colIndex, value) => {
    setStudents((prev) =>
      prev.map((st) =>
        st.id === id
          ? {
              ...st,
              grades: st.grades.map((g, i) => (i === colIndex ? value : g)),
            }
          : st
      )
    );
  };
  console.log(initialData);
  
  return (
    <div className="max-w-[1100px] mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">
        {team} jadvaliga xush kelibsiz
      </h1>
      

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">№</th>
            <th className="border p-2 text-left">To‘liq ism</th>
            {times.map((h, i) => (
              <th key={i} className="border p-2">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((st, idx) => (
            <tr key={st.id} className="text-center">
              <td className="border p-2">{idx + 1}</td>
              <td className="border p-2 text-left">{st.name}</td>
              {st.grades.map((g, i) => (
                <td key={i} className="border p-2">
                  <input
                    type="text"
                    value={g}
                    onChange={(e) =>
                      handleGradeChange(st.id, i, e.target.value)
                    }
                    className={`w-12 text-center rounded ${
                      g === "10"
                        ? "bg-green-500 text-white"
                        : g === "9"
                        ? "bg-green-500 text-white"
                        : g==="8"
                        ? "bg-green-500 text-white"
                        :g==='7'
                        ? "bg-yellow-500 text-white"
                        : g === "6"
                        ? "bg-yellow-500 text-white"
                        : g==="5"
                        ? "bg-yellow-300 text-white"
                        : g === "4"
                        ? "bg-red-500 text-white"
                        : g==="3"
                        ? "bg-red-500 text-white"
                        : g === "2"
                        ? "bg-red-500 text-white"
                        : g==="1"
                        ? "bg-red-500 text-white"
                        :''
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LandingTeacher;