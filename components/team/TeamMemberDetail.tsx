import React from 'react';
import { TeamMember } from '../../types.ts';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { ZapIcon, NetworkIcon, TrendingUpIcon } from '../icons.tsx';

interface TeamMemberDetailProps {
    member: TeamMember;
    onBack: () => void;
}

const TeamMemberDetail: React.FC<TeamMemberDetailProps> = ({ member, onBack }) => {
    return (
        <div className="animate-scaleIn h-full flex flex-col gap-8">
            <header className="flex items-center space-x-4">
                 <HapticButton onClick={onBack} className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20">
                    &larr;
                </HapticButton>
                <div>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                        {member.name}
                    </h1>
                    <p className="text-gray-300 text-lg mt-2">{member.role}</p>
                </div>
            </header>

            <GlassCard className="p-6 flex-grow">
                <div className="flex flex-col items-center">
                    <img src={member.avatarUrl} alt={member.name} className="w-32 h-32 rounded-full border-4 border-bamboo-8 shadow-lg mb-6" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Performance Stats</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatItem icon={ZapIcon} label="Total Taps" value={member.taps} />
                    <StatItem icon={NetworkIcon} label="Connections" value={member.connections} />
                    <StatItem icon={TrendingUpIcon} label="Avg. Lead Score" value={member.leadScore} />
                </div>

                {/* Placeholder for more detailed stats or activity feed */}
                <div className="mt-8 text-center text-gray-400">
                    <p>More detailed analytics for {member.name} coming soon.</p>
                </div>
            </GlassCard>
        </div>
    );
};

interface StatItemProps {
    icon: React.ElementType;
    label: string;
    value: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, label, value }) => (
    <div className="bg-black/20 p-4 rounded-xl text-center">
        <Icon className="w-8 h-8 text-bamboo-7 mx-auto mb-2" />
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
    </div>
);

export default TeamMemberDetail;
