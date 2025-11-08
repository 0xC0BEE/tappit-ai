import * as React from 'react';
import { BrandKit } from '../../../types.ts';
import TeamCardPreview from '../../../components/team/TeamCardPreview.tsx';
import BambooBackground from '../../../components/BambooBackground.tsx';
import GlassCard from '../../../components/GlassCard.tsx';
import { WandIcon } from '../../../components/icons.tsx';

const LiveBrandKitPreviewScreen: React.FC = () => {
    // In a real app, this state would be updated via websockets or a similar real-time service.
    // Here, we'll simulate the updates with a timer.
    const [brandKit, setBrandKit] = React.useState<BrandKit>({
        id: 'bk-live-preview',
        primaryColor: '#22c55e',
        font: 'Inter',
        logoUrl: 'https://tailwindui.com/img/logos/mark.svg?color=green&shade=500',
    });

    const colors = ['#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];
    const fonts = ['Inter', 'Roboto', 'Montserrat', 'Lato'];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setBrandKit(prev => ({
                ...prev,
                primaryColor: colors[Math.floor(Math.random() * colors.length)],
                font: fonts[Math.floor(Math.random() * fonts.length)],
            }));
        }, 2000); // Change every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen w-full bg-bamboo-12 text-white p-4 lg:p-8 flex flex-col items-center justify-center">
            <BambooBackground />
            <div className="w-full max-w-md relative z-10 animate-scaleIn text-center">
                <header className="mb-8">
                     <WandIcon className="w-12 h-12 mx-auto text-bamboo-7" />
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7 mt-2">
                        Live Brand Kit Preview
                    </h1>
                    <p className="text-gray-300 mt-2">As you edit your brand kit in the Team OS, see the changes reflected here in real-time.</p>
                </header>

                <GlassCard className="p-6">
                    <p className="text-sm font-semibold text-gray-400 mb-4">Simulating Live Updates...</p>
                    <div className="transform scale-125">
                        <TeamCardPreview brandKit={brandKit} />
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default LiveBrandKitPreviewScreen;
