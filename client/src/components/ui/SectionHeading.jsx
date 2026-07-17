import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { cn } from './Button';

export function SectionHeading({ badge, title, description, align = 'center', className }) {
  const alignments = {
    center: 'text-center items-center',
    left: 'text-left items-start',
    right: 'text-right items-end'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={cn("flex flex-col mb-16", alignments[align], className)}
    >
      {badge && <Badge variant="neutral" className="mb-6">{badge}</Badge>}
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-text-dark">
        {title}
      </h2>
      
      {description && (
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
