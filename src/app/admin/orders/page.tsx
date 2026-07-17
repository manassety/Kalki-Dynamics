'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    DollarSign,
    RefreshCw,
    Clock,
    CheckCircle2,
    Truck,
    XCircle,
    SlidersHorizontal,
    Search
} from 'lucide-react';
import { getCollectionData, setDocument, deleteDocument } from '@/utils/firebase';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await getCollectionData('orders');
            setOrders(data);
        } catch (e) {
            console.error('Error fetching orders:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (orderId: string, currentOrder: any, newStatus: string) => {
        try {
            await setDocument('orders', orderId, {
                ...currentOrder,
                orderStatus: newStatus
            });
            await fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteOrder = async (orderId: string) => {
        if (!confirm('Purge this transaction log? This action is irreversible.')) return;
        try {
            await deleteDocument('orders', orderId);
            await fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />;
            case 'shipped':
                return <Truck className="w-3.5 h-3.5 text-blue-500" />;
            case 'processing':
                return <Clock className="w-3.5 h-3.5 text-yellow-500" />;
            default:
                return <XCircle className="w-3.5 h-3.5 text-zinc-500" />;
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'bg-green-950/20 border-green-500/30 text-green-500';
            case 'shipped':
                return 'bg-blue-950/20 border-blue-500/30 text-blue-500';
            case 'processing':
                return 'bg-yellow-950/20 border-yellow-500/30 text-yellow-500';
            default:
                return 'bg-zinc-900 border-white/5 text-zinc-400';
        }
    };

    // Filtered orders list
    const filteredOrders = orders.filter((ord) => {
        const matchesSearch =
            ord.customer?.toLowerCase().includes(search.toLowerCase()) ||
            ord.id?.toLowerCase().includes(search.toLowerCase()) ||
            ord.product?.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = filterStatus === 'all' || ord.orderStatus?.toLowerCase() === filterStatus.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8 animate-fade-in font-mono selection:bg-[#ea0614] selection:text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="font-mono text-[9px] text-[#ea0614] tracking-[0.3em] font-bold uppercase mb-1 block">
                        LEDGER TRANSACTION STACKS
                    </span>
                    <h1 className="text-2xl font-extrabold font-orbitron text-white uppercase tracking-wider">
                        ORDERS EXCHANGE QUEUE
                    </h1>
                </div>

                <div>
                    <button
                        onClick={fetchOrders}
                        className="p-3 bg-zinc-950 hover:bg-[#ea0614]/10 border border-white/5 hover:border-[#ea0614]/30 rounded-xs transition-colors flex items-center justify-center text-[#ea0614]"
                    >
                        <RefreshCw className="w-4 h-4 animate-spin-hover" />
                    </button>
                </div>
            </div>

            {/* Filter and search parameters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-950/40 p-4 border border-white/5 rounded-sm">
                <div className="relative w-full md:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-650" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search logs: Order, Client, SKU..."
                        className="w-full bg-black border border-white/5 rounded-xs pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ea0614]/50"
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
                    <div className="flex bg-black p-1 border border-white/5 rounded-xs text-[10px]">
                        {['All', 'Processing', 'Shipped', 'Completed'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilterStatus(s.toLowerCase())}
                                className={`px-3 py-1.5 uppercase font-bold tracking-widest ${(filterStatus === s.toLowerCase() || (s === 'All' && filterStatus === 'all'))
                                        ? 'bg-[#ea0614] text-white shadow-md'
                                        : 'text-zinc-500 hover:text-white'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders Table sheet */}
            {loading ? (
                <div className="text-center py-16 text-[#ea0614] text-xs">
                    ARCHIVE DECODING: CORRELATING INCOMING PAYMENTS...
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="border border-dashed border-white/5 p-12 text-center text-zinc-500 rounded-sm">
                    No active transaction matching the filter matrices were resolved.
                </div>
            ) : (
                <div className="glass-node border border-white/5 rounded-sm overflow-hidden select-none">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="border-b border-white/10 bg-black/60 font-mono font-bold text-white uppercase tracking-wider">
                                    <th className="p-4 text-[9px] text-[#555]">Order ID</th>
                                    <th className="p-4 text-[9px] text-[#555]">Client</th>
                                    <th className="p-4 text-[9px] text-[#555]">Products / Description</th>
                                    <th className="p-4 text-[9px] text-[#555]">Total Cost</th>
                                    <th className="p-4 text-[9px] text-[#555]">Status</th>
                                    <th className="p-4 text-[9px] text-[#555]">Timestamp</th>
                                    <th className="p-4 text-[9px] text-[#555] text-right">Process Update</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-[#c0c0c0]">
                                {filteredOrders.map((ord) => (
                                    <tr key={ord.id} className="hover:bg-white/2 transition-colors">
                                        <td className="p-4 font-bold text-white font-mono">{ord.id}</td>
                                        <td className="p-4">
                                            <div className="text-white font-bold">{ord.customer}</div>
                                            <div className="text-[9px] text-zinc-500 font-light lowercase mt-0.5">{ord.email}</div>
                                            <div className="text-[8px] text-[#555] mt-0.5">{ord.phone}</div>
                                        </td>
                                        <td className="p-4 uppercase">
                                            <span className="text-white font-semibold">{ord.product}</span>
                                            <span className="text-[10px] text-zinc-500 ml-1.5">(x{ord.quantity})</span>
                                        </td>
                                        <td className="p-4 font-bold text-white">₹{ord.amount?.toLocaleString()}</td>
                                        <td className="p-4">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 border text-[9px] rounded-sm font-bold uppercase tracking-wider ${getStatusStyle(ord.orderStatus)}`}>
                                                {getStatusIcon(ord.orderStatus)}
                                                <span>{ord.orderStatus}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-zinc-400 font-mono">{ord.date}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end items-center gap-1.5">
                                                <select
                                                    value={ord.orderStatus}
                                                    onChange={(e) => updateStatus(ord.id, ord, e.target.value)}
                                                    className="bg-black border border-white/5 p-2 text-[10px] text-white focus:outline-none focus:border-[#ea0614]/50"
                                                >
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                                <button
                                                    onClick={() => handleDeleteOrder(ord.id)}
                                                    className="p-2 border border-white/5 hover:border-red-950 text-zinc-600 hover:text-[#ea0614] rounded-sm transition-colors"
                                                    title="Purge transaction entry"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
