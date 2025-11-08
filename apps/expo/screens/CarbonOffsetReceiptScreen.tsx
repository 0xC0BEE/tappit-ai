import * as React from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../../services/supabase.ts';
import GlassCard from '../../../components/GlassCard.tsx';
import HapticButton from '../../../components/HapticButton.tsx';
import { TreeIcon, ShareIcon } from '../../../components/icons.tsx';

interface TreePlanted {
    certificate_id: string;
    location: string;
    timestamp: string;
}

const CarbonOffsetReceiptScreen: React.FC = () => {
    const [receipt, setReceipt] = React.useState<TreePlanted | null>(null);

    React.useEffect(() => {
        const fetchReceipt = async () => {
            const { data } = await supabase.from('trees_planted').select('*').single();
            if (data) {
                setReceipt(data as TreePlanted);
            }
        };
        fetchReceipt();
    }, []);

    if (!receipt) {
        return <p>Loading receipt...</p>
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-white p-4 bg-bamboo-11">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
             >
                <GlassCard className="w-full max-w-sm p-8 text-center border-bamboo-8">
                    <TreeIcon className="w-16 h-16 mx-auto text-bamboo-7" />
                    <h1 className="text-3xl font-bold mt-4">Tree Planted</h1>
                    <p className="text-gray-300 mt-2">
                        As a thank you for your sustainable networking, we've planted a tree on your behalf.
                    </p>

                    <div className="my-6 border-y border-white/10 py-4 space-y-2">
                        <div>
                            <p className="text-xs text-gray-400 uppercase">Location</p>
                            <p className="font-semibold">{receipt.location}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase">Certificate ID</p>
                            <p className="font-mono text-sm">{receipt.certificate_id}</p>
                        </div>
                    </div>
                     <HapticButton className="w-full flex items-center justify-center space-x-2 bg-bamboo-8 font-bold py-3 rounded-full shadow-lg">
                        <ShareIcon className="w-5 h-5"/>
                        <span>Share Your Impact</span>
                    </HapticButton>
                </GlassCard>
            </motion.div>
        </div>
    );
};

export default CarbonOffsetReceiptScreen;
