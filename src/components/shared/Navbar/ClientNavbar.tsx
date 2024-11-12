import { tastyWayLogo } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { ReactElement } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

interface ClientNavbarProps {
  navRightBtn: ReactElement;
}

const ClientNavbar = ({ navRightBtn }: ClientNavbarProps) => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const isUserNavbar = pathname.startsWith("/user");

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
            {((!isUserNavbar && user?.restaurantName) || isUserNavbar) && (
              <NavLink
                to={`/${isUserNavbar ? "user" : "my-restaurant"}/orders`}
                className={`btn client-nav-btn ${
                  isUserNavbar ? "user-btn" : "restaurant-btn"
                }`}
                // className={({ isActive }) =>
                //   `btn client-nav-btn ${
                //     isUserNavbar ? "user-btn" : "restaurant-btn"
                //   } ${isActive ? "active" : ""}`
                // } di default react router dom aggiunge la classe
                // active al link che coincide con la route
              >
                <img
                  src="/icons/order-icon.png"
                  alt="order-icon"
                  className="w-7 h-7"
                />
                <p className="hidden sm:block">Ordini</p>
              </NavLink>
            )}
            <NavLink
              to={`/${isUserNavbar ? "user" : "my-restaurant"}`}
              className={({ isActive }) =>
                `btn client-nav-btn ${
                  isUserNavbar ? "user-btn" : "restaurant-btn"
                } ${isActive && !pathname.includes("orders") ? "active" : ""}`
              }
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
            </NavLink>
          </div>
          {navRightBtn}
        </div>
      </div>
    </header>
  );
};
export default ClientNavbar;
