// Fix: Add file extension to satisfy bundler/type checker.
import { Contact, InteractionType } from "../types.ts";

export const contacts: Contact[] = [
    {
        id: 'c1',
        name: 'Jane Doe',
        title: 'CEO',
        company: 'Innovate Inc.',
        photoUrl: 'https://picsum.photos/seed/jane/200',
        lastInteraction: '2 days ago',
        leadScore: 95,
        interactions: [
            { id: 'i1', type: InteractionType.GPSTap, date: '2024-07-28', event: 'TechCrunch 2024', location: 'San Francisco, CA', notes: 'First tap at the main conference hall.' },
            { id: 'i2', type: InteractionType.Email, date: '2024-07-29', notes: 'Sent follow-up email with proposal.' },
            { id: 'i6', type: InteractionType.TreePlanted, date: '2024-08-05', notes: 'A tree was planted in your honor for a 7-day streak.', event: 'Madagascar' },

        ],
    },
    {
        id: 'c2',
        name: 'John Smith',
        title: 'Lead Developer',
        company: 'CodeCrafters',
        photoUrl: 'https://picsum.photos/seed/john/200',
        lastInteraction: '1 week ago',
        leadScore: 82,
        interactions: [
            { id: 'i3', type: InteractionType.Meeting, date: '2024-07-22', location: 'Virtual', notes: 'Discussed technical integration.' },
        ],
    },
    {
        id: 'c3',
        name: 'Alex Ray',
        title: 'Venture Capitalist',
        company: 'Future Ventures',
        photoUrl: 'https://picsum.photos/seed/alex/200',
        lastInteraction: '3 weeks ago',
        leadScore: 75,
        interactions: [
            { id: 'i4', type: InteractionType.Tap, date: '2024-07-05', event: 'Founders Meetup', notes: 'Pitched Tappit AI.' },
        ],
    },
    {
        id: 'c4',
        name: 'Emily White',
        title: 'Marketing Director',
        company: 'Growth Gurus',
        photoUrl: 'https://picsum.photos/seed/emily/200',
        lastInteraction: '1 month ago',
        leadScore: 68,
        interactions: [
            { id: 'i5', type: InteractionType.Call, date: '2024-06-25', notes: 'Initial discovery call.' },
        ],
    },
];
