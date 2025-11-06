import React from 'react';
import { CardField, FieldType } from '../types.ts';
import HapticButton from './HapticButton.tsx';
import { PlusIcon, CloseIcon, LinkIcon } from './icons.tsx';

interface DraggableFieldListProps {
    fields: CardField[];
    setFields: React.Dispatch<React.SetStateAction<CardField[]>>;
}

const DraggableFieldList: React.FC<DraggableFieldListProps> = ({ fields, setFields }) => {

    const handleFieldChange = (id: string, value: string) => {
        setFields(prevFields => 
            prevFields.map(field => field.id === id ? { ...field, value } : field)
        );
    };

    const handleAddField = () => {
        const newField: CardField = {
            id: `field-${Date.now()}`,
            label: 'New Field',
            value: '',
            icon: LinkIcon, // Use a default icon
            fieldType: FieldType.Text,
        };
        setFields(prevFields => [...prevFields, newField]);
    };

    const handleRemoveField = (id: string) => {
        setFields(prevFields => prevFields.filter(field => field.id !== id));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-white">Card Fields</h3>
                 <HapticButton 
                    onClick={handleAddField}
                    className="flex items-center space-x-1 text-bamboo-8 font-semibold text-sm"
                >
                    <PlusIcon className="w-4 h-4" />
                    <span>Add</span>
                </HapticButton>
            </div>
            <div className="space-y-3">
                {fields.map(field => {
                    const Icon = field.icon;
                    return (
                        <div key={field.id} className="flex items-center space-x-2">
                            <Icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <input 
                                type={field.fieldType === FieldType.Video ? 'url' : 'text'}
                                value={field.value}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                placeholder={field.label}
                                className="w-full bg-white/10 p-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bamboo-8 truncate"
                            />
                            <HapticButton onClick={() => handleRemoveField(field.id)} className="text-gray-500 hover:text-white p-1">
                                <CloseIcon className="w-4 h-4" />
                            </HapticButton>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DraggableFieldList;