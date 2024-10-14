import Navbar from "@/components/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div className="hero">
      <img
        src="/imgs/plate-bg.png"
        alt="plate-bg"
        className="fixed inset-0 h-screen w-screen object-cover -z-10"
      />
      <Navbar pageNum={5} />
      <main className="user-orders">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default ClientLayout;
