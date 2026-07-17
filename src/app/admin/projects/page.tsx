'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Activity, Target, Plus, Check } from 'lucide-react';

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState([
        { id: 'raksha-ai', name: 'Raksha AI', status: 'ACTIVE FIELD STAGE', stack: 'Python, YOLO, Gemini', isResearch: true },
        { id: 'skillora', name: 'Skillora', status: 'STABLE INTERNAL DEPLOY', stack: 'React Native, FastAPI, MongoDB', isResearch: false },
        { id: 'cura-ai', name: 'Cura AI', status: 'BETA INTEGRATION V2', stack: 'Expo Sensors, WebRTC', isResearch: true },
        { id: 'kalki-sentinel', name: 'Kalki Sentinel', status: 'PROTOTYPE TESTING SECTOR', stack: 'Edge Sensors, LIDAR', isResearch: true },
        { id: 'smart-safety-locket', name: 'Smart Safety Locket', status: 'FIELD DEPLOYED IN KA', stack: 'LoRa, ESP32, GPS', isResearch: false }
    ]);

    const toggleResearch = (id: string) => {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, isResearch: !p.isResearch } : p));
    };

    return (
        <div className="space-y-8 animate-fade-in font-mono selection:bg-[#ea0614] selection:text-white">
            <div>
                <span className="font-mono text-[9px] text-[#ea0614] tracking-[0.3em] font-bold uppercase mb-1 block">
                    PROJECT REGISTRY SECURE MODULE
                </span>
                <h1 className="text-2xl font-extrabold font-orbitron text-white uppercase tracking-wider">
                    PROJECTS MANAGER
                </h1>
            </div>

            <div className="glass-node p-6 border border-white/5 rounded-sm bg-black/40">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] text-[#555] tracking-widest">// SECURED PROJECTS MATRIX</span>
                    <button className="py-2.5 px-4 bg-[#ea0614] hover:bg-[#ff0015] text-white text-[9px] font-bold tracking-widest rounded-xs transition-all uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(234,6,20,0.15)]">
                        <Plus className="w-3.5 h-3.5" /> REGISTER PROTOTYPE
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="border-b border-white/10 bg-black/60 font-mono font-bold text-white uppercase tracking-wider">
                                <th className="p-4 text-[9px] text-[#555]">Project Name</th>
                                <th className="p-4 text-[9px] text-[#555]">Operational Status</th>
                                <th className="p-4 text-[9px] text-[#555]">Technology Stack</th>
                                <th className="p-4 text-[9px] text-[#555] text-center">Research Node</th>
                                <th className="p-4 text-[9px] text-[#555] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-[#c0c0c0]">
                            {projects.map((proj) => (
                                <tr key={proj.id} className="hover:bg-white/2 transition-colors">
                                    <td className="p-4 font-bold text-white">
                                        <div>{proj.name}</div>
                                        <div className="text-[8px] text-[#444] font-light max-w-xs uppercase mt-0.5">// {proj.id}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-[#ea0614] font-bold tracking-wider">{proj.status}</span>
                                    </td>
                                    <td className="p-4 text-zinc-400 font-mono">{proj.stack}</td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => toggleResearch(proj.id)}
                                            className={`text-[8.5px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest ${proj.isResearch
                                                ? 'bg-[#ea0614]/10 border border-[#ea0614]/40 text-[#ea0614]'
                                                : 'bg-zinc-950 border border-white/5 text-zinc-600'
                                                }`}
                                        >
                                            {proj.isResearch ? 'RESEARCH' : 'COMMERCIAL'}
                                        </button>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-[10px] text-zinc-500 hover:text-white uppercase transition-colors">
                                            configure
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
