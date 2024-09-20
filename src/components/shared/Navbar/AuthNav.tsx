import { Link } from "react-router-dom";

interface AuthNavProps {
  to: "signin" | "signup";
}

const AuthNav = ({ to }: AuthNavProps) => {
  const linkName = to === "signin" ? "Accedi" : "Registrati";

  return (
    <header className="w-full flex-center">
      <nav
        className="flex-center gap-4 rounded-[30px] py-4 px-5
home-widget-bg border border-primary-20"
      >
        <Link to="/" className="nav-btn">
          <img src="/icons/home-icon.png" alt="home-icon" />
          <p>Home</p>
        </Link>
        <Link to={`/${to}`} className="nav-btn">
          <img
            src="/icons/signup-icon.png"
            alt={`${to}-icon`}
            className="w-[25px] h-[25px]"
          />
          <p>{linkName}</p>
        </Link>
      </nav>
    </header>
  );
};
export default AuthNav;
