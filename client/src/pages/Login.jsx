import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, MapPin, ChefHat, HeartHandshake, ArrowRight, Loader2 } from 'lucide-react';
import { Button, cn } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    location: '',
    role: 'caterer'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    // Capitalize role for register like original logic
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { 
          ...formData, 
          role: formData.role === 'caterer' ? 'Caterer' : 'NGO' 
        };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Use context to login
      login(data.token, data.user);
      
      // Smart routing
      if (data.user.role === 'Caterer') {
        navigate('/caterer');
      } else {
        navigate('/ngo');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-20 relative z-10">
      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Visual Side */}
        <div className="hidden md:flex flex-col gap-8 pr-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-extrabold tracking-tight leading-tight text-text-dark"
          >
            Welcome to <br />
            <span className="gradient-text">FoodFlux.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            Join thousands of caterers and NGOs working together to eliminate food waste and feed communities.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6 mt-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-green/20 flex items-center justify-center text-primary-green">
                <ChefHat size={20} />
              </div>
              <div>
                <h4 className="font-bold">For Caterers</h4>
                <p className="text-sm text-gray-500">Post surplus food instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                <HeartHandshake size={20} />
              </div>
              <div>
                <h4 className="font-bold">For NGOs</h4>
                <p className="text-sm text-gray-500">Claim food exactly when you need it</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Form Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="glass-panel p-8 md:p-12 w-full max-w-md mx-auto"
        >
          {/* Tab Switcher */}
          <div className="flex bg-white/40 p-1 rounded-full mb-8 backdrop-blur-sm border border-border-color">
            <button
              onClick={() => { setIsLogin(true); setError(null); }}
              className={cn(
                "flex-1 py-3 text-sm font-bold rounded-full transition-all duration-300",
                isLogin ? "bg-white text-text-dark shadow-sm" : "text-gray-500 hover:text-text-dark"
              )}
            >
              Log In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(null); }}
              className={cn(
                "flex-1 py-3 text-sm font-bold rounded-full transition-all duration-300",
                !isLogin ? "bg-white text-text-dark shadow-sm" : "text-gray-500 hover:text-text-dark"
              )}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="signup-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col gap-4"
                >
                  {/* Role Selection */}
                  <div className="flex gap-4 mb-2">
                    <label className={cn(
                      "flex-1 cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                      formData.role === 'caterer' ? "border-primary-green bg-primary-green/5" : "border-border-color bg-white/50 hover:bg-white"
                    )}>
                      <input type="radio" name="role" value="caterer" className="hidden" checked={formData.role === 'caterer'} onChange={handleChange} />
                      <ChefHat size={24} className={formData.role === 'caterer' ? 'text-primary-green' : 'text-gray-400'} />
                      <span className={cn("font-bold text-sm", formData.role === 'caterer' ? 'text-primary-green' : 'text-gray-500')}>Caterer</span>
                    </label>
                    <label className={cn(
                      "flex-1 cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                      formData.role === 'ngo' ? "border-primary-green bg-primary-green/5" : "border-border-color bg-white/50 hover:bg-white"
                    )}>
                      <input type="radio" name="role" value="ngo" className="hidden" checked={formData.role === 'ngo'} onChange={handleChange} />
                      <HeartHandshake size={24} className={formData.role === 'ngo' ? 'text-primary-green' : 'text-gray-400'} />
                      <span className={cn("font-bold text-sm", formData.role === 'ngo' ? 'text-primary-green' : 'text-gray-500')}>NGO</span>
                    </label>
                  </div>

                  <Input 
                    icon={User} 
                    name="name" 
                    placeholder="Organization Name" 
                    required={!isLogin} 
                    value={formData.name} 
                    onChange={handleChange} 
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      icon={Phone} 
                      name="phone" 
                      placeholder="Phone" 
                      required={!isLogin} 
                      value={formData.phone} 
                      onChange={handleChange} 
                    />
                    <Input 
                      icon={MapPin} 
                      name="location" 
                      placeholder="City" 
                      required={!isLogin} 
                      value={formData.location} 
                      onChange={handleChange} 
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Common Fields */}
            <Input 
              icon={Mail} 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              required 
              value={formData.email} 
              onChange={handleChange} 
            />
            
            <Input 
              icon={Lock} 
              type="password" 
              name="password" 
              placeholder="Password" 
              required 
              value={formData.password} 
              onChange={handleChange} 
            />

            {error && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="p-3 rounded-xl bg-red-100 text-red-700 text-sm font-semibold text-center border border-red-200"
              >
                {error}
              </motion.div>
            )}

            <Button 
              type="submit" 
              variant="glow" 
              fullWidth 
              disabled={loading}
              className="mt-4 h-[60px]"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <span className="flex items-center gap-2">
                  {isLogin ? 'Log In' : 'Create Account'}
                  <ArrowRight size={18} />
                </span>
              )}
            </Button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
