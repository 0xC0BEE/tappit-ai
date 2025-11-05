// Fix: Explicitly include React's global JSX definitions to fix missing element types.
// Fix: The /// <reference types="react" /> directive that was here caused a build error and has been removed.
// The `import React from 'react';` statement below correctly includes the necessary types for a module.

// This file provides TypeScript definitions for the <lottie-player> web component,
// allowing it to be used in JSX without causing type errors.
// Fix: Add an import to ensure this file is treated as a module and
// React's types are available. Wrap the JSX namespace in `declare global`
// to correctly augment the global JSX definitions instead of overwriting them.
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          background?: string;
          speed?: string;
          loop?: boolean;
          autoplay?: boolean;
          // Add any other lottie-player specific attributes if needed in the future
        },
        HTMLElement
      >;
    }
  }
}
