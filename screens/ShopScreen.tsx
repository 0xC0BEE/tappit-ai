// Fix: Use namespace import for React to resolve JSX type errors.
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
        imageUrl: 'https://images.unsplash.com/photo-1618245318721-33329d94564c?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'prod_bamboo_10',
        name: 'Team Pack (10 Cards)',
        description: 'Equip your whole team with our premium bamboo cards. Includes branding.',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800&auto=format&fit=crop',
    }
];

const ShopScreen: React.FC = () => {
    // Fix: Use React.useState
    const [isCheckoutModalOpen, setCheckoutModalOpen] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

    const handleOrderNow = (product: Product) => {
        setSelectedProduct(product);
        setCheckoutModalOpen(true);
    };

    return (
        <>
            <div className="animate-scaleIn h-full flex flex-col gap-8">
                <header>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                        Shop Tappit Cards
                    </h1>
                    <p className="text-gray-300 text-lg mt-2">The physical bridge to your digital identity.</p>
                </header>

                <div className="flex-grow overflow-y-auto pr-2 pb-24 space-y-8">
                    {/* Hero Product Section */}
                    <div className="relative rounded-2xl overflow-hidden p-8 flex items-end h-64 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?q=80&w=1200&auto=format&fit=crop')"}}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="relative">
                            <h2 className="text-3xl font-bold text-white">The Bamboo Card</h2>
                            <p className="text-gray-200 mt-1">Sustainable. Smart. Unforgettable.</p>
                        </div>
                    </div>
                    
                    {/* Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    isOpen={isCheckoutModalOpen}
                    onClose={() => setCheckoutModalOpen(false)}
                    product={selectedProduct}
                />
            )}
        </>
    );
};

export default ShopScreen;
