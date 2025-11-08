// Fix: Provide a full implementation for TemplateCarousel.tsx.
// This file was previously not a module, causing a global JSX namespace collision
// that broke types for all standard HTML elements project-wide.
// Making it a proper module by adding imports/exports resolves this issue.
import * as React from 'react';
import { CardTemplate } from '../types.ts';
import { springTransitionAll } from '../utils/spring.ts';
import HapticButton from './HapticButton.tsx';

interface TemplateCarouselProps {
    templates: CardTemplate[];
    selectedTemplate: CardTemplate | null;
    onSelectTemplate: (template: CardTemplate) => void;
}

const TemplateCarousel: React.FC<TemplateCarouselProps> = ({ templates, selectedTemplate, onSelectTemplate }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Select Template</h3>
            <div className="flex space-x-3 overflow-x-auto pb-4 -mx-2 px-2">
                {templates.map(template => (
                    <HapticButton
                        key={template.id}
                        onClick={() => onSelectTemplate(template)}
                        style={springTransitionAll}
                        className={`w-20 h-28 rounded-xl flex-shrink-0 transform hover:scale-105 p-2 flex flex-col justify-end ${template.className} ${selectedTemplate?.id === template.id ? 'ring-4 ring-bamboo-8 ring-offset-2 ring-offset-bamboo-12' : 'ring-2 ring-white/20'}`}
                    >
                        <span className={`text-xs font-bold ${template.textColor}`}>{template.name}</span>
                    </HapticButton>
                ))}
            </div>
        </div>
    );
};

export default TemplateCarousel;
