import * as React from 'react';

const LoadingSkeleton: React.FC = () => {
    return (
        <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-lg p-4 w-full animate-pulse">
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-white/10"></div>
                <div className="flex-grow space-y-3">
                    <div className="w-3/4 h-4 bg-white/10 rounded"></div>
                    <div className="w-1/2 h-3 bg-white/10 rounded"></div>
                    <div className="w-1/3 h-3 bg-white/10 rounded"></div>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-lg"></div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;