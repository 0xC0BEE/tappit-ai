import React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import { CardField, CardTemplate } from '../types.ts';
// Fix: Add file extension to satisfy bundler/type checker.
import useTilt from '../hooks/useTilt.ts';

interface TiltCardPreviewProps {
    fields: CardField[];
    template: CardTemplate;
}

const TiltCardPreview: React.FC<TiltCardPreviewProps> = ({ fields, template }) => {
    const { ref, style } = useTilt();
    const nameField = fields.find(f => f.label.toLowerCase().includes('name')) || { value: 'Your Name' };
    const titleField = fields.find(f => f.label.toLowerCase().includes('title')) || { value: 'Your Title' };

    return (
        <div ref={ref} style={style} className="w-80 h-48 transform-style-3d">
            <div className={`w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-2xl shadow-black/40 ${template.className} ${template.textColor}`}>
                <div>
                    <h2 className="text-2xl font-bold">{nameField.value}</h2>
                    <p className="opacity-80">{titleField.value}</p>
                </div>
                <div className="flex items-center space-x-2 self-end">
                    <div className={`w-4 h-4 rounded-full ${template.textColor.includes('white') ? 'bg-white/50' : 'bg-black/50'}`}></div>
                    <span className="font-bold text-lg">tappit</span>
                </div>
            </div>
        </div>
    );
};

export default TiltCardPreview;
