import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { Button } from '../components/ui/Button';

export function Impact() {
  return (
    <div className="w-full min-h-screen py-20 px-6 relative z-10 flex flex-col items-center justify-center text-center">
      <SectionHeading 
        badge="Our Impact" 
        title={<>Together, We're Making <br/> A Difference</>}
      />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="my-10"
      >
        <h1 className="text-[6rem] md:text-[10rem] font-extrabold text-primary-green leading-none tracking-tighter text-glow drop-shadow-xl">
          <AnimatedCounter value={100} duration={3} />
        </h1>
        <h3 className="text-2xl font-bold text-text-dark mt-4">Meals Redistributed</h3>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          Every dish shared through FoodFlux prevents waste and supports local communities in need.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/login">
          <Button variant="glow" icon={ArrowRight}>DONATE FOOD NOW</Button>
        </Link>
      </motion.div>
    </div>
  );
}
