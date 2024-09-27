import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import UserDropdown from "../../custom/UserDropdown";
import { useLogout } from "@/lib/react-query/mutations";
import AuthNavbar from "./AuthNavbar";
import DefaultNavbar from "./DefaultNavbar";

interface NavbarProps {
  pageNum: number;
}

enum PAGES {
  HOME,
  SIGNIN,
  SIGNUP,
  RESTAURANTS,
  RESTAURANT,
  MANAGE_USER,
  MANAGE_RESTAURANT,
}

const Navbar = ({ pageNum }: NavbarProps) => {
  const { isAuthenticated, user, isRefreshingToken } = useAuth();
  const { mutateAsync: logout } = useLogout();

  const navRigthBtn = isAuthenticated ? (
    <UserDropdown user={user} logoutFn={logout} />
  ) : (
    <Link to="/signin">
      <Button className="btn login-btn user-btn-bg">Login</Button>
    </Link>
  );

  const defaultNavbar = <DefaultNavbar navRigthBtn={navRigthBtn} />;

  let navbar;

  switch (pageNum) {
    case PAGES.HOME:
      navbar = defaultNavbar;
      break;
    case PAGES.SIGNIN:
      navbar = <AuthNavbar to="signup" />;
      break;
    case PAGES.SIGNUP:
      navbar = <AuthNavbar to="signin" />;
      break;
    case PAGES.RESTAURANTS:
      navbar = defaultNavbar;
      break;
    case PAGES.RESTAURANT:
      navbar = defaultNavbar;
      break;
    default:
      console.error(`Il numero ${pageNum} non corrisponde a nessuna pagina`);

      break;
  }

  return navbar;
};
export default Navbar;
