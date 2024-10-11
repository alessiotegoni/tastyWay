import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, isAuthenticated, isRefreshingToken } = useAuth();

  if (isRefreshingToken) return;

  // <div
  //       className="w-screen h-screen fixed top-0 left-0
  //     grid place-content-center"
  //     >
  //       <Loader width={40} height={40} />
  //     </div>

  return isAuthenticated && !!user ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoutes;
