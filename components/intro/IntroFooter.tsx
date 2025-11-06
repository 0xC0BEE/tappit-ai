import React from 'react';

const IntroFooter: React.FC = () => {
    return (
        <footer className="w-full text-center p-8 border-t border-white/10 mt-20">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Tappit AI. All rights reserved.</p>
        </footer>
    );
};

export default IntroFooter;
