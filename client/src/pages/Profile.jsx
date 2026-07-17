import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon, Mail, Activity, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="w-full min-h-screen py-20 px-6 relative z-10">
      <div className="max-w-[800px] mx-auto pt-10">
        <SectionHeading 
          badge="My Profile" 
          title="Account Details"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="card-white overflow-hidden p-0">
            {/* Header / Avatar area */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-10 flex flex-col items-center border-b border-border-color relative">
              <div className="absolute top-6 right-6">
                <span className="px-4 py-1.5 bg-white rounded-full text-xs font-bold uppercase tracking-wider text-text-dark shadow-sm">
                  {user.role}
                </span>
              </div>
              
              <div className="w-24 h-24 rounded-full bg-primary-green flex items-center justify-center text-white text-4xl font-extrabold shadow-[0_0_20px_rgba(45,204,112,0.4)] mb-4">
                {user.name.charAt(0).toUpperCase()}
              </div>
              
              <h2 className="text-3xl font-extrabold text-text-dark">{user.name}</h2>
              <p className="text-gray-500 font-medium mt-1">FoodFlux Member</p>
            </div>

            {/* Details List */}
            <div className="p-10 flex flex-col gap-6">
              <div className="flex items-center justify-between pb-6 border-b border-border-color">
                <div className="flex items-center gap-4 text-gray-500 font-semibold">
                  <Mail size={20} />
                  Email Address
                </div>
                <div className="font-bold text-text-dark">
                  {user.email || 'No email provided'}
                </div>
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-border-color">
                <div className="flex items-center gap-4 text-gray-500 font-semibold">
                  <ShieldCheck size={20} />
                  Platform Status
                </div>
                <div className="font-bold text-primary-green flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />
                  Active Account
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="w-full md:w-auto text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 focus:ring-red-100"
                  icon={LogOut}
                >
                  LOG OUT
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
