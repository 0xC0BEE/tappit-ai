import * as React from 'react';
import { CustomGemComponentProps } from '../types.ts';

/**
 * A simple HTML sanitizer to mitigate XSS risks from AI-generated content.
 * This removes script tags, on* event handlers, and other common vectors.
 * WARNING: This is NOT a substitute for a full, production-grade sanitizer library
 * or a sandboxed environment. It's a critical first line of defense.
 */
const sanitizeHtml = (dirtyHtml: string | undefined): string => {
    if (!dirtyHtml) return '';
    let cleanHtml = dirtyHtml;
    // Remove script, iframe, object, embed tags and their content
    cleanHtml = cleanHtml.replace(/<(script|iframe|object|embed)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
    // Remove on* event handlers (e.g., onclick, onerror)
    cleanHtml = cleanHtml.replace(/\s(on\w+)=("([^"]*)"|'([^']*)'|[^\s>]+)/gi, '');
    // Remove href attributes that use javascript:
    cleanHtml = cleanHtml.replace(/href="javascript:[^"]*"/gi, 'href="#"');
    // Remove formaction attributes
    cleanHtml = cleanHtml.replace(/\s(formaction)=("([^"]*)"|'([^']*)'|[^\s>]+)/gi, '');
    return cleanHtml;
};

const CustomGemComponent: React.FC<CustomGemComponentProps> = ({ jsxString }) => {
    // WARNING: This component uses dangerouslySetInnerHTML. While the input is
    // sanitized to remove common XSS vectors, a full sandboxing solution (like a 
    // sandboxed iframe) is required for a production environment to be fully secure.
    
    const extractJSX = (code: string | undefined): string => {
        if (!code) return '';
        const match = code.match(/return\s*\(([\s\S]*?)\);?/s) || code.match(/=>\s*\(([\s\S]*?)\);?/s) || code.match(/=>\s*([\s\S]*)/s);
        if (match && match[1]) {
            let jsx = match[1].trim();
            if (jsx.endsWith(';')) {
                jsx = jsx.slice(0, -1);
            }
            return jsx;
        }
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