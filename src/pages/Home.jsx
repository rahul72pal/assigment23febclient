import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import imgURL from '../assets/loanimage1.jpeg';

const Home = () => {
    const [loans, setLoans] = useState([]);
    const navigate = useNavigate();

    // console.log("process.env.VITE_API_URL =", import.meta.env.VITE_API_URL);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/loans`);
                setLoans(response.data);
            } catch (error) {
                console.error("Error fetching loans:", error);
            }
        };
        fetchLoans();
    }, []);

    const handleRowClick = (loanId) => {
        navigate(`/schedule/${loanId}`); // Redirect to schedule page
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen text-white p-4 bg-cover bg-center" style={{ backgroundImage: `url(${imgURL})` }}>
            <div className="absolute inset-0 bg-black opacity-50 blur-md"></div> {/* Blur effect */}
            <div className="relative z-10 text-center"> {/* Content above the blur */}
                <h1 className="text-3xl md:text-4xl font-bold mb-6">Welcome to Loan Repayment Calculator</h1>
                <Link to="/loan-form">
                    <button className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200">
                        Add New Loan
                    </button>
                </Link>

                <div className="mt-8 w-full max-w-4xl">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">Loans List</h2>
                    <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
                        <thead>
                            <tr className="bg-gray-700 text-gray-300">
                                <th className="py-2 px-2 md:px-4 border-b">ID</th>
                                <th className="py-2 px-2 md:px-4 border-b">Principal</th>
                                <th className="py-2 px-2 md:px-4 border-b">Rate (%)</th>
                                <th className="py-2 px-2 md:px-4 border-b">Tenure (Years)</th>
                                <th className="py-2 px-2 md:px-4 border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-200">
                            {loans.map((loan) => (
                                <tr
                                    key={loan._id}
                                    onClick={() => handleRowClick(loan._id)}
                                    className="hover:bg-gray-700 transition duration-200 cursor-pointer"
                                >
                                    <td className="py-2 px-2 md:px-4 border-b">{loan._id}</td>
                                    <td className="py-2 px-2 md:px-4 border-b text-center">₹{loan.principal}</td>
                                    <td className="py-2 px-2 md:px-4 border-b text-center">{loan.rate}</td>
                                    <td className="py-2 px-2 md:px-4 border-b text-center">{loan.tenure} Years</td>
                                    <td className="py-2 px-2 md:px-4 border-b">{loan.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;