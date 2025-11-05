import React from 'react';
import { CardTemplate } from '../types.ts';
import { springTransitionAll } from '../utils/spring.ts';

interface TemplateCarouselProps {
    templates: CardTemplate[];
    selectedTemplate: CardTemplate;
    onSelectTemplate: (template: CardTemplate) => void;
}

const TemplateCarousel: React.FC<TemplateCarouselProps> = ({ templates, selectedTemplate, onSelectTemplate }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Template</h3>
            <div className="flex space-x-3 overflow-x-auto pb-4 -mx-4 px-4">
                {templates.map(template => (
                    <button
                        key={template.id}
                        onClick={() => onSelectTemplate(template)}
                        style={springTransitionAll}
                        className={`w-20 h-28 rounded-xl flex-shrink-0 transform hover:scale-105 ${template.className} ${selectedTemplate.id === template.id ? 'ring-4 ring-bamboo-8 ring-offset-2 ring-offset-bamboo-12' : 'ring-2 ring-white/20'}`}
                    >
                        <div className="flex items-center justify-center h-full">
                             <span className={`text-xs font-bold ${template.textColor}`}>{template.name}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TemplateCarousel;