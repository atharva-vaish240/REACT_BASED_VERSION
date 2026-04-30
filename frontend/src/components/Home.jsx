import React, { useState } from 'react';
import { Modal } from 'bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { register, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: '', plan: '', foodType: ''
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.plan) {
            setAlertMessage({ type: 'danger', text: 'Please fill out all fields!' });
            return;
        }
        setLoading(true);
        try {
            await register(formData);
            const modalElement = document.getElementById('successModal');
            const successModal = new Modal(modalElement);
            successModal.show();
            setAlertMessage(null);
        } catch (err) {
            setAlertMessage({ type: 'danger', text: err.message || 'Registration failed. Try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {alertMessage && (
                <div className={`alert alert-${alertMessage.type} alert-dismissible fade show fixed-top w-75 mx-auto mt-3`} style={{ zIndex: 2000 }}>
                    {alertMessage.text}
                    <button type="button" className="btn-close" onClick={() => setAlertMessage(null)}></button>
                </div>
            )}

            <section>
                <div id="foodCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#foodCarousel" data-bs-slide-to="0" className="active"></button>
                        <button type="button" data-bs-target="#foodCarousel" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#foodCarousel" data-bs-slide-to="2"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=500&fit=crop" className="d-block w-100 carousel-img" alt="Fresh healthy meals" />
                            <div className="carousel-caption d-none d-md-block">
                                <h2 className="fw-bold">Fuel Your Hustle</h2>
                                <p>Chef-crafted, macro-balanced meals delivered hot to your door.</p>
                                <a href="#register" className="btn-neon">Start Now</a>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=500&fit=crop" className="d-block w-100 carousel-img" alt="Delicious food" />
                            <div className="carousel-caption d-none d-md-block">
                                <h2 className="fw-bold">Fresh Food, Daily</h2>
                                <p>No prep, no cleanup, just pure performance.</p>
                                <a href="/menu" className="btn-neon">View Menu</a>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&h=500&fit=crop" className="d-block w-100 carousel-img" alt="Tasty breakfast" />
                            <div className="carousel-caption d-none d-md-block">
                                <h2 className="fw-bold">Premium Tiffin Service</h2>
                                <p>500+ active foodies trust UrbanBite.</p>
                                <a href="#register" className="btn-neon">Join Now</a>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#foodCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#foodCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </section>

            <section id="register" className="register-container">
                <div className="register-card">
                    <div className="register-visual d-none d-md-flex flex-column justify-content-between">
                        <div>
                            <h2 className="register-title">Join The <br/>Club.</h2>
                            <p className="text-muted mt-3">Access exclusive weekly menus and track your nutrition.</p>
                        </div>
                        <div className="stats-box">
                            <h3 className="text-lime m-0">500+</h3>
                            <p className="m-0 text-muted small">Active Foodies</p>
                        </div>
                    </div>

                    <div className="register-form-area">
                        {isAuthenticated ? (
                            <div className="glass-alert text-center">
                                <h4 className="mt-3">You're in!</h4>
                                <a href="/dashboard" className="btn-neon mt-3 d-inline-block">Go to Dashboard</a>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="row g-3">
                                <div className="col-12">
                                    <input type="text" className="form-control" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                                </div>
                                <div className="col-md-6">
                                    <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                                </div>
                                <div className="col-12">
                                    <input type="password" className="form-control" name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} />
                                </div>
                                <div className="col-md-6">
                                    <select className="form-select" name="plan" value={formData.plan} onChange={handleChange}>
                                        <option value="">Select Plan</option>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <select className="form-select" name="foodType" value={formData.foodType} onChange={handleChange}>
                                        <option value="">Food Preference</option>
                                        <option value="Veg">Veg</option>
                                        <option value="Non-Veg">Non-Veg</option>
                                        <option value="Both">Both</option>
                                    </select>
                                </div>
                                <div className="col-12 mt-4">
                                    <button type="submit" className="btn-register" disabled={loading}>
                                        {loading ? 'Subscribing...' : 'Access Now'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <div className="modal fade" id="successModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center p-5">
                            <h3>Welcome, {formData.name || 'Foodie'}!</h3>
                            <p className="text-muted">Your {formData.plan} plan is active.</p>
                            <button type="button" className="btn-neon w-100 mt-4" data-bs-dismiss="modal" onClick={() => navigate('/dashboard')}>
                                Enter Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;