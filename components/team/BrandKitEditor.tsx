import React, { useState } from 'react';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { BrandKit } from '../../types.ts';
import { UploadIcon } from '../icons.tsx';
import TeamCardPreview from './TeamCardPreview.tsx';
import CustomSelect from '../CustomSelect.tsx';
import { useDebounce } from '../../hooks/useDebounce.ts';

interface BrandKitEditorProps {
    brandKit: BrandKit;
    setBrandKit: React.Dispatch<React.SetStateAction<BrandKit>>;
}

const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Lato', label: 'Lato' },
];

const BrandKitEditor: React.FC<BrandKitEditorProps> = ({ brandKit, setBrandKit }) => {
    const [localColor, setLocalColor] = useState(brandKit.primaryColor);
    const debouncedColor = useDebounce(localColor, 300);

    React.useEffect(() => {
        setBrandKit(prev => ({ ...prev, primaryColor: debouncedColor }));
    }, [debouncedColor, setBrandKit]);

    const handleFontChange = (font: string) => {
        setBrandKit(prev => ({...prev, font}));
    };

    const handleLogoUpload = () => {
        // This would open a file picker in a real app
        alert('Opening file picker to upload logo...');
        // For demonstration, we'll just cycle through a placeholder
        const newLogo = brandKit.logoUrl.includes('placeholder-2') ? '/logo-placeholder.svg' : '/logo-placeholder-2.svg';
        setBrandKit(prev => ({...prev, logoUrl: newLogo}));
    };
    
    return (
        <GlassCard className="p-4">
            <h2 className="text-xl font-bold text-white mb-4">Brand Kit</h2>
            <div className="space-y-4">
                <TeamCardPreview brandKit={brandKit} />
                
                <div className="flex items-center space-x-2">
                    <label htmlFor="primaryColor" className="flex-1">
                        <span className="text-sm font-semibold text-gray-300">Primary Color</span>
                        <div className="flex items-center bg-white/5 p-2 rounded-lg mt-1">
                            <input
                                id="primaryColor"
                                type="color"
                                value={localColor}
                                onChange={(e) => setLocalColor(e.target.value)}
                                className="w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
                            />
                            <span className="ml-2 text-white">{localColor}</span>
                        </div>
                    </label>
                </div>

                <div>
                    <span className="text-sm font-semibold text-gray-300">Brand Font</span>
                     <CustomSelect 
                        options={fontOptions}
                        value={brandKit.font}
                        onChange={handleFontChange}
                    />
                </div>

                <HapticButton 
                    onClick={handleLogoUpload}
                    className="w-full flex items-center justify-center space-x-2 bg-white/10 text-white font-semibold py-2 rounded-lg hover:bg-white/20"
                >
                    <UploadIcon className="w-5 h-5" />
                    <span>Upload Logo</span>
                </HapticButton>
            </div>
        </GlassCard>
    );
};

export default BrandKitEditor;
