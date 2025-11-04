import React from 'react';
// Fix: Add file extension to satisfy bundler/type checker.
import useTilt from '../../hooks/useTilt.ts';

const TeamCardPreview: React.FC = () => {
    const { ref, style } = useTilt();

    return (
        <div>
             <h2 className="text-xl font-bold text-white mb-4 text-center">Live Card Preview</h2>
            <div className="flex justify-center">
                <div ref={ref} style={style} className="w-80 h-48 transform-style-3d">
                    <div className={`w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-2xl shadow-black/40 bg-gradient-to-br from-bamboo-9 to-bamboo-11 text-white`}>
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">Team Member</h2>
                                <p className="opacity-80">Their Role</p>
                            </div>
                            <img src="/logo-placeholder.svg" alt="Company Logo" className="w-10 h-10 opacity-80" />
                        </div>
                        <div className="flex items-center space-x-2 self-end">
                            <div className="w-4 h-4 rounded-full bg-white/50"></div>
                            <span className="font-bold text-lg">tappit</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamCardPreview;
