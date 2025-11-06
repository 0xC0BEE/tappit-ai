// This file is now a mock of the Supabase client to prevent network/CORS errors in the dev environment.
// It simulates the Supabase API to allow the app to function without a live backend connection.
import { BriefcaseIcon, EmailIcon, PhoneIcon, PlayIcon, LinkIcon, MapPinIcon } from '../components/icons.tsx';
import { FieldType } from '../types.ts';


// This will hold the callback function provided by App.tsx
let authStateChangeCallback: ((event: string, session: any) => void) | null = null;

const mockSession = {
    user: { id: 'mock-user-id', email: 'user@tappit.ai' },
    access_token: 'mock-token',
};

const mockAuth = {
    signUp: async (credentials: any) => {
        console.log("Mock Supabase: Signing up user...", credentials);
        await new Promise(res => setTimeout(res, 500));
        if (authStateChangeCallback) {
            authStateChangeCallback('SIGNED_IN', { ...mockSession, user: { ...mockSession.user, email: credentials.email } });
        }
        return { error: null, data: { user: { id: 'new-mock-user-id' } } };
    },
    signInWithPassword: async (credentials: any) => {
        console.log("Mock Supabase: Signing in user...", credentials);
        await new Promise(res => setTimeout(res, 500));
        if (authStateChangeCallback) {
            authStateChangeCallback('SIGNED_IN', { ...mockSession, user: { ...mockSession.user, email: credentials.email } });
        }
        return { error: null, data: { session: mockSession } };
    },
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
        console.log("Mock Supabase: Auth state listener attached.");
        authStateChangeCallback = callback;
        return {
            data: {
                subscription: {
                    unsubscribe: () => {
                        console.log("Mock Supabase: Unsubscribed from auth state changes.");
                        authStateChangeCallback = null;
                    },
                },
            },
        };
    },
    getSession: async () => {
        console.log("Mock Supabase: Getting session...");
        await new Promise(res => setTimeout(res, 100));
        return { data: { session: null } }; // Always start logged out
    }
};

const MOCK_DATA: { [key: string]: any } = {
    analytics: { 
        taps: { current: 128, previous: 95 }, 
        connections: { current: 42, previous: 30 }, 
        leadScore: { current: 85, previous: 81 }, 
        carbonSaved: { current: 2.7, previous: 1.9 }, 
        tapLocations: [
            { lat: 34.05, lng: -118.25, count: 5 },
            { lat: 40.71, lng: -74.00, count: 8 },
            { lat: -6.20, lng: 106.84, count: 12 },
        ], 
        performance: [] 
    },
    card_fields: [
        { id: 'f1', label: 'Name', value: 'Alex Bamboo', icon: BriefcaseIcon, fieldType: FieldType.Text },
        { id: 'f2', label: 'Title', value: 'Senior Strategic Advisor', icon: BriefcaseIcon, fieldType: FieldType.Text },
        { id: 'f3', label: 'Company', value: 'Tappit AI', icon: BriefcaseIcon, fieldType: FieldType.Text },
        { id: 'f4', label: 'Email', value: 'alex.b@tappit.ai', icon: EmailIcon, fieldType: FieldType.Text },
        { id: 'f5', label: 'Phone', value: '+1 234 567 8900', icon: PhoneIcon, fieldType: FieldType.Text },
        { id: 'f6', label: 'Website', value: 'tappit.ai', icon: LinkIcon, fieldType: FieldType.Text },
        { id: 'f7', label: 'Location', value: 'Bamboo Forest, Bali', icon: MapPinIcon, fieldType: FieldType.Text },
        { id: 'f8', label: 'Intro Video', value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', icon: PlayIcon, fieldType: FieldType.Video },
    ],
    card_templates: [
        { id: 't-emerald', name: 'Emerald', className: 'bg-emerald-800', textColor: 'text-white' },
        { id: 't-forest', name: 'Forest', className: 'bg-green-900', textColor: 'text-white' },
        { id: 't-mint', name: 'Mint', className: 'bg-green-200', textColor: 'text-black' },
        { id: 't-charcoal', name: 'Charcoal', className: 'bg-gray-800', textColor: 'text-white' },
        { id: 't-jade', name: 'Jade', className: 'bg-teal-700', textColor: 'text-white' },
    ],
    contacts: [
        { id: 'c1', name: 'John Smith', title: 'Lead Developer', company: 'CodeCrafters', photoUrl: 'https://i.pravatar.cc/150?u=johnsmith', lastInteraction: '2 days ago', leadScore: 92, interactions: [{id: 'i1', type: 'Meeting', date: '2024-07-22', location: 'Virtual', notes: 'Discussed technical integration.'}] },
        { id: 'c2', name: 'Jane Doe', title: 'Product Manager', company: 'Innovate Inc.', photoUrl: 'https://i.pravatar.cc/150?u=janedoe', lastInteraction: '5 days ago', leadScore: 88, interactions: [] },
    ],
    interactions: [{id: 'i1', type: 'Meeting', date: '2024-07-22', location: 'Virtual', notes: 'Discussed technical integration.'}],
    team_members: [
        { id: 'tm1', name: 'Michael Scott', avatarUrl: 'https://i.pravatar.cc/150?u=michaelscott', role: 'Regional Manager', taps: 102, connections: 34, leadScore: 75 },
        { id: 'tm2', name: 'Dwight Schrute', avatarUrl: 'https://i.pravatar.cc/150?u=dwightschrute', role: 'Assistant to the RM', taps: 250, connections: 80, leadScore: 95 },
    ],
    brand_kit: { id: 'bk-1', logoUrl: 'https://img.logoipsum.com/289.svg', primaryColor: '#4ade80', font: 'Roboto' },
    team_activities: [
        { id: 'ta1', member: { name: 'Dwight Schrute', avatarUrl: 'https://i.pravatar.cc/150?u=dwightschrute' }, action: 'added a new contact', target: 'Jim Halpert', timestamp: '2 hours ago' },
        { id: 'ta2', member: { name: 'Michael Scott', avatarUrl: 'https://i.pravatar.cc/150?u=michaelscott' }, action: 'updated the brand kit', target: '', timestamp: '1 day ago' },
    ],
};

// Fix: Implement a chainable, then-able query builder to correctly mock the Supabase client API.
const createMockQueryBuilder = (tableName: string) => {
    let isSingle = false;

    const builder: any = {
        select: (..._args: any[]) => builder,
        insert: (..._args: any[]) => builder,
        update: (..._args: any[]) => builder,
        eq: (..._args: any[]) => builder,
        limit: (..._args: any[]) => builder,
        single: () => {
            isSingle = true;
            return builder;
        },
        // Make the builder "thenable" so it can be awaited
        then: (resolve: (value: any) => void, reject: (reason?: any) => void) => {
            console.log(`Mock Supabase: Executing query for "${tableName}" (single: ${isSingle})`);
            setTimeout(() => {
                try {
                    const tableData = MOCK_DATA[tableName];
                    const data = isSingle
                        ? (Array.isArray(tableData) ? tableData[0] : tableData) || {}
                        : tableData || [];
                    resolve({ data, error: null });
                } catch (e) {
                    reject(e);
                }
            }, 300);
        }
    };

    return builder;
};

export const supabase = {
    auth: mockAuth,
    from: (tableName: string) => createMockQueryBuilder(tableName),
};