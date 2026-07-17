import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Button({ 
  children, 
  variant = 'primary', 
  className, 
  icon: Icon,
  fullWidth,
  ...props 
}) {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-300 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary-green text-white hover:bg-primary-green-hover focus:ring-primary-green",
    outline: "border border-border-color bg-transparent text-text-dark hover:bg-white focus:ring-gray-200",
    glow: "bg-primary-green text-white hover:bg-primary-green-hover glow-green focus:ring-primary-green",
    ghost: "bg-transparent text-gray-600 hover:text-text-dark hover:bg-gray-100 focus:ring-gray-200"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], fullWidth && "w-full", className)}
      {...props}
    >
      {/* Ripple effect overlay */}
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && <Icon className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
      </span>
    </motion.button>
  );
}
