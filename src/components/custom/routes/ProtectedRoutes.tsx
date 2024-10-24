import { useAuth } from "@/contexts/AuthContext";
import { checkUserPass } from "@/lib/utils";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, isAuthenticated, isRefreshingToken } = useAuth();

  if (isRefreshingToken) return;

  const { pathname } = useLocation();

  const canPass = checkUserPass(user?.isCmpAccount, pathname);

  return isAuthenticated && !!user && canPass ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
export default ProtectedRoutes;
