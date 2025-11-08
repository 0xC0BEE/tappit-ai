import * as React from 'react';
import { ChevronDownIcon } from '../components/icons.tsx';
import { springTransition } from '../utils/spring.ts';
import HapticButton from '../components/HapticButton.tsx';

interface GemWrapperProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const GemWrapper: React.FC<GemWrapperProps> = ({ title, description, children }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <div className="bg-black/20 border border-white/10 rounded-xl p-3">
            <HapticButton className="w-full" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center justify-between text-left">
                    <div>
                        <h4 className="font-semibold text-white">{title}</h4>
                        <p className="text-xs text-gray-400">{description}</p>
                    </div>
                    <ChevronDownIcon 
                        style={springTransition} 
                        className={`w-5 h-5 text-gray-400 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} 
                    />
                </div>
            </HapticButton>
            {isExpanded && (
                <div className="mt-3 pt-3 border-t border-white/10 animate-fadeIn">
                    {children}
                </div>
            )}
        </div>
    );
};

export default GemWrapper;