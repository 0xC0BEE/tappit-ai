import React, { useState } from 'react';
import { teamMembers as initialMembers, teamActivities, brandKit as initialBrandKit } from '../data/team.ts';
import { TeamMember, BrandKit } from '../types.ts';
import TeamMemberDetail from '../components/team/TeamMemberDetail.tsx';
import AITeamInsights from '../components/team/AITeamInsights.tsx';
import ActivityFeed from '../components/team/ActivityFeed.tsx';
import BrandKitEditor from '../components/team/BrandKitEditor.tsx';
import BulkActions from '../components/team/BulkActions.tsx';
import AssignCardModal from '../components/modals/AssignCardModal.tsx';
import ExportModal from '../components/modals/ExportModal.tsx';
import InviteTeamModal from '../components/modals/InviteTeamModal.tsx';
import HapticButton from '../components/HapticButton.tsx';
import { PlusIcon, WandIcon } from '../components/icons.tsx';

const TeamScreen: React.FC = () => {
    const [members, setMembers] = useState<TeamMember[]>(initialMembers);
    const [brandKit, setBrandKit] = useState<BrandKit>(initialBrandKit);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const [isAssignModalOpen, setAssignModalOpen] = useState(false);
    const [isExportModalOpen, setExportModalOpen] = useState(false);
    const [isInviteModalOpen, setInviteModalOpen] = useState(false);

    const handleSelectMember = (member: TeamMember) => {
        setSelectedMember(member);
    };

    if (selectedMember) {
        return <TeamMemberDetail member={selectedMember} onBack={() => setSelectedMember(null)} />;
    }

    return (
        <>
            <div className="animate-scaleIn h-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column: Team Members & Actions */}
                <div className="lg:col-span-1 h-full flex flex-col gap-6 overflow-y-auto pr-2 pb-24">
                     <header className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                                Team
                            </h1>
                            <p className="text-gray-300 text-lg mt-2">Manage your organization.</p>
                        </div>
                        <div className="flex items-center space-x-2">
                             <HapticButton 
                                onClick={() => alert('Customize action triggered!')}
                                className="flex items-center space-x-2 bg-white/10 text-white font-semibold py-2 px-4 rounded-full shadow-lg"
                            >
                                <WandIcon className="w-5 h-5" />
                                <span>Customize</span>
                            </HapticButton>
                            <HapticButton 
                                onClick={() => setInviteModalOpen(true)}
                                className="flex items-center space-x-2 bg-bamboo-8 text-white font-bold py-2 px-4 rounded-full shadow-lg shadow-bamboo-8/30"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>Invite</span>
                            </HapticButton>
                        </div>
                    </header>
                    
                    {/* Member List */}
                    <div className="space-y-3">
                        {members.map(member => (
                             <HapticButton key={member.id} onClick={() => handleSelectMember(member)} className="w-full text-left">
                                <div className="bg-black/20 p-3 rounded-lg w-full hover:bg-black/30 transition-colors flex items-center space-x-4">
                                     <img src={member.avatarUrl} alt={member.name} className="w-12 h-12 rounded-full" />
                                     <div className="flex-grow">
                                        <p className="font-bold text-white">{member.name}</p>
                                        <p className="text-sm text-gray-300">{member.role}</p>
                                     </div>
                                     <div className="text-right">
                                        <p className="text-xs text-gray-400">Taps</p>
                                        <p className="font-semibold text-white">{member.taps}</p>
                                     </div>
                                </div>
                             </HapticButton>
                        ))}
                    </div>
                </div>

                {/* Center column: Insights & Feed */}
                <div className="lg:col-span-1 h-full flex flex-col gap-6 overflow-y-auto pr-2 pb-24">
                    <AITeamInsights />
                    <ActivityFeed activities={teamActivities} />
                </div>

                {/* Right column: Brand Kit & Bulk Actions */}
                <div className="lg:col-span-1 h-full flex flex-col gap-6 overflow-y-auto pr-2 pb-24">
                    <BrandKitEditor brandKit={brandKit} setBrandKit={setBrandKit} />
                    <BulkActions 
                        onAssignCard={() => setAssignModalOpen(true)}
                        onExportData={() => setExportModalOpen(true)}
                    />
                </div>
            </div>
            
            <AssignCardModal isOpen={isAssignModalOpen} onClose={() => setAssignModalOpen(false)} teamMembers={members} />
            <ExportModal isOpen={isExportModalOpen} onClose={() => setExportModalOpen(false)} />
            <InviteTeamModal isOpen={isInviteModalOpen} onClose={() => setInviteModalOpen(false)} />
        </>
    );
};
export default TeamScreen;