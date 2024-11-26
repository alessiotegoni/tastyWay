import ActiveOrdersCount from "@/components/custom/ActiveOrdersCount";
import { tastyWayLogo } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { ReactElement } from "react";
import { Link, useMatch } from "react-router-dom";

interface DefaultNavbarProps {
  navRightBtn: ReactElement;
}

const DefaultNavbar = ({ navRightBtn }: DefaultNavbarProps) => {
  const { user, isAuthenticated } = useAuth();

  const homeBtn = !useMatch("/") ? (
    <Link to="/" className="btn home-btn">
      <img
        src="/icons/home-icon.png"
        alt="home-icon"
        className="shrink-0 w-4 h-4 md:w-5 md:h-5"
      />
      <p className="hidden sm:block text-sm md:text-base">Home</p>
    </Link>
  ) : (
    <ActiveOrdersCount
      isAuthenticated={isAuthenticated}
      isCmpAccount={!!user?.isCmpAccount}
    />
  );

  return (
    <header className="relative">
      <div className="container max-w-none lg:max-w-[1300px]">
        <div className="row flex-between">
          <Link to="/" className="shrink-0">
            <img
              src={tastyWayLogo}
              alt="Tasty-way-logo"
              className="w-[120px] md:w-[170px]"
            />
          </Link>
          <div
            className="absolute left-1/2 -translate-x-1/2
    top-1/2 -translate-y-1/2"
          >
            {homeBtn}
          </div>
          {navRightBtn}
        </div>
      </div>
    </header>
  );
};
export default DefaultNavbar;
