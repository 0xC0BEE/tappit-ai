// e2e/onboarding.test.tsx
// This file represents an end-to-end test for the user onboarding flow.
// It uses a syntax similar to Jest and React Testing Library for clarity.

// Note: To run this test, a testing environment like Jest with JSDOM
// and React Testing Library would need to be configured for the project.

// Fix: Import test runner globals to satisfy TypeScript.
import { describe, test, expect, jest } from '@jest/globals';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App.tsx'; // Assuming the test runner is configured for this relative path

// Mocking APIs not available in JSDOM
// @ts-ignore
global.navigator.vibrate = jest.fn();

describe('E2E: Onboarding Flow', () => {
  test('allows a user to complete the multi-step onboarding and land on the home screen', async () => {
    // 1. Render the application. The app should start in the onboarding state.
    render(<App />);

    // 2. Verify we are on the first step of onboarding.
    expect(screen.getByText('Welcome to Tappit AI')).toBeInTheDocument();

    // 3. Find and click the "Next" button to proceed to step 2.
    const nextButtonStep1 = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButtonStep1);

    // 4. Verify we are on the second step.
    // Using findBy queries to handle potential async rendering of steps.
    await waitFor(() => {
        expect(screen.getByText(/One tap →/i)).toBeInTheDocument();
    });

    // 5. Find and click the "Next" button again to proceed to step 3.
    const nextButtonStep2 = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButtonStep2);

    // 6. Verify we are on the final step.
    await waitFor(() => {
        expect(screen.getByText('Your card is ready to share.')).toBeInTheDocument();
    });
    
    // 7. Find and click the "Finish" button to complete onboarding.
    const finishButton = screen.getByRole('button', { name: /Finish/i });
    fireEvent.click(finishButton);

    // 8. Assert that the home screen is now visible by looking for its unique heading.
    await waitFor(() => {
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    });

    // 9. Assert that the onboarding screen is no longer present.
    expect(screen.queryByText('Welcome to Tappit AI')).not.toBeInTheDocument();
  });
});