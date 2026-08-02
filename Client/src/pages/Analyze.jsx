import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Analyze.css";

const Analyze = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a GitHub repository URL.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setLoadingMessage("Connecting to server...");

    try {
      setLoadingMessage("Fetching repository...");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/repository/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      setLoadingMessage("AI is analyzing your repository...");

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to analyze repository"
        );
      }

      setLoading(false);
      setLoadingMessage("");

      setSuccess("Repository analyzed successfully!");

      setTimeout(() => {
        navigate(`/repository/${data.repository._id}`);
      }, 1200);

    } catch (error) {
      setError(error.message);
      setLoading(false);
      setLoadingMessage("");
    }
  };

  return (
    <main className="analyze-page">

      <div className="analyze-container">

        <div className="analyze-header">

          <div className="hero-badge">
            <span className="badge-dot"></span>
            AI-POWERED ANALYSIS
          </div>

          <h1>
            Analyze your <span>repository.</span>
          </h1>

          <p>
            Paste a public GitHub repository URL and let the system understand,
            analyze, and review your code.
          </p>

        </div>

        <form
          className="repository-input-card"
          onSubmit={handleAnalyze}
        >

          <label htmlFor="repository-url">
            GitHub Repository URL
          </label>

          <div className="repository-input-wrapper">

            <span className="github-icon">
              ◉
            </span>

            <input
              id="repository-url"
              type="text"
              placeholder="https://github.com/username/repository"
              value={url}
              disabled={loading}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Analyzing..."
                : "Analyze Repository →"}
            </button>

          </div>

          <p className="input-hint">
            Public GitHub repositories only · Analysis may take a few moments
          </p>

          {loading && (
            <div className="analyze-loading">

              <div className="loading-spinner"></div>

              <p>{loadingMessage}</p>

            </div>
          )}

          {success && (
            <div className="analyze-success">
              {success}
            </div>
          )}

          {error && (
            <p className="analyze-error">
              {error}
            </p>
          )}

        </form>

        <div className="analyze-trust">

          <div>
            <span>✦</span>
            AI-powered code reviews
          </div>

          <div>
            <span>⚡</span>
            Deep repository analysis
          </div>

          <div>
            <span>◉</span>
            Actionable insights
          </div>

        </div>

      </div>

    </main>
  );
};

export default Analyze;