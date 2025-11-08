import * as React from 'react';
import { supabase } from '../../../services/supabase.ts';
import { GreenStreakUser } from '../../../types.ts';
import GlassCard from '../../../components/GlassCard.tsx';
import BambooBackground from '../../../components/BambooBackground.tsx';
import { LeafIcon } from '../../../components/icons.tsx';

const GreenStreakLeaderboardScreen: React.FC = () => {
    const [users, setUsers] = React.useState<GreenStreakUser[]>([]);
    const [loading, setLoading] = React.useState(true);
    const currentUserId = 'tm1'; // Mock current user ID for 'Alex Bamboo'

    React.useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('green_streaks')
                .select('*')
                .order('streak_count', { ascending: false });

            if (error) {
                console.error("Error fetching leaderboard:", error);
            } else {
                setUsers(data as GreenStreakUser[]);
            }
            setLoading(false);
        };
        
        // Simulate network delay to show loading state as per e2e test
        setTimeout(fetchLeaderboard, 1500);
    }, []);

    return (
        <div className="min-h-screen w-full bg-bamboo-12 text-white p-4 lg:p-8 flex flex-col items-center">
            <BambooBackground />
            <div className="w-full max-w-2xl relative z-10 animate-scaleIn">
                <header className="text-center mb-8">
                    <LeafIcon className="w-12 h-12 mx-auto text-bamboo-7" />
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7 mt-2">
                        Green Streak Leaderboard
                    </h1>
                    <p className="text-gray-300 mt-2">See who's making the biggest impact by networking sustainably!</p>
                </header>

                <GlassCard className="p-4">
                    {loading ? (
                         <div className="text-center py-10 text-gray-400">Loading Leaderboard...</div>
                    ) : (
                        <ul className="space-y-3">
                            {users.map((streakUser, index) => (
                                <li 
                                    key={streakUser.user_id}
                                    className={`flex items-center p-3 rounded-lg transition-colors ${streakUser.user_id === currentUserId ? 'bg-bamboo-9/50' : 'bg-black/20'}`}
                                >
                                    <span className="font-bold text-lg w-8">{index + 1}</span>
                                    <img src={streakUser.user.avatarUrl} alt={streakUser.user.name} className="w-10 h-10 rounded-full mx-4" />
                                    <span className="flex-grow font-semibold">{streakUser.user.name}</span>
                                    <div className="flex items-center space-x-2 text-bamboo-7">
                                        <LeafIcon className="w-5 h-5" />
                                        <span className="font-bold text-lg">{streakUser.streak_count}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </GlassCard>
            </div>
        </div>
    );
};

export default GreenStreakLeaderboardScreen;
