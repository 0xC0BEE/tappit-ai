import React, { useState } from 'react';
import AIPolishButton from './AIPolishButton.tsx';
import GlassCard from './GlassCard.tsx';
import GemWrapper from '../gems/GemWrapper.tsx';
import { initialGems } from '../gems/index.ts';
import { GemDefinition } from '../types.ts';
import { PlusCircleIcon, WandIcon } from './icons.tsx';
import HapticButton from './HapticButton.tsx';
import CreateGemModal from './modals/CreateGemModal.tsx';
import CustomGemComponent from '../gems/CustomGemComponent.tsx';

interface GemSidebarProps {
    onAIPolish: () => Promise<void>;
}

const GemSidebar: React.FC<GemSidebarProps> = ({ onAIPolish }) => {
    const [gems, setGems] = useState<GemDefinition[]>(initialGems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleGemCreated = (newGem: GemDefinition) => {
        setGems(prevGems => [...prevGems, newGem]);
        setIsModalOpen(false);
    };

    return (
        <>
            <GlassCard className="p-4 h-full flex flex-col">
                <div className="flex items-center space-x-2 mb-4">
                    <WandIcon className="w-6 h-6 text-bamboo-7" />
                    <h2 className="text-xl font-bold text-white">AI Studio</h2>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                    Supercharge your card with AI. Drag gems onto your card to add them.
                </p>

                <div className="p-2 bg-black/20 rounded-lg mb-4">
                    <AIPolishButton onClick={onAIPolish} />
                </div>

                <div className="flex-grow space-y-3 overflow-y-auto pr-2 pb-20">
                    {gems.map(gem => {
                        const GemComponent = gem.isCustom ? CustomGemComponent : gem.component;
                        const props = gem.isCustom ? { jsxString: gem.customComponentStr } : {};
                        
                        return (
                             <GemWrapper key={gem.id} title={gem.name} description={gem.description}>
                                <GemComponent {...props} />
                            </GemWrapper>
                        )
                    })}
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                    <HapticButton 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full flex items-center justify-center space-x-2 bg-white/10 text-white font-semibold py-2 rounded-lg hover:bg-white/20"
                    >
                        <PlusCircleIcon className="w-5 h-5" />
                        <span>Create Gem</span>
                    </HapticButton>
                </div>
            </GlassCard>

            <CreateGemModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onGemCreated={handleGemCreated}
            />
        </>
    );
};

export default GemSidebar;