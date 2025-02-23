import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoanForm from "./pages/LoanForm";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";
import "./App.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="relative">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loan-form" element={<LoanForm />} />
        <Route path="/schedule/:id" element={<Schedule />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
