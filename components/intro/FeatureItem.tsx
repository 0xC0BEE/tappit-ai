import * as React from 'react';

interface FeatureItemProps {
    icon: React.ElementType;
    title: string;
    text: string;
    isVisible: boolean;
    delay: string;
    align?: 'left' | 'right';
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, text, isVisible, delay, align = 'left' }) => {
    const animationClass = `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${delay}`;
    const textAlignClass = align === 'right' ? 'lg:text-right' : 'text-left';
    const itemAlignClass = align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row';
    const textSpacingClass = align === 'right' ? 'space-x-reverse' : 'space-x-4';

    return (
        <div className={`flex items-start ${textAlignClass} ${itemAlignClass} ${animationClass} ${textSpacingClass}`}>
            <div className="flex-shrink-0 p-3 bg-white/10 rounded-full">
                <Icon className="w-6 h-6 text-bamboo-7" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-gray-400 mt-1">{text}</p>
            </div>
        </div>
    );
};

export default FeatureItem;
