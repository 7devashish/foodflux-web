import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Read from localStorage on mount
    const storedUser = localStorage.getItem('foodflux_user');
    const storedToken = localStorage.getItem('foodflux_token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

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
