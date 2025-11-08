
// Fix: Use namespace import for React to resolve JSX type errors.
import * as React from 'react';
import { GoogleGenAI } from "@google/genai";
import HapticButton from '../components/HapticButton.tsx';
import { EmailIcon, CalendarIcon } from '../components/icons.tsx';
import SetReminderModal from '../components/modals/SetReminderModal.tsx';
import { useHaptics, HapticPattern } from '../../hooks/useHaptics.ts';

const FollowUpGem: React.FC = () => {
    // Fix: Use React.useState
    const [followUp, setFollowUp] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isReminderModalOpen, setReminderModalOpen] = React.useState(false);
    const [showToast, setShowToast] = React.useState(false);
    const { playHaptic } = useHaptics();

    const handleGenerate = async () => {
        setIsLoading(true);
        setFollowUp('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: "Generate a friendly but professional follow-up message after meeting someone at a networking event.",
                config: {
                    systemInstruction: "You generate concise follow-up messages. Return only the message text.",
                }
            });
            // Fix: Use response.text to get the generated content as per coding guidelines.
            setFollowUp(response.text.trim());
        } catch (error) {
            console.error("Failed to generate follow-up:", error);
            setFollowUp("Could not generate a message. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGmailDraft = () => {
        playHaptic(HapticPattern.Success);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleSetReminder = () => {
        setReminderModalOpen(true);
    };

    return (
        <>
            <div>
                <p className="text-sm text-gray-300 mb-2">Generate a personalized follow-up message based on your last interaction.</p>
                <HapticButton 
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full bg-white/10 text-white font-semibold py-2 rounded-lg text-sm disabled:opacity-50"
                >
                    {isLoading ? 'Generating...' : 'Suggest Follow-up'}
                </HapticButton>

                {followUp && (
                    <div className="mt-3 space-y-3 animate-fadeIn">
                        <div className="p-2 bg-black/20 rounded-md text-sm text-bamboo-7">
                            <p>{followUp}</p>
                        </div>
                        
                        <div>
                            <h5 className="text-xs font-bold text-gray-400 uppercase mb-2">Workflows</h5>
                            <div className="space-y-2">
                                <HapticButton
                                    onClick={() => alert('Template Saved!')}
                                    className="w-full text-left flex items-center space-x-2 bg-white/5 text-white text-sm p-2 rounded-lg hover:bg-white/10"
                                >
                                    <span>💾</span>
                                    <span>Save as Template</span>
                                </HapticButton>
                                <HapticButton
                                    onClick={handleGmailDraft}
                                    className="w-full text-left flex items-center space-x-2 bg-white/5 text-white text-sm p-2 rounded-lg hover:bg-white/10"
                                >
                                    <EmailIcon className="w-4 h-4 text-yellow-400" />
                                    <span>Create Gmail Draft</span>
                                </HapticButton>
                                <HapticButton
                                    onClick={handleSetReminder}
                                    className="w-full text-left flex items-center space-x-2 bg-white/5 text-white text-sm p-2 rounded-lg hover:bg-white/10"
                                >
                                    <CalendarIcon className="w-4 h-4 text-blue-400" />
                                    <span>Set Calendar Reminder</span>
                                </HapticButton>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Gmail Draft Toast */}
            {showToast && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg z-50 animate-fadeIn">
                    Gmail draft created!
                </div>
            )}
            
            <SetReminderModal
                isOpen={isReminderModalOpen}
                onClose={() => setReminderModalOpen(false)}
                contactName={"the contact"}
            />
        </>
    );
};

export default FollowUpGem;