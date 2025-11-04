// Fix: Add file extension to satisfy bundler/type checker.
import { AnalyticsData } from "../types.ts";

export const analyticsData: AnalyticsData = {
    taps: { current: 128, previous: 95 },
    connections: { current: 42, previous: 30 },
    leadScore: { current: 85, previous: 81 },
    carbonSaved: { current: 2.7, previous: 1.9 }, // in grams
    tapLocations: [
        { lat: 37.7749, lng: -122.4194, count: 25 }, // San Francisco
        { lat: 34.0522, lng: -118.2437, count: 15 }, // Los Angeles
        { lat: 40.7128, lng: -74.0060, count: 30 }, // New York
        { lat: 51.5074, lng: -0.1278, count: 10 }, // London
    ],
    performance: [
        { name: 'John A.', taps: 45 },
        { name: 'Sarah B.', taps: 60 },
        { name: 'Mike C.', taps: 23 },
    ],
};
