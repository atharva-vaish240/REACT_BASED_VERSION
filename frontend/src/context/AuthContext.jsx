import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getProfile } from '../services/api';

/**
 * Auth context — provides user state, login, register, logout
 * to the entire component tree.
 */
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('urbanbite_token'));
  const [loading, setLoading] = useState(true);

  // On mount, if token exists, fetch user profile
  useEffect(() => {
    if (token) {
      getProfile()
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch(() => {
          // Token expired or invalid — clear
          localStorage.removeItem('urbanbite_token');
          localStorage.removeItem('urbanbite_user');
          setToken(null);
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  /**
   * Login with email/password, store JWT.
   */
  const login = async (email, password) => {
    const data = await loginUser(email, password);
    localStorage.setItem('urbanbite_token', data.token);
    localStorage.setItem('urbanbite_user', JSON.stringify(data));
    setToken(data.token);
    setUser(data);
    return data;
  };

  /**
   * Register (subscribe) a new user, auto-login after success.
   */
  const register = async (formData) => {
    const data = await registerUser(formData);
    localStorage.setItem('urbanbite_token', data.token);
    localStorage.setItem('urbanbite_user', JSON.stringify(data));
    setToken(data.token);
    setUser(data);
    return data;
  };

  /**
   * Logout — clear token and user state.
   */
  const logout = () => {
    localStorage.removeItem('urbanbite_token');
    localStorage.removeItem('urbanbite_user');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token && !!user;

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
