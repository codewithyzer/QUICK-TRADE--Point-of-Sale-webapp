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
import FilteredProducts from "./pages/filtered/index.jsx";
import ConversationPage from "./pages/conversation/index.jsx";
import SearchPage from "./pages/searched/index.jsx";
import CredentialsPage from "./pages/credentials/index.jsx";
import ReportPage from "./pages/report/index.jsx";

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
          path={"/buy/products/:id"}
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/home/products/filter/:category"}
          element={
            <ProtectedRoute>
              <FilteredProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/messages/conversation/:id"}
          element={
            <ProtectedRoute>
              <ConversationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/home/products/search/:item"}
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/home/report"}
          element={
            <ProtectedRoute>
              <ReportPage />
            </ProtectedRoute>
          }
        />
        <Route path={"/signup/status"} element={<SignupStatus />} />
        <Route path={"/signin/status"} element={<SigninStatus />} />
        <Route path={"/signup/credentials"} element={<CredentialsPage />} />
      </Routes>
    </>
  );
}

export default App;
