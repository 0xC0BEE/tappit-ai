import React from 'react';
import { BrandKit } from '../../types.ts';

interface TeamCardPreviewProps {
    brandKit: BrandKit;
}

const TeamCardPreview: React.FC<TeamCardPreviewProps> = ({ brandKit }) => {
    const fontStyle: React.CSSProperties = {
        fontFamily: brandKit.font,
    };
    
    const colorStyle: React.CSSProperties = {
        color: brandKit.primaryColor,
    };

    return (
        <div 
            className="w-full h-24 rounded-lg p-3 flex items-center space-x-3"
            style={{ backgroundColor: 'rgba(0,0,0,0.3)'}}
        >
            <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center">
                 <img src={brandKit.logoUrl} alt="logo preview" className="w-8 h-8 object-contain" />
            </div>
            <div style={fontStyle}>
                <p className="font-bold text-white text-base">Alex Bamboo</p>
                <p className="text-sm" style={colorStyle}>Tappit AI</p>
            </div>
        </div>
    );
};

export default TeamCardPreview;
