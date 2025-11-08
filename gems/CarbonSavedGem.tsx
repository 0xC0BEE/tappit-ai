import * as React from 'react';
import { LeafIcon } from '../components/icons.tsx';
import { supabase } from '../services/supabase.ts';

const CarbonSavedGem: React.FC = () => {
    const [carbonSaved, setCarbonSaved] = React.useState(0);

    React.useEffect(() => {
        const fetchCarbonSaved = async () => {
            // This is a simplified example. In a real app, you might fetch this
            // from a user's profile or an analytics table.
            const { data, error } = await supabase
                .from('analytics')
                .select('carbonSaved')
                .single();

            if (data) {
                setCarbonSaved(data.carbonSaved.current);
            }
        };
        fetchCarbonSaved();
    }, []);

    return (
        <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
                <LeafIcon className="w-6 h-6 text-bamboo-7" />
                <p className="text-3xl font-bold text-white">{carbonSaved.toFixed(1)}g</p>
            </div>
            <p className="text-sm text-gray-300 mt-1">
                of CO₂ saved by using a digital card instead of paper.
            </p>
        </div>
    );
};

export default CarbonSavedGem;