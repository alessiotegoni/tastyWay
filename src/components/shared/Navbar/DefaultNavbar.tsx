import { tastyWayLogo } from "@/constants";
import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

interface DefaultNavbarProps {
  navRightBtn: ReactElement;
}

const DefaultNavbar = ({ navRightBtn }: DefaultNavbarProps) => {
  const { pathname } = useLocation();

  const homeBtn = pathname !== "/" && (
    <Link to="/" className="btn home-btn">
      <img src="/icons/home-icon.png" alt="home-icon" className="w-5 h-5" />
      <p>Home</p>
    </Link>
  );

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
          {homeBtn}
          {navRightBtn}
        </div>
      </div>
    </header>
  );
};
export default DefaultNavbar;
