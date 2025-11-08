

import * as React from 'react';
import { supabase } from '../services/supabase.ts';
import GlassCard from '../components/GlassCard.tsx';
import HapticButton from '../components/HapticButton.tsx';
import { UserIcon, BriefcaseIcon, BellIcon, LinkIcon } from '../components/icons.tsx';

const SettingsScreen: React.FC = () => {
    const [userEmail, setUserEmail] = React.useState('');

    React.useEffect(() => {
        const fetchUser = async () => {
            // FIX: The mocked supabase client uses getSession(), not getUser().
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUserEmail(session.user.email || '');
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        // The onAuthStateChange listener in App.tsx will handle the rest.
    };
    
    return (
        <div className="animate-scaleIn h-full flex flex-col items-center">
             <header className="pb-8 text-center">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                    Settings
                </h1>
                <p className="text-gray-300 text-lg mt-2">Manage your account and preferences.</p>
            </header>

            <div className="w-full max-w-2xl space-y-6">
                <SettingsSection title="Account" icon={UserIcon}>
                     <SettingsRow label="Email" value={userEmail} />
                     <SettingsRow label="Password" value="••••••••" actionText="Change" onAction={() => alert('Password change flow not implemented.')} />
                </SettingsSection>
                
                 <SettingsSection title="Integrations" icon={LinkIcon}>
                     <SettingsRow label="Calendly" value="Connected" actionText="Manage" onAction={() => alert('Manage Calendly integration.')} />
                     <SettingsRow label="Google Contacts" value="Not Connected" actionText="Connect" onAction={() => alert('Connect Google Contacts.')} />
                </SettingsSection>

                <SettingsSection title="Notifications" icon={BellIcon}>
                    <ToggleRow label="Push Notifications" enabled={true} />
                    <ToggleRow label="Email Summaries" enabled={true} />
                    <ToggleRow label="New Connection Alerts" enabled={false} />
                </SettingsSection>
                
                <div className="pt-4">
                    <HapticButton 
                        onClick={handleLogout}
                        className="w-full bg-red-600/20 text-red-400 font-bold py-3 px-6 rounded-full hover:bg-red-600/30 transition-colors"
                    >
                        Log Out
                    </HapticButton>
                </div>
            </div>
        </div>
    );
};

// --- Sub-components for Settings Screen ---

interface SettingsSectionProps {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
}
const SettingsSection: React.FC<SettingsSectionProps> = ({ title, icon: Icon, children }) => (
    <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center"><Icon className="w-6 h-6 mr-3 text-bamboo-7" /> {title}</h2>
        <div className="space-y-3">{children}</div>
    </GlassCard>
);

interface SettingsRowProps {
    label: string;
    value: string;
    actionText?: string;
    onAction?: () => void;
}
const SettingsRow: React.FC<SettingsRowProps> = ({ label, value, actionText, onAction }) => (
    <div className="flex justify-between items-center border-b border-white/10 pb-3">
        <div>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-white">{value}</p>
        </div>
        {actionText && <HapticButton onClick={onAction} className="text-bamboo-7 font-semibold text-sm">{actionText}</HapticButton>}
    </div>
);


interface ToggleRowProps {
    label: string;
    enabled: boolean;
}
const ToggleRow: React.FC<ToggleRowProps> = ({ label, enabled }) => {
    const [isEnabled, setIsEnabled] = React.useState(enabled);
    return (
        <div className="flex justify-between items-center">
            <p className="text-white">{label}</p>
            <button onClick={() => setIsEnabled(!isEnabled)} className={`w-12 h-6 rounded-full p-1 transition-colors ${isEnabled ? 'bg-bamboo-8' : 'bg-gray-600'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
        </div>
    );
};


export default SettingsScreen;