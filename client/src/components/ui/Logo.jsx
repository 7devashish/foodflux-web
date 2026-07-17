import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from './Button';

export function Logo({ className, size = 'default' }) {
  const isSmall = size === 'small';
  
  return (
    <Link to="/" className={cn("flex items-center gap-3 group text-text-dark", className)}>
      <img 
        src="/assets/foodflux-logo.png" 
        alt="FoodFlux Logo" 
        className={cn(
          "object-cover transition-all duration-300 group-hover:scale-105",
          "shadow-lg shadow-primary-green/20 group-hover:shadow-primary-green/40 ring-1 ring-black/5",
          isSmall ? "w-8 h-8 rounded-[10px]" : "w-11 h-11 rounded-2xl"
        )}
      />
      
      {/* The Wordmark */}
      <span className={cn(
        "font-extrabold tracking-tight transition-colors",
        isSmall ? "text-lg" : "text-xl text-text-dark group-hover:text-text-dark"
      )}>
        Food<span className="text-primary-green group-hover:text-emerald-500 transition-colors">Flux</span>
      </span>
    </Link>
  );
}
