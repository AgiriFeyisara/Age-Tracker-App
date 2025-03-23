import "../sass/main.css";
import image from "../assets/image.png";

import { useState } from "react";

const AgeCalculator = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState({ day: "", month: "", year: "" });
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });

  const calculateAge = () => {
    let isValid = true;
    let newErrors = { day: "", month: "", year: "" };

    if (!day || isNaN(day) || day < 1 || day > 31) {
      newErrors.day = "Must be a valid date";
      isValid = false;
    }
    if (!month || isNaN(month) || month < 1 || month > 12) {
      newErrors.month = "Must be a valid month";
      isValid = false;
    }
    if (
      !year ||
      isNaN(year) ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      newErrors.year = "Must be a valid year";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += 30;
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
  };

  return (
    <main className="container">
      <div className="box">
        <form className="inputField" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label className={errors.day ? "error-label" : ""}>DAY</label>
            <input
              type="text"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="DD"
            />
            <p className="error-message">{errors.day}</p>
          </div>
          <div className="input-group">
            <label className={errors.month ? "error-label" : ""}>MONTH</label>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="MM"
            />
            <p className="error-message">{errors.month}</p>
          </div>
          <div className="input-group">
            <label className={errors.year ? "error-label" : ""}>YEAR</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="YYYY"
            />
            <p className="error-message">{errors.year}</p>
          </div>
        </form>
        <div className="border"></div>
        <button className="btn" onClick={calculateAge}>
          <img src={image} alt="Arrow" className="img" />
        </button>
        <h1>
          <span>{age.years}</span> years
        </h1>
        <h1>
          <span>{age.months}</span> months
        </h1>
        <h1>
          <span>{age.days}</span> days
        </h1>
      </div>
    </main>
  );
};

export default AgeCalculator;
