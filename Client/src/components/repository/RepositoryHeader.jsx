import "../../styles/RepositoryHeader.css";

const RepositoryHeader = ({ repository, reviewCount }) => {
  return (
    <section className="repository-header">

      {/* TOP SECTION */}
      <div className="repository-header-top">

        <div className="repository-header-content">

          <div className="breadcrumb">
            Analysis <span>/</span> Repository
          </div>

          <h1>{repository.name}</h1>

          <p className="repository-owner">
            @{repository.owner}
          </p>

          <p className="repository-description">
            {repository.description || "No description available."}
          </p>

        </div>

        <div className="repository-header-actions">

          <div className="analysis-badge">
            <span>✓</span>
            Reviewed
          </div>

          <a
            href={repository.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="github-button"
          >
            View on GitHub <span>↗</span>
          </a>

        </div>

      </div>


      {/* STATS */}
      <div className="repository-stats">

        <div className="stat-card">
          <span className="stat-label">
            <span className="stat-icon">◉</span>
            Language
          </span>

          <strong>
            {repository.language || "Unknown"}
          </strong>
        </div>


        <div className="stat-card">
          <span className="stat-label">
            <span className="stat-icon">★</span>
            Stars
          </span>

          <strong>
            {repository.stars}
          </strong>
        </div>


        <div className="stat-card">
          <span className="stat-label">
            <span className="stat-icon">⑂</span>
            Forks
          </span>

          <strong>
            {repository.forks}
          </strong>
        </div>


        <div className="stat-card">
          <span className="stat-label">
            <span className="stat-icon">▣</span>
            Files Reviewed
          </span>

          <strong>
            {reviewCount}
          </strong>
        </div>

      </div>

    </section>
  );
};

export default RepositoryHeader;