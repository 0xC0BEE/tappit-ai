import { useState, useEffect, useRef } from 'react';
import { teamMembers } from '../data/team.ts';

// --- Mock Supabase Client ---
// This is a lightweight, in-memory simulation of the Supabase Realtime client
// to demonstrate the "Live Cursors" feature without requiring actual credentials.

// A type for the cursor payload
export interface CursorPayload {
    userId: string;
    x: number; // percentage
    y: number; // percentage
}

// A mock channel that simulates subscriptions
class MockSupabaseChannel {
    private intervalId: number | null = null;
    private callback: (payload: { new: CursorPayload }) => void;

    constructor(callback: (payload: { new: CursorPayload }) => void) {
        this.callback = callback;
    }

    subscribe = () => {
        // Simulate receiving a new cursor position every 2 seconds
        this.intervalId = window.setInterval(() => {
            // Pick a random team member to move
            const randomMember = teamMembers[Math.floor(Math.random() * teamMembers.length)];
            
            const payload: CursorPayload = {
                userId: randomMember.id,
                x: Math.random() * 80 + 10, // Random X between 10% and 90%
                y: Math.random() * 80 + 10, // Random Y between 10% and 90%
            };

            this.callback({ new: payload });

        }, 2000);

        console.log("Mock Supabase channel subscribed.");

        return this;
    };

    unsubscribe = () => {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log("Mock Supabase channel unsubscribed.");
        }
    };
}

// The main hook that provides access to our mock client
export const useSupabase = () => {
    const client = useRef({
        channel: (channelName: string) => ({
            on: (event: string, filter: any, callback: (payload: any) => void) => {
                 return new MockSupabaseChannel(callback);
            }
        })
    });

    return client.current;
};
