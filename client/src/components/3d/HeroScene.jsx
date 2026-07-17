import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function HeroScene() {
  const containerRef = useRef(null);
  
  // Motion values for raw mouse position (-1 to 1)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth them out using springs for that premium buttery feel
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Transform raw -1..1 values to 3D rotation degrees
  const rotateX = useTransform(smoothY, [-1, 1], [25, -25]); // tilt up/down
  const rotateY = useTransform(smoothX, [-1, 1], [-25, 25]); // tilt left/right
  
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize to -1 to 1
    x.set((mouseX / rect.width) * 2 - 1);
    y.set((mouseY / rect.height) * 2 - 1);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="w-full h-[500px] md:h-[600px] relative z-10 flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full flex items-center justify-center relative cursor-grab active:cursor-grabbing"
      >
        {/* Bobbing wrapper so tilt and float animations don't fight */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-full h-full flex items-center justify-center relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Floor Shadow */}
          <motion.div 
            animate={{ scale: [1, 0.85, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-8 w-[50%] h-12 bg-black/60 rounded-[100%] blur-2xl"
          />

          {/* Magical Glow behind the bowl */}
          <div 
            className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-green-400/40 to-emerald-300/40 rounded-full blur-[80px]" 
            style={{ transform: "translateZ(-50px)" }} 
          />
          
          {/* The Salad Image */}
          <div 
            className="relative w-[80%] md:w-[90%] max-w-[500px] aspect-square flex items-center justify-center" 
            style={{ transform: "translateZ(80px)" }}
          >
            <img 
              src="/salad.png" 
              alt="3D Salad Bowl" 
              className="w-full h-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.4)] z-10"
              onError={(e) => {
                // Helpful placeholder if the image hasn't been saved yet
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden absolute inset-0 flex-col items-center justify-center text-center p-8 border-2 border-dashed border-primary-green/50 rounded-full bg-white/20 backdrop-blur-md shadow-xl">
              <span className="text-5xl mb-4">🥗</span>
              <h3 className="text-lg font-extrabold text-text-dark mb-2">Image Missing!</h3>
              <p className="text-sm font-bold text-gray-700">
                Please save your transparent image as:<br/>
                <code className="text-primary-green bg-white/80 px-3 py-1.5 rounded-lg mt-3 block shadow-sm">client/public/salad.png</code>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
