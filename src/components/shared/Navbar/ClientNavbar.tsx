import { tastyWayLogo } from "@/constants";
import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

interface ClientNavbarProps {
  navRightBtn: ReactElement;
}

const ClientNavbar = ({ navRightBtn }: ClientNavbarProps) => {
  const { pathname } = useLocation();

  const isUserNavbar = pathname.includes("user");

  const isInOrders = pathname.includes("orders");
  const isInProfile = [
    "/user",
    "/user/security",
    "/my-restaurant",
    "/my-restaurant/security",
    "/my-restaurant/owner",
  ].includes(pathname);

  return (
    <header className="client__header relative">
      <div className="">
        <div className="row flex-between">
          <Link to="/" className="shrink-0">
            <img
              src={tastyWayLogo}
              alt="Tasty-way-logo"
              className="w-[120px] lg:w-[170px]"
            />
          </Link>
          <div
            className="w-full flex-center gap-4 absolute
          xl:top-1/2 xl:-translate-y-1/2 top-[95%] left-1/2 -translate-x-1/2"
          >
            <Link
              to="/"
              className={`btn client-nav-btn ${
                isUserNavbar ? "user-btn" : "restaurant-btn"
              }`}
            >
              <img
                src="/icons/home-icon.png"
                alt="home-icon"
                className="w-5 h-5"
              />
              <p className="hidden sm:block">Home</p>
            </Link>
            <Link
              to={`/${isUserNavbar ? "user" : "my-restaurant"}/orders`}
              className={`btn client-nav-btn ${
                isUserNavbar ? "user-btn" : "restaurant-btn"
              } ${isInOrders ? "active" : ""}`}
            >
              <img
                src="/icons/order-icon.png"
                alt="order-icon"
                className="w-7 h-7"
              />
              <p className="hidden sm:block">Ordini</p>
            </Link>
            <Link
              to={`/${isUserNavbar ? "user" : "my-restaurant"}`}
              className={`btn client-nav-btn ${
                isUserNavbar ? "user-btn" : "restaurant-btn"
              } ${isInProfile ? "active" : ""}`}
            >
              <img
                src={`/icons/${
                  isUserNavbar ? "user" : "restaurant"
                }-profile-icon.png`}
                alt="profile icon"
                className="w-6 h-6 object-contain shrink-0"
              />
              <p className="hidden sm:block">
                {isUserNavbar ? "Gestisci profilo" : "Gestisci ristorante"}
              </p>
            </Link>
          </div>
          {navRightBtn}
        </div>
      </div>
    </header>
  );
};
export default ClientNavbar;
