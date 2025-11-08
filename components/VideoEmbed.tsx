
// Fix: Change to namespace import to ensure JSX types are available globally.
import * as React from 'react';

interface VideoEmbedProps {
    url: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ url }) => {
    const getEmbedUrl = (videoUrl: string): string | null => {
        if (!videoUrl) return null;

        let videoId: string | null = null;
        
        // Fix: Updated YouTube Regex to be more robust and handle extra query parameters.
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
        const youtubeMatch = videoUrl.match(youtubeRegex);
        if (youtubeMatch) {
            videoId = youtubeMatch[1];
            return `https://www.youtube.com/embed/${videoId}`;
        }

        // Vimeo URL patterns
        const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)/;
        const vimeoMatch = videoUrl.match(vimeoRegex);
        if (vimeoMatch) {
            videoId = vimeoMatch[1];
            return `https://player.vimeo.com/video/${videoId}`;
        }

        return null;
    };

    const embedUrl = getEmbedUrl(url);

    if (!embedUrl) {
        return (
            <div className="aspect-video w-full rounded-lg bg-black/50 flex items-center justify-center border border-white/10">
                <div className="text-center p-2">
                    <p className="text-sm text-gray-300">Invalid or unsupported video URL.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded video"
            ></iframe>
        </div>
    );
};

export default VideoEmbed;