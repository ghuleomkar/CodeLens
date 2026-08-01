import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Navbar.css";


const Navbar = () => {

  const navigate = useNavigate();

  const {
    user,
    logout
  } = useAuth();


  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <header className="navbar">

      <div className="navbar-container">

        {/* LOGO */}

        <Link
          to="/"
          className="logo"
        >
          
           <div className="Navbar-logo">
            Code<span>Lens</span>
          </div>

        </Link>


        {/* NAV LINKS */}

        <nav className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/analyze">
            Analyze
          </Link>

        </nav>


        {/* AUTH BUTTONS */}

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
      </div>
    </header>
  );
};


export default Navbar;