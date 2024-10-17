import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, isAuthenticated, isRefreshingToken } = useAuth();

  if (isRefreshingToken) return;

  const { pathname } = useLocation();

  let canPass = false;

  if (user?.isCmpAccount && pathname.includes("/my-restaurant")) canPass = true;

  if (!user?.isCmpAccount && pathname.includes("/user")) canPass = true;

  return isAuthenticated && !!user && canPass ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
export default ProtectedRoutes;
