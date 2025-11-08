import * as React from 'react';

const IntroFooter: React.FC = () => {
    return (
        <footer className="bg-bamboo-11 border-t border-white/10">
            <div className="container mx-auto px-4 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">Tappit AI</h3>
                        <p className="text-gray-400 mt-2 text-sm">The Smart Business Card That Thinks.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white">Product</h4>
                        <ul className="mt-4 space-y-2 text-gray-400">
                            <li><a href="#features" className="hover:text-white">Features</a></li>
                            <li><a href="#teams" className="hover:text-white">For Teams</a></li>
                            <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white">Company</h4>
                        <ul className="mt-4 space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white">Legal</h4>
                        <ul className="mt-4 space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Tappit AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default IntroFooter;
