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
          `http://localhost:5000/api/repository/${id}`
        );

        const repositoryData = await repositoryResponse.json();

        const reviewsResponse = await fetch(
          `http://localhost:5000/api/repository/${id}/reviews`
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
      <div className="repository-loading">
        Loading repository analysis...
      </div>
    );
  }

  if (!repository) {
    return (
      <div className="repository-error">
        Repository not found.
      </div>
    );
  }

  return (
    <div className="repository-page">

      <RepositoryNavbar />

      <RepositoryHeader
        repository={repository}
        reviewCount={reviews.length}
      />


     {/* Search Bar */}
      <div className="review-search">
        <span className="search-icon">🔍</span>
    <input
        type="text"
        placeholder="Search file..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
    />
</div>

      <ReviewList reviews={filteredReviews} />

    </div>
  );
};

export default Repository;