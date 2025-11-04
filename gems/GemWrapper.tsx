import React, { ReactNode } from 'react';

interface GemWrapperProps {
    title: string;
    description: string;
    children: ReactNode;
}

const GemWrapper: React.FC<GemWrapperProps> = ({ title, description, children }) => (
    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        <div>{children}</div>
    </div>
);

export default GemWrapper;
