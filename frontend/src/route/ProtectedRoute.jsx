import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { authenticated, loading } = useAuth();

  if (loading) return <div className="p-5 text-center">Loading...</div>;

  return authenticated ? children : <Navigate to="/signin" replace />;
}
