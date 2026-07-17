'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    ArrowUpRight,
    Cpu,
    DollarSign,
    Layers,
    MessageSquare,
    ShoppingBag,
    Terminal,
    Users
} from 'lucide-react';
import { getCollectionData } from '@/utils/firebase';

export default function AdminControlDeck() {
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const fetchDeckData = async () => {
            try {
                const analyticsData = await getCollectionData('analytics');
                const summary = analyticsData.find(a => a.id === 'summary') || {
                    totalOrders: 3,
                    revenue: 579995,
                    visitors: 1845,
                    products: 2,
                    customers: 3
                };
                setAnalytics(summary);

                // Add boot logs
                setLogs([
                    `[${new Date().toLocaleTimeString()}] Secure terminal deck unlocked mapping: Level-5 clearance.`,
                    `[${new Date().toLocaleTimeString()}] Target security grids verified: 100% telemetry connection.`,
                    `[${new Date().toLocaleTimeString()}] Swarm communications: standard response interval active.`,
                    `[${new Date().toLocaleTimeString()}] Database synchronization: secure mock/firebase linked.`,
                    `[${new Date().toLocaleTimeString()}] Server nodes: active diagnostic checks reported completed.`
                ]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDeckData();
    }, []);

    const addManualLogCommand = (text: string) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] command input: ${text}`, ...prev.slice(0, 10)]);
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center font-mono text-[#ea0614] text-xs">
                LOADING DESKTOP DASHBOARD FILES...
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in font-mono selection:bg-[#ea0614] selection:text-white">
            {/* Page Header */}
            <div>
                <span className="font-mono text-[9px] text-[#ea0614] tracking-[0.3em] font-bold uppercase mb-1 block">
                    TELEMETRY OVERVIEW
                </span>
                <h1 className="text-2xl font-extrabold font-orbitron text-white uppercase tracking-wider">
                    CONTROL DECK CENTRAL
                </h1>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'GROSS INCOME', val: `₹${analytics?.revenue?.toLocaleString() || '579,995'}`, change: '+14% from last scan', icon: DollarSign, color: 'text-green-500' },
                    { label: 'TACTICAL ORDERS', val: analytics?.totalOrders || '3', change: '+2 new incoming', icon: ShoppingBag, color: 'text-[#ea0614]' },
                    { label: 'COGNITIVE SESSIONS', val: analytics?.visitors || '1,845', change: '84 current active swarm', icon: Users, color: 'text-blue-500' },
                    { label: 'SPEC CATALOG', val: analytics?.products || '2', change: '5 active prototypes', icon: Cpu, color: 'text-purple-500' }
                ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.08 }}
                            className="glass-node p-6 border border-white/5 bg-zinc-950/40 relative rounded-sm flex flex-col justify-between"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-[9px] text-[#555] font-bold tracking-widest uppercase">{stat.label}</span>
                                <div className={`p-1.5 bg-black border border-white/5 rounded-xs ${stat.color}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                            </div>
                            <div>
                                <span className="text-xl font-bold font-orbitron text-white block mb-1">
                                    {stat.val}
                                </span>
                                <span className="text-[8px] text-[#888] font-mono block">
                                    {stat.change}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Active Terminal logs console */}
                <div className="lg:col-span-7 glass-node border border-white/5 rounded-sm p-6 flex flex-col min-h-[350px]">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                        <h3 className="text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-[#ea0614]" />
                            SECURE TELEMETRY LOGS
                        </h3>
                        <span className="text-[8.5px] text-[#555] font-bold tracking-widest uppercase">SYS_LOGSEC_LOCK</span>
                    </div>

                    <div className="flex-grow bg-black/60 p-4 rounded-xs border border-white/5 font-mono text-[10px] text-zinc-400 space-y-2 overflow-y-auto max-h-[220px]">
                        {logs.map((log, lidx) => (
                            <div key={lidx} className="flex gap-2">
                                <span className="text-[#ea0614] flex-shrink-0 animate-pulse">&gt;</span>
                                <span className="break-all">{log}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter system diagnostic parameters..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const val = (e.target as HTMLInputElement).value;
                                    if (val.trim()) {
                                        addManualLogCommand(val.trim());
                                        (e.target as HTMLInputElement).value = '';
                                    }
                                }
                            }}
                            className="flex-grow bg-zinc-950/60 border border-white/5 rounded-xs p-3 text-[10px] text-white placeholder-zinc-600 focus:outline-none focus:border-[#ea0614]/50"
                        />
                        <button
                            onClick={() => addManualLogCommand('DIAGNOSTICS SCAN TRIGGERED')}
                            className="px-4 py-2 border border-[#ea0614]/40 hover:border-[#ea0614] text-white bg-[#ea0614]/5 text-[9px] font-bold uppercase tracking-widest rounded-xs transition-colors"
                        >
                            RUN SCAN
                        </button>
                    </div>
                </div>

                {/* Subsystem status board */}
                <div className="lg:col-span-5 glass-node border border-white/5 rounded-sm p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                            <h3 className="text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2">
                                <Activity className="w-4 h-4 text-[#ea0614]" />
                                PROTOCOL SUBSYSTEMS
                            </h3>
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                        </div>

                        <div className="space-y-4">
                            {[
                                { name: 'RAKSHA ACTIVE RESPONDERS', status: 'SYNCHRONIZED', percentage: 100, usage: '0.12 ms delay' },
                                { name: 'CURA EXPERT MEDICAL CORES', status: 'ACTIVE', percentage: 98.4, usage: '21 query threads' },
                                { name: 'SKILLORA TALENT SYNC GATE', status: 'STANDBY', percentage: 100, usage: 'Idle mode' },
                                { name: 'NEUROMORPHIC EDGE CLUSTERS', status: 'IN R&D PHASE', percentage: 50, usage: 'Testing logic gates' }
                            ].map((sub, idx) => (
                                <div key={sub.name} className="flex flex-col text-[10.5px]">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-zinc-300 font-bold block truncate uppercase">{sub.name}</span>
                                        <span className="text-[9px] font-bold text-[#ea0614]">{sub.status}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[9px] text-[#555]">
                                        <span>Capacity check: {sub.percentage}%</span>
                                        <span>{sub.usage}</span>
                                    </div>
                                    {/* Progress track */}
                                    <div className="w-full h-[3px] bg-zinc-900 mt-2 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-red-800 to-[#ea0614]"
                                            style={{ width: `${sub.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-[9px] text-zinc-500 border-t border-white/5 pt-4 mt-6 uppercase leading-relaxed font-light">
                        Deploy secure patches directly from the core coordinates settings. Logging registers are archived automatically.
                    </div>
                </div>
            </div>
        </div>
    );
}
