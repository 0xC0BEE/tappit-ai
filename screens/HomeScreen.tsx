import React from 'react';
import GlassCard from '../components/GlassCard.tsx';
import GreenStreakTracker from '../components/delight/GreenStreakTracker.tsx';
import LockScreenWidgetSimulation from '../components/delight/LockScreenWidgetSimulation.tsx';
import ReferralCard from '../components/delight/ReferralCard.tsx';

interface HomeScreenProps {
    greenStreak: number;
    setGreenStreak: React.Dispatch<React.SetStateAction<number>>;
    onStreakComplete: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ greenStreak, setGreenStreak, onStreakComplete }) => {
    return (
        <div className="animate-scaleIn space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                    Welcome Back
                </h1>
                <p className="text-gray-300 text-lg mt-2">Let's make a positive impact today.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <GreenStreakTracker 
                        streak={greenStreak}
                        setStreak={setGreenStreak}
                        onStreakComplete={onStreakComplete}
                    />
                    <ReferralCard />
                </div>
                <div className="space-y-8">
                    <LockScreenWidgetSimulation />
                     <GlassCard className="p-6">
                        <h2 className="text-2xl font-bold mb-4 text-white">Recent Connections</h2>
                        <ul className="space-y-4">
                            <ContactItem name="Jane Doe" event="at TechCrunch 2024" />
                            <ContactItem name="John Smith" event="via LinkedIn" />
                            <ContactItem name="Alex Ray" event="at Founders Meetup" />
                        </ul>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};


interface ContactItemProps {
    name: string;
    event: string;
}
const ContactItem: React.FC<ContactItemProps> = ({ name, event }) => (
    <li className="flex items-center space-x-4">
        <img src={`https://picsum.photos/seed/${name}/40/40`} alt={name} className="w-10 h-10 rounded-full" />
        <div>
            <p className="font-semibold text-white">{name}</p>
            <p className="text-sm text-gray-400">{event}</p>
        </div>
    </li>
);

export default HomeScreen;
