// A simple wrapper for our PostHog analytics client.
// This centralizes our tracking events and ensures we don't call PostHog if it hasn't loaded.

declare global {
    interface Window {
        posthog?: any;
    }
}

/**
 * Tracks the successful completion of the onboarding flow.
 */
export const trackOnboardingComplete = () => {
    if (window.posthog) {
        window.posthog.capture('onboarding_completed');
    } else {
        console.log("Analytics: Onboarding Completed");
    }
};

/**
 * Tracks when a user shares their card.
 * @param method - The method used for sharing (e.g., 'copy_link').
 */
export const trackCardShared = (method: 'copy_link' | 'qr_code') => {
    if (window.posthog) {
        window.posthog.capture('card_shared', { share_method: method });
    } else {
        console.log(`Analytics: Card Shared via ${method}`);
    }
};