import React from 'react';
import { Interaction, InteractionType } from '../types.ts';
import { TapIcon, NetworkIcon, CallIcon, EmailIcon, EditIcon, PinIcon, TreeIcon } from './icons.tsx';

// Helper to get an icon for each interaction type
const getInteractionIcon = (type: InteractionType) => {
    switch (type) {
        case InteractionType.Tap: return <TapIcon className="w-5 h-5 text-bamboo-8" />;
        case InteractionType.Meeting: return <NetworkIcon className="w-5 h-5 text-blue-400" />;
        case InteractionType.Call: return <CallIcon className="w-5 h-5 text-green-400" />;
        case InteractionType.Email: return <EmailIcon className="w-5 h-5 text-yellow-400" />;
        case InteractionType.Note: return <EditIcon className="w-5 h-5 text-purple-400" />;
        case InteractionType.GPSTap: return <PinIcon className="w-5 h-5 text-red-400" />;
        case InteractionType.TreePlanted: return <TreeIcon className="w-5 h-5 text-bamboo-7" />;
        default: return null;
    }
};

interface MemoryLaneTimelineProps {
    interactions: Interaction[];
}

const MemoryLaneTimeline: React.FC<MemoryLaneTimelineProps> = ({ interactions }) => {
    if (!interactions || interactions.length === 0) {
        return <p className="text-gray-400 text-center py-4">No interactions yet.</p>;
    }
    
    return (
        <div className="space-y-2 perspective-1000">
            {interactions.map((item, index) => (
                <div 
                    key={item.id} 
                    className="flex space-x-4 relative animate-timelineItemIn"
                    style={{ animationDelay: `${index * 100}ms`}}
                >
                    {/* Timeline line */}
                    {index < interactions.length -1 && <div className="absolute left-4 top-8 bottom-[-8px] w-0.5 bg-white/10"></div>}
                    
                    {/* Icon and circle */}
                    <div className="relative z-10">
                        <div className="w-8 h-8 rounded-full bg-bamboo-12 border-2 border-white/20 flex items-center justify-center">
                            {getInteractionIcon(item.type)}
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-black/10 p-3 rounded-lg border border-white/10 transform-style-3d hover:[transform:rotateY(-5deg)_scale(1.02)] transition-transform duration-300">
                        <div className="flex justify-between items-baseline">
                            <p className="font-bold text-white">{item.type}</p>
                            <p className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                        {item.event && <p className="text-sm text-bamboo-7 font-semibold">{item.event}</p>}
                        {item.location && <p className="text-sm text-gray-400 flex items-center"><PinIcon className="w-4 h-4 mr-1 inline"/>{item.location}</p>}
                        <p className="text-sm text-gray-300 mt-1">{item.notes}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MemoryLaneTimeline;
