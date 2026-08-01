
import "../../styles/ReviewList.css";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const parseReview = (reviewText) => {
  const summaryMatch = reviewText.match(
    /Summary:\s*([\s\S]*?)(?=\n\s*Issues:|$)/
  );

  const issuesMatch = reviewText.match(
    /Issues:\s*([\s\S]*?)(?=\n\s*Suggestions:|$)/
  );

  const suggestionsMatch = reviewText.match(
    /Suggestions:\s*([\s\S]*)/
  );

  const extractItems = (text) => {
    if (!text) return [];

    return text
      .split("\n")
      .map((line) => line.replace(/^[-*]\s*/, "").trim())
      .filter(Boolean);
  };

  return {
    summary: summaryMatch?.[1]?.trim() || "",
    issues: extractItems(issuesMatch?.[1]),
    suggestions: extractItems(suggestionsMatch?.[1]),
  };
};

const ReviewList = ({ reviews }) => {
  const [expandedReview, setExpandedReview] = useState(null);

  return (
    <section className="review-list-section">

      <div className="review-list-header">

        <div>
          <span className="section-label">
            CODE REVIEW
          </span>

          <h2>
            Findings from your codebase
          </h2>
        </div>

        <span className="review-count">
          {reviews.length}{" "}
          {reviews.length === 1 ? "review" : "reviews"}
        </span>

      </div>

      <div className="review-list">

        {reviews.length === 0 ? (

          <div className="empty-reviews">

            <div className="empty-icon">
              ✓
            </div>

            <h3>
              No issues found
            </h3>

            <p>
              The analysis did not find any review findings
              in this repository.
            </p>

          </div>

        ) : (

          reviews.map((review) => {

            const parsedReview = parseReview(review.review);

            const isExpanded =
              expandedReview === review._id;

            return (

              <article
                className="review-card"
                key={review._id}
              >

                {/* FILE HEADER */}

                <div className="review-card-header">

                  <div className="file-info">

                    <span className="file-icon">
                      ◇
                    </span>

                    <span className="file-path">
                      {review.filePath}
                    </span>

                  </div>

                  <span className="chunk-label">
                    Chunk {review.chunkNumber}
                  </span>

                </div>


                {/* TOGGLE BUTTON */}

                <button
                  className="review-toggle"
                  onClick={() =>
                    setExpandedReview(
                      isExpanded ? null : review._id
                    )
                  }
                >
                  {isExpanded
                    ? "Hide Details ↑"
                    : "View Details →"}
                </button>


                {/* REVIEW DETAILS */}

                {isExpanded && (

                  <div className="review-details">

                    {/* SUMMARY */}

                    {parsedReview.summary && (

                      <div className="review-section summary-section">

                        <div className="review-section-title">

                          <span className="section-icon summary-icon">
                            ✦
                          </span>

                          <span>
                            Summary
                          </span>

                        </div>

                        <div className="review-markdown">
  <ReactMarkdown>
    {parsedReview.summary}
  </ReactMarkdown>
</div>

                      </div>

                    )}


                    {/* ISSUES */}

                    {parsedReview.issues.length > 0 && (

                      <div className="review-section">

                        <div className="review-section-title">

                          <span className="section-icon issue-icon">
                            !
                          </span>

                          <span>
                            Issues
                          </span>

                        </div>

                        <ul className="review-items">

                          {parsedReview.issues.map(
                            (issue, index) => (

                              <li key={index}>
                                <ReactMarkdown>
                                {issue}
                                </ReactMarkdown>
                              </li>

                            )
                          )}

                        </ul>

                      </div>

                    )}


                    {/* SUGGESTIONS */}

                    {parsedReview.suggestions.length > 0 && (

                      <div className="review-section suggestions-section">

                        <div className="review-section-title">

                          <span className="section-icon suggestion-icon">
                            ✓
                          </span>

                          <span>
                            Suggestions
                          </span>

                        </div>

                        <ul className="review-items">

                          {parsedReview.suggestions.map(
                            (suggestion, index) => (

                              <li key={index}>
                                <ReactMarkdown>
                                    {suggestion}
                                </ReactMarkdown>
                                
                              </li>

                            )
                          )}

                        </ul>

                      </div>

                    )}

                  </div>

                )}

              </article>

            );

          })

        )}

      </div>

    </section>
  );
};

export default ReviewList;