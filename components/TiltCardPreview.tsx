import React, { useState } from 'react';
import useTilt from '../hooks/useTilt.ts';
import { CardTemplate, CardField, FieldType } from '../types.ts';
import { PlayIcon } from './icons.tsx';
import VideoPlayerModal from './modals/VideoPlayerModal.tsx';
import HapticButton from './HapticButton.tsx';

interface TiltCardPreviewProps {
    template: CardTemplate;
    fields: CardField[];
    name: string;
    title: string;
}

const TiltCardPreview: React.FC<TiltCardPreviewProps> = ({ template, fields, name, title }) => {
    const { ref, style } = useTilt();
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

    const handleVideoClick = (url: string) => {
        setSelectedVideoUrl(url);
        setIsVideoModalOpen(true);
    };

    const nameField = fields.find(f => f.label.toLowerCase().includes('name'))?.value || name;
    const titleField = fields.find(f => f.label.toLowerCase().includes('title'))?.value || title;

    return (
        <>
            <div className="flex justify-center items-center h-full perspective-1000">
                <div ref={ref} style={style} className="w-80 h-48 transform-style-3d">
                    <div className={`w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-2xl shadow-black/40 ${template.className} ${template.textColor}`}>
                        {/* Card Header */}
                        <div>
                            <h2 className="text-2xl font-bold">{nameField}</h2>
                            <p className="opacity-80">{titleField}</p>
                        </div>
                        
                        {/* Card Fields */}
                        <div className="flex flex-col items-start space-y-2">
                            {fields.map(field => {
                                if (field.fieldType === FieldType.Video && field.value) {
                                    return (
                                        <HapticButton key={field.id} onClick={() => handleVideoClick(field.value)} className="flex items-center space-x-2 text-left opacity-80 hover:opacity-100 transition-opacity">
                                            <PlayIcon className="w-4 h-4" />
                                            <span>Watch {field.label}</span>
                                        </HapticButton>
                                    );
                                }
                                if (field.fieldType === FieldType.Text && field.value && !['name', 'title'].some(t => field.label.toLowerCase().includes(t))) {
                                     const Icon = field.icon;
                                    return (
                                        <div key={field.id} className="flex items-center space-x-2 text-sm opacity-80">
                                            <Icon className="w-4 h-4" />
                                            <span>{field.value}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
            <VideoPlayerModal 
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                videoUrl={selectedVideoUrl}
            />
        </>
    );
};

export default TiltCardPreview;
