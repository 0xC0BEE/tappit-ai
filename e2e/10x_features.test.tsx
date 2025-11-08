import { describe, test, expect, jest } from '@jest/globals';
import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mocking APIs not available in JSDOM
// @ts-ignore
global.navigator.vibrate = jest.fn();
// @ts-ignore
window.alert = jest.fn();

import GreenStreakLeaderboardScreen from '../apps/expo/screens/GreenStreakLeaderboardScreen.tsx';
import CalendlyRouletteGem from '../apps/expo/screens/CalendlyRouletteGem.tsx';

describe('E2E: 10X Feature Flows', () => {
  test('Green Streak Leaderboard correctly loads and highlights the current user', async () => {
    render(<GreenStreakLeaderboardScreen />);

    // Initially, it should show a loading state
    expect(screen.getByText('Loading Leaderboard...')).toBeInTheDocument();

    // After the mock API call resolves, the leaderboard should be visible
    await waitFor(() => {
      expect(screen.getByText('Green Streak Leaderboard')).toBeInTheDocument();
      // Check if the top user is displayed
      expect(screen.getByText('Alex Bamboo')).toBeInTheDocument();
    }, { timeout: 2000 }); // Increase timeout to allow for simulated API delay

    // Find the list item containing "Alex Bamboo" (the current user)
    const currentUserItem = screen.getByText('Alex Bamboo').closest('li');
    
    // Assert that the current user's item is highlighted
    // In our component, this is done by checking for the 'bg-bamboo-9/50' class
    expect(currentUserItem).toHaveClass('bg-bamboo-9/50');

    // Assert another user is not highlighted
    const anotherUserItem = screen.getByText('Jane Doe').closest('li');
    expect(anotherUserItem).not.toHaveClass('bg-bamboo-9/50');
  });

  test('Calendly Roulette Gem correctly suggests a contact after spinning', async () => {
    render(<CalendlyRouletteGem />);

    // Verify the initial state
    expect(screen.getByText('Reconnect Roulette')).toBeInTheDocument();
    const spinButton = screen.getByRole('button', { name: /Spin the Wheel/i });
    expect(spinButton).toBeInTheDocument();

    // Click the button to get a suggestion
    fireEvent.click(spinButton);

    // Verify the loading state appears
    await waitFor(() => {
        expect(screen.getByText(/Finding a cold contact to reconnect with/i)).toBeInTheDocument();
    });

    // After the mock AI/API call, assert that a contact card is displayed
    // The mock Supabase service will return 'Michael Scott' as the cold contact
    await waitFor(() => {
        expect(screen.getByText('Michael Scott')).toBeInTheDocument();
        expect(screen.getByText(/It's been a while! Let's reconnect./i)).toBeInTheDocument();
    }, { timeout: 3000 }); // Increase timeout for the simulated AI delay

    // Verify the "Book Meeting" button is now visible
    const bookButton = screen.getByRole('button', { name: /Book Meeting/i });
    expect(bookButton).toBeInTheDocument();
  });
});
