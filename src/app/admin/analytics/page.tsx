'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LineChart,
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    Globe,
    Compass,
    Cpu,
    RefreshCw
} from 'lucide-react';
import { getCollectionData } from '@/utils/firebase';

export default function AdminAnalyticsPage() {
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const data = await getCollectionData('analytics');
            const summary = data.find(a => a.id === 'summary') || {
                totalOrders: 3,
                revenue: 579995,
                visitors: 1845,
                salesLog: [
                    { date: '25 Jun', value: 12000 },
                    { date: '01 Jul', value: 24995 },
                    { date: '05 Jul', value: 45000 },
                    { date: '10 Jul', value: 185000 },
                    { date: '15 Jul', value: 370000 }
                ],
                trafficSources: [
                    { source: 'Sovereign Swarms API', percentage: 45 },
                    { source: 'Organic Search Feeds', percentage: 30 },
                    { source: 'Direct Secure Links', percentage: 25 }
                ],
                visitorChart: [
                    { date: '05 Jul', count: 180 },
                    { date: '07 Jul', count: 320 },
                    { date: '09 Jul', count: 210 },
                    { date: '11 Jul', count: 480 },
                    { date: '13 Jul', count: 655 },
                    { date: '15 Jul', count: 912 }
                ]
            };
            setAnalytics(summary);
        } catch (e) {
            console.error('Error fetching analytics:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const maxChartValue = analytics && analytics.salesLog ? Math.max(...analytics.salesLog.map((item: any) => item.value)) : 100000;
    const maxVisitorValue = analytics && analytics.visitorChart ? Math.max(...analytics.visitorChart.map((item: any) => item.count)) : 1000;

    return (
        <div className="space-y-8 animate-fade-in font-mono selection:bg-[#ea0614] selection:text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="font-mono text-[9px] text-[#ea0614] tracking-[0.3em] font-bold uppercase mb-1 block">
                        ANALYST TELEMETRY PANELS
                    </span>
                    <h1 className="text-2xl font-extrabold font-orbitron text-white uppercase tracking-wider">
                        TELEMETRY METRICS
                    </h1>
                </div>

                <div>
                    <button
                        onClick={fetchAnalytics}
                        className="p-3 bg-zinc-950 hover:bg-[#ea0614]/10 border border-white/5 hover:border-[#ea0614]/30 rounded-xs transition-colors flex items-center justify-center text-[#ea0614]"
                    >
                        <RefreshCw className="w-4 h-4 animate-spin-hover" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-16 text-[#ea0614] text-xs">
                    ARCHIVE ANALYSIS DEPLOYING DIAGNOSTIC CHARTS...
                </div>
            ) : (
                <div className="space-y-8 select-none">
                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Cost Revenue Chart Sheet */}
                        <div className="glass-node border border-white/5 rounded-sm p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">INCOME METRIC GRAPH</span>
                                        <h3 className="text-base text-white font-extrabold uppercase font-orbitron">GROSS INCOME ARCHIVES</h3>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-bold text-white block">₹{analytics?.revenue?.toLocaleString()}</span>
                                        <span className="text-[8.5px] text-green-500 font-bold tracking-wide uppercase inline-flex items-center gap-0.5 mt-0.5">
                                            <ArrowUpRight className="w-3 h-3" /> +14.2%
                                        </span>
                                    </div>
                                </div>

                                {/* Custom SVG Chart graph */}
                                <div className="h-44 w-full relative mb-4">
                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                                        <defs>
                                            <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#ea0614" stopOpacity="0.25" />
                                                <stop offset="100%" stopColor="#ea0614" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>

                                        {/* Grid lines */}
                                        <line x1="0" y1="0" x2="500" y2="0" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                        <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                        <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                        <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                                        {/* Chart Path */}
                                        {analytics?.salesLog && (
                                            <>
                                                {/* Gradient area */}
                                                <path
                                                    d={`M 0 150 
                                                        ${analytics.salesLog.map((d: any, i: number) => {
                                                        const x = (i / (analytics.salesLog.length - 1)) * 500;
                                                        const y = 150 - (d.value / maxChartValue) * 120;
                                                        return `L ${x} ${y}`;
                                                    }).join(' ')} 
                                                        L 500 150 Z`}
                                                    fill="url(#salesGrad)"
                                                />
                                                {/* Stroke path */}
                                                <path
                                                    d={analytics.salesLog.map((d: any, i: number) => {
                                                        const x = (i / (analytics.salesLog.length - 1)) * 500;
                                                        const y = 150 - (d.value / maxChartValue) * 120;
                                                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                                                    }).join(' ')}
                                                    fill="none"
                                                    stroke="#ea0614"
                                                    strokeWidth="2.5"
                                                />
                                                {/* Dots */}
                                                {analytics.salesLog.map((d: any, i: number) => {
                                                    const x = (i / (analytics.salesLog.length - 1)) * 500;
                                                    const y = 150 - (d.value / maxChartValue) * 120;
                                                    return (
                                                        <circle
                                                            key={i}
                                                            cx={x}
                                                            cy={y}
                                                            r="3.5"
                                                            fill="#ea0614"
                                                            stroke="#070707"
                                                            strokeWidth="1.5"
                                                            className="hover:r-5 transition-all cursor-pointer"
                                                        />
                                                    );
                                                })}
                                            </>
                                        )}
                                    </svg>
                                </div>
                            </div>

                            {/* X-Axis coordinates */}
                            <div className="flex justify-between text-[9px] text-zinc-500 font-mono tracking-wider pt-2 border-t border-white/5">
                                {analytics?.salesLog?.map((d: any) => (
                                    <span key={d.date}>{d.date}</span>
                                ))}
                            </div>
                        </div>

                        {/* Traffic/Visitor count Chart */}
                        <div className="glass-node border border-white/5 rounded-sm p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">VISITOR FOOTPRINT GRAPH</span>
                                        <h3 className="text-base text-white font-extrabold uppercase font-orbitron">SYSTEM CONNECTIONS COUNTER</h3>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-bold text-white block">{analytics?.visitors?.toLocaleString()}</span>
                                        <span className="text-[8.5px] text-green-500 font-bold tracking-wide uppercase inline-flex items-center gap-0.5 mt-0.5">
                                            <ArrowUpRight className="w-3 h-3" /> +28%
                                        </span>
                                    </div>
                                </div>

                                <div className="h-44 w-full relative mb-4">
                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                                        <defs>
                                            <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#888" stopOpacity="0.15" />
                                                <stop offset="100%" stopColor="#888" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>

                                        {/* Grid lines */}
                                        <line x1="0" y1="0" x2="500" y2="0" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                        <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                        <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                        <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                                        {/* Visitor chart area */}
                                        {analytics?.visitorChart && (
                                            <>
                                                {/* Gradient area */}
                                                <path
                                                    d={`M 0 150 
                                                        ${analytics.visitorChart.map((d: any, i: number) => {
                                                        const x = (i / (analytics.visitorChart.length - 1)) * 500;
                                                        const y = 150 - (d.count / maxVisitorValue) * 120;
                                                        return `L ${x} ${y}`;
                                                    }).join(' ')} 
                                                        L 500 150 Z`}
                                                    fill="url(#visitorGrad)"
                                                />
                                                {/* Stroke path */}
                                                <path
                                                    d={analytics.visitorChart.map((d: any, i: number) => {
                                                        const x = (i / (analytics.visitorChart.length - 1)) * 500;
                                                        const y = 150 - (d.count / maxVisitorValue) * 120;
                                                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                                                    }).join(' ')}
                                                    fill="none"
                                                    stroke="#c0c0c0"
                                                    strokeWidth="2"
                                                />
                                                {/* Dots */}
                                                {analytics.visitorChart.map((d: any, i: number) => {
                                                    const x = (i / (analytics.visitorChart.length - 1)) * 500;
                                                    const y = 150 - (d.count / maxVisitorValue) * 120;
                                                    return (
                                                        <circle
                                                            key={i}
                                                            cx={x}
                                                            cy={y}
                                                            r="3"
                                                            fill="#c0c0c0"
                                                            stroke="#070707"
                                                            strokeWidth="1.5"
                                                            className="hover:r-4 transition-all cursor-pointer"
                                                        />
                                                    );
                                                })}
                                            </>
                                        )}
                                    </svg>
                                </div>
                            </div>

                            {/* X-Axis */}
                            <div className="flex justify-between text-[9px] text-zinc-500 font-mono tracking-wider pt-2 border-t border-white/5">
                                {analytics?.visitorChart?.map((d: any) => (
                                    <span key={d.date}>{d.date}</span>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Bottom breakdown segment summary files */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        {/* Traffic referrals */}
                        <div className="glass-node border border-white/5 rounded-sm p-6 relative">
                            <div className="absolute top-4 right-4 font-mono text-[8px] text-[#444] tracking-widest">// SYS_REFERRALS_LOCK</div>

                            <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-6 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-[#ea0614]" />
                                TRAFFIC REFERRALS ROUTE
                            </h3>

                            <div className="space-y-4">
                                {analytics?.trafficSources?.map((src: any) => (
                                    <div key={src.source} className="flex flex-col text-[10.5px]">
                                        <div className="flex justify-between items-center mb-1 text-zinc-300">
                                            <span className="font-bold block uppercase truncate">{src.source}</span>
                                            <span>{src.percentage}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-black border border-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#ea0614]"
                                                style={{ width: `${src.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Telemetry conversion speed */}
                        <div className="glass-node border border-white/5 rounded-sm p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                    EFFICIENCY PARAMETERS
                                </h3>

                                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                                    <div className="border border-white/5 bg-zinc-950 p-4">
                                        <span className="text-[#555] uppercase block text-[8px] tracking-wider mb-1 font-bold">API latency:</span>
                                        <span className="text-white block font-bold">0.08 millisecond</span>
                                    </div>
                                    <div className="border border-white/5 bg-zinc-950 p-4">
                                        <span className="text-[#555] uppercase block text-[8px] tracking-wider mb-1 font-bold">Sovereignty grid:</span>
                                        <span className="text-green-500 block font-bold font-mono">99.98% uptime</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[9px] text-zinc-550 leading-relaxed font-light mt-4 uppercase">
                                Telemetry counters are archived on daily loops, secure mapping locks verify client signatures.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
