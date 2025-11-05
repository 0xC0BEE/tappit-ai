import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import HapticButton from './HapticButton.tsx';
import { ChevronDownIcon } from './icons.tsx';
import { springTransition } from '../utils/spring.ts';

interface SelectOption {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    
    const selectedOption = options.find(opt => opt.value === value);
    const displayLabel = selectedOption?.label || placeholder;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    
    useEffect(() => {
        if (isOpen && wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const DropdownPortal = () => ReactDOM.createPortal(
        <div 
            className="fixed z-[99] animate-fadeIn"
            style={{ top: position.top + 8, left: position.left, width: position.width }}
        >
            <div className="w-full bg-bamboo-12 border border-white/10 rounded-lg shadow-lg overflow-hidden">
                <ul className="max-h-60 overflow-y-auto">
                    {options.map(option => (
                        <li key={option.value}>
                            <HapticButton
                                onClick={() => handleSelect(option.value)}
                                className={`w-full text-left p-3 text-sm transition-colors ${
                                    value === option.value 
                                        ? 'bg-bamboo-8 text-white' 
                                        : 'text-gray-300 hover:bg-white/5'
                                }`}
                            >
                                {option.label}
                            </HapticButton>
                        </li>
                    ))}
                </ul>
            </div>
        </div>,
        document.body
    );

    return (
        <div className="relative" ref={wrapperRef}>
            <HapticButton
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white/5 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-bamboo-8 flex justify-between items-center text-left"
            >
                <span className={selectedOption ? 'text-white' : 'text-gray-400'}>
                    {displayLabel}
                </span>
                <ChevronDownIcon 
                    className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    style={springTransition}
                />
            </HapticButton>
            {isOpen && <DropdownPortal />}
        </div>
    );
};

export default CustomSelect;