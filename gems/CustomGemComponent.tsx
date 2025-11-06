import React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import { CustomGemComponentProps } from '../types.ts';

/**
 * A simple HTML sanitizer to mitigate XSS risks from AI-generated content.
 * This removes script tags and on* event handlers.
 */
const sanitizeHtml = (dirtyHtml: string | undefined): string => {
    if (!dirtyHtml) return '';
    let cleanHtml = dirtyHtml;
    // Remove script tags and their content
    cleanHtml = cleanHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    // Remove on* event handlers (e.g., onclick, onerror)
    cleanHtml = cleanHtml.replace(/\s(on\w+)=("([^"]*)"|'([^']*)'|[^\s>]+)/gi, '');
    return cleanHtml;
};

const CustomGemComponent: React.FC<CustomGemComponentProps> = ({ jsxString }) => {
    // WARNING: This component uses dangerouslySetInnerHTML. While the input is
    // sanitized to remove common XSS vectors like <script> tags and on* handlers,
    // a full sandboxing solution (like an iframe or a robust JSX parser) would be
    // required for a production environment to be fully secure.
    
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
    
    const sanitizedHtmlString = sanitizeHtml(extractJSX(jsxString));

    return (
        <div className="p-2 bg-black/20 rounded-lg border border-white/10">
            <div dangerouslySetInnerHTML={{ __html: sanitizedHtmlString }} />
        </div>
    );
};

export default CustomGemComponent;