import React from 'react';
import { cn } from './Button';

export function Badge({ children, variant = 'success', className }) {
  const variants = {
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    neutral: 'bg-white text-gray-800 border-border-color',
    dark: 'bg-gray-800 text-white border-gray-700',
  };

  return (
    <span className={cn(
      "inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
