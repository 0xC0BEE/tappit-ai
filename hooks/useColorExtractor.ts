import { useState, useEffect } from 'react';

const useColorExtractor = (imageUrl: string) => {
    const [color, setColor] = useState<string | null>(null);

    useEffect(() => {
        if (!imageUrl) return;

        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const size = 20; // Sample size
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.drawImage(img, 0, 0, size, size);
            
            try {
                const imageData = ctx.getImageData(0, 0, size, size).data;
                let r = 0, g = 0, b = 0;
                let count = 0;

                for (let i = 0; i < imageData.length; i += 4) {
                    // Ignore transparent pixels
                    if(imageData[i + 3] > 128) {
                        r += imageData[i];
                        g += imageData[i + 1];
                        b += imageData[i + 2];
                        count++;
                    }
                }
                
                if (count > 0) {
                    r = Math.floor(r / count);
                    g = Math.floor(g / count);
                    b = Math.floor(b / count);
                    setColor(`rgb(${r}, ${g}, ${b})`);
                } else {
                     setColor(null); // All pixels were transparent
                }
            } catch (error) {
                console.error("Could not get image data for color extraction.", error);
                setColor(null);
            }
        };
        
        img.onerror = () => {
            console.error("Failed to load image for color extraction.");
            setColor(null);
        };

    }, [imageUrl]);

    return color;
};

export default useColorExtractor;
