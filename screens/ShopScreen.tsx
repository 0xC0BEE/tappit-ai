import * as React from 'react';
import ProductCard from '../components/shop/ProductCard.tsx';
import CheckoutModal from '../components/modals/CheckoutModal.tsx';
import { Product } from '../types.ts';

const products: Product[] = [
    {
        id: 'prod_bamboo_1',
        name: 'Standard Bamboo Card',
        description: 'Our classic, sustainable NFC-enabled card. Perfect for individuals.',
        price: 24.99,
        imageUrl: 'https://images.unsplash.com/photo-1618242261394-55613a1a67a0?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'prod_metal_1',
        name: 'Black Metal Card',
        description: 'Sleek, durable, and makes a statement. For the modern professional.',
        price: 49.99,
        imageUrl: 'https://images.unsplash.com/photo-1593431696279-d3521b4a4512?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'team_pack_5',
        name: 'Team Pack (5 Cards)',
        description: 'Equip your team with the future of networking. Includes 5 bamboo cards.',
        price: 99.99,
        imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop'
    }
];

const ShopScreen: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

    const handleOrderNow = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <>
            <div className="animate-scaleIn h-full flex flex-col">
                <header className="pb-8">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                        Shop
                    </h1>
                    <p className="text-gray-300 text-lg mt-2">Upgrade your networking game.</p>
                </header>

                <div className="flex-grow overflow-y-auto pr-2 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <ProductCard 
                                key={product.id}
                                product={product}
                                onOrderNow={() => handleOrderNow(product)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {selectedProduct && (
                <CheckoutModal
                    isOpen={!!selectedProduct}
                    onClose={handleCloseModal}
                    product={selectedProduct}
                />
            )}
        </>
    );
};

export default ShopScreen;
