// FIX: Full mock implementation of the Supabase client to resolve all "Failed to fetch" errors
// and make the application fully functional offline.

import { Session } from '@supabase/supabase-js';

// --- MOCK DATA ---
const MOCK_USER = {
    id: 'user-123',
    email: 'alex.bamboo@tappit.ai',
    // ... other user properties
};

// FIX: Add missing properties (refresh_token, expires_in, expires_at) to satisfy the Session type from @supabase/supabase-js.
const MOCK_SESSION: Session = {
    access_token: 'mock-access-token',
    token_type: 'bearer',
    user: MOCK_USER as any,
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
};

const mockData: { [key: string]: any[] } = {
    contacts: [
        { id: 'c1', name: 'Jane Doe', title: 'CEO', company: 'Innovate Inc.', photoUrl: 'https://i.pravatar.cc/150?u=jane', lastInteraction: '2 days ago', leadScore: 92, interactions: [], calendly_url: 'https://calendly.com/jane-doe', relationshipHealth: 40 },
        { id: 'c2', name: 'Michael Scott', title: 'Regional Manager', company: 'Dunder Mifflin', photoUrl: 'https://i.pravatar.cc/150?u=michael', lastInteraction: '1 week ago', leadScore: 78, interactions: [], calendly_url: 'https://calendly.com/michael-scott', relationshipHealth: 20 },
        { id: 'c3', name: 'Dwight Schrute', title: 'Assistant to the RM', company: 'Dunder Mifflin', photoUrl: 'https://i.pravatar.cc/150?u=dwight', lastInteraction: '3 weeks ago', leadScore: 65, interactions: [] },
    ],
    interactions: [
        { id: 'int-1', contact_id: 'c1', type: 'Meeting', date: '2025-11-03', event: 'TechCrunch Disrupt', notes: 'Discussed potential partnership and API integration.' },
        { id: 'int-2', contact_id: 'c1', type: 'Email', date: '2025-11-04', notes: 'Sent follow-up email with deck.' },
    ],
    team_members: [
        { id: 'tm1', name: 'Alex Bamboo', role: 'Admin', avatarUrl: 'https://i.pravatar.cc/150?u=alex', taps: 124, connections: 82, leadScore: 88 },
        { id: 'tm2', name: 'Jane Doe', role: 'Member', avatarUrl: 'https://i.pravatar.cc/150?u=jane', taps: 98, connections: 65, leadScore: 75 },
    ],
    // FIX: Converted object to an array of one object to match the expected data structure for tables queried with `.single()`.
    brand_kit: [{ id: 'bk1', primaryColor: '#22c55e', font: 'Inter', logoUrl: 'https://tailwindui.com/img/logos/mark.svg?color=green&shade=500' }],
    card_templates: [
        { id: 't1', name: 'Bamboo', className: 'bg-gradient-to-br from-bamboo-9 to-bamboo-11', textColor: 'text-white' },
        { id: 't2', name: 'Glass', className: 'bg-black/20 backdrop-blur-xl border border-white/10', textColor: 'text-white' },
        { id: 't3', name: 'Mint', className: 'bg-gradient-to-br from-green-200 to-green-400', textColor: 'text-bamboo-11' },
    ],
    // FIX: Converted object to an array of one object to match the expected data structure for tables queried with `.single()`.
    analytics: [{ id: 'a1', carbonSaved: { current: 18.2, previous: 15.1 } }],
    meetings: [
        { id: 'm1', contactId: 'c1', contactName: 'Jane Doe', title: 'Q4 Strategy Sync', date: '2025-11-10' },
    ],
    green_streaks: [
        { user_id: 'tm1', streak_count: 42, user: { name: 'Alex Bamboo', avatarUrl: 'https://i.pravatar.cc/150?u=alex' } },
        { user_id: 'tm2', streak_count: 35, user: { name: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/150?u=jane' } },
    ],
    team_activities: [
      { id: 'act1', member: { name: 'Alex Bamboo', avatarUrl: 'https://i.pravatar.cc/150?u=alex' }, action: 'added a new contact', target: 'Jane Doe', timestamp: '2 hours ago' },
      { id: 'act2', member: { name: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/150?u=jane' }, action: 'updated the brand kit', target: '', timestamp: 'Yesterday' },
    ]
};


// --- MOCK SUPABASE CLIENT ---

const createMockQueryBuilder = (table: string, initialData: any[]) => {
    let query = [...initialData];
    let isSingle = false;

    const queryBuilder = {
        select(columns = '*') {
            // Mock select is a passthrough for now, as we return all columns
            return this;
        },
        eq(column: string, value: any) {
            query = query.filter(item => item[column] === value);
            return this;
        },
        order(column: string, { ascending = true }: { ascending?: boolean } = {}) {
            query.sort((a, b) => {
                if (a[column] < b[column]) return ascending ? -1 : 1;
                if (a[column] > b[column]) return ascending ? 1 : -1;
                return 0;
            });
            return this;
        },
        limit(count: number) {
            query = query.slice(0, count);
            return this;
        },
        single() {
            isSingle = true;
            return this;
        },
        update(newData: any) {
             // In a real mock, you'd apply this update based on a subsequent .eq() call
             console.log(`Mock update on ${table} with:`, newData);
             // For this mock, we assume it succeeds
             return this;
        },
        // Make the object "thenable" to be await-able
        async then(resolve: (value: any) => void, reject: (reason?: any) => void) {
            try {
                await new Promise(res => setTimeout(res, 200 + Math.random() * 800)); // Simulate network delay
                
                let result;
                if (isSingle) {
                    result = query.length > 0 ? query[0] : null;
                } else {
                    result = query;
                }

                resolve({ data: result, error: null });
            } catch (error) {
                reject({ data: null, error });
            }
        },
    };
    return queryBuilder;
};


// Mock implementation of the Supabase client
export const supabase = {
    auth: {
        async getSession() {
            const session = localStorage.getItem('supabase.auth.token') ? MOCK_SESSION : null;
            return Promise.resolve({ data: { session }, error: null });
        },
        onAuthStateChange(callback: (event: string, session: Session | null) => void) {
            const handleStorageChange = () => {
                const session = localStorage.getItem('supabase.auth.token') ? MOCK_SESSION : null;
                callback('SIGNED_IN', session);
            };
            window.addEventListener('storage', handleStorageChange);
            // Initial call
            const session = localStorage.getItem('supabase.auth.token') ? MOCK_SESSION : null;
            callback('INITIAL_SESSION', session);

            return {
                data: {
                    subscription: {
                        unsubscribe: () => {
                            window.removeEventListener('storage', handleStorageChange);
                        },
                    },
                },
            };
        },
        async signInWithPassword({ email, password }: any) {
            if (email && password) {
                localStorage.setItem('supabase.auth.token', JSON.stringify(MOCK_SESSION));
                window.dispatchEvent(new Event('storage')); // Manually trigger listener
                return Promise.resolve({ data: { session: MOCK_SESSION }, error: null });
            }
            return Promise.resolve({ data: { session: null }, error: new Error('Invalid login credentials') });
        },
        async signUp({ email, password }: any) {
             if (email && password) {
                // In this mock, signUp also logs the user in immediately.
                localStorage.setItem('supabase.auth.token', JSON.stringify(MOCK_SESSION));
                window.dispatchEvent(new Event('storage'));
                return Promise.resolve({ data: { session: MOCK_SESSION }, error: null });
            }
            return Promise.resolve({ data: { session: null }, error: new Error('Invalid sign up details') });
        },
        async signOut() {
            localStorage.removeItem('supabase.auth.token');
            window.dispatchEvent(new Event('storage'));
            return Promise.resolve({ error: null });
        },
    },
    from(table: string) {
        return createMockQueryBuilder(table, mockData[table] || []);
    },
};
