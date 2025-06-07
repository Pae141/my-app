// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  console.log("ProtectedRoute user:", user);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
