import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.tsx';

// FIX: Standard React entry point. Renders the main App component into the DOM.
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
