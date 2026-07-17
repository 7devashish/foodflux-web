import React from 'react';
import { cn } from './Button';
import { motion } from 'framer-motion';

export const Input = React.forwardRef(({ className, label, error, icon: Icon, ...props }, ref) => {
  return (
    <div className="w-full relative mb-5">
      {label && (
        <label className="block text-[0.85rem] font-semibold text-gray-600 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        
        <input
          ref={ref}
          className={cn(
            "w-full bg-[#fafafa]/80 backdrop-blur-sm border border-border-color rounded-2xl px-5 py-4 text-base transition-all duration-300 focus:outline-none focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-primary-green/10",
            Icon && "pl-11",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/10",
            className
          )}
          {...props}
        />
      </div>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-red-500 text-sm font-medium mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
