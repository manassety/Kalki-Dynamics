'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Save } from 'lucide-react';

export default function AdminCompanyInfoPage() {
    const [hq, setHq] = useState('Bangalore, Karnataka, India');
    const [email, setEmail] = useState('contact@kalkidynamics.com');
    const [bio, setBio] = useState('Empowering sovereign systems through deep-tech robotic intelligence integration.');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Credentials Saved to security manifest log.');
    };

    return (
        <div className="space-y-8 animate-fade-in font-mono selection:bg-[#ea0614] selection:text-white">
            <div>
                <span className="font-mono text-[9px] text-[#ea0614] tracking-[0.3em] font-bold uppercase mb-1 block">
                    GLOBAL BRAND IDENTITY MANIFEST
                </span>
                <h1 className="text-2xl font-extrabold font-orbitron text-white uppercase tracking-wider">
                    COMPANY INFORMATION MANAGER
                </h1>
            </div>

            <div className="glass-node p-8 border border-white/5 rounded-sm bg-black/40 max-w-2xl">
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">HQ LOCATION POINT</label>
                        <input
                            type="text"
                            required
                            value={hq}
                            onChange={(e) => setHq(e.target.value)}
                            className="bg-black border border-white/5 rounded-xs p-3.5 text-xs text-white focus:outline-none focus:border-[#ea0614]/50"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">COMMERCIAL EMAIL ACCESS</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-black border border-white/5 rounded-xs p-3.5 text-xs text-white focus:outline-none focus:border-[#ea0614]/50"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">FOUNDATION PRINCIPLES MISSION TEXT</label>
                        <textarea
                            required
                            rows={4}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="bg-black border border-white/5 rounded-xs p-3.5 text-xs text-white focus:outline-none focus:border-[#ea0614]/50 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="py-3 px-6 bg-[#ea0614] hover:bg-[#ff0015] text-white text-[10px] font-bold tracking-widest rounded-xs transition-all uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(234,6,20,0.15)]"
                    >
                        <Save className="w-4 h-4" /> SAVE MANIFEST
                    </button>
                </form>
            </div>
        </div>
    );
}
