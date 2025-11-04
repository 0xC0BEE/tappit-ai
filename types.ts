// Fix: Import React to make its types available for global declarations.
import React from 'react';

// Add global declarations for third-party libraries to satisfy the type checker.
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'lottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                background?: string;
                speed?: string;
                loop?: boolean;
                autoplay?: boolean;
            };
        }
    }
    interface Window {
        // Assuming confetti.js is loaded from a CDN
        confetti: (opts: any) => void;
    }
}


export enum Tab {
    Home = 'Home',
    Cards = 'Cards',
    Network = 'Network',
    AI = 'AI',
    Team = 'Team',
}

export interface CardTemplate {
    id: string;
    name: string;
    className: string;
    textColor: string;
}

export enum FieldType {
    Text = 'text',
    Email = 'email',
    URL = 'url',
    Phone = 'tel',
}

export interface CardField {
    id: string;
    label: string;
    value: string;
    placeholder: string;
    type: FieldType;
}

export enum InteractionType {
    Tap = 'Tap',
    GPSTap = 'GPS Tap',
    Email = 'Email',
    Call = 'Call',
    Meeting = 'Meeting',
    Note = 'Note',
    TreePlanted = 'Tree Planted',
}

export interface Interaction {
    id: string;
    type: InteractionType;
    date: string;
    event?: string;
    location?: string;
    notes: string;
}

export interface Contact {
    id: string;
    name: string;
    title: string;
    company: string;
    photoUrl: string;
    lastInteraction: string;
    leadScore: number;
    interactions: Interaction[];
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    taps: number;
    connections: number;
    lastActive: string;
}

export interface TeamActivity {
    id: string;
    member: TeamMember;
    action: string;
    target: string;
    timestamp: string;
}

export interface BrandKit {
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
    font: string;
}

export interface AnalyticsData {
    taps: { current: number; previous: number; };
    connections: { current: number; previous: number; };
    leadScore: { current: number; previous: number; };
    carbonSaved: { current: number; previous: number; };
    tapLocations: { lat: number; lng: number; count: number }[];
    performance: { name: string; taps: number }[];
}