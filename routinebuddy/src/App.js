import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPageimport from "./pages/LogInPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";



function App() {
  return (
    <React.Fragment>
    
    <Routes>
      <Route path="/" element={<LoginPageimport/>} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
    
  </React.Fragment>
  );
}

export default App;
