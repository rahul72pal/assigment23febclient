import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
            <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
            <Link to="/">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200">
                    Go to Home
                </button>
            </Link>
        </div>
    );
};

export default NotFound;