import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

declare global {
    interface Window {
        Sentry?: any;
    }
}

// Initialize Sentry for error reporting (T-14)
if (window.Sentry) {
    window.Sentry.init({
        dsn: "https://examplePublicKey@o0.ingest.sentry.io/0", // Replace with your actual DSN
        integrations: [],
        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
        // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
        // Capture Replay for 10% of all sessions,
        // plus for 100% of sessions with an error
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
    });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

const AppWithErrorBoundary = () => {
    if (window.Sentry) {
        return (
            <window.Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
                <App />
            </window.Sentry.ErrorBoundary>
        );
    }
    return <App />;
};


root.render(
  <React.StrictMode>
    <AppWithErrorBoundary />
  </React.StrictMode>
);