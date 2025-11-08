import * as React from 'react';
import { CardField, FieldType } from '../types.ts';
import HapticButton from './HapticButton.tsx';
import { CloseIcon } from './icons.tsx';
import SwipeableRow from './SwipeableRow.tsx';

interface FieldItemProps {
    field: CardField;
    onFieldChange: (id: string, value: string) => void;
    onRemoveField: (id: string) => void;
    isMobile: boolean;
}

const FieldItem: React.FC<FieldItemProps> = React.memo(({ field, onFieldChange, onRemoveField, isMobile }) => {
    const Icon = field.icon;
    
    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onFieldChange(field.id, e.target.value);
    }, [onFieldChange, field.id]);

    const fieldInput = (
         <div className="flex items-center space-x-2 w-full bg-black/20 p-2 rounded-lg">
            <Icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input 
                type={field.fieldType === FieldType.Video ? 'url' : 'text'}
                value={field.value}
                onChange={handleChange}
                placeholder={field.label}
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none truncate"
            />
            {!isMobile && (
                 <HapticButton onClick={() => onRemoveField(field.id)} className="text-gray-500 hover:text-white p-1">
                    <CloseIcon className="w-4 h-4" />
                </HapticButton>
            )}
        </div>
    );

    if (isMobile) {
        return (
            <SwipeableRow
                rightActions={
                    <HapticButton
                        onClick={() => onRemoveField(field.id)}
                        className="bg-red-600 text-white h-full px-4 flex items-center justify-center rounded-lg"
                    >
                        Delete
                    </HapticButton>
                }
            >
                {fieldInput}
            </SwipeableRow>
        );
    }

    return fieldInput;
});

export default FieldItem;
