
import React from 'react';
import GlassCard from '../GlassCard.tsx';

const ConversionFunnel: React.FC = () => {
    const stages = [
        { name: 'Card Views', value: 1240, color: 'bg-bamboo-8' },
        { name: 'QR Scans', value: 310, color: 'bg-bamboo-9' },
        { name: 'Contact Saves', value: 128, color: 'bg-bamboo-10' },
        { name: 'Follow-ups', value: 42, color: 'bg-bamboo-11' },
    ];

    const maxValue = Math.max(...stages.map(s => s.value));

    return (
        <GlassCard className="p-6 h-full">
            <h2 className="text-xl font-bold text-white mb-4">Conversion Funnel</h2>
            <div className="space-y-3">
                {stages.map(stage => (
                    <div key={stage.name}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold text-gray-300">{stage.name}</span>
                            <span className="font-bold text-white">{stage.value}</span>
                        </div>
                        <div className="w-full bg-black/20 rounded-full h-4">
                            <div 
                                className={`${stage.color} h-4 rounded-full`}
                                style={{ width: `${(stage.value / maxValue) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
};

export default ConversionFunnel;
