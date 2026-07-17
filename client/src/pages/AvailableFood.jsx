import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Scale, Utensils, AlertCircle, Loader2 } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';
import { Button, cn } from '../components/ui/Button';

export function AvailableFood() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeed = async () => {
    try {
      const response = await fetch('/api/surplus');
      if (!response.ok) throw new Error('Failed to fetch live feed');
      const data = await response.json();
      setFeed(data);
    } catch (err) {
      setError("Falling back to offline mode. Showing sample data.");
      setFeed([
        { _id: '1', foodName: 'Wedding Buffet Leftovers', quantity: 25, location: 'Prestige Hall', pickupDeadline: new Date(Date.now() + 86400000).toISOString() },
        { _id: '2', foodName: 'Dal Rice', quantity: 10, location: 'MITK', pickupDeadline: new Date(Date.now() + 172800000).toISOString() },
        { _id: '3', foodName: 'Breakfast Items', quantity: 15, location: 'Sasthana', pickupDeadline: new Date(Date.now() + 43200000).toISOString() },
        { _id: '4', foodName: 'Excess Produce', quantity: 40, location: 'Basrur', pickupDeadline: new Date(Date.now() + 259200000).toISOString() },
        { _id: '5', foodName: 'Catered Sandwiches', quantity: 30, location: 'MAHE Campus', pickupDeadline: new Date(Date.now() + 7200000).toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="w-full min-h-screen py-20 px-6 relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto pt-10">
        <SectionHeading 
          badge="Live Feed" 
          title="Available Donations" 
          description="Real-time surplus food listings ready for pickup. Login as an NGO to claim."
        />

        {error && (
          <div className="mb-8 p-4 max-w-[800px] mx-auto rounded-xl bg-orange-100 text-orange-800 border border-orange-200 flex items-center gap-3 font-semibold">
            <AlertCircle size={20} /> {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">
            <Loader2 className="w-12 h-12 animate-spin text-primary-green" />
            <p className="font-bold">Scanning for available food...</p>
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-10 px-4 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
            <AnimatePresence>
              {feed.map((post, index) => {
                const isWarm = index % 2 === 0;
                const deadline = new Date(post.pickupDeadline);

                return (
                  <motion.div
                    key={post._id}
                    layout
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="min-w-[340px] w-[340px] snap-center shrink-0 flex flex-col h-full"
                  >
                    <GlassCard 
                      className={cn(
                        "flex flex-col gap-6",
                        isWarm ? "card-warm bg-orange-50/40 border-orange-200/50" : "card-white"
                      )}
                    >
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary-green shadow-sm">
                        <Utensils size={24} />
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-xl font-extrabold mb-4 leading-tight">{post.foodName}</h3>
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

                      <div className="mt-6 pt-6 border-t border-border-color">
                        <Button 
                          variant={isWarm ? "glow" : "primary"}
                          fullWidth
                          onClick={() => alert("Please Login as an NGO to claim food!")}
                        >
                          CLAIM FOOD
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
