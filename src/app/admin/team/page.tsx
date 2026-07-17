'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Check } from 'lucide-react';

export default function AdminTeamPage() {
    const [team, setTeam] = useState([
        { id: 1, name: 'Manas Sety', role: 'Founder', access: 'SYSTEM ROOT LEVEL' }
    ]);

    return (
        <div className="space-y-8 animate-fade-in font-mono selection:bg-[#ea0614] selection:text-white">
            <div>
                <span className="font-mono text-[9px] text-[#ea0614] tracking-[0.3em] font-bold uppercase mb-1 block">
                    PERSONNEL ACCESS DECK STATUS
                </span>
                <h1 className="text-2xl font-extrabold font-orbitron text-white uppercase tracking-wider">
                    TEAM MEMBERS REGISTRY
                </h1>
            </div>

            <div className="glass-node p-6 border border-white/5 rounded-sm bg-black/40">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] text-[#555] tracking-widest">// SECURED HUMAN PERSONNEL MATRIX</span>
                    <button className="py-2.5 px-4 bg-[#ea0614] hover:bg-[#ff0015] text-white text-[9px] font-bold tracking-widest rounded-xs transition-all uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(234,6,20,0.15)]">
                        <Plus className="w-3.5 h-3.5" /> RECRUIT MEMBERS
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="border-b border-white/10 bg-black/60 font-mono font-bold text-white uppercase tracking-wider">
                                <th className="p-4 text-[9px] text-[#555]">Member Name</th>
                                <th className="p-4 text-[9px] text-[#555]">Role Title</th>
                                <th className="p-4 text-[9px] text-[#555] text-center">Clearance Status</th>
                                <th className="p-4 text-[9px] text-[#555] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-[#c0c0c0]">
                            {team.map((member) => (
                                <tr key={member.id} className="hover:bg-white/2 transition-colors">
                                    <td className="p-4 font-bold text-white uppercase">{member.name}</td>
                                    <td className="p-4 text-zinc-400 font-mono">{member.role}</td>
                                    <td className="p-4 text-center">
                                        <span className="px-2 py-0.5 bg-[#ea0614]/10 border border-[#ea0614]/30 text-[#ea0614] font-mono text-[8px] uppercase tracking-wider rounded-xs">
                                            {member.access}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-[10px] text-zinc-500 hover:text-white uppercase transition-colors">
                                            revoke keys
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
