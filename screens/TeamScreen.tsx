import * as React from 'react';
import { supabase } from '../services/supabase.ts';
import { TeamMember, BrandKit, TeamActivity } from '../types.ts';
import TeamMemberDetail from '../components/team/TeamMemberDetail.tsx';
import AITeamInsights from '../components/team/AITeamInsights.tsx';
import ActivityFeed from '../components/team/ActivityFeed.tsx';
import InviteTeamModal from '../components/modals/InviteTeamModal.tsx';
import CustomizeTeamModal from '../components/modals/CustomizeTeamModal.tsx';
import HapticButton from '../components/HapticButton.tsx';
import { PlusIcon, WandIcon } from '../components/icons.tsx';
import LoadingSkeleton from '../components/LoadingSkeleton.tsx';
import { useDebounce } from '../hooks/useDebounce.ts';

const TeamScreen: React.FC = () => {
    const [members, setMembers] = React.useState<TeamMember[]>([]);
    const [brandKit, setBrandKit] = React.useState<BrandKit | null>(null);
    const [activities, setActivities] = React.useState<TeamActivity[]>([]);
    const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null);
    const [loading, setLoading] = React.useState(true);
    
    const [isInviteModalOpen, setInviteModalOpen] = React.useState(false);
    const [isCustomizeModalOpen, setCustomizeModalOpen] = React.useState(false);

    const debouncedBrandKit = useDebounce(brandKit, 500);

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data: membersData, error: membersError } = await supabase.from('team_members').select('*');
            const { data: brandKitData, error: brandKitError } = await supabase.from('brand_kit').select('*').single();
            const { data: activitiesData, error: activitiesError } = await supabase.from('team_activities').select('*').limit(5);

            if (membersError || brandKitError || activitiesError) {
                console.error(membersError || brandKitError || activitiesError);
            } else {
                setMembers(membersData as TeamMember[]);
                setBrandKit(brandKitData as BrandKit);
                setActivities(activitiesData as TeamActivity[]);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // Effect to save debounced brand kit changes to the database
    React.useEffect(() => {
        const updateBrandKitInSupabase = async () => {
            if (!debouncedBrandKit || !debouncedBrandKit.id) return;
            // Assuming the initial state is also fetched, so we don't save on mount
            // A more robust solution would check if it's the initial load.
            const { error } = await supabase.from('brand_kit').update(debouncedBrandKit).eq('id', debouncedBrandKit.id);
            if (error) {
                console.error('Failed to update brand kit', error);
            }
        };
        updateBrandKitInSupabase();
    }, [debouncedBrandKit]);


    const handleSelectMember = (member: TeamMember) => {
        setSelectedMember(member);
    };

    if (selectedMember) {
        return <TeamMemberDetail member={selectedMember} onBack={() => setSelectedMember(null)} />;
    }

    if (loading || !brandKit) {
        return <div className="flex flex-col gap-4 p-4">{Array.from({length: 5}).map((_, i) => <LoadingSkeleton key={i}/>)}</div>
    }

    return (
        <>
            <div className="animate-scaleIn h-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left column: Team Members & Actions */}
                <div className="lg:col-span-1 h-full flex flex-col gap-6 pr-2">
                     <header className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                                Team
                            </h1>
                            <p className="text-gray-300 text-lg mt-2">Manage your organization.</p>
                        </div>
                        <div className="flex items-center space-x-2">
                             <HapticButton 
                                onClick={() => setCustomizeModalOpen(true)}
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

                <div className="lg:col-span-1 h-full flex flex-col gap-6 pr-2">
                    <AITeamInsights />
                    <ActivityFeed activities={activities} />
                </div>
            </div>
            
            <InviteTeamModal isOpen={isInviteModalOpen} onClose={() => setInviteModalOpen(false)} />
            <CustomizeTeamModal 
                isOpen={isCustomizeModalOpen} 
                onClose={() => setCustomizeModalOpen(false)}
                brandKit={brandKit}
                setBrandKit={setBrandKit}
                teamMembers={members}
            />
        </>
    );
};
export default TeamScreen;