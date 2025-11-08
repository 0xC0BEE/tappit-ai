import * as React from 'react';
import GlassCard from '../GlassCard.tsx';

interface StatCardProps {
    title: string;
    value: string | number;
    change: number;
    previousValue: number;
    icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, previousValue, icon: Icon }) => {
    const isPositive = change >= 0;
    const percentageChange = previousValue !== 0 ? ((change / Math.abs(previousValue)) * 100).toFixed(0) : '0';

    return (
        <GlassCard className="p-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-400">{title}</p>
                    <p className="text-2xl font-bold text-white">{value}</p>
                </div>
                <div className="p-3 bg-white/10 rounded-full">
                    <Icon className="w-6 h-6 text-bamboo-7" />
                </div>
            </div>
            <div className="mt-3 text-sm flex items-center">
                <span className={`font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? '↑' : '↓'} {Math.abs(parseFloat(percentageChange))}%
                </span>
                <span className="text-gray-400 ml-1">vs last period</span>
            </div>
        </GlassCard>
    );
};

export default StatCard;