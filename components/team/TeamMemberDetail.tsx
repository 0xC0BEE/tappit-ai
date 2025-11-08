// Fix: Use namespace import for React to resolve JSX type errors.
import * as React from 'react';
import { supabase } from '../../services/supabase.ts';
import { TeamMember, Contact } from '../../types.ts';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { ZapIcon, NetworkIcon, TrendingUpIcon } from '../icons.tsx';
import LoadingSkeleton from '../LoadingSkeleton.tsx';

interface TeamMemberDetailProps {
    member: TeamMember;
    onBack: () => void;
}

const TeamMemberDetail: React.FC<TeamMemberDetailProps> = ({ member, onBack }) => {
    // Fix: Use React.useState and React.useEffect
    const [connections, setConnections] = React.useState<Contact[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchConnections = async () => {
            setLoading(true);
            // In a real schema, you'd likely filter contacts by team_member_id
            // For now, we'll fetch a few contacts to simulate.
            // Fix: Correctly await the mock Supabase query builder chain.
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .limit(3);
            
            if (error) {
                console.error("Error fetching connections for team member:", error);
            } else {
                setConnections(data as Contact[]);
            }
            setLoading(false);
        };
        fetchConnections();
    }, [member.id]);

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow overflow-y-auto pr-2 pb-24">
                {/* Left Column: Profile & Stats */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <GlassCard className="p-6 text-center">
                        <img src={member.avatarUrl} alt={member.name} className="w-32 h-32 rounded-full border-4 border-bamboo-8 shadow-lg mb-4 mx-auto" />
                        <h2 className="text-2xl font-bold text-white">Performance</h2>
                    </GlassCard>
                    <StatItem icon={ZapIcon} label="Total Taps" value={member.taps} />
                    <StatItem icon={NetworkIcon} label="Connections" value={member.connections} />
                    <StatItem icon={TrendingUpIcon} label="Avg. Lead Score" value={member.leadScore} />
                </div>
                
                {/* Right Column: Connections */}
                <div className="lg:col-span-2">
                    <GlassCard className="p-6 h-full flex flex-col">
                        <h2 className="text-2xl font-bold text-white mb-4">Recent Connections</h2>
                        <div className="flex-grow overflow-y-auto space-y-3">
                            {loading ? (
                                Array.from({length: 3}).map((_, i) => <LoadingSkeleton key={i}/>)
                            ) : (
                                connections.map(contact => (
                                    <div key={contact.id} className="bg-black/20 p-3 rounded-lg w-full flex items-center space-x-4">
                                        <img src={contact.photoUrl} alt={contact.name} className="w-12 h-12 rounded-full" />
                                        <div className="flex-grow">
                                            <p className="font-bold text-white">{contact.name}</p>
                                            <p className="text-sm text-gray-300">{contact.title}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">Lead Score</p>
                                            <p className="font-semibold text-white">{contact.leadScore}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

interface StatItemProps {
    icon: React.ElementType;
    label: string;
    value: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, label, value }) => (
    <GlassCard className="p-4 flex items-center space-x-4">
        <div className="p-3 bg-white/10 rounded-full">
            <Icon className="w-6 h-6 text-bamboo-7" />
        </div>
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </GlassCard>
);

export default TeamMemberDetail;
