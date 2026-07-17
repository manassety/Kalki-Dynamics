'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Check, Edit, Plus } from 'lucide-react';

export default function AdminServicesPage() {
    const [services, setServices] = useState([
        { title: 'Artificial Intelligence Solutions', segment: 'AI Core', enabled: true },
        { title: 'Website Development', segment: 'Web Applications', enabled: true },
        { title: 'Mobile App Development', segment: 'Handheld Rigs', enabled: true },
        { title: 'Custom Software Development', segment: 'Enterprise Shells', enabled: true },
        { title: 'UI / UX Design', segment: 'Visual Interface', enabled: true },
        { title: 'Cloud & Backend Development', segment: 'Relay Nodes', enabled: true },
        { title: 'IoT & Embedded Systems', segment: 'Embedded Microcontroller', enabled: true },
        { title: 'Robotics & Automation', segment: 'Mechanical Cybernetics', enabled: true }
    ]);

    const toggleService = (title: string) => {
        setServices(prev => prev.map(s => s.title === title ? { ...s, enabled: !s.enabled } : s));
    };

    return (
        <div className="space-y-8 animate-fade-in font-mono selection:bg-[#ea0614] selection:text-white">
            <div>
                <span className="font-mono text-[9px] text-[#ea0614] tracking-[0.3em] font-bold uppercase mb-1 block">
                    SERVICES MATRIX CONSOLE
                </span>
                <h1 className="text-2xl font-extrabold font-orbitron text-white uppercase tracking-wider">
                    SERVICES MANAGER
                </h1>
            </div>

            <div className="glass-node p-6 border border-white/5 rounded-sm bg-black/40">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] text-[#555] tracking-widest">// DEPLOYED SERVICES ARRAY</span>
                    <button className="py-2.5 px-4 bg-[#ea0614] hover:bg-[#ff0015] text-white text-[9px] font-bold tracking-widest rounded-xs transition-all uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(234,6,20,0.15)]">
                        <Plus className="w-3.5 h-3.5" /> ADD SERVICE CAPABILITY
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="border-b border-white/10 bg-black/60 font-mono font-bold text-white uppercase tracking-wider">
                                <th className="p-4 text-[9px] text-[#555]">Capability Title</th>
                                <th className="p-4 text-[9px] text-[#555]">Segment Namespace</th>
                                <th className="p-4 text-[9px] text-[#555] text-center">Status</th>
                                <th className="p-4 text-[9px] text-[#555] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-[#c0c0c0]">
                            {services.map((svc) => (
                                <tr key={svc.title} className="hover:bg-white/2 transition-colors">
                                    <td className="p-4 font-bold text-white uppercase">{svc.title}</td>
                                    <td className="p-4 text-zinc-400 font-mono">// {svc.segment}</td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => toggleService(svc.title)}
                                            className={`text-[8.5px] font-bold px-2.5 py-0.5 rounded-sm uppercase tracking-widest ${svc.enabled
                                                ? 'bg-green-500/10 border border-green-500/40 text-green-500'
                                                : 'bg-zinc-950 border border-white/5 text-zinc-650'
                                                }`}
                                        >
                                            {svc.enabled ? 'ACTIVE RUNTIME' : 'INACTIVE'}
                                        </button>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-[10px] text-zinc-500 hover:text-white uppercase transition-colors">
                                            edit specs
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
