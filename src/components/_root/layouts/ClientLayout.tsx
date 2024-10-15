import Navbar from "@/components/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div className="hero">
      <Navbar pageNum={5} />
      <Outlet />
    </div>
  );
};
export default ClientLayout;
