import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { tastyWayLogo } from "@/constants";
import UserDropdown from "../../custom/UserDropdown";
import { useLogout } from "@/lib/react-query/mutations";
import AuthNav from "./AuthNav";
import { useAddress } from "@/contexts/AddressContext";

interface NavbarProps {
  pageNum: number;
}

enum PAGES {
  HOME,
  SIGNIN,
  SIGNUP,
  ALL_RESTAURANTS,
  SINGLE_RESTAURANT,
  USER,
  RESTAURANT,
}

const Navbar = ({ pageNum }: NavbarProps) => {
  const { isAuthenticated, user, isRefreshingToken } = useAuth();
  const { mutateAsync: logout } = useLogout();
  const { removeSelectedAddress } = useAddress();

  const navRigthBtn = isAuthenticated ? (
    <UserDropdown user={user} logoutFn={logout} />
  ) : (
    <Link to="/signin">
      <Button className="login-btn user-btn-bg">Login</Button>
    </Link>
  );

  let content;

  switch (pageNum) {
    case PAGES.HOME:
      content = (
        <header className="flex-between">
          <Link to="/" className="-ml-10">
            <img
              src={tastyWayLogo}
              alt="Tasty-way-logo"
              className="w-[200px] h-[50px] md:w-[280px] md:h-[98px] object-cover"
            />
          </Link>
          {navRigthBtn}
        </header>
      );
      break;
    case PAGES.SIGNIN:
      content = <AuthNav to="signup" />;
      break;
    case PAGES.SIGNUP:
      content = <AuthNav to="signin" />;
      break;
    case PAGES.ALL_RESTAURANTS:
      content = (
        <header className="flex-between">
          <Link to="/" className="-ml-10">
            <img
              src={tastyWayLogo}
              alt="Tasty-way-logo"
              className="w-[200px] h-[50px] md:w-[280px] md:h-[98px] object-cover"
            />
          </Link>
          <Link
            to="/"
            onClick={() => removeSelectedAddress()}
            className="gap-3 py-3 px-5 border flex-center
            bg-home-widget-border-30 border-primary-80
            rounded-[50px] hover:bg-home-widget-border-80 transition-colors"
          >
            <img src="/icons/home-icon.png" alt="home-icon" />
            <p>Home</p>
          </Link>
          {navRigthBtn}
        </header>
      );
      break;
    default:
      console.error(`Il numero ${pageNum} non corrisponde a nessuna pagina`);

      break;
  }

  return content;
};
export default Navbar;
