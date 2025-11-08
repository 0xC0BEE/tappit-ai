// Fix: Re-implement the component to resolve corruption and "not a module" errors.
import * as React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver.ts';
import HapticButton from '../HapticButton.tsx';
import { CheckIcon } from '../icons.tsx';

interface PricingSectionProps {
    onSignUp: () => void;
}

const PricingTier: React.FC<{
    name: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    isFeatured?: boolean;
    onSignUp: () => void;
    isVisible: boolean;
    delay: string;
}> = ({ name, price, period = '/ month', description, features, isFeatured, onSignUp, isVisible, delay }) => {
    const animationClass = `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${delay}`;
    
    return (
        <div className={`p-8 rounded-2xl border flex flex-col ${isFeatured ? 'bg-bamboo-9/20 border-bamboo-8' : 'bg-black/20 border-white/10'} ${animationClass}`}>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-gray-400 mt-2">{description}</p>
            <div className="mt-6">
                <span className="text-5xl font-bold text-white">{price}</span>
                {price !== 'Free' && <span className="text-gray-400">{period}</span>}
            </div>
            <ul className="mt-8 space-y-4 text-gray-300 flex-grow">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-bamboo-7 flex-shrink-0 mr-3 mt-1" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <HapticButton 
                onClick={onSignUp}
                className={`w-full mt-10 font-bold py-3 px-6 rounded-full transition-colors ${isFeatured ? 'bg-bamboo-8 text-white shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
                {name === 'Starter' ? 'Get Started' : 'Choose Plan'}
            </HapticButton>
        </div>
    );
};

const PricingSection: React.FC<PricingSectionProps> = ({ onSignUp }) => {
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
    
    const getAnimationClass = (delay: string) => {
        return `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${delay}`;
    };

    return (
        <section ref={ref} id="pricing" className="py-20 lg:py-32">
            <div className="container mx-auto px-4 lg:px-8">
                <div className={`text-center max-w-2xl mx-auto ${getAnimationClass('')}`}>
                    <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                        Find a Plan That's Right For You
                    </h2>
                    <p className="text-gray-300 text-lg mt-4">
                        Whether you're an individual or a growing team, we have a plan that fits your needs.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <PricingTier
                        name="Starter"
                        price="Free"
                        description="For individuals getting started with smart networking."
                        features={[
                            '1 Digital Business Card',
                            'Basic Analytics',
                            'Standard Card Templates',
                            'Contact Management',
                        ]}
                        onSignUp={onSignUp}
                        isVisible={isVisible}
                        delay="delay-200"
                    />
                    <PricingTier
                        name="Pro"
                        price="$12"
                        description="For professionals who want to unlock the full power of AI."
                        features={[
                            'Everything in Starter, plus:',
                            'AI Studio & Custom Gems',
                            'Advanced Analytics & Insights',
                            'Automated Follow-ups',
                            'Premium Card Templates',
                        ]}
                        isFeatured={true}
                        onSignUp={onSignUp}
                        isVisible={isVisible}
                        delay="delay-300"
                    />
                    <PricingTier
                        name="Team"
                        price="Contact Us"
                        period=""
                        description="For organizations looking to supercharge their team's networking."
                        features={[
                            'Everything in Pro, plus:',
                            'Centralized Team Management',
                            'Team Analytics & Leaderboards',
                            'Brand Kit Customization',
                            'Bulk Actions & Integrations',
                        ]}
                        onSignUp={onSignUp}
                        isVisible={isVisible}
                        delay="delay-400"
                    />
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
