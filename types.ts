import type { FC, CSSProperties } from 'react';

// NOTE: Standard JSX types should now be resolved automatically by TypeScript.

export enum Tab {
    Home = 'Home',
    Cards = 'Cards',
    Network = 'Network',
    Shop = 'Shop',
    Team = 'Team',
}

export enum FieldType {
    Text = 'text',
    Video = 'video',
}

export interface CardField {
    id: string;
    label: string;
    value: string;
    icon: FC<{ className?: string; style?: CSSProperties }>;
    fieldType: FieldType;
}

export interface CardTemplate {
    id: string;
    name: string;
    className: string;
    textColor: string;
}

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
    notes: string;
    event?: string;
    location?: string;
}

export interface Contact {
    id: string;
    name: string;
    title: string;
    company: string;
    photoUrl: string;
    lastInteraction: string;
    relationshipHealth: number;
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
    leadScore: number;
}

export interface BrandKit {
    id: string;
    primaryColor: string;
    font: string;
    logoUrl: string;
}

export interface TeamActivity {
    id: string;
    member: { name: string; avatarUrl: string; };
    action: string;
    target: string;
    timestamp: string;
}

interface Stat {
    current: number;
    previous: number;
}

export interface AnalyticsData {
    taps: Stat;
    connections: Stat;
    leadScore: Stat;
    carbonSaved: Stat;
    tapLocations: { lat: number; lng: number; count: number }[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface GemDefinition {
    id: string;
    name: string;
    description: string;
    component: FC<any>;
    isCustom?: boolean;
    customComponentStr?: string;
}

export interface Meeting {
    id: string;
    title: string;
    contactName: string;
    contactId: string;
    date: string;
}

export interface MeetingBriefing {
    lastConversationSummary: string;
    keyPersonalDetails: string[];
    suggestedTalkingPoints: string[];
}

export interface CustomGemComponentProps {
    jsxString?: string;
}

export interface WeeklyInsightReport {
    performanceSummary: string;
    keyHighlight: string;
    aiCoaching: string;
    goalForNextWeek: string;
}