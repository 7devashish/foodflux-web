import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Scale, Utensils, AlertCircle, Loader2 } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';
import { Button, cn } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export function NGODashboard() {
  const { token } = useAuth();
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [claimingId, setClaimingId] = useState(null);

  const fetchFeed = async () => {
    try {
      const response = await fetch('/api/surplus', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch live feed');
      const data = await response.json();
      setFeed(data);
    } catch (err) {
      setError("Falling back to offline mode. Showing sample data.");
      // Dummy data fallback matching original logic
      setFeed([
        { _id: '1', foodName: 'Wedding Buffet Leftovers', quantity: 25, location: 'Prestige Hall', pickupDeadline: new Date(Date.now() + 86400000).toISOString() },
        { _id: '2', foodName: 'Dal Rice', quantity: 10, location: 'MITK', pickupDeadline: new Date(Date.now() + 172800000).toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
    // Poll every 30 seconds for live updates
    const interval = setInterval(fetchFeed, 30000);
    return () => clearInterval(interval);
  }, []);

  const claimFood = async (id) => {
    if (!window.confirm("Are you sure you want to claim this food? You must arrange pickup before the deadline.")) return;
    
    setClaimingId(id);
    try {
      const response = await fetch(`/api/surplus/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        // Optimistically remove from UI
        setFeed(prev => prev.filter(item => item._id !== id));
        alert("Successfully claimed! Please proceed to the pickup location.");
      } else {
        alert("Failed to claim food. It may have already been claimed.");
      }
    } catch (err) {
      alert("Error claiming food. Please check your connection.");
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <div className="w-full min-h-screen py-20 px-6 relative z-10">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading 
          badge="Live Feed" 
          title="Available Donations" 
          description="Real-time surplus food listings ready for pickup."
        />

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-orange-100 text-orange-800 border border-orange-200 flex items-center gap-3 font-semibold">
            <AlertCircle size={20} /> {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">
            <Loader2 className="w-12 h-12 animate-spin text-primary-green" />
            <p className="font-bold">Scanning for available food...</p>
          </div>
        ) : feed.length === 0 ? (
          <div className="glass-panel p-20 text-center flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-4xl mb-6 shadow-inner">
              📭
            </div>
            <h3 className="text-2xl font-extrabold text-text-dark mb-2">No donations available right now</h3>
            <p className="text-gray-500">Check back later or turn on push notifications.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {feed.map((post, index) => {
                const isWarm = index % 2 === 0;
                const deadline = new Date(post.pickupDeadline);
                const isUrgent = deadline.getTime() - Date.now() < 3600000; // Less than 1 hour

                return (
                  <motion.div
                    key={post._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlassCard 
                      className={cn(
                        "flex flex-col gap-6",
                        isWarm ? "card-warm bg-orange-50/40 border-orange-200/50" : "card-white"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary-green shadow-sm">
                          <Utensils size={24} />
                        </div>
                        {isUrgent && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase">
                            Urgent Pickup
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-2xl font-extrabold mb-4 leading-tight">{post.foodName}</h3>
                        <div className="space-y-3 text-sm text-gray-700 font-medium">
                          <div className="flex items-center gap-3">
                            <Scale size={18} className="text-gray-400" />
                            {post.quantity} kg/meals
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin size={18} className="text-gray-400" />
                            {post.location}
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock size={18} className="text-gray-400" />
                            {deadline.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto pt-6">
                        <Button 
                          variant={isWarm ? "glow" : "primary"}
                          fullWidth
                          onClick={() => claimFood(post._id)}
                          disabled={claimingId === post._id}
                        >
                          {claimingId === post._id ? <Loader2 className="animate-spin" /> : "CLAIM FOOD"}
                        </Button>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
