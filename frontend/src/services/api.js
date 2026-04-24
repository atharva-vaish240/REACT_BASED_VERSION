/**
 * Centralized API service for UrbanBite frontend.
 * All backend calls go through this module.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

/**
 * Helper: make an authenticated fetch request with JWT token.
 */
async function authFetch(endpoint, options = {}) {
  const token = localStorage.getItem('urbanbite_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // If 401/403, token may be expired — clear auth
  if (response.status === 401 || response.status === 403) {
    // Don't clear for login/register attempts
    if (!endpoint.includes('/auth/')) {
      localStorage.removeItem('urbanbite_token');
      localStorage.removeItem('urbanbite_user');
    }
  }

  return response;
}

// ========================
// Auth API
// ========================

/**
 * Register a new subscriber. Called from the "Join UrbanBite" form.
 */
export async function registerUser(data) {
  const res = await authFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Registration failed');
  return json;
}

/**
 * Login with email and password.
 */
export async function loginUser(email, password) {
  const res = await authFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Login failed');
  return json;
}

/**
 * Get the current authenticated user's profile.
 */
export async function getProfile() {
  const res = await authFetch('/auth/me');
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

// ========================
// Menu API
// ========================

/**
 * Get menu for a specific day.
 * Returns: { lunch: "...", dinner: "..." }
 */
export async function getMenuByDay(day) {
  const res = await fetch(`${API_BASE}/menu?day=${encodeURIComponent(day)}`);
  if (!res.ok) throw new Error('Failed to fetch menu');
  return res.json();
}

/**
 * Get full weekly menu.
 * Returns: { Monday: { lunch, dinner }, Tuesday: {...}, ... }
 */
export async function getFullMenu() {
  const res = await fetch(`${API_BASE}/menu/all`);
  if (!res.ok) throw new Error('Failed to fetch full menu');
  return res.json();
}

// ========================
// Calories API
// ========================

/**
 * Get all calorie info.
 * Returns: { "Item Name": { calories: 350, recommendedFor: [...] }, ... }
 */
export async function getCalories() {
  const res = await fetch(`${API_BASE}/calories`);
  if (!res.ok) throw new Error('Failed to fetch calorie data');
  return res.json();
}

// ========================
// Reviews API
// ========================

/**
 * Get all reviews (newest first).
 */
export async function getReviews() {
  const res = await fetch(`${API_BASE}/reviews`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

/**
 * Submit a new review.
 */
export async function postReview(data) {
  const res = await authFetch('/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to submit review');
  return json;
}

// ========================
// Orders API (authenticated)
// ========================

/**
 * Place a new subscription order.
 */
export async function createOrder(data) {
  const res = await authFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to create order');
  return json;
}

/**
 * Get current user's order history.
 */
export async function getOrders() {
  const res = await authFetch('/orders');
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}
