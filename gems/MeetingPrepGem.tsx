// Fix: Use namespace import for React to resolve JSX type errors.
import * as React from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { supabase } from '../services/supabase.ts';
import HapticButton from '../components/HapticButton.tsx';
import { Meeting, MeetingBriefing, Interaction } from '../types.ts';
import CustomSelect from '../components/CustomSelect.tsx';

const MeetingPrepGem: React.FC = () => {
    // Fix: Use React.useState and React.useEffect
    const [meetings, setMeetings] = React.useState<Meeting[]>([]);
    const [selectedMeetingId, setSelectedMeetingId] = React.useState<string>('');
    const [briefing, setBriefing] = React.useState<MeetingBriefing | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchMeetings = async () => {
            const { data } = await supabase.from('meetings').select('*');
            if (data) {
                setMeetings(data as Meeting[]);
                if (data.length > 0) {
                    setSelectedMeetingId(data[0].id);
                }
            }
        };
        fetchMeetings();
    }, []);

    const handleGenerateBriefing = async () => {
        if (!selectedMeetingId) return;

        setIsLoading(true);
        setBriefing(null);

        try {
            const selectedMeeting = meetings.find(m => m.id === selectedMeetingId);
            if (!selectedMeeting) throw new Error('Meeting not found');

            const { data: interactionsData } = await supabase
                .from('interactions')
                .select('*')
                .eq('contact_id', selectedMeeting.contactId);
            
            const interactions = interactionsData as Interaction[] || [];
            const interactionHistory = interactions.map(i => `- ${i.date}: ${i.type} - ${i.notes}`).join('\n');

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: `Generate a meeting prep briefing for an upcoming meeting with ${selectedMeeting.contactName}. Here is our past interaction history with them:\n${interactionHistory}\n\n`,
                config: {
                    systemInstruction: "You are a professional assistant that creates concise meeting briefings. Based on the provided interaction history, generate a summary of the last conversation, key personal details to remember, and suggested talking points. Provide your output as a JSON object.",
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            lastConversationSummary: { type: Type.STRING, description: "A brief summary of the most recent interaction." },
                            keyPersonalDetails: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A bulleted list of personal details to remember (e.g., family, hobbies)." },
                            suggestedTalkingPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A bulleted list of strategic talking points for the upcoming meeting." }
                        },
                        required: ["lastConversationSummary", "keyPersonalDetails", "suggestedTalkingPoints"]
                    }
                }
            });

            const briefingJson = JSON.parse(response.text);
            setBriefing(briefingJson as MeetingBriefing);

        } catch (error) {
            console.error("Failed to generate meeting briefing:", error);
            alert("Sorry, the AI couldn't generate a briefing right now.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const meetingOptions = meetings.map(meeting => ({
        value: meeting.id,
        label: `${meeting.title} with ${meeting.contactName} (${meeting.date})`
    }));

    return (
        <div>
            <p className="text-sm text-gray-300 mb-2">Select an upcoming meeting to get an AI-powered briefing.</p>
            <div className="mb-2">
                <CustomSelect
                    options={meetingOptions}
                    value={selectedMeetingId}
                    onChange={setSelectedMeetingId}
                    placeholder="Select a meeting"
                />
            </div>
            <HapticButton 
                onClick={handleGenerateBriefing}
                disabled={isLoading || !selectedMeetingId}
                className="w-full bg-white/10 text-white font-semibold py-2 rounded-lg text-sm disabled:opacity-50"
            >
                {isLoading ? 'Generating...' : 'Generate Briefing'}
            </HapticButton>

            {isLoading && (
                 <div className="mt-3 text-center">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-bamboo-7 rounded-full animate-spin mx-auto"></div>
                    <p className="text-xs text-gray-400 mt-1">AI is preparing your brief...</p>
                </div>
            )}

            {briefing && (
                <div className="mt-3 space-y-3 text-sm text-gray-300 animate-fadeIn">
                    <div>
                        <h5 className="font-bold text-white">Last Conversation</h5>
                        <p>{briefing.lastConversationSummary}</p>
                    </div>
                     <div>
                        <h5 className="font-bold text-white">Key Personal Details</h5>
                        <ul className="list-disc list-inside">
                            {briefing.keyPersonalDetails.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h5 className="font-bold text-white">Suggested Talking Points</h5>
                        <ul className="list-disc list-inside">
                            {briefing.suggestedTalkingPoints.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MeetingPrepGem;