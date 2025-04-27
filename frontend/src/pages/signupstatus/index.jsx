import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Success from "./components/Success.jsx";

export default function SignupStatus() {
  const { state } = useLocation();
  return <Success />;
}
