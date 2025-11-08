
import * as React from 'react';

// Navigation
export type NavItem = 'Home' | 'Cards' | 'Network' | 'Team' | 'More';
export type Screen = 'Home' | 'Cards' | 'Network' | 'Team' | 'Analytics' | 'Shop' | 'Settings' | 'Profile' | 'Calendly Roulette' | 'Referral Giveaway';

// Card
export enum FieldType {
    Text = 'text',
    Video = 'video',
}

export interface CardField {
    id: string;
    label: string;
    value: string;
    icon: React.ElementType;
    fieldType: FieldType;
}

export interface CardTemplate {
    id: string;
    name: string;
    className: string;
    textColor: string;
}

// Contacts & Interactions
export enum InteractionType {
    Tap = 'Tap',
    Meeting = 'Meeting',
    Call = 'Call',
    Email = 'Email',
    Note = 'Note',
    GPSTap = 'GPS Tap',
    TreePlanted = 'Tree Planted',
}

export interface Interaction {
    id: string;
    date: string;
    type: InteractionType;
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
    calendly_url?: string;
    relationshipHealth: number;
}

// AI Studio & Gems
export interface GemDefinition {
    id: string;
    name: string;
    description: string;
    component: React.FC<any>;
    isCustom?: boolean;
    customComponentStr?: string;
}

export interface CustomGemComponentProps {
    jsxString: string | undefined;
}

// Team
export interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    taps: number;
    connections: number;
    leadScore: number;
}

export interface TeamActivity {
    id: string;
    member: {
        name: string;
        avatarUrl: string;
    };
    action: string;
    target: string;
    timestamp: string;
}

export interface BrandKit {
    id: string;
    primaryColor: string;
    font: string;
    logoUrl: string;
}

// Shop
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

// Meetings & AI Briefings
export interface Meeting {
    id: string;
    contactId: string;
    contactName: string;
    title: string;
    date: string;
}

export interface MeetingBriefing {
    lastConversationSummary: string;
    keyPersonalDetails: string[];
    suggestedTalkingPoints: string[];
}

// Leaderboard
export interface GreenStreakUser {
    user_id: string;
    streak_count: number;
    user: {
        name: string;
        avatarUrl: string;
    };
}
