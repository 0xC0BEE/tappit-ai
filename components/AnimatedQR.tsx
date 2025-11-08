import * as React from 'react';

// Assuming QRCode is loaded from CDN and available on window
declare global {
    interface Window {
        QRCode: any;
    }
}

interface AnimatedQRProps {
    value: string;
}

const AnimatedQR: React.FC<AnimatedQRProps> = ({ value }) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [showTexture, setShowTexture] = React.useState(false);

    React.useEffect(() => {
        if (canvasRef.current && window.QRCode) {
            window.QRCode.toCanvas(canvasRef.current, value, {
                width: 256,
                margin: 2,
                color: {
                    dark: '#FFFFFF',
                    light: '#00000000'
                }
            }, (error: Error) => {
                if (error) console.error(error);
            });
        }
    }, [value]);

    React.useEffect(() => {
        const timer = setTimeout(() => setShowTexture(true), 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-64 h-64 animate-scaleIn">
            <canvas ref={canvasRef} className={`w-full h-full transition-opacity duration-1000 ${showTexture ? 'opacity-0' : 'opacity-100'}`} />
            <div 
                className={`absolute inset-0 bg-cover bg-center rounded-2xl transition-opacity duration-1000 ${showTexture ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundImage: "url('https://picsum.photos/seed/bamboo/256/256')" }}
            ></div>
        </div>
    );
};

export default AnimatedQR;