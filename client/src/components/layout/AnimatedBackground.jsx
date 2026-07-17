import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base gradient mesh */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply filter blur-3xl">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-200/40"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            x: [0, -60, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-teal-100/40"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 40, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] rounded-full bg-green-100/40"
        />
      </div>
      
      {/* Noise texture overlay for premium feel */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
