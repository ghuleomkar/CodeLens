import { Link } from "react-router-dom";

import "../../styles/RepositoryNavbar.css";

const RepositoryNavbar = () => {
  return (
    <header className="repository-navbar">

      <Link to="/" className="repository-brand">
        <span className="brand-mark">&lt;/&gt;</span>

        <span className="brand-name">
          CodeLens
        </span>
      </Link>

      <div className="repository-nav-right">

        <span className="analysis-status">
          <span className="status-dot"></span>
          Analysis complete
        </span>

        <Link to="/analyze" className="new-analysis-button">
          New Analysis
        </Link>

      </div>

    </header>
  );
};

export default RepositoryNavbar;