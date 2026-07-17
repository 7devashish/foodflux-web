import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, HeartHandshake, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { useAuth } from '../hooks/useAuth';

// Lazy load 3D to keep initial bundle small
const HeroScene = React.lazy(() => import('../components/3d/HeroScene').then(module => ({ default: module.HeroScene })));

export function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-6">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start gap-8 z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-sm font-bold text-gray-800"
            >
              <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />
              Live in 15+ Cities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-7xl lg:text-[5rem] font-extrabold leading-[1.1] tracking-tight text-text-dark"
            >
              Connecting Surplus Food <br />
              <span className="gradient-text">With Those Who Need It.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-lg leading-relaxed"
            >
              A real-time platform ensuring perfectly good surplus food reaches local NGOs instantly, preventing waste and feeding communities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mt-4"
            >
              {isAuthenticated ? (
                <>
                  {user?.role === 'Caterer' ? (
                    <Link to="/caterer">
                      <Button variant="glow" icon={ArrowRight}>POST SURPLUS</Button>
                    </Link>
                  ) : (
                    <Link to="/ngo">
                      <Button variant="glow" icon={ArrowRight}>CLAIM FOOD</Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="glow" icon={ArrowRight}>POST SURPLUS</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline">CLAIM FOOD</Button>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex items-center gap-8 mt-8 text-sm font-bold text-gray-500 uppercase tracking-wider"
            >
              <div className="flex flex-col gap-1">
                <span className="text-3xl text-text-dark font-extrabold tracking-tighter">
                  <AnimatedCounter value={500} suffix="K+" />
                </span>
                Meals Saved
              </div>
              <div className="w-px h-12 bg-border-color" />
              <div className="flex flex-col gap-1">
                <span className="text-3xl text-text-dark font-extrabold tracking-tighter">
                  <AnimatedCounter value={200} suffix="+" />
                </span>
                Partner NGOs
              </div>
            </motion.div>
          </div>

          {/* Right 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-full flex justify-center items-center"
          >
            <Suspense fallback={
              <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-green-200 to-emerald-400 blur-3xl opacity-50 animate-pulse" />
            }>
              <HeroScene />
            </Suspense>
            
            {/* Floating Glass Stats Cards (Front Layer) */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] right-[10%] z-20"
            >
              <div className="glass-panel p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-green/20 flex items-center justify-center text-primary-green">
                  <Utensils size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase">Just Posted</p>
                  <p className="font-extrabold text-text-dark">50 Meals • MITK</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[20%] left-[10%] z-20"
            >
              <div className="glass-panel p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <HeartHandshake size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase">Just Claimed</p>
                  <p className="font-extrabold text-text-dark">By Feeding India</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold uppercase tracking-wider mb-6 inline-block">
              Why FoodFlux
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-dark">
              Built for Impact.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard delay={0.1} className="card-white">
              <div>
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-3xl mb-6">🍲</div>
                <h3 className="text-2xl font-extrabold mb-4">For Caterers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Post surplus food instantly with a few taps. Keep track of your donations, reduce your disposal costs, and help your local community.
                </p>
              </div>
            </GlassCard>

            <GlassCard delay={0.2} className="card-warm bg-orange-50/40 border-orange-200/50">
              <div>
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-3xl mb-6">💚</div>
                <h3 className="text-2xl font-extrabold mb-4">For NGOs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get real-time alerts when food becomes available near you. Claim exactly what you need and spend less time sourcing meals.
                </p>
              </div>
            </GlassCard>

            <GlassCard delay={0.3} className="card-white">
              <div>
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-3xl mb-6">📊</div>
                <h3 className="text-2xl font-extrabold mb-4">Make an Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every meal shared through FoodFlux reduces greenhouse gas emissions from landfills, creating a greener planet for tomorrow.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-panel p-16 md:p-24 rounded-[3rem] text-center flex flex-col items-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-green/10 to-transparent pointer-events-none" />
            
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-2xl text-text-dark relative z-10">
              Ready to eliminate food waste?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-xl relative z-10">
              Join thousands of caterers and NGOs making a difference every single day.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <Link to="/login">
                <Button variant="glow" icon={ArrowRight}>GET STARTED FOR FREE</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
