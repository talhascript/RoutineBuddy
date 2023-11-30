import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPageimport from "./pages/LogInPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ForgotPassword from "./pages/ForgotPassword";



function App() {
  return (
    <React.Fragment>
    
    <Routes>
      <Route path="/" element={<LoginPageimport/>} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/forgot" element={<ForgotPassword />} />
    </Routes>
    
  </React.Fragment>
  );
}

export default App;
