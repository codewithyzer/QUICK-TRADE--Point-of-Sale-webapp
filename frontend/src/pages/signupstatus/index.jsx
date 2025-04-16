import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Success from "./components/Success.jsx";
import Failed from "./components/Failed.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function SignupStatus() {
  const { state } = useLocation();
  const { signupStatus } = useAuth();
  return <>{signupStatus ? <Success /> : <Failed data={state} />}</>;
}
