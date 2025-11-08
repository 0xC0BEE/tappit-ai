
// Fix: Remove redundant triple-slash directive for React types.
import * as React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-lg ${className}`}>
            {children}
        </div>
    );
};

export default GlassCard;