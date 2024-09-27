import { tastyWayLogo } from "@/constants";
import { useAddress } from "@/contexts/AddressContext";
import { ReactElement, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface DefaultNavbarProps {
  navRigthBtn: ReactElement;
}

const DefaultNavbar = ({ navRigthBtn }: DefaultNavbarProps) => {
  const { removeSelectedAddress } = useAddress();

  const { pathname } = useLocation();

  const homeBtn = pathname !== "/" && (
    <Link
      to="/"
      onClick={() => removeSelectedAddress()}
      className="btn home-btn"
    >
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
          {navRigthBtn}
        </div>
      </div>
    </header>
  );
};
export default DefaultNavbar;
