import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home-page">
      <section className="hero-section">

        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>

        <div className="hero-content">

          <div className="hero-badge">
            <span className="badge-dot"></span>
            AI-POWERED CODE INTELLIGENCE
          </div>

          <h1>
            Understand your code.
            <span> Improve it with AI.</span>
          </h1>

          <p className="hero-description">
            Analyze any GitHub repository with intelligent AI code reviews.
            Find issues, understand your code, and build better software faster.
          </p>

          <div className="hero-actions">
            <Link to="/analyze" className="primary-button">
              Analyze Repository
              <span>→</span>
            </Link>

            <a
              href="#features"
              className="secondary-button"
            >
              Explore Features
            </a>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <span>✦</span>
              AI-Powered Reviews
            </div>

            <div className="trust-item">
              <span>⚡</span>
              Instant Analysis
            </div>

            <div className="trust-item">
              <span>◉</span>
              Developer Focused
            </div>
          </div>

        </div>

        <div className="hero-visual">

          <div className="code-window">

            <div className="window-header">
              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="window-title">
                AI Code Review
              </div>

              <div className="window-status">
                ●
              </div>
            </div>

            <div className="code-content">

              <div className="code-line">
                <span className="line-number">01</span>
                <span className="code-keyword">function</span>
                <span className="code-function"> calculateTotal</span>
                <span>(price, quantity) {"{"}</span>
              </div>

              <div className="code-line">
                <span className="line-number">02</span>
                <span className="indent"> </span>
                <span className="code-keyword">return</span>
                <span> price * quantity;</span>
              </div>

              <div className="code-line">
                <span className="line-number">03</span>
                <span>{"}"}</span>
              </div>

            </div>

            <div className="ai-review-card">

              <div className="review-header">
                <div className="review-icon">✦</div>

                <div>
                  <div className="review-title">
                    AI Review
                  </div>

                  <div className="review-subtitle">
                    Analysis completed
                  </div>
                </div>

                <div className="review-check">
                  ✓
                </div>
              </div>

              <div className="review-message">
                Consider adding input validation to improve
                reliability and prevent unexpected behavior.
              </div>

              <div className="review-tags">
                <span className="tag-warning">
                  Improvement
                </span>

                <span className="tag-low">
                  Low Priority
                </span>
              </div>

            </div>

          </div>

        </div>

      </section>

      <section id="features" className="features-section">

        <div className="section-heading">
          <span>POWERFUL FEATURES</span>

          <h2>
            Your code deserves
            <br />
            <strong>better feedback.</strong>
          </h2>
        </div>

        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon">✦</div>

            <h3>AI Code Reviews</h3>

            <p>
              Get intelligent feedback on your code with
              detailed explanations and actionable suggestions.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⌘</div>

            <h3>Repository Analysis</h3>

            <p>
              Analyze your entire GitHub repository and
              understand the structure of your codebase.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>

            <h3>Actionable Insights</h3>

            <p>
              Discover bugs, code quality issues, and
              improvements that actually matter.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
};

export default Home;