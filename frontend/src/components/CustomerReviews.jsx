import React from 'react';

const CustomerReviews = () => {
  return (
    <div className="container py-5 min-vh-100 d-flex flex-column align-items-center">
      <div className="glass-card p-5 w-100" style={{ maxWidth: '600px' }}>
        <h2 className="fw-bold mb-4">Customer Reviews</h2>

        <form className="d-flex flex-column gap-4">
          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
          />

          <div className="form-control d-flex align-items-center gap-2">
            <span style={{color: '#ffc107', fontSize: '1.2rem'}}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          </div>

          <textarea
            className="form-control"
            placeholder="Your Review"
            rows="4"
          ></textarea>

          <button type="submit" className="btn-neon w-100 mt-2">
            Submit Review
          </button>
        </form>

        <div className="mt-5">
          <p className="fw-bold">No reviews yet.</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;