import * as React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver.ts';
import HapticButton from '../HapticButton.tsx';
import { CheckIcon } from '../icons.tsx';

interface PricingSectionProps {
    onSignUp: () => void;
}

const PricingCard: React.FC<{ title: string; price: string; description: string; features: string[]; isFeatured?: boolean; onSignUp: () => void; isVisible: boolean; delay: string; }> = ({ title, price, description, features, isFeatured, onSignUp, isVisible, delay }) => {
    const animationClass = `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${delay}`;

    return (
        <div className={`p-8 rounded-2xl border ${isFeatured ? 'bg-bamboo-11 border-bamboo-8' : 'bg-black/20 border-white/10'} ${animationClass}`}>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-gray-400 mt-2">{description}</p>
            <p className="text-5xl font-bold text-white my-6">{price}<span className="text-lg font-normal text-gray-400">/ month</span></p>
            <HapticButton
                onClick={onSignUp}
                className={`w-full font-bold py-3 px-6 rounded-full transition-colors ${isFeatured ? 'bg-bamboo-8 text-white shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
                Get Started
            </HapticButton>
            <ul className="mt-8 space-y-3 text-gray-300 text-left">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-bamboo-7 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const PricingSection: React.FC<PricingSectionProps> = ({ onSignUp }) => {
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

    return (
        <section ref={ref} id="pricing" className="py-20 lg:py-32">
            <div className="container mx-auto px-4 lg:px-8 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                    Pricing that Scales With You
                </h2>
                <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
                    Choose the plan that's right for you or your team. Start for free.
                </p>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <PricingCard
                        title="Starter"
                        price="$0"
                        description="For individuals getting started with smart networking."
                        features={['1 Digital Business Card', 'Basic Analytics', 'Standard Templates', 'QR Code Sharing']}
                        onSignUp={onSignUp}
                        isVisible={isVisible}
                        delay="delay-100"
                    />
                    <PricingCard
                        title="Pro"
                        price="$12"
                        description="For professionals who want to maximize their network."
                        features={['Everything in Starter, plus:', 'AI Studio Access', 'Advanced Analytics', 'Relationship Health Scores', 'Automated Follow-ups']}
                        isFeatured
                        onSignUp={onSignUp}
                        isVisible={isVisible}
                        delay="delay-200"
                    />
                     <PricingCard
                        title="Team"
                        price="Contact Us"
                        description="For organizations looking to network as one."
                        features={['Everything in Pro, plus:', 'Centralized Team Management', 'Brand Kit Customization', 'Team Performance Analytics', 'Bulk Card Assignment']}
                        onSignUp={onSignUp}
                        isVisible={isVisible}
                        delay="delay-300"
                    />
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
