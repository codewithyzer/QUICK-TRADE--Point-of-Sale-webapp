import { useState } from "react";
import { Link } from "react-router-dom";
import Success from "./components/Success.jsx";
import Failed from "./components/Failed.jsx";

export default function SignupStatus(props) {
  const [succes, setSuccess] = useState(true);
  return <>{succes ? <Success /> : <Failed />}</>;
}
