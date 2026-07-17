'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    RefreshCw,
    Calendar,
    Activity,
    Eye,
    Search,
    Shield
} from 'lucide-react';
import { getCollectionData } from '@/utils/firebase';

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const data = await getCollectionData('customers');
            setCustomers(data);
            if (data.length > 0) {
                setSelectedCustomer(data[0]);
            }
        } catch (e) {
            console.error('Error fetching customers:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter(
        (c) =>
            c.name?.toLowerCase().includes(search.toLowerCase()) ||
            c.email?.toLowerCase().includes(search.toLowerCase()) ||
            c.phone?.includes(search)
    );

    return (
        <div className="space-y-8 animate-fade-in font-mono selection:bg-[#ea0614] selection:text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="font-mono text-[9px] text-[#ea0614] tracking-[0.3em] font-bold uppercase mb-1 block">
                        CLEARANCE IDENTITY REGISTERS
                    </span>
                    <h1 className="text-2xl font-extrabold font-orbitron text-white uppercase tracking-wider">
                        TARGET CLIENT PROFILES
                    </h1>
                </div>

                <div>
                    <button
                        onClick={fetchCustomers}
                        className="p-3 bg-zinc-950 hover:bg-[#ea0614]/10 border border-white/5 hover:border-[#ea0614]/30 rounded-xs transition-colors flex items-center justify-center text-[#ea0614]"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-16 text-[#ea0614] text-xs">
                    CORRELATING CLIENT IDENTITY ARCHIVES...
                </div>
            ) : customers.length === 0 ? (
                <div className="border border-dashed border-white/5 p-12 text-center text-zinc-500 rounded-sm">
                    No active user registers found.
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 select-none">
                    {/* Left List Pane (span 5) */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-650" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search client registry..."
                                className="w-full bg-zinc-950/40 border border-white/5 rounded-xs pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ea0614]/50"
                            />
                        </div>

                        <div className="glass-node border border-white/5 rounded-sm p-4 divide-y divide-white/5 max-h-[450px] overflow-y-auto">
                            {filteredCustomers.map((c) => {
                                const selected = selectedCustomer?.id === c.id;
                                return (
                                    <button
                                        key={c.id}
                                        onClick={() => setSelectedCustomer(c)}
                                        className={`w-full text-left p-3.5 flex items-center justify-between transition-colors ${selected ? 'bg-[#ea0614]/10 text-white' : 'text-[#888] hover:text-white'
                                            }`}
                                    >
                                        <div>
                                            <div className="text-xs font-bold font-mono tracking-wide">{c.name}</div>
                                            <div className="text-[9.5px] text-[#555] mt-0.5 truncate uppercase">{c.email}</div>
                                        </div>
                                        <div className="text-[10px] font-bold text-white font-mono bg-zinc-900 border border-white/5 px-2 py-0.5 rounded-sm">
                                            {c.ordersCount || 0} ord
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right detail view pane (span 7) */}
                    <div className="lg:col-span-7 flex flex-col">
                        {selectedCustomer ? (
                            <div className="glass-node border border-white/5 rounded-sm p-6 relative overflow-hidden flex flex-col justify-between h-full min-h-[400px]">
                                <div className="absolute top-4 right-4 font-mono text-[8px] text-[#444] tracking-widest">// TARGET_SPEC_LOG</div>

                                <div>
                                    {/* Client Header details */}
                                    <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-6">
                                        <div className="w-12 h-12 rounded-full border border-[#ea0614]/40 bg-[#ea0614]/5 flex items-center justify-center font-orbitron font-extrabold text-white text-lg">
                                            {selectedCustomer.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                                                {selectedCustomer.name}
                                            </h3>
                                            <span className="text-[9px] text-[#ea0614] font-bold uppercase tracking-widest block mt-0.5">
                                                UID: {selectedCustomer.id}
                                            </span>
                                        </div>
                                    </div>

                                    {/* System specifications lists */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs mb-8">
                                        <div className="space-y-1">
                                            <span className="text-[#555] uppercase block text-[9.5pt] font-bold tracking-wider">Communication Channel:</span>
                                            <span className="text-white block font-mono text-xs">{selectedCustomer.email}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[#555] uppercase block text-[9.5pt] font-bold tracking-wider">Secure Phone Index:</span>
                                            <span className="text-white block font-mono text-xs">{selectedCustomer.phone || 'Unavailable'}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[#555] uppercase block text-[9.5pt] font-bold tracking-wider">Date Enrolled:</span>
                                            <span className="text-white block font-mono text-xs flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-[#ea0614]" />
                                                {selectedCustomer.dateJoined}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[#555] uppercase block text-[9.5pt] font-bold tracking-wider">Total Value Invested:</span>
                                            <span className="text-white block font-mono text-xs font-bold">
                                                ₹{selectedCustomer.totalSpent?.toLocaleString() || '0'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action audit log activity tracker */}
                                    <div className="border-t border-white/5 pt-6">
                                        <h4 className="text-[10px] text-[#ea0614] font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                                            <Activity className="w-4 h-4" />
                                            SECURITY OPERATION AUDIT TRAIL
                                        </h4>

                                        {selectedCustomer.activity && selectedCustomer.activity.length > 0 ? (
                                            <div className="space-y-3 font-mono text-[10px]">
                                                {selectedCustomer.activity.map((act: any, aIdx: number) => (
                                                    <div key={aIdx} className="flex gap-4 p-2.5 bg-black/40 border border-white/5 text-zinc-400">
                                                        <span className="text-[#ea0614] flex-shrink-0">●</span>
                                                        <div className="flex-grow">
                                                            <p className="text-white font-medium">{act.description}</p>
                                                            <span className="text-[8.5px] text-[#555] mt-1 block">{act.date}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-[10px] text-[#555]">No telemetry logs generated for this profile index.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-4 mt-6 text-[8px] font-mono text-[#444] uppercase">
                                    Encrypted client logs comply with cyber security compliance laws.
                                </div>
                            </div>
                        ) : (
                            <div className="glass-node border border-white/5 rounded-sm p-6 text-center text-[#555] flex h-full items-center justify-center">
                                Select a target profile to review data locks.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
