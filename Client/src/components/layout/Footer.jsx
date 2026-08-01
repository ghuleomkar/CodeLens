import { Link } from "react-router-dom";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">

      <div className="footer-main">

        <div className="footer-brand">

          <div className="footer-logo">
            Code<span>Lens</span>
          </div>

          <p>
            AI-powered code intelligence for developers
            who want to understand, improve, and build better software.
          </p>

          <div className="footer-status">
            <span className="status-dot"></span>
            AI analysis engine online
          </div>

        </div>


        <div className="footer-column">

          <h4>Product</h4>

          <Link to="/analyze">
            Analyze Repository
          </Link>

          <a href="#features">
            Features
          </a>

        </div>


        <div className="footer-column">

          <h4>Built With</h4>

          <span>React</span>
          <span>Node.js</span>
          <span>Gemini AI</span>

        </div>


        <div className="footer-column">

          <h4>Connect</h4>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>

        </div>

      </div>


      <div className="footer-bottom">

        <span>
          © 2026 CodeLens. Built for better code.
        </span>

        <span className="footer-tech">
          React · Node.js · Gemini AI
        </span>

      </div>

    </footer>
  );
};

export default Footer;