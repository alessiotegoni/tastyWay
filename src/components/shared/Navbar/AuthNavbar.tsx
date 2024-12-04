import { Link } from "react-router-dom";

interface AuthNavbarProps {
  to: "signin" | "signup";
}

const AuthNavbar = ({ to }: AuthNavbarProps) => (
  <header className="auth-header pb-5">
    <div className="container max-w-fit">
      <nav
        className="row flex-center gap-4 rounded-[30px] py-4 px-5
                    primary-widget-bg border border-primary-20"
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
          <p>{to === "signin" ? "Accedi" : "Registrati"}</p>
        </Link>
      </nav>
    </div>
  </header>
);
export default AuthNavbar;
