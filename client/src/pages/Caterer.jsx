import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, MapPin, Clock, Scale, CheckCircle, Loader2 } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useAuth } from '../hooks/useAuth';

export function Caterer() {
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    foodName: '',
    quantity: '',
    location: user?.location || '', // Pre-fill with user's location
    pickupDeadline: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/surplus', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          quantity: Number(formData.quantity)
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to post food');
      }

      setSuccess(true);
      setFormData({
        foodName: '',
        quantity: '',
        location: user?.location || '',
        pickupDeadline: ''
      });

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[90vh] py-20 px-6 relative z-10">
      <div className="max-w-[800px] mx-auto">
        <SectionHeading 
          badge="Caterer Portal" 
          title="Post Surplus Food" 
          description="Fill out the details below to notify local NGOs instantly about available food."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 md:p-12 relative overflow-hidden"
        >
          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 left-0 right-0 p-4 bg-emerald-500/90 backdrop-blur-md text-white font-bold text-center flex items-center justify-center gap-2 z-20"
            >
              <CheckCircle size={20} />
              Food posted successfully! NGOs have been notified.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
            <Input 
              icon={Utensils}
              label="What food is available?"
              name="foodName"
              placeholder="e.g., 5 trays of vegetable lasagna, rice"
              required
              value={formData.foodName}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                icon={Scale}
                type="number"
                label="Quantity (Meals/KG)"
                name="quantity"
                placeholder="e.g., 50"
                min="1"
                required
                value={formData.quantity}
                onChange={handleChange}
              />
              <Input 
                icon={MapPin}
                label="Pickup Location"
                name="location"
                placeholder="e.g., MITK Hall A"
                required
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <Input 
              icon={Clock}
              type="datetime-local"
              label="Pickup Deadline"
              name="pickupDeadline"
              required
              value={formData.pickupDeadline}
              onChange={handleChange}
            />

            {error && (
              <div className="p-3 mt-4 rounded-xl bg-red-100 text-red-700 text-sm font-semibold text-center border border-red-200">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              variant="glow" 
              className="mt-8 h-[60px]"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : "NOTIFY NGOs"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
