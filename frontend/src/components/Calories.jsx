import React from 'react';
import { useNavigate } from 'react-router-dom';

const Calories = () => {
  const navigate = useNavigate();

  const calorieData = [
    { name: 'Rajma Chawal', calories: '350 kcal', tags: 'Diabetes, High Protein Diet' },
    { name: 'Jeera Aloo', calories: '180 kcal', tags: 'Weight Gain' },
    { name: 'Mix Veg', calories: '150 kcal', tags: 'Diabetes, Weight Loss' },
    { name: 'Dal Fry', calories: '200 kcal', tags: 'High Protein Diet' },
    { name: 'Paneer Butter Masala', calories: '400 kcal', tags: 'Weight Gain' },
    { name: 'Kadi Pakoda', calories: '320 kcal', tags: 'Weight Gain' }
  ];

  return (
    <div className="calories-bg">
    <div className="container py-5 min-vh-100">
      <div className="text-center mb-5">
        <h2 className="fw-bold fs-1 mb-3">
          Calories <span className="text-lime">Info</span>
        </h2>
      </div>

      <div className="alert alert-warning text-center mx-auto mb-4" style={{ maxWidth: '800px' }}>
         Using offline calorie data
      </div>

      <div className="glass-card mx-auto p-4" style={{ maxWidth: '800px' }}>
        {calorieData.map((item, index) => (
          <div key={index} className="d-flex justify-content-between align-items-center py-4 border-bottom border-secondary">
            <div>
              <h5 className="fw-bold mb-1">{item.name}</h5>
              <span className="text-lime small">Recommended for: {item.tags}</span>
            </div>
            <div className="fw-bold fs-5">{item.calories}</div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <button className="btn-neon-outline px-5" onClick={() => navigate("/menu")}>
          Back to Menu
        </button>
      </div>
    </div>
    </div>
  );
};

export default Calories;