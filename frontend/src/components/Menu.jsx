import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getMenuByDay } from '../services/api';

const Menu = () => {
  const navigate = useNavigate();
  const [CurrentDay, setCurrentDay] = useState('Monday');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [currentMenu, setCurrentMenu] = useState({ lunch: '', dinner: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fallback data matching original frontend (used if API fails)
  const fallbackMenu = {
    Monday: { lunch: "Rajma Chawal + Jeera Aloo", dinner: "Mix Veg + 4 Rotis + Dal Fry" },
    Tuesday: { lunch: "Kadi Pakoda + Rice", dinner: "Paneer Butter Masala + Naan" },
    Wednesday: { lunch: "Chole Kulche", dinner: "Egg Curry / Malai Kofta + Rice" },
  };

  // Fetch menu from backend whenever day changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    getMenuByDay(CurrentDay)
      .then((data) => {
        setCurrentMenu(data);
        setLoading(false);
      })
      .catch(() => {
        // Graceful fallback to hardcoded data
        const fallback = fallbackMenu[CurrentDay] || { lunch: "Menu not available", dinner: "Menu not available" };
        setCurrentMenu(fallback);
        setError('Using offline menu data');
        setLoading(false);
      });
  }, [CurrentDay]);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">📅 Weekly Planner</h2>
      
      <ul className="nav nav-pills justify-content-center mb-4">
        {days.map(day => (
          <li className="nav-item" key={day}>
            <button 
              className={`nav-link ${CurrentDay === day ? 'active' : ''}`}
              onClick={() => setCurrentDay(day)}
            >
              {day}
            </button>
          </li>
        ))}
      </ul>

      {error && (
        <div className="alert alert-warning text-center py-1 mb-3" role="alert">
          <small>⚠️ {error}</small>
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0 rounded-4">
            <div className="card-body p-5 text-center">
              <h3 className="text-success mb-4">{CurrentDay}'s Special</h3>
              
              {loading ? (
                <div className="py-4">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="row g-4">
                  <div className="col-md-6 border-end">
                    <div className="p-3">
                      <span className="fs-1">☀️</span>
                      <h5 className="fw-bold mt-2">Lunch</h5>
                      <p className="text-muted">{currentMenu.lunch}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3">
                      <span className="fs-1">🌙</span>
                      <h5 className="fw-bold mt-2">Dinner</h5>
                      <p className="text-muted">{currentMenu.dinner}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
        <div className="text-center mt-4">
      <button className="btn btn-warning rounded-pill px-4" onClick={() => navigate("/calories")} >
        🔥 View Calories
      </button>
    </div>
      </div>
    </div>
  );
};

export default Menu;