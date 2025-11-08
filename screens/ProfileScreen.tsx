
import * as React from 'react';
import GlassCard from '../components/GlassCard.tsx';
import HapticButton from '../components/HapticButton.tsx';
import { UserIcon, BriefcaseIcon, UploadIcon } from '../components/icons.tsx';

const ProfileScreen: React.FC = () => {
    const [profile, setProfile] = React.useState({
        name: 'Alex Bamboo',
        title: 'Senior Strategic Advisor',
        company: 'Tappit AI',
        bio: 'Driving strategic growth in the AI-powered networking space. Passionate about sustainable tech and meaningful connections.',
        avatarUrl: 'https://i.pravatar.cc/150?u=alex'
    });
    const [isSaving, setIsSaving] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({...prev, avatarUrl: reader.result as string}));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            alert('Profile saved successfully!');
        }, 1000);
    };

    return (
        <div className="animate-scaleIn h-full flex flex-col items-center">
            <header className="pb-8 text-center">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-2 to-bamboo-7">
                    My Profile
                </h1>
                <p className="text-gray-300 text-lg mt-2">This information will appear on your card.</p>
            </header>

            <div className="w-full max-w-2xl">
                <GlassCard className="p-8 space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                        <img src={profile.avatarUrl} alt="Profile" className="w-32 h-32 rounded-full border-4 border-bamboo-8 shadow-lg" />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/png, image/jpeg"
                        />
                        <HapticButton onClick={handleAvatarUpload} className="flex items-center space-x-2 bg-white/10 text-white font-semibold py-2 px-4 rounded-full text-sm">
                            <UploadIcon className="w-4 h-4" />
                            <span>Change Photo</span>
                        </HapticButton>
                    </div>

                    <div className="space-y-4">
                        <InputField name="name" label="Full Name" value={profile.name} onChange={handleChange} />
                        <InputField name="title" label="Title" value={profile.title} onChange={handleChange} />
                        <InputField name="company" label="Company" value={profile.company} onChange={handleChange} />
                        <TextAreaField name="bio" label="Short Bio" value={profile.bio} onChange={handleChange} />
                    </div>

                    <div className="pt-4">
                        <HapticButton
                            onClick={handleSaveChanges}
                            disabled={isSaving}
                            className="w-full bg-bamboo-8 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-bamboo-8/30 hover:bg-bamboo-9 transition-colors disabled:opacity-50"
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </HapticButton>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

// --- Sub-components for Profile Screen Form ---

interface InputFieldProps {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputField: React.FC<InputFieldProps> = ({ name, label, value, onChange }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-gray-300 mb-1">{label}</label>
        <input
            id={name}
            name={name}
            type="text"
            value={value}
            onChange={onChange}
            className="w-full bg-white/5 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bamboo-8"
        />
    </div>
);

interface TextAreaFieldProps {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextAreaField: React.FC<TextAreaFieldProps> = ({ name, label, value, onChange }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-gray-300 mb-1">{label}</label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            rows={3}
            className="w-full bg-white/5 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bamboo-8 resize-none"
        />
    </div>
);

export default ProfileScreen;
