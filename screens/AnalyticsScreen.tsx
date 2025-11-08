
import * as React from 'react';
import StatCard from '../components/analytics/StatCard.tsx';
import ConversionFunnel from '../components/analytics/ConversionFunnel.tsx';
import TapHeatmap from '../components/analytics/TapHeatmap.tsx';
import { ZapIcon, NetworkIcon, TrendingUpIcon, LeafIcon } from '../components/icons.tsx';

// Mock data for analytics
const tapData = [
    { lat: 34.0522, lng: -118.2437, count: 10 }, // Los Angeles
    { lat: 40.7128, lng: -74.0060, count: 15 },  // New York
    { lat: 51.5074, lng: -0.1278, count: 8 },   // London
];

const AnalyticsScreen: React.FC = () => {
    return (
        <div className="animate-scaleIn h-full flex flex-col">
            <header className="pb-8">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                    Analytics
                </h1>
                <p className="text-gray-300 text-lg mt-2">Measure your networking ROI.</p>
            </header>

            <div className="flex-grow overflow-y-auto pr-2 pb-24 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        title="Total Taps"
                        value={124}
                        change={15}
                        previousValue={109}
                        icon={ZapIcon}
                    />
                    <StatCard 
                        title="New Connections"
                        value={82}
                        change={-5}
                        previousValue={87}
                        icon={NetworkIcon}
                    />
                    <StatCard 
                        title="Avg. Lead Score"
                        value={88}
                        change={4}
                        previousValue={84}
                        icon={TrendingUpIcon}
                    />
                    <StatCard 
                        title="CO₂ Saved (g)"
                        value="18.2g"
                        change={3.1}
                        previousValue={15.1}
                        icon={LeafIcon}
                    />
                </div>

                {/* Funnel and Heatmap */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ConversionFunnel />
                    <TapHeatmap data={tapData} />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsScreen;
