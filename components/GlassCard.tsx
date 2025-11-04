
import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`bg-white/5 backdrop-blur-2xl border border-white/10 rounded-4xl shadow-2xl shadow-black/20 ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
