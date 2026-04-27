import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="navbar-wrapper">
            <nav className="navbar navbar-expand-lg floating-navbar">
                <div className="container-fluid px-4">
                    <Link className="navbar-brand brand-text" to="/">
                        UrbanBite<span className="brand-dot">.</span>
                    </Link>
                    <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav align-items-center gap-3">
                            <li className="nav-item"><NavLink className="nav-link custom-link" to="/">Home</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link custom-link" to="/menu">Menu</NavLink></li>
                            {isAuthenticated && (
                                <li className="nav-item"><NavLink className="nav-link custom-link" to="/dashboard">Dashboard</NavLink></li>
                            )}
                            <li className="nav-item"><NavLink className="nav-link custom-link" to="/reviews">Reviews</NavLink></li>

                            {isAuthenticated ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="btn-neon-outline" to="/checkout">Subscribe</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn-ghost" onClick={logout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item ms-lg-3">
                                    <NavLink className="btn-neon" to="/login">Login</NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;