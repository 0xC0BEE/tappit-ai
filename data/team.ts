// Fix: Add file extension to satisfy bundler/type checker.
import { TeamMember, TeamActivity, BrandKit } from "../types.ts";

export const teamMembers: TeamMember[] = [
    { id: 'tm1', name: 'Michael Scott', role: 'Regional Manager', avatarUrl: 'https://picsum.photos/seed/michael/100', taps: 102, connections: 45, lastActive: '2h ago' },
    { id: 'tm2', name: 'Dwight Schrute', role: 'Sales Rep', avatarUrl: 'https://picsum.photos/seed/dwight/100', taps: 250, connections: 98, lastActive: '5m ago' },
    { id: 'tm3', name: 'Jim Halpert', role: 'Sales Rep', avatarUrl: 'https://picsum.photos/seed/jim/100', taps: 180, connections: 75, lastActive: '30m ago' },
    { id: 'tm4', name: 'Pam Beesly', role: 'Office Administrator', avatarUrl: 'https://picsum.photos/seed/pam/100', taps: 88, connections: 60, lastActive: '1h ago' },
];

export const teamActivity: TeamActivity[] = [
    { id: 'ta1', member: teamMembers[1], action: 'added a new connection', target: 'David Wallace', timestamp: '5m ago' },
    { id: 'ta2', member: teamMembers[2], action: 'updated their card', target: 'Sales Card', timestamp: '28m ago' },
    { id: 'ta3', member: teamMembers[0], action: 'tapped with', target: 'Jan Levinson', timestamp: '2h ago' },
    { id: 'ta4', member: teamMembers[3], action: 'shared their card link', target: 'with Roy Anderson', timestamp: '4h ago' },
];

export const brandKit: BrandKit = {
    logoUrl: '/logo-placeholder.svg', // In a real app, this would be a real path
    primaryColor: '#16A34A', // bamboo-8
    secondaryColor: '#ca8a04', // A shade of yellow
    font: 'Inter, sans-serif',
};
