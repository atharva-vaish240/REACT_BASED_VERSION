import React, { useEffect, useState } from "react";
import { getReviews, postReview } from "../services/api";

function CustomerReviews() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load reviews from backend API
  useEffect(() => {
    getReviews()
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to localStorage if API fails
        const saved = JSON.parse(localStorage.getItem("reviews")) || [];
        setReviews(saved);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) {
      alert("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      const newReview = await postReview({
        name,
        rating: parseInt(rating),
        comment
      });
      setReviews([newReview, ...reviews]);
      setName("");
      setRating("5");
      setComment("");
    } catch (err) {
      alert(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h2>Customer Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
        />
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="form-control mb-2"
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>
        <textarea
          placeholder="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-success w-100" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>

      {/* Review Display */}
      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <div key={r.id} className="card mb-2 p-3 shadow-sm">
            <h5>{r.name} — {"⭐".repeat(r.rating)}</h5>
            <p>{r.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CustomerReviews;