
// Fix: Use namespace import for React to resolve JSX type errors.
import * as React from 'react';
import Modal from '../Modal.tsx';
import GlassCard from '../GlassCard.tsx';
import HapticButton from '../HapticButton.tsx';
import { CloseIcon, CardIcon, CertificateIcon } from '../icons.tsx';
import { TeamMember, CardTemplate } from '../../types.ts';
import { supabase } from '../../services/supabase.ts';
import TemplateCarousel from '../TemplateCarousel.tsx';
import { useHaptics, HapticPattern } from '../../hooks/useHaptics.ts';

interface AssignCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    teamMembers: TeamMember[];
}

const AssignCardModal: React.FC<AssignCardModalProps> = ({ isOpen, onClose, teamMembers }) => {
    // Fix: Use React.useState and React.useEffect
    const [templates, setTemplates] = React.useState<CardTemplate[]>([]);
    const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);
    const [selectedTemplate, setSelectedTemplate] = React.useState<CardTemplate | null>(null);
    const [status, setStatus] = React.useState<'idle' | 'assigning' | 'success'>('idle');
    const { playHaptic } = useHaptics();

    React.useEffect(() => {
        if (isOpen) {
            const fetchTemplates = async () => {
                // Fix: Correctly await the mock Supabase query builder.
                const { data, error } = await supabase.from('card_templates').select('*');
                if (error) {
                    console.error("Error fetching templates:", error);
                } else if (data) {
                    setTemplates(data as CardTemplate[]);
                    if (data.length > 0) {
                        setSelectedTemplate(data[0]);
                    }
                }
            };
            fetchTemplates();
        }
    }, [isOpen]);

    const handleToggleMember = (memberId: string) => {
        setSelectedMembers(prev => 
            prev.includes(memberId) 
                ? prev.filter(id => id !== memberId) 
                : [...prev, memberId]
        );
    };

    const handleAssign = () => {
        if (selectedMembers.length === 0 || !selectedTemplate) {
            alert('Please select at least one team member and a template.');
            return;
        }
        setStatus('assigning');
        playHaptic(HapticPattern.Click);
        setTimeout(() => {
            setStatus('success');
            playHaptic(HapticPattern.Success);
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setSelectedMembers([]);
            }, 1500);
        }, 1000);
    };

    const getButtonContent = () => {
        switch (status) {
            case 'assigning':
                return (
                    <>
                        <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                        <span>Assigning...</span>
                    </>
                );
            case 'success':
                return (
                    <>
                        <CertificateIcon className="w-5 h-5" />
                        <span>Success!</span>
                    </>
                );
            default:
                return (
                     <>
                        <CardIcon className="w-5 h-5" />
                        <span>Assign Template</span>
                    </>
                );
        }
    };
    
    return (
        <Modal isOpen={isOpen} onClose={status === 'idle' ? onClose : () => {}}>
            <GlassCard className="w-[calc(100vw-2rem)] max-w-lg mx-auto relative p-8 text-white space-y-4">
                <HapticButton onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white" disabled={status !== 'idle'}>
                    <CloseIcon className="w-6 h-6" />
                </HapticButton>
                
                <h2 className="text-3xl font-bold text-white">Assign Card Template</h2>
                <p className="text-gray-300">
                    Apply a new card design to selected team members in bulk.
                </p>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Select Members ({selectedMembers.length})</h3>
                        <div className="max-h-40 overflow-y-auto space-y-2 p-2 bg-black/20 rounded-lg">
                            {teamMembers.map(member => (
                                <label key={member.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-white/10 cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        checked={selectedMembers.includes(member.id)}
                                        onChange={() => handleToggleMember(member.id)}
                                        className="w-5 h-5 rounded bg-white/20 border-white/30 text-bamboo-8 focus:ring-bamboo-8"
                                    />
                                    <img src={member.avatarUrl} alt={member.name} className="w-8 h-8 rounded-full" />
                                    <span>{member.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    {selectedTemplate && (
                        <TemplateCarousel 
                            templates={templates}
                            selectedTemplate={selectedTemplate}
                            onSelectTemplate={setSelectedTemplate}
                        />
                    )}
                </div>

                <HapticButton 
                    onClick={handleAssign}
                    disabled={selectedMembers.length === 0 || status !== 'idle'}
                    className={`w-full flex items-center justify-center space-x-2 font-bold py-3 px-6 rounded-full shadow-lg transition-colors
                        ${status === 'success' ? 'bg-green-500 text-white shadow-green-500/30' : 'bg-bamboo-8 text-white shadow-bamboo-8/30 hover:bg-bamboo-9'} 
                        disabled:opacity-70 disabled:hover:bg-bamboo-8`}
                >
                    {getButtonContent()}
                </HapticButton>
            </GlassCard>
        </Modal>
    );
};

export default AssignCardModal;