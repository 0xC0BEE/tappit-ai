// Fix: Corrected import path for types.
import { TeamMember, TeamActivity, BrandKit } from '../types.ts';

export const teamMembers: TeamMember[] = [
    { id: 'tm1', name: 'Michael Scott', avatarUrl: 'https://picsum.photos/seed/michael/200', role: 'Regional Manager', taps: 102, connections: 45, leadScore: 88 },
    { id: 'tm2', name: 'Dwight Schrute', avatarUrl: 'https://picsum.photos/seed/dwight/200', role: 'Sales Rep', taps: 153, connections: 62, leadScore: 92 },
    { id: 'tm3', name: 'Jim Halpert', avatarUrl: 'https://picsum.photos/seed/jim/200', role: 'Sales Rep', taps: 98, connections: 41, leadScore: 85 },
    { id: 'tm4', name: 'Pam Beesly', avatarUrl: 'https://picsum.photos/seed/pam/200', role: 'Office Administrator', taps: 55, connections: 25, leadScore: 78 },
];

export const teamActivities: TeamActivity[] = [
    { id: 'ta1', member: { name: 'Dwight Schrute', avatarUrl: 'https://picsum.photos/seed/dwight/200' }, action: 'connected with', target: 'John Smith', timestamp: '2 hours ago' },
    { id: 'ta2', member: { name: 'Michael Scott', avatarUrl: 'https://picsum.photos/seed/michael/200' }, action: 'updated the', target: 'Brand Kit', timestamp: '5 hours ago' },
    { id: 'ta3', member: { name: 'Jim Halpert', avatarUrl: 'https://picsum.photos/seed/jim/200' }, action: 'had a 7-day streak and', target: 'planted a tree', timestamp: '1 day ago' },
    { id: 'ta4', member: { name: 'Pam Beesly', avatarUrl: 'https://picsum.photos/seed/pam/200' }, action: 'exported team data to', target: 'CSV', timestamp: '2 days ago' },
];

export const brandKit: BrandKit = {
    logoUrl: '/logo-placeholder.svg',
    primaryColor: '#33a14d',
    font: 'Roboto',
};