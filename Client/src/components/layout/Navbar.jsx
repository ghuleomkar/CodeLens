import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Navbar.css";
import CodeLensLogo from "./CodeLensLogo";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          {/* <div className="Navbar-logo">
            Code<span>Lens</span>
          </div> */}

          <div className="Navbar-logo">
  <CodeLensLogo size={32} />
  <span>CodeLens</span>
</div>
        
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/analyze">Analyze</Link>
        </nav>

        {/* DESKTOP AUTH */}
        <div className="auth-buttons">
          {user ? (
            <>
              <span className="navbar-username">
                Hi, {user.username}
              </span>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="login-btn"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="register-btn"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className={`mobile-menu-button ${
            menuOpen ? "active" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`mobile-menu ${
          menuOpen ? "open" : ""
        }`}
      >
        <nav className="mobile-nav-links">

          <Link
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/analyze"
            onClick={closeMenu}
          >
            Analyze
          </Link>

        </nav>

        <div className="mobile-auth-buttons">

          {user ? (
            <>
              <div className="mobile-username">
                Hi, {user.username}
              </div>

              <button
                className="mobile-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="mobile-login-btn"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="mobile-register-btn"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;