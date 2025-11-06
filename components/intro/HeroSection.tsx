import React from 'react';
import TiltCardPreview from '../TiltCardPreview.tsx';
import HapticButton from '../HapticButton.tsx';
import { CardField, FieldType, CardTemplate } from '../../types.ts';
import { BriefcaseIcon, EmailIcon, PhoneIcon } from '../icons.tsx';

// Make component self-contained by defining static data locally.
const heroFields: CardField[] = [
    { id: 'f1', label: 'Name', value: 'Alex Bamboo', icon: BriefcaseIcon, fieldType: FieldType.Text },
    { id: 'f2', label: 'Title', value: 'Senior Strategic Advisor', icon: BriefcaseIcon, fieldType: FieldType.Text },
    { id: 'f3', label: 'Company', value: 'Tappit AI', icon: BriefcaseIcon, fieldType: FieldType.Text },
    { id: 'f4', label: 'Email', value: 'alex.b@tappit.ai', icon: EmailIcon, fieldType: FieldType.Text },
    { id: 'f5', label: 'Phone', value: '+1 234 567 8900', icon: PhoneIcon, fieldType: FieldType.Text },
];
const heroTemplate: CardTemplate = {
    id: 't-glass',
    name: 'Glass',
    className: 'bg-black/20 backdrop-blur-2xl border border-white/10',
    textColor: 'text-white',
};

interface HeroSectionProps {
    onSignUpClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSignUpClick }) => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10 w-full max-w-6xl mx-auto px-4">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                        Your Business Card is Now Intelligent
                    </h1>
                    <p className="text-gray-300 text-lg lg:text-xl mt-6 max-w-lg mx-auto lg:mx-0">
                        Stop collecting contacts. Start building relationships with a smart, sustainable card that works for you.
                    </p>
                    <HapticButton 
                        onClick={onSignUpClick}
                        className="mt-8 bg-bamboo-8 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors text-lg"
                    >
                        Create Your Free Card
                    </HapticButton>
                </div>
                <div className="hidden lg:flex justify-center items-center mt-10 lg:mt-0">
                     <TiltCardPreview 
                        template={heroTemplate}
                        fields={heroFields}
                        name="Alex Bamboo"
                        title="Senior Strategic Advisor"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
