// Fix: Remove redundant triple-slash directive for React types.
import * as React from 'react';
import { CardField } from '../types.ts';
import HapticButton from './HapticButton.tsx';
import { PlusIcon } from './icons.tsx';
import FieldItem from './FieldItem.tsx';

interface DraggableFieldListProps {
    fields: CardField[];
    onFieldChange: (id: string, value: string) => void;
    onAddField: () => void;
    onRemoveField: (id: string) => void;
    isMobile?: boolean;
}

const DraggableFieldList: React.FC<DraggableFieldListProps> = ({ fields, onFieldChange, onAddField, onRemoveField, isMobile = false }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-white">Card Fields</h3>
                 {!isMobile && (
                    <HapticButton 
                        onClick={onAddField}
                        className="flex items-center space-x-1 text-bamboo-8 font-semibold text-sm"
                    >
                        <PlusIcon className="w-4 h-4" />
                        <span>Add</span>
                    </HapticButton>
                 )}
            </div>
            <div className="space-y-3">
                {fields.map(field => (
                    <FieldItem 
                        key={field.id}
                        field={field}
                        onFieldChange={onFieldChange}
                        onRemoveField={onRemoveField}
                        isMobile={isMobile}
                    />
                ))}
            </div>
        </div>
    );
};

export default DraggableFieldList;
