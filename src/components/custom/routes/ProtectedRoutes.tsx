import { useAuth } from "@/contexts/AuthContext";
import useProtectRoutes from "@/hooks/useProtectRoutes";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, isAuthenticated, isLoadingToken } = useAuth();

  if (isLoadingToken) return;

  const canPass = useProtectRoutes(user?.isCmpAccount);

  if (isAuthenticated && user && canPass) return <Outlet />;

  return <Navigate to="/" />;
};
export default ProtectedRoutes;
