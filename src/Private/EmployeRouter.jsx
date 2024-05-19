/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useEmploye from "../hooks/useEmploye";

// Employe private routers
const EmployeRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const [employe, emplyeLoading] = useEmploye();
  const location = useLocation();
  if (loading || emplyeLoading) {
    return <p className="text-center">Loading...</p>;
  }
  if (user && employe) {
    return children;
  }
  return <Navigate state={location?.pathname} to="/login" />;
};

export default EmployeRouter;
