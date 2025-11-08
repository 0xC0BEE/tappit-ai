import * as React from 'react';
import { supabase } from '../../../services/supabase.ts';
import { Contact } from '../../../types.ts';
import GlassCard from '../../../components/GlassCard.tsx';
import BambooBackground from '../../../components/BambooBackground.tsx';
import HapticButton from '../../../components/HapticButton.tsx';
import { ZapIcon } from '../../../components/icons.tsx';

const CalendlyRouletteGem: React.FC = () => {
    const [suggestedContact, setSuggestedContact] = React.useState<Contact | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSpin = async () => {
        setIsLoading(true);
        setSuggestedContact(null);

        // Simulate AI picking a cold contact
        setTimeout(async () => {
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('relationshipHealth', { ascending: true })
                .limit(1)
                .single();

            if (error) {
                console.error('Error fetching cold contact:', error);
            } else {
                setSuggestedContact(data as Contact);
            }
            setIsLoading(false);
        }, 2000);
    };

    const handleBookMeeting = () => {
        if (suggestedContact?.calendly_url) {
            window.open(suggestedContact.calendly_url, '_blank');
        } else {
            alert(`No Calendly link found for ${suggestedContact?.name}. You'll have to reach out the old-fashioned way!`);
        }
    };
    
    return (
        <div className="min-h-screen w-full bg-bamboo-12 text-white p-4 lg:p-8 flex flex-col items-center justify-center">
            <BambooBackground />
            <div className="w-full max-w-md relative z-10 animate-scaleIn text-center">
                <header className="mb-8">
                     <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                        Reconnect Roulette
                    </h1>
                    <p className="text-gray-300 mt-2">Let our AI find a valuable connection you haven't talked to in a while.</p>
                </header>

                <GlassCard className="p-6 min-h-[16rem] flex flex-col items-center justify-center">
                    {isLoading && (
                        <div className="animate-fadeIn text-center">
                            <ZapIcon className="w-10 h-10 mx-auto text-bamboo-7 animate-pulse" />
                            <p className="mt-4 text-gray-400">Finding a cold contact to reconnect with...</p>
                        </div>
                    )}

                    {!isLoading && suggestedContact && (
                        <div className="animate-fadeIn text-center w-full">
                            <p className="text-sm text-bamboo-7 font-semibold">It's been a while! Let's reconnect.</p>
                            <img src={suggestedContact.photoUrl} alt={suggestedContact.name} className="w-24 h-24 rounded-full mx-auto my-4 border-4 border-bamboo-8" />
                            <h3 className="text-2xl font-bold">{suggestedContact.name}</h3>
                            <p className="text-gray-400">{suggestedContact.title} at {suggestedContact.company}</p>
                        </div>
                    )}
                    
                    {!isLoading && !suggestedContact && (
                        <div className="animate-fadeIn text-center">
                            <p className="text-gray-400 mb-4">Spin the wheel to find a connection to nurture.</p>
                        </div>
                    )}
                </GlassCard>
                
                <div className="mt-6 w-full">
                    {suggestedContact ? (
                        <HapticButton 
                            onClick={handleBookMeeting}
                            className="w-full bg-bamboo-8 text-white font-bold py-4 px-10 rounded-full shadow-lg"
                        >
                            Book Meeting
                        </HapticButton>
                    ) : (
                        <HapticButton 
                            onClick={handleSpin}
                            disabled={isLoading}
                            className="w-full bg-bamboo-8 text-white font-bold py-4 px-10 rounded-full shadow-lg disabled:opacity-50"
                        >
                            Spin the Wheel
                        </HapticButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendlyRouletteGem;
