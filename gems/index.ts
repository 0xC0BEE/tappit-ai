import CarbonSavedGem from './CarbonSavedGem.tsx';
import FollowUpGem from './FollowUpGem.tsx';
import IcebreakerGem from './IcebreakerGem.tsx';
import SmartTagGem from './SmartTagGem.tsx';
import MeetingPrepGem from './MeetingPrepGem.tsx';
import { GemDefinition } from '../types.ts';

export const initialGems: GemDefinition[] = [
    {
        id: 'gem-meeting-prep',
        name: 'Meeting Prep',
        description: 'AI-generated brief for your next meeting.',
        component: MeetingPrepGem,
    },
    {
        id: 'gem-icebreaker',
        name: 'Icebreaker',
        description: 'AI-suggested conversation starters.',
        component: IcebreakerGem,
    },
    {
        id: 'gem-carbon',
        name: 'Carbon Saved',
        description: 'Show your environmental impact.',
        component: CarbonSavedGem,
    },
    {
        id: 'gem-smart-tag',
        name: 'Smart Tags',
        description: 'AI tags your skills and interests.',
        component: SmartTagGem,
    },
    {
        id: 'gem-follow-up',
        name: 'Follow-up',
        description: 'Generate a custom follow-up message.',
        component: FollowUpGem,
    },
];