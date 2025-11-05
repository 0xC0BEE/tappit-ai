import React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import { CustomGemComponentProps } from '../types.ts';

const CustomGemComponent: React.FC<CustomGemComponentProps> = ({ jsxString }) => {
    // WARNING: This is a simplified implementation for demonstration.
    // In a production app, rendering user-generated or AI-generated JSX/HTML
    // requires a secure sandboxing approach to prevent XSS vulnerabilities
    // and to properly handle React component rendering. A library like
    // react-jsx-parser or a server-side rendering solution would be more appropriate.

    // For this example, we'll use dangerouslySetInnerHTML to render the
    // HTML structure and apply Tailwind classes. This will not execute
    // any JavaScript or render nested React components within the string.
    
    // A simple function to strip the outer React component definition if the AI includes it.
    const extractJSX = (code: string | undefined): string => {
        if (!code) return '';
        // Try to find content within return(...) or => (...)
        const match = code.match(/return\s*\(([\s\S]*?)\);?/s) || code.match(/=>\s*\(([\s\S]*?)\);?/s) || code.match(/=>\s*([\s\S]*)/s);
        if (match && match[1]) {
            let jsx = match[1].trim();
            // remove trailing semicolon if it exists
            if (jsx.endsWith(';')) {
                jsx = jsx.slice(0, -1);
            }
            return jsx;
        }
        // If no function wrapper is found, assume the entire string is the JSX to be rendered.
        return code;
    };
    
    const cleanHtmlString = extractJSX(jsxString);

    return (
        <div className="p-2 bg-black/20 rounded-lg border border-white/10">
            <div dangerouslySetInnerHTML={{ __html: cleanHtmlString }} />
        </div>
    );
};

export default CustomGemComponent;
