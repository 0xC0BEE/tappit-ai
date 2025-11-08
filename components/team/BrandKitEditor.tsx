import * as React from 'react';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { BrandKit } from '../../types.ts';
import { UploadIcon } from '../icons.tsx';
import TeamCardPreview from './TeamCardPreview.tsx';
import CustomSelect from '../CustomSelect.tsx';
import { useDebounce } from '../../hooks/useDebounce.ts';
import BrandKitPreviewModal from '../modals/BrandKitPreviewModal.tsx';

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
    const [localColor, setLocalColor] = React.useState(brandKit.primaryColor);
    const debouncedColor = useDebounce(localColor, 300);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = React.useState(false);

    React.useEffect(() => {
        setBrandKit(prev => ({ ...prev, primaryColor: debouncedColor }));
    }, [debouncedColor, setBrandKit]);

    const handleFontChange = React.useCallback((font: string) => {
        setBrandKit(prev => ({...prev, font}));
    }, [setBrandKit]);

    const handleLogoUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBrandKit(prev => ({...prev, logoUrl: reader.result as string}));
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <>
            <GlassCard className="p-4">
                <h2 className="text-xl font-bold text-white mb-4">Brand Kit</h2>
                <div className="space-y-4">
                    <HapticButton onClick={() => setIsPreviewModalOpen(true)} className="w-full">
                        <TeamCardPreview brandKit={brandKit} />
                    </HapticButton>
                    
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

                    <input 
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/png, image/jpeg, image/svg+xml"
                    />
                    <HapticButton 
                        onClick={handleLogoUploadClick}
                        className="w-full flex items-center justify-center space-x-2 bg-white/10 text-white font-semibold py-2 rounded-lg hover:bg-white/20"
                    >
                        <UploadIcon className="w-5 h-5" />
                        <span>Upload Logo</span>
                    </HapticButton>
                </div>
            </GlassCard>
            <BrandKitPreviewModal
                isOpen={isPreviewModalOpen}
                onClose={() => setIsPreviewModalOpen(false)}
                brandKit={brandKit}
            />
        </>
    );
};

export default BrandKitEditor;