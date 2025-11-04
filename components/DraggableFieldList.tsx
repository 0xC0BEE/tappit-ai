import React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import { CardField } from '../types.ts';
// Fix: Add file extension to satisfy bundler/type checker.
import GlassCard from './GlassCard.tsx';
// Fix: Add file extension to satisfy bundler/type checker.
import { ChevronUpIcon, ChevronDownIcon } from './icons.tsx';

interface DraggableFieldListProps {
    fields: CardField[];
    onFieldsChange: (fields: CardField[]) => void;
}

const DraggableFieldList: React.FC<DraggableFieldListProps> = ({ fields, onFieldsChange }) => {

    const handleFieldChange = (id: string, value: string) => {
        const newFields = fields.map(field => field.id === id ? { ...field, value } : field);
        onFieldsChange(newFields);
    };
    
    const moveField = (index: number, direction: 'up' | 'down') => {
        const newFields = [...fields];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex >= 0 && targetIndex < newFields.length) {
            [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
            onFieldsChange(newFields);
        }
    };

    return (
        <GlassCard className="p-4 space-y-4">
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-2">
                    <div className="flex-grow">
                        <label className="text-xs text-gray-400 font-semibold ml-2">{field.label}</label>
                        <input
                            type="text"
                            value={field.value}
                            placeholder={field.placeholder}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            className="w-full bg-white/10 text-white placeholder-gray-500 rounded-lg p-2 border border-transparent focus:border-bamboo-8 focus:ring-0 focus:outline-none transition"
                        />
                    </div>
                    <div className="flex flex-col">
                        <button onClick={() => moveField(index, 'up')} disabled={index === 0} className="p-1 rounded-md hover:bg-white/20 disabled:opacity-30">
                            <ChevronUpIcon className="w-5 h-5"/>
                        </button>
                        <button onClick={() => moveField(index, 'down')} disabled={index === fields.length - 1} className="p-1 rounded-md hover:bg-white/20 disabled:opacity-30">
                            <ChevronDownIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </GlassCard>
    );
};

export default DraggableFieldList;