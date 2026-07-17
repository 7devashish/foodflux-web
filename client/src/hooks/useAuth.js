import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('foodflux_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('foodflux_token'));
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('foodflux_token'));

  const login = (tokenData, userData) => {
    localStorage.setItem('foodflux_token', tokenData);
    localStorage.setItem('foodflux_user', JSON.stringify(userData));
    setToken(tokenData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('foodflux_token');
    localStorage.removeItem('foodflux_user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout
  };
}
