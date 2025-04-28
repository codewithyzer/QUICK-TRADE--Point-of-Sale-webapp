import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/notfound";
import LandingPage from "./pages/landing";
import SigninPage from "./pages/signin";
import SignupPage from "./pages/signup";
import HomePage from "./pages/home";
import NotificationPage from "./pages/notifcation";
import MessagePage from "./pages/message";
import BuyPage from "./pages/buy";
import SellPage from "./pages/sell";
import SignupStatus from "./pages/signupstatus";
import SigninStatus from "./pages/signinstatus";
import ProtectedRoute from "./route/ProtectedRoute.jsx";
import Product from "./pages/product/index.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path={""} element={<LandingPage />} />
        <Route path={"*"} element={<NotFoundPage />} />
        <Route path={"/signup"} element={<SignupPage />} />
        <Route path={"/signin"} element={<SigninPage />} />
        <Route
          path={"/home"}
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/notifications"}
          element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/messages"}
          element={
            <ProtectedRoute>
              <MessagePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/buy"}
          element={
            <ProtectedRoute>
              <BuyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/sell"}
          element={
            <ProtectedRoute>
              <SellPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/home/products/:id"}
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route path={"/signup/status"} element={<SignupStatus />} />
        <Route path={"/signin/status"} element={<SigninStatus />} />
      </Routes>
    </>
  );
}

export default App;
