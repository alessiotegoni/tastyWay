import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, isAuthenticated, isRefreshingToken } = useAuth();

  if (isRefreshingToken || !user) return;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoutes;
