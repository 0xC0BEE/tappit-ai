import React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import GlassCard from '../GlassCard.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import { ZapIcon, UsersIcon, LeafIcon } from '../icons.tsx';

const AITeamInsights: React.FC = () => {
    return (
        <GlassCard className="p-4">
            <h2 className="text-xl font-bold text-white mb-4">AI Team Insights</h2>
            <div className="space-y-3">
                <InsightItem 
                    icon={ZapIcon} 
                    text="Dwight Schrute is your top performer this week with 45 new connections." 
                />
                <InsightItem 
                    icon={UsersIcon}
                    text="Your team's average lead score has increased by 12% this month."
                />
                <InsightItem 
                    icon={LeafIcon}
                    text="Your team collectively saved 10.8g of CO₂ this week. Go green!"
                />
            </div>
        </GlassCard>
    );
};

interface InsightItemProps {
    icon: React.ElementType;
    text: string;
}

const InsightItem: React.FC<InsightItemProps> = ({ icon: Icon, text }) => (
    <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 text-bamboo-8 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">{text}</p>
    </div>
);

export default AITeamInsights;
