import React from 'react';
import { motion } from 'framer-motion';
import { cn } from './Button';

export function GlassCard({ children, className, hover = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, scale: 1.01 } : {}}
      className={cn("glass-card p-10 flex flex-col justify-between h-full", className)}
    >
      {children}
    </motion.div>
  );
}
