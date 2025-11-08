// This file mocks the Supabase client for local development without needing a live backend.
// It simulates the Supabase API, including authentication and database queries.

import { BriefcaseIcon, EmailIcon, PhoneIcon, LinkIcon, MapPinIcon, PlayIcon, HomeIcon, CardIcon, NetworkIcon, TeamIcon } from '../components/icons.tsx';
import { FieldType, InteractionType } from '../types.ts';

const MOCK_DATA = {
    'card_fields': [
        { id: 'f1', label: 'Name', value: 'Alex Bamboo', icon: BriefcaseIcon, fieldType: FieldType.Text },
        { id: 'f2', label: 'Title', value: 'Senior Strategic Advisor', icon: BriefcaseIcon, fieldType: FieldType.Text },
        { id: 'f3', label: 'Company', value: 'Tappit AI', icon: BriefcaseIcon, fieldType: FieldType.Text },
        { id: 'f4', label: 'Email', value: 'alex.b@tappit.ai', icon: EmailIcon, fieldType: FieldType.Text },
        { id: 'f5', label: 'Phone', value: '+1 234 567 8900', icon: PhoneIcon, fieldType: FieldType.Text },
        { id: 'f6', label: 'Website', value: 'tappit.ai', icon: LinkIcon, fieldType: FieldType.Text },
        { id: 'f7', label: 'Location', value: 'Bamboo Forest, Bali', icon: MapPinIcon, fieldType: FieldType.Text },
        { id: 'f8', label: 'Intro Video', value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', icon: PlayIcon, fieldType: FieldType.Video },
    ],
    'card_templates': [
        { id: 't1', name: 'Emerald', className: 'bg-emerald-500', textColor: 'text-white' },
        { id: 't2', name: 'Forest', className: 'bg-green-800', textColor: 'text-white' },
        { id: 't3', name: 'Mint', className: 'bg-green-200', textColor: 'text-black' },
        { id: 't4', name: 'Charcoal', className: 'bg-gray-800', textColor: 'text-white' },
        { id: 't5', name: 'Jade', className: 'bg-teal-600', textColor: 'text-white' },
    ],
    'contacts': [
        { id: 'c1', name: 'John Smith', title: 'Lead Developer', company: 'CodeCrafters', photoUrl: 'https://api.dicebear.com/8.x/initials/png?seed=John%20Smith', lastInteraction: '2 days ago', relationshipHealth: 0.9, leadScore: 92, last_interaction_date: '2025-11-03', calendly_url: 'https://calendly.com/john-smith', interactions: [
            { id: 'i1', type: InteractionType.Meeting, date: '2024-07-22', notes: 'Discussed technical integration.', event: 'Project Kickoff', location: 'Virtual' }
        ]},
        { id: 'c2', name: 'Jane Doe', title: 'Product Manager', company: 'Innovate Inc.', photoUrl: 'https://api.dicebear.com/8.x/initials/png?seed=Jane%20Doe', lastInteraction: '1 week ago', relationshipHealth: 0.6, leadScore: 78, last_interaction_date: '2025-10-28', calendly_url: 'https://calendly.com/jane-doe', interactions: [] },
        { id: 'c3', name: 'Michael Scott', title: 'Regional Manager', company: 'Dunder Mifflin', photoUrl: 'https://api.dicebear.com/8.x/initials/png?seed=Michael%20Scott', lastInteraction: '3 weeks ago', relationshipHealth: 0.2, leadScore: 45, last_interaction_date: '2025-10-14', calendly_url: null, interactions: [] },
    ],
    'team_members': [
        { id: 'tm1', name: 'Alex Bamboo', role: 'Admin', avatarUrl: 'https://api.dicebear.com/8.x/initials/png?seed=Alex%20Bamboo', taps: 128, connections: 42, leadScore: 85 },
        { id: 'tm2', name: 'Michael Scott', role: 'Member', avatarUrl: 'https://api.dicebear.com/8.x/initials/png?seed=Michael%20Scott', taps: 75, connections: 21, leadScore: 70 },
        { id: 'tm3', name: 'Jane Doe', role: 'Member', avatarUrl: 'https://api.dicebear.com/8.x/initials/png?seed=Jane%20Doe', taps: 98, connections: 33, leadScore: 79 },
    ],
    'brand_kit': [{ id: 'bk1', primaryColor: '#22c55e', font: 'Roboto', logoUrl: 'https://tailwindui.com/img/logos/mark.svg?color=green&shade=500' }],
    'team_activities': [
        { id: 'a1', member: { name: 'Michael Scott', avatarUrl: 'https://api.dicebear.com/8.x/initials/png?seed=Michael%20Scott' }, action: 'added a new contact', target: 'David Wallace', timestamp: '2 hours ago' },
    ],
    'analytics': [{ taps: {current: 128, previous: 95}, connections: {current: 42, previous: 30}, leadScore: {current: 85, previous: 81}, carbonSaved: {current: 2.7, previous: 1.9}, tapLocations: [{lat: 34.05, lng: -118.24, count: 20}] }],
    'meetings': [
        { id: 'm1', title: 'Project Kickoff', contactName: 'John Smith', contactId: 'c1', date: 'Tomorrow' },
        { id: 'm2', title: 'Q3 Planning', contactName: 'Jane Doe', contactId: 'c2', date: 'In 3 days' },
    ],
    'interactions': [
         { id: 'i1', contact_id: 'c1', type: InteractionType.Meeting, date: '2024-07-22', notes: 'Discussed technical integration.', event: 'Project Kickoff', location: 'Virtual' }
    ],
    'green_streaks': [
        { user_id: 'tm1', streak_count: 42, user: { name: 'Alex Bamboo', avatarUrl: 'https://api.dicebear.com/8.x/initials/png?seed=Alex%20Bamboo'} },
        { user_id: 'tm2', streak_count: 21, user: { name: 'Michael Scott', avatarUrl: 'https://api.dicebear.com/8.x/initials/png?seed=Michael%20Scott'} },
        { user_id: 'tm3', streak_count: 35, user: { name: 'Jane Doe', avatarUrl: 'https://api.dicebear.com/8.x/initials/png?seed=Jane%20Doe'} },
    ],
    'trees_planted': [
        { id: 'tree1', user_id: 'tm1', certificate_id: 'TP-84B2-XYZ', location: 'Madagascar', timestamp: '2025-10-20T10:00:00Z' }
    ],
    'referrals': [
        { id: 'r1', referrer_id: 'tm1', referred_id: 'user_a', status: 'completed' },
        { id: 'r2', referrer_id: 'tm1', referred_id: 'user_b', status: 'completed' },
        { id: 'r3', referrer_id: 'tm1', referred_id: 'user_c', status: 'pending' },
    ],
    // Empty tables for new features
    'nfc_bumps': [],
    'wallet_passes': [],
};


// MOCK SUPABASE CLIENT
let authStateChangeCallback: ((event: string, session: any) => void) | null = null;

const mockAuth = {
    getSession: () => Promise.resolve({ data: { session: JSON.parse(localStorage.getItem('session') || 'null') } }),
    onAuthStateChange: (_callback: (event: string, session: any) => void) => {
        authStateChangeCallback = _callback;
        // Initial check
        setTimeout(() => {
            const session = JSON.parse(localStorage.getItem('session') || 'null');
            if (authStateChangeCallback) authStateChangeCallback(session ? 'INITIAL_SESSION' : 'SIGNED_OUT', session);
        }, 100);
        
        return { data: { subscription: { unsubscribe: () => { authStateChangeCallback = null; } } } };
    },
    signUp: async ({ email, password }: {email: string, password?: string}) => {
        const session = { user: { id: 'user-123', email }, access_token: 'fake-token' };
        localStorage.setItem('session', JSON.stringify(session));
        if (authStateChangeCallback) authStateChangeCallback('SIGNED_IN', session);
        return { data: { session }, error: null };
    },
    signInWithPassword: async ({ email, password }: {email: string, password?: string}) => {
        const session = { user: { id: 'user-123', email }, access_token: 'fake-token' };
        localStorage.setItem('session', JSON.stringify(session));
        if (authStateChangeCallback) authStateChangeCallback('SIGNED_IN', session);
        return { data: { session }, error: null };
    },
};


// Chainable query builder mock
class QueryBuilder {
    private data: any[];
    private isSingle: boolean = false;
    private filters: ((item: any) => boolean)[] = [];
    private limitCount: number | null = null;
    private ordering: { column: string, ascending: boolean } | null = null;

    constructor(data: any[]) {
        this.data = [...data]; // Create a shallow copy to avoid modifying original mock data
    }

    select(columns = '*') {
        // In this mock, select does nothing as we return all columns.
        return this;
    }
    
    update(dataToUpdate: any) {
        // In a real mock, you'd find the item and update it.
        // For this type fix, we just need the method to exist and be chainable.
        return this;
    }

    eq(column: string, value: any) {
        this.filters.push(item => item[column] === value);
        return this;
    }

    order(column: string, { ascending } = { ascending: true }) {
        this.ordering = { column, ascending };
        return this;
    }

    limit(count: number) {
        this.limitCount = count;
        return this;
    }

    single() {
        this.isSingle = true;
        return this;
    }

    // This makes the class "then-able" like a promise
    then(resolve: (value: { data: any, error: any }) => void) {
        setTimeout(() => {
            let result = this.data;
        
            this.filters.forEach(filter => {
                result = result.filter(filter);
            });

            if (this.ordering) {
                const { column, ascending } = this.ordering;
                result.sort((a, b) => {
                    if (a[column] < b[column]) return ascending ? -1 : 1;
                    if (a[column] > b[column]) return ascending ? 1 : -1;
                    return 0;
                });
            }
    
            if (this.limitCount !== null) {
                result = result.slice(0, this.limitCount);
            }
    
            if (this.isSingle) {
                resolve({ data: result[0] || null, error: null });
            } else {
                resolve({ data: result, error: null });
            }
        }, 50); // Simulate network delay
    }
}

export const supabase = {
    auth: mockAuth,
    from: (tableName: keyof typeof MOCK_DATA) => {
        return new QueryBuilder(MOCK_DATA[tableName] || []);
    },
};
