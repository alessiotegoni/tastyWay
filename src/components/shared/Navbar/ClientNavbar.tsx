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
  const isInProfile = pathname.includes("profile");

  return (
    <header className="restaurants-header">
      <div className="container">
        <div className="row flex-between">
          <Link to="/">
            <img
              src={tastyWayLogo}
              alt="Tasty-way-logo"
              className="w-[170px]"
            />
          </Link>
          <div className="flex-center gap-4">
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
              <p>Home</p>
            </Link>
            <Link
              to={`/${isUserNavbar ? "user" : "restaurant"}/orders`}
              className={`btn client-nav-btn ${
                isUserNavbar ? "user-btn" : "restaurant-btn"
              } ${isInOrders ? "active" : ""}`}
            >
              <img
                src="/icons/order-icon.png"
                alt="order-icon"
                className="w-7 h-7"
              />
              <p>Ordini</p>
            </Link>
            <Link
              to={`/${isUserNavbar ? "user" : "restaurant"}/profile`}
              className={`btn client-nav-btn ${
                isUserNavbar ? "user-btn" : "restaurant-btn"
              } ${isInProfile ? "active" : ""}`}
            >
              {isUserNavbar ? (
                <img
                  src="/icons/handle-user-profile.png"
                  alt="handle-user-icon"
                  className="w-7 h-7"
                />
              ) : (
                <img
                  src="/icons/handle-restaurant-profile.png"
                  alt="handle-restaurant-icon"
                  className="w-6 h-6 object-contain"
                />
              )}
              <p>{isUserNavbar ? "Gestisci profilo" : "Gestisci ristorante"}</p>
            </Link>
          </div>
          {navRightBtn}
        </div>
      </div>
    </header>
  );
};
export default ClientNavbar;