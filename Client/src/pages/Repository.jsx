import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import RepositoryNavbar from "../components/repository/RepositoryNavbar";
import RepositoryHeader from "../components/repository/RepositoryHeader";
import ReviewList from "../components/repository/ReviewList";

import "../styles/Repository.css";

const Repository = () => {
  const { id } = useParams();

  const [repository, setRepository] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const filteredReviews = reviews.filter((review) =>
    review.filePath.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchRepositoryData = async () => {
      try {
        const repositoryResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/repository/${id}`
        );

        const repositoryData = await repositoryResponse.json();

        const reviewsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/repository/${id}/reviews`
        );

        const reviewsData = await reviewsResponse.json();

        if (repositoryData.success) {
          setRepository(repositoryData.repository);
        }

        if (reviewsData.success) {
          setReviews(reviewsData.reviews);
        }
      } catch (error) {
        console.error("Failed to fetch repository data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositoryData();
  }, [id]);

  if (loading) {
    return (
      <div className="repository-loading-page">
        <div className="repository-loader">
          <div className="loader-icon">✦</div>
          <h2>Loading repository analysis</h2>
          <p>Fetching repository insights...</p>
        </div>
      </div>
    );
  }

  if (!repository) {
    return (
      <div className="repository-error">
        <div className="error-icon">!</div>
        <h2>Repository not found</h2>
        <p>We couldn't load this repository analysis.</p>
      </div>
    );
  }

  return (
    <div className="repository-page">
      <RepositoryNavbar />

      <main className="repository-main">
        <RepositoryHeader
          repository={repository}
          reviewCount={reviews.length}
        />

        <section className="reviews-section">
          <div className="reviews-section-header">
            <div>
              <span className="reviews-eyebrow">CODE REVIEWS</span>
              <h2>Repository findings</h2>
            </div>

            <span className="review-count-badge">
              {filteredReviews.length}{" "}
              {filteredReviews.length === 1 ? "review" : "reviews"}
            </span>
          </div>

          <div className="review-search">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search by file name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {filteredReviews.length === 0 && search ? (
            <div className="no-reviews">
              <div className="no-reviews-icon">⌕</div>
              <h3>No matching files found</h3>
              <p>
                Try searching with a different file name or clear the search.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
              >
                Clear search
              </button>
            </div>
          ) : (
            <ReviewList reviews={filteredReviews} />
          )}
        </section>
      </main>
    </div>
  );
};

export default Repository;