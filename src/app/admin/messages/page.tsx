'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Trash2,
    RefreshCw,
    User,
    Calendar,
    Search,
    MessageSquare,
    Eye
} from 'lucide-react';
import { getCollectionData, deleteDocument } from '@/utils/firebase';

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedMsg, setSelectedMsg] = useState<any | null>(null);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const data = await getCollectionData('inquiries');
            setMessages(data);
            if (data.length > 0) {
                setSelectedMsg(data[0]);
            }
        } catch (e) {
            console.error('Error fetching inquiries:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to purge this secure transmission?')) return;
        try {
            await deleteDocument('inquiries', id);
            await fetchMessages();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredMessages = messages.filter(
        (m) =>
            m.name?.toLowerCase().includes(search.toLowerCase()) ||
            m.email?.toLowerCase().includes(search.toLowerCase()) ||
            m.message?.toLowerCase().includes(search.toLowerCase()) ||
            m.subject?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade-in font-mono selection:bg-[#ea0614] selection:text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="font-mono text-[9px] text-[#ea0614] tracking-[0.3em] font-bold uppercase mb-1 block">
                        SECURE CHANNELS
                    </span>
                    <h1 className="text-2xl font-extrabold font-orbitron text-white uppercase tracking-wider">
                        SECURE INQUIRIES RELAYS
                    </h1>
                </div>

                <div>
                    <button
                        onClick={fetchMessages}
                        className="p-3 bg-zinc-950 hover:bg-[#ea0614]/10 border border-white/5 hover:border-[#ea0614]/30 rounded-xs transition-colors flex items-center justify-center text-[#ea0614]"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-16 text-[#ea0614] text-xs">
                    ARCHIVE ANALYSIS: SCANNING CRYPTO SIGNALS STACKS...
                </div>
            ) : messages.length === 0 ? (
                <div className="border border-dashed border-white/5 p-12 text-center text-zinc-500 rounded-sm">
                    No active secure inquiries have been routed to this coordinate yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 select-none">
                    {/* Inbox List (span 5) */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-650" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search channels logs..."
                                className="w-full bg-zinc-950/40 border border-white/5 rounded-xs pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ea0614]/50"
                            />
                        </div>

                        <div className="glass-node border border-white/5 rounded-sm p-4 divide-y divide-white/5 max-h-[450px] overflow-y-auto">
                            {filteredMessages.map((m) => {
                                const selected = selectedMsg?.id === m.id;
                                return (
                                    <button
                                        key={m.id}
                                        onClick={() => setSelectedMsg(m)}
                                        className={`w-full text-left p-3.5 flex flex-col gap-1.5 transition-colors ${selected ? 'bg-[#ea0614]/10 text-white' : 'text-[#888] hover:text-white'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center text-[10px]">
                                            <span className="font-bold text-white uppercase">{m.name}</span>
                                            <span className="text-[#555] text-[8.5px]">{m.date || 'Recent'}</span>
                                        </div>
                                        <span className="text-[10px] text-zinc-400 font-bold uppercase truncate">{m.subject || 'Enterprise Interest'}</span>
                                        <p className="text-[9px] text-[#555] line-clamp-1 truncate font-mono font-light lowercase mt-0.5">{m.email}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Reader Panel (span 7) */}
                    <div className="lg:col-span-7 flex flex-col">
                        {selectedMsg ? (
                            <div className="glass-node border border-white/5 rounded-sm p-6 relative overflow-hidden flex flex-col justify-between h-full min-h-[400px]">
                                <div className="absolute top-4 right-4 font-mono text-[8px] text-[#444] tracking-widest">// SECURE_INQUIRY_DECODE</div>

                                <div>
                                    {/* Sender Details */}
                                    <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full border border-white/10 bg-zinc-950 flex items-center justify-center text-zinc-400">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                                                    {selectedMsg.name}
                                                </h3>
                                                <span className="text-[9.5px] text-[#ea0614] font-bold lowercase tracking-normal block mt-0.5">
                                                    {selectedMsg.email}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(selectedMsg.id)}
                                            className="p-2 border border-white/5 hover:border-red-950 text-zinc-650 hover:text-[#ea0614] rounded-sm transition-colors"
                                            title="Delete transmission log"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Coordinates/Parameters */}
                                    <div className="grid grid-cols-2 gap-4 text-[10px] mb-6 border-b border-white/5 pb-6">
                                        <div className="space-y-1">
                                            <span className="text-[#555] uppercase block font-bold">Relayed Routing Date:</span>
                                            <span className="text-white block font-mono flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-[#ea0614]" />
                                                {selectedMsg.date || 'Active Loop'}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[#555] uppercase block font-bold">Target Area:</span>
                                            <span className="text-white block font-mono font-bold uppercase">{selectedMsg.subject || 'HQ Telemetry'}</span>
                                        </div>
                                    </div>

                                    {/* Message Payload text */}
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] text-[#ea0614] font-mono font-bold tracking-widest uppercase flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4" />
                                            ENCRYPTED INQUIRY PAYLOAD
                                        </h4>
                                        <div className="p-4 bg-black/60 rounded-xs border border-white/5 text-xs text-zinc-300 leading-relaxed font-sans min-h-[140px] whitespace-pre-wrap">
                                            {selectedMsg.message}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-4 mt-6 text-[8px] font-mono text-[#555] uppercase tracking-wide">
                                    All relayed traffic signals comply with Indian Sovereign Cryptography requirements.
                                </div>
                            </div>
                        ) : (
                            <div className="glass-node border border-white/5 rounded-sm p-6 text-center text-[#555] flex h-full items-center justify-center">
                                Select a signal relay node to decrypt.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
