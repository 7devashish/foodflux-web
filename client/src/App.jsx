import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AnimatedBackground } from './components/layout/AnimatedBackground';
import { PageTransition } from './components/layout/PageTransition';

// Hooks
import { useAuth } from './hooks/useAuth';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Caterer } from './pages/Caterer';
import { NGODashboard } from './pages/NGODashboard';
import { AvailableFood } from './pages/AvailableFood';
import { About } from './pages/About';
import { Impact } from './pages/Impact';
import { GetInvolved } from './pages/GetInvolved';
import { Profile } from './pages/Profile';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = window.location;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedBackground />
      <Navbar />
      
      <main className="flex-grow flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/caterer" element={<ProtectedRoute><PageTransition><Caterer /></PageTransition></ProtectedRoute>} />
            <Route path="/ngo" element={<ProtectedRoute><PageTransition><NGODashboard /></PageTransition></ProtectedRoute>} />
            <Route path="/available-food" element={<PageTransition><AvailableFood /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/impact" element={<PageTransition><Impact /></PageTransition>} />
            <Route path="/involved" element={<PageTransition><GetInvolved /></PageTransition>} />
            <Route path="/profile" element={<ProtectedRoute><PageTransition><Profile /></PageTransition></ProtectedRoute>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
