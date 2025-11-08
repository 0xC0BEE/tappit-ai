import * as React from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../../services/supabase.ts';
import GlassCard from '../../../components/GlassCard.tsx';
import { LeafIcon } from '../../../components/icons.tsx';

interface LeaderboardEntry {
    user_id: string;
    streak_count: number;
    user: {
        name: string;
        avatarUrl: string;
    }
}

const GreenStreakLeaderboardScreen: React.FC = () => {
    const [leaderboard, setLeaderboard] = React.useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = React.useState(true);
    const currentUserId = 'tm1'; // Mock current user

    React.useEffect(() => {
        const fetchLeaderboard = async () => {
            const { data } = await supabase
                .from('green_streaks')
                .select('*, user:team_members(*)') // Mocking a join
                .order('streak_count', { ascending: false })
                .limit(10);
            
            // This is a manual join because our mock service doesn't support it.
            const { data: members } = await supabase.from('team_members').select('*');
            if (data && members) {
                 const joinedData = (data as any[]).map(streak => ({
                     ...streak,
                     user: members.find(m => m.id === streak.user_id)
                 }));
                setLeaderboard(joinedData as LeaderboardEntry[]);
            }
            setLoading(false);
        };
        fetchLeaderboard();
    }, []);

    return (
        <div className="flex flex-col items-center h-full text-white p-4">
            <header className="text-center mb-8">
                <LeafIcon className="w-16 h-16 mx-auto text-bamboo-7" />
                <h1 className="text-4xl font-bold mt-2">Green Streak Leaderboard</h1>
                <p className="text-gray-300 mt-2">See who's making the biggest impact by networking sustainably.</p>
            </header>
            
            <GlassCard className="w-full max-w-lg flex-grow p-4">
                <div className="space-y-3">
                    {loading ? <p>Loading leaderboard...</p> : leaderboard.map((entry, index) => {
                        const isCurrentUser = entry.user_id === currentUserId;
                        return (
                             <motion.div
                                key={entry.user_id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex items-center space-x-4 p-3 rounded-lg ${isCurrentUser ? 'bg-bamboo-8/50' : 'bg-black/20'}`}
                            >
                                <span className="font-bold text-lg w-8 text-center">{index + 1}</span>
                                <img src={entry.user.avatarUrl} alt={entry.user.name} className="w-12 h-12 rounded-full"/>
                                <p className="flex-grow font-semibold">{entry.user.name}</p>
                                <div className="flex items-center space-x-2">
                                    <LeafIcon className="w-5 h-5 text-bamboo-7"/>
                                    <span className="font-bold text-lg">{entry.streak_count}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </GlassCard>
        </div>
    );
};

export default GreenStreakLeaderboardScreen;
