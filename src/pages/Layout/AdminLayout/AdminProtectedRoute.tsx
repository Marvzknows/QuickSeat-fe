import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

const ProtectedRoute = () => {
  const { session } = useContext(UserContext);

  if (
    !session ||
    !session.acces_token ||
    session.user_information.role !== "admin"
  ) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  return <Outlet />; // If authenticated, render child routes
};

export default ProtectedRoute;
