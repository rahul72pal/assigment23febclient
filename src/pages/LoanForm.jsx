import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImgURL from "../assets/loanimage3.jpeg";

const LoanForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    principal: "",
    rate: "",
    tenure: "",
    frequency: "",
    startDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/generate-loan-schedule`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.scheduleId) {
        navigate(`/schedule/${data.scheduleId}`);
      }
    } catch (error) {
      console.error("Error generating loan schedule:", error);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen text-white p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${ImgURL})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50 blur-md"></div>
      <div className="relative z-10 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Enter Loan Details</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="principal" className="block mb-1">
              Principal Amount
            </label>
            <input
              type="number"
              name="principal"
              id="principal"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rate" className="block mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              name="rate"
              id="rate"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tenure" className="block mb-1">
              Tenure (Years)
            </label>
            <input
              type="number"
              name="tenure"
              id="tenure"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="frequency" className="block mb-1">
              Frequency (e.g., 12 for Monthly)
            </label>
            <input
              type="number"
              name="frequency"
              id="frequency"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
          >
            Generate Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;
