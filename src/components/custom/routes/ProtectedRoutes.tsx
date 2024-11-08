import { useAuth } from "@/contexts/AuthContext";
import { checkUserPass } from "@/lib/utils";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, isAuthenticated, isLoadingToken } = useAuth();

  if (isLoadingToken) return;

  const canPass = checkUserPass(user?.isCmpAccount);

  if (isAuthenticated && user && canPass) return <Outlet />;

  return <Navigate to="/" />;
};
export default ProtectedRoutes;
