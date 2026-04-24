import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCalories } from "../services/api";

// Fallback data matching original frontend (used if API fails)
const fallbackCaloriesData = {
  "Rajma Chawal": { calories: 350, recommendedFor: ["Diabetes", "High Protein Diet"] },
  "Jeera Aloo": { calories: 180, recommendedFor: ["Weight Gain"] },
  "Mix Veg": { calories: 150, recommendedFor: ["Diabetes", "Weight Loss"] },
  "Dal Fry": { calories: 200, recommendedFor: ["High Protein Diet"] },
  "Paneer Butter Masala": { calories: 400, recommendedFor: ["Weight Gain"] },
  "Kadi Pakoda": { calories: 320, recommendedFor: ["Energy Boost"] }
};

const Calories = () => {
  const [caloriesData, setCaloriesData] = useState(fallbackCaloriesData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCalories()
      .then((data) => {
        setCaloriesData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Using offline calorie data");
        setCaloriesData(fallbackCaloriesData);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">🔥 Calories Info</h2>

      {error && (
        <div className="alert alert-warning text-center py-1 mb-3">
          <small>⚠️ {error}</small>
        </div>
      )}

      <div className="card shadow rounded-4 p-4">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          Object.entries(caloriesData).map(([item, data]) => (
            <div key={item} className="border-bottom py-3">
              <div className="d-flex justify-content-between fw-bold">
                <span>{item}</span>
                <span>{data.calories} kcal</span>
              </div>
              <div className="mt-1">
                <small className="text-muted">
                  ✅ Recommended for:{" "}
                  {Array.isArray(data.recommendedFor)
                    ? data.recommendedFor.join(", ")
                    : data.recommendedFor}
                </small>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="text-center mt-4">
        <Link to="/menu" className="btn btn-outline-primary">
          ⬅ Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default Calories;
