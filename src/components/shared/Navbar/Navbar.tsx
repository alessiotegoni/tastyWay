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
      <Button className="btn login-btn user-btn-bg">Login</Button>
    </Link>
  );

  let content;

  switch (pageNum) {
    case PAGES.HOME:
      content = (
        <header className="home-header">
          <div className="container">
            <div className="row flex-between">
              <Link to="/">
                <img
                  src={tastyWayLogo}
                  alt="Tasty-way-logo"
                  className="w-[170px]"
                />
              </Link>
              {navRigthBtn}
            </div>
          </div>
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
              <Link
                to="/"
                onClick={() => removeSelectedAddress()}
                className="btn home-btn"
              >
                <img src="/icons/home-icon.png" alt="home-icon" className="w-5 h-5" />
                <p>Home</p>
              </Link>
              {navRigthBtn}
            </div>
          </div>
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
