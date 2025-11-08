import * as React from 'react';
import GlassCard from '../GlassCard.tsx';
import { TeamActivity } from '../../types.ts';

interface ActivityFeedProps {
    activities: TeamActivity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
    return (
        <GlassCard className="p-4">
            <h2 className="text-xl font-bold text-white mb-4">Activity Feed</h2>
            <ul className="space-y-4 max-h-64 overflow-y-auto">
                {activities.map(activity => (
                    <li key={activity.id} className="flex items-center space-x-3">
                        <img src={activity.member.avatarUrl} alt={activity.member.name} className="w-8 h-8 rounded-full" />
                        <div>
                            <p className="text-sm text-white">
                                <span className="font-semibold">{activity.member.name}</span> {activity.action} <span className="font-semibold">{activity.target}</span>
                            </p>
                            <p className="text-xs text-gray-400">{activity.timestamp}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </GlassCard>
    );
};

export default ActivityFeed;