import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center py-5 min-vh-100">
      <div className="glass-card p-5 w-100" style={{ maxWidth: '450px' }}>
        <h2 className="fw-bold text-center mb-5">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-register mt-2">
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-muted small">
          New here? <Link to="/#register" className="text-lime text-decoration-none">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;