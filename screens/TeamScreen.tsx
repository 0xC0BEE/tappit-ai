import React, { useState } from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import { teamMembers, teamActivity, brandKit } from '../data/team.ts';
// Fix: Add file extension to satisfy bundler/type checker.
import { TeamMember } from '../types.ts';
// Fix: Add file extension to satisfy bundler/type checker.
import GlassCard from '../components/GlassCard.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import BulkActions from '../components/team/BulkActions.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import AITeamInsights from '../components/team/AITeamInsights.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import ActivityFeed from '../components/team/ActivityFeed.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import BrandKitEditor from '../components/team/BrandKitEditor.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import TeamCardPreview from '../components/team/TeamCardPreview.tsx';

const TeamScreen: React.FC = () => {
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const handleSelectMember = (id: string) => {
        setSelectedMembers(prev => 
            prev.includes(id) ? prev.filter(memberId => memberId !== id) : [...prev, id]
        );
    };

    return (
        <div className="animate-scaleIn h-full flex flex-col">
            <header>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                    Team Management
                </h1>
                <p className="text-gray-300 text-lg mt-2">Oversee your team's performance and branding.</p>
            </header>

            <div className="mt-6 flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-auto">
                {/* Left Column: Members List */}
                <div className="lg:col-span-2 space-y-6">
                    <TeamMembersList 
                        members={teamMembers} 
                        selectedMembers={selectedMembers}
                        onSelectMember={handleSelectMember}
                    />
                    <BulkActions selectedCount={selectedMembers.length} />
                    <AITeamInsights />
                </div>

                {/* Right Column: Insights & Tools */}
                <div className="space-y-6">
                    <TeamCardPreview />
                    <BrandKitEditor kit={brandKit} />
                    <ActivityFeed activities={teamActivity} />
                </div>
            </div>
        </div>
    );
};

interface TeamMembersListProps {
    members: TeamMember[];
    selectedMembers: string[];
    onSelectMember: (id: string) => void;
}

const TeamMembersList: React.FC<TeamMembersListProps> = ({ members, selectedMembers, onSelectMember }) => (
    <GlassCard className="p-4">
        <h2 className="text-xl font-bold text-white mb-4">Members</h2>
        <div className="space-y-2">
            {members.map(member => {
                const isSelected = selectedMembers.includes(member.id);
                return (
                    <div 
                        key={member.id} 
                        className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-bamboo-8/30' : 'hover:bg-white/10'}`}
                        onClick={() => onSelectMember(member.id)}
                    >
                        <input 
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="form-checkbox h-5 w-5 bg-white/20 border-white/30 rounded text-bamboo-8 focus:ring-bamboo-8"
                        />
                        <img src={member.avatarUrl} alt={member.name} className="w-12 h-12 rounded-full" />
                        <div className="flex-grow">
                            <p className="font-bold text-white">{member.name}</p>
                            <p className="text-sm text-gray-400">{member.role}</p>
                        </div>
                        <div className="text-right">
                             <p className="font-semibold text-white">{member.connections} connections</p>
                             <p className="text-xs text-gray-500">{member.lastActive}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    </GlassCard>
);


export default TeamScreen;
