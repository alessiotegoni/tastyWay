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
      <img
        src="/icons/home-icon.png"
        alt="home-icon"
        className="shrink-0 w-4 h-4 md:w-5 md:h-5"
      />
      <p className="hidden sm:block text-sm md:text-base">Home</p>
    </Link>
  );

  return (
    <header className="restaurants-header">
      <div className="container max-w-none lg:max-w-[1300px]">
        <div className="row flex-between">
          <Link to="/" className="shrink-0">
            <img
              src={tastyWayLogo}
              alt="Tasty-way-logo"
              className="w-[120px] md:w-[170px]"
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
