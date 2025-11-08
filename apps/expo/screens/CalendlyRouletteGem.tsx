import * as React from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../../services/supabase.ts';
import { Contact } from '../../../types.ts';
import GlassCard from '../../../components/GlassCard.tsx';
import HapticButton from '../../../components/HapticButton.tsx';
import ContactCard from '../../../components/ContactCard.tsx';

const CalendlyRouletteGem: React.FC = () => {
    const [contact, setContact] = React.useState<Contact | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSpin = async () => {
        setIsLoading(true);
        setContact(null);
        // This query is a placeholder for the real logic described in the roadmap
        const { data } = await supabase.from('contacts').select('*').limit(1);
        if (data) {
            setTimeout(() => {
                setContact(data[0] as Contact);
                setIsLoading(false);
            }, 1500);
        } else {
            setIsLoading(false);
        }
    };

    const handleBookMeeting = () => {
        if (contact && contact.calendly_url) {
            window.open(contact.calendly_url, '_blank');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-white p-4">
            <h1 className="text-4xl font-bold mb-4">Reconnect Roulette</h1>
            <p className="text-gray-300 mb-8 max-w-sm">
                Let our AI find a valuable contact you haven't connected with in a while and book a meeting in one tap.
            </p>

            <GlassCard className="p-8 w-full max-w-md">
                {isLoading && (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 mx-auto rounded-full border-4 border-bamboo-8 border-t-transparent"
                    />
                )}
                
                {contact && (
                     <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                        <ContactCard contact={contact} onClick={() => {}} />
                     </motion.div>
                )}

                <HapticButton 
                    onClick={contact ? handleBookMeeting : handleSpin}
                    disabled={isLoading}
                    className="w-full mt-6 bg-bamboo-8 font-bold py-4 px-10 rounded-full shadow-lg"
                >
                    {isLoading ? 'Finding contact...' : (contact ? 'Book Meeting' : 'Spin the Wheel')}
                </HapticButton>
            </GlassCard>
        </div>
    );
};

export default CalendlyRouletteGem;
