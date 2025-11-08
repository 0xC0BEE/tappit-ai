
// Fix: Use namespace import for React to resolve JSX type errors.
import * as React from 'react';
import { supabase } from '../services/supabase.ts';
import { AnalyticsData } from '../types.ts';
import StatCard from '../components/analytics/StatCard.tsx';
import ConversionFunnel from '../components/analytics/ConversionFunnel.tsx';
import TapHeatmap from '../components/analytics/TapHeatmap.tsx';
import { LeafIcon, NetworkIcon, TrendingUpIcon, ZapIcon } from '../components/icons.tsx';

const AnalyticsScreen: React.FC = () => {
    // Fix: Use React.useState and React.useEffect
    const [analyticsData, setAnalyticsData] = React.useState<AnalyticsData | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            // In a real app, this might be a call to a Supabase Edge Function
            // that aggregates data. For now, we'll fetch from a table.
            // Fix: Correctly await the mock Supabase query builder chain.
            const { data, error } = await supabase.from('analytics').select('*').single();

            if (error) {
                console.error('Error fetching analytics:', error);
            } else if (data) {
                setAnalyticsData(data as AnalyticsData);
            }
            setLoading(false);
        };
        fetchAnalytics();
    }, []);

    if (loading || !analyticsData) {
        return <div className="text-center p-8">Loading Analytics...</div>;
    }

    return (
        <div className="animate-scaleIn h-full flex flex-col">
            <header className="pb-8">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                    Analytics
                </h1>
                <p className="text-gray-300 text-lg mt-2">Track your impact and performance.</p>
            </header>

            <div className="flex-grow overflow-y-auto pr-2 pb-24 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        title="Total Taps"
                        value={analyticsData.taps.current}
                        change={analyticsData.taps.current - analyticsData.taps.previous}
                        previousValue={analyticsData.taps.previous}
                        icon={ZapIcon}
                    />
                    <StatCard 
                        title="New Connections"
                        value={analyticsData.connections.current}
                        change={analyticsData.connections.current - analyticsData.connections.previous}
                        previousValue={analyticsData.connections.previous}
                        icon={NetworkIcon}
                    />
                    <StatCard 
                        title="Avg. Lead Score"
                        value={analyticsData.leadScore.current}
                        change={analyticsData.leadScore.current - analyticsData.leadScore.previous}
                        previousValue={analyticsData.leadScore.previous}
                        icon={TrendingUpIcon}
                    />
                    <StatCard 
                        title="Carbon Saved"
                        value={`${analyticsData.carbonSaved.current.toFixed(1)}g`}
                        change={analyticsData.carbonSaved.current - analyticsData.carbonSaved.previous}
                        previousValue={analyticsData.carbonSaved.previous}
                        icon={LeafIcon}
                    />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <TapHeatmap data={analyticsData.tapLocations} />
                    </div>
                    <div className="lg:col-span-1">
                        <ConversionFunnel />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsScreen;