import * as React from 'react';
import { supabase } from '../../../services/supabase.ts';
import { BrandKit, TeamMember } from '../../../types.ts';
import BrandKitEditor from '../../../components/team/BrandKitEditor.tsx';
import TeamCardPreview from '../../../components/team/TeamCardPreview.tsx';
import LoadingSkeleton from '../../../components/LoadingSkeleton.tsx';

const LiveBrandKitPreviewScreen: React.FC = () => {
    const [brandKit, setBrandKit] = React.useState<BrandKit | null>(null);
    const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            const { data: brandKitData } = await supabase.from('brand_kit').select('*').single();
            const { data: membersData } = await supabase.from('team_members').select('*').limit(6);
            if (brandKitData && membersData) {
                setBrandKit(brandKitData as BrandKit);
                setTeamMembers(membersData as TeamMember[]);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading || !brandKit) {
        return <div className="p-4"><LoadingSkeleton /></div>;
    }

    return (
        <div className="flex flex-col h-full p-4">
            <header className="pb-8 text-center">
                <h1 className="text-4xl font-bold">Live Brand Kit Preview</h1>
                <p className="text-gray-300 mt-2">Changes you make on the left will instantly reflect on your team's cards on the right.</p>
            </header>
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Editor */}
                <div>
                    <BrandKitEditor brandKit={brandKit} setBrandKit={setBrandKit} />
                </div>

                {/* Live Preview Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {teamMembers.map(member => (
                        <div key={member.id} className="space-y-2">
                           <TeamCardPreview brandKit={brandKit} />
                           <p className="text-center text-sm font-semibold">{member.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiveBrandKitPreviewScreen;
