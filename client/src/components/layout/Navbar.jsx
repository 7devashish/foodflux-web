import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../ui/Button';
import { Logo } from '../ui/Logo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Who We Are', path: '/about' },
    { name: 'Get Involved', path: '/involved' },
    { name: 'Available Food', path: isAuthenticated && user?.role === 'Caterer' ? null : (isAuthenticated ? '/ngo' : '/available-food') },
    { name: 'Donate Food', path: isAuthenticated && user?.role === 'Caterer' ? '/caterer' : null },
  ].filter(link => link.path !== null);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-4" : "py-6"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className={cn(
            "flex items-center justify-between transition-all duration-500 rounded-full px-6",
            scrolled ? "bg-white/70 backdrop-blur-md shadow-sm border border-white/40 py-3" : "py-2"
          )}>
            {/* Logo */}
            <Logo />

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-sm font-bold tracking-wide uppercase transition-colors hover:text-primary-green",
                    location.pathname === link.path ? "text-primary-green" : "text-gray-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-color hover:bg-white transition-colors font-bold text-sm"
                >
                  <User size={16} />
                  MY PROFILE
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 rounded-full bg-text-dark text-white font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                  LOGIN / JOIN
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-text-dark p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg-cream/95 backdrop-blur-lg pt-32 px-6 pb-6 flex flex-col md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-extrabold tracking-tight">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "transition-colors",
                    location.pathname === link.path ? "text-primary-green" : "text-text-dark"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-auto pt-10">
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-full border border-border-color font-bold text-lg"
                >
                  <User size={20} />
                  MY PROFILE
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex justify-center w-full py-4 rounded-full bg-text-dark text-white font-bold text-lg"
                >
                  LOGIN / JOIN
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
