import React from 'react';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { Product } from '../../types.ts';

interface ProductCardProps {
    product: Product;
    onOrderNow: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOrderNow }) => {
    return (
        <GlassCard className="overflow-hidden flex flex-col">
            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                <p className="text-sm text-gray-300 mt-1 flex-grow">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-2xl font-bold text-bamboo-7">${product.price.toFixed(2)}</p>
                    <HapticButton
                        onClick={onOrderNow}
                        className="bg-bamboo-8 text-white font-semibold py-2 px-4 rounded-full text-sm"
                    >
                        Order Now
                    </HapticButton>
                </div>
            </div>
        </GlassCard>
    );
};

export default ProductCard;