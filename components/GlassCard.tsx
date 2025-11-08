import * as React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', style }) => {
    return (
        <div 
            style={style}
            className={`bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-lg ${className}`}
        >
            {children}
        </div>
    );
};

export default GlassCard;
