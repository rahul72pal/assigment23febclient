import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import imgURL from "../assets/loanimage2.jpeg";

const Schedule = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const rowsPerPage = 10;

  const fetchSchedule = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/loan-schedules/${id}`
      );
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [id]);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    if (schedule) {
      const totalPages = Math.ceil(schedule.schedule.length / rowsPerPage);
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }
  };

  const handleSubmit = async (installmentNumber) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/submit-installment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loanScheduleId: id,
            installmentNumber,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage(`Installment ${installmentNumber} submitted successfully!`);
        fetchSchedule();
      } else {
        setMessage(result.message || "Submission failed.");
      }
    } catch (error) {
      setMessage("Error submitting installment.");
      console.error("Error submitting installment:", error);
    }
    setLoading(false);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedSchedule = schedule
    ? schedule.schedule.slice(startIndex, startIndex + rowsPerPage)
    : [];

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen text-white p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${imgURL})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50 blur-md"></div>
      <div className="relative z-10 w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Loan Repayment Schedule
        </h2>
        {message && (
          <p className="text-green-600 bg-gray-300 px-3 py-2 rounded-sm w-fit mx-auto text-center mb-4">
            {message}
          </p>
        )}
        {schedule ? (
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
              <thead>
                <tr className="bg-gray-700 text-gray-300">
                  <th className="py-2 px-4 border-b text-start">Installment</th>
                  <th className="py-2 px-4 border-b">EMI</th>
                  <th className="py-2 px-4 border-b">Interest Paid</th>
                  <th className="py-2 px-4 border-b">Principal Paid</th>
                  <th className="py-2 px-4 border-b">Remaining Balance</th>
                  <th className="py-2 px-4 border-b">Due Date</th>
                  <th className="py-2 px-4 border-b">Submit</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {paginatedSchedule.map((item) => (
                  <tr
                    key={item.installment}
                    className={`${
                      item.status === "paid"
                        ? "bg-gray-600"
                        : "hover:bg-gray-700"
                    } transition duration-200`}
                  >
                    <td className="py-2 px-4 border-b">{item.installment}</td>
                    <td className="py-2 px-4 border-b text-center">
                      {item.emi}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {item.interestPaid}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {item.principalPaid}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {item.remainingBalance}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {new Date(item.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={() => handleSubmit(item.installment)}
                        disabled={item.status === "paid"}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200 text-md"
                      >
                        {item.status === "paid"? "Complete": "Submit"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-300">
                Page {currentPage} of{" "}
                {Math.ceil(schedule.schedule.length / rowsPerPage)}
              </span>
              <button
                onClick={handleNext}
                disabled={
                  currentPage ===
                  Math.ceil(schedule.schedule.length / rowsPerPage)
                }
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Loading schedule...</p>
        )}
        <Link to="/">
          <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Schedule;
