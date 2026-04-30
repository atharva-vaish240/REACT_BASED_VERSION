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

  const fallbackMenu = {
    Monday: { lunch: "Rajma Chawal + Jeera Aloo", dinner: "Mix Veg + 4 Rotis + Dal Fry" },
    Tuesday: { lunch: "Kadi Pakoda + Rice", dinner: "Paneer Butter Masala + Naan" },
    Wednesday: { lunch: "Chole Kulche", dinner: "Egg Curry / Malai Kofta + Rice" },
  };

  useEffect(() => {
    setLoading(true);
    getMenuByDay(CurrentDay)
      .then(data => setCurrentMenu(data))
      .catch(() => {
        setCurrentMenu(fallbackMenu[CurrentDay] || { lunch: "Not available", dinner: "Not available" });
        setError('Displaying offline menu');
      })
      .finally(() => setLoading(false));
  }, [CurrentDay]);

  return (
    <div className="menu-bg">
    <div className="container py-5 min-vh-100">
      <div className="text-center mb-5">
        <h2 className="fw-bold fs-1 mb-3">Weekly <span className="text-lime">Menu</span></h2>
        <p className="text-muted">Know what's fueling you this week.</p>
      </div>

      <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
        {days.map(day => (
          <button
            key={day}
            className={`btn-day ${CurrentDay === day ? 'active' : ''}`}
            onClick={() => setCurrentDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {error && <div className="custom-alert mb-4 text-center mx-auto alert alert-info" style={{ maxWidth: '500px' }}>{error}</div>}

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="glass-card menu-card p-5">
            <h3 className="text-lime text-center mb-5 border-bottom border-secondary pb-3">{CurrentDay}</h3>

            {loading ? (
              <div className="text-center py-5 text-lime">Loading...</div>
            ) : (
              <div className="row g-5">
                <div className="col-md-6 d-flex flex-column align-items-center text-center menu-divider">
                  <h5 className="fw-bold text-uppercase">Lunch</h5>
                  <p className="text-muted fs-5 mt-2">{currentMenu.lunch}</p>
                </div>
                <div className="col-md-6 d-flex flex-column align-items-center text-center">
                  <h5 className="fw-bold text-uppercase">Dinner</h5>
                  <p className="text-muted fs-5 mt-2">{currentMenu.dinner}</p>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-5">
            <button className="btn-neon-outline px-5" onClick={() => navigate("/calories")}>
              Analyze Macros
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Menu;