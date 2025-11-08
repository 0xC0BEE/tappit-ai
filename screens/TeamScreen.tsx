
import * as React from 'react';
import { supabase } from '../services/supabase.ts';
import { TeamMember, BrandKit, TeamActivity } from '../types.ts';
import AITeamInsights from '../components/team/AITeamInsights.tsx';
import ActivityFeed from '../components/team/ActivityFeed.tsx';
import GlassCard from '../components/GlassCard.tsx';
import HapticButton from '../components/HapticButton.tsx';
import { PlusIcon, SettingsIcon } from '../components/icons.tsx';
import TeamMemberDetail from '../components/team/TeamMemberDetail.tsx';
import InviteTeamModal from '../components/modals/InviteTeamModal.tsx';
import CustomizeTeamModal from '../components/modals/CustomizeTeamModal.tsx';

const TeamScreen: React.FC = () => {
    const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([]);
    const [activities, setActivities] = React.useState<TeamActivity[]>([]);
    const [brandKit, setBrandKit] = React.useState<BrandKit | null>(null);
    const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null);
    const [isInviteModalOpen, setInviteModalOpen] = React.useState(false);
    const [isCustomizeModalOpen, setCustomizeModalOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [membersRes, brandKitRes, activitiesRes] = await Promise.all([
                supabase.from('team_members').select('*'),
                supabase.from('brand_kit').select('*').single(),
                supabase.from('team_activities').select('*'),
            ]);

            if (membersRes.data) setTeamMembers(membersRes.data as TeamMember[]);
            if (brandKitRes.data) setBrandKit(brandKitRes.data as BrandKit);
            if (activitiesRes.data) setActivities(activitiesRes.data as TeamActivity[]);

            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-full">Loading team data...</div>;
    }

    if (selectedMember) {
        return <TeamMemberDetail member={selectedMember} onBack={() => setSelectedMember(null)} />;
    }

    return (
        <>
            <div className="animate-scaleIn h-full flex flex-col">
                <header className="pb-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                            Team OS
                        </h1>
                        <p className="text-gray-300 text-lg mt-2">Manage your team's networking efforts.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                         <HapticButton onClick={() => setCustomizeModalOpen(true)} className="p-2 bg-white/10 rounded-full text-white"><SettingsIcon className="w-6 h-6"/></HapticButton>
                         <HapticButton onClick={() => setInviteModalOpen(true)} className="flex items-center space-x-2 bg-bamboo-8 text-white font-semibold py-2 px-4 rounded-full text-sm">
                            <PlusIcon className="w-4 h-4" />
                            <span>Invite</span>
                        </HapticButton>
                    </div>
                </header>
                
                <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto pr-2 pb-24">
                    <div className="space-y-6">
                        <AITeamInsights />
                        <ActivityFeed activities={activities} />
                    </div>
                    <div className="space-y-6">
                        <GlassCard className="p-4">
                            <h2 className="text-xl font-bold text-white mb-4">Team Members ({teamMembers.length})</h2>
                            <ul className="space-y-3">
                                {teamMembers.map(member => (
                                    <li key={member.id}>
                                        <HapticButton onClick={() => setSelectedMember(member)} className="w-full text-left flex items-center p-2 rounded-lg hover:bg-white/10">
                                            <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full" />
                                            <div className="ml-3">
                                                <p className="font-semibold text-white">{member.name}</p>
                                                <p className="text-sm text-gray-400">{member.role}</p>
                                            </div>
                                        </HapticButton>
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    </div>
                </div>
            </div>
            
            <InviteTeamModal isOpen={isInviteModalOpen} onClose={() => setInviteModalOpen(false)} />
            {brandKit && (
                 <CustomizeTeamModal 
                    isOpen={isCustomizeModalOpen} 
                    onClose={() => setCustomizeModalOpen(false)}
                    brandKit={brandKit}
                    setBrandKit={setBrandKit}
                    teamMembers={teamMembers}
                />
            )}
        </>
    );
};

export default TeamScreen;
