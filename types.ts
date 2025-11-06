import React from 'react';

// From App.tsx
export enum Tab {
    Home = 'Home',
    Cards = 'Cards',
    Network = 'Network',
    Shop = 'Shop',
    Team = 'Team',
}

// From CardBuilderScreen.tsx and related components
export enum FieldType {
    Text = 'text',
    Video = 'video',
}

export interface CardField {
    id: string;
    label: string;
    value: string;
    icon: React.FC<{ className?: string }>;
    fieldType: FieldType;
}

export interface CardTemplate {
    id: string;
    name: string;
    className: string;
    textColor: string;
}

// From NetworkScreen.tsx and related components
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

// From GemSidebar.tsx and gems
export interface GemDefinition {
    id: string;
    name: string;
    description: string;
    component: React.FC<any>;
    isCustom?: boolean;
    customComponentStr?: string;
}

// From gems/CustomGemComponent.tsx
export interface CustomGemComponentProps {
    jsxString?: string;
}

// From TeamScreen.tsx and related components
export interface TeamMember {
    id: string;
    name: string;
    avatarUrl: string;
    role: string;
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
    logoUrl: string;
    primaryColor: string;
    font: string;
}

// From AnalyticsScreen.tsx and data/analytics.ts
export interface AnalyticsData {
    taps: { current: number; previous: number };
    connections: { current: number; previous: number };
    leadScore: { current: number; previous: number };
    carbonSaved: { current: number; previous: number };
    tapLocations: { lat: number; lng: number; count: number }[];
    performance: { name: string; taps: number }[];
}

// From ShopScreen.tsx
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}
