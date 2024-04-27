import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashbaord from "../components/mainDashboard/";
import SignIn from "../components/signIn";
import { useSelector } from "react-redux";
 function Router22() {
  let isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/dashboard" element={<Dashbaord />}></Route>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      )}
    </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/dashboard" element={<Dashbaord />}></Route>
    //      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    //     <Route path="*" element={<Navigate to="/dashboard" replace />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default Router22;
