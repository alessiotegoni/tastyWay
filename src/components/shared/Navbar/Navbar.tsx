import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import UserDropdown from "../../custom/UserDropdown";
import AuthNavbar from "./AuthNavbar";
import DefaultNavbar from "./DefaultNavbar";
import ClientNavbar from "./ClientNavbar";
import { Skeleton } from "@/components/ui/skeleton";

interface NavbarProps {
  pageNum: number;
}

enum PAGES {
  HOME,
  SIGNIN,
  SIGNUP,
  RESTAURANTS,
  RESTAURANT,
  HANDLE_CLIENT,
}

const Navbar = ({ pageNum }: NavbarProps) => {
  const { isAuthenticated, user, logout, isRefreshingToken } = useAuth();

  const navRightBtn = isRefreshingToken ? (
    <Skeleton className="user-btn user-btn-bg w-[180px] h-[45px] rounded-3xl" />
  ) : isAuthenticated && user ? (
    <UserDropdown user={user} logoutFn={logout} />
  ) : (
    <Link to="/signin">
      <Button className="btn login-btn user-btn-bg">Login</Button>
    </Link>
  );

  const defaultNavbar = <DefaultNavbar navRightBtn={navRightBtn} />;

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
    case PAGES.HANDLE_CLIENT:
      navbar = <ClientNavbar navRightBtn={navRightBtn} />;
      break;
    default:
      console.error(`Il numero ${pageNum} non corrisponde a nessuna pagina`);

      break;
  }

  return navbar;
};
export default Navbar;
