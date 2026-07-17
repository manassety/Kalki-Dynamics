'use client';

import { motion } from 'framer-motion';
import {
    Cpu, Globe, Smartphone, Terminal,
    Palette, Cloud, Database, Cpu as RobotIcon,
    ArrowRight, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        icon: Cpu,
        title: 'Artificial Intelligence Solutions',
        description: 'Custom AI solutions for automation, computer vision, business intelligence and intelligent decision making.',
        details: 'Leveraging state-of-the-art neural engines and custom model processing pipelines.'
    },
    {
        icon: Globe,
        title: 'Website Development',
        description: 'Modern responsive websites with premium UI/UX, SEO optimization and high performance.',
        details: 'Interactive frameworks optimized for fast load times and clean animations.'
    },
    {
        icon: Smartphone,
        title: 'Mobile App Development',
        description: 'Android and iOS applications using modern technologies with scalable architecture.',
        details: 'Native rendering, reliable local storage, and secure real-time syncing architectures.'
    },
    {
        icon: Terminal,
        title: 'Custom Software Development',
        description: 'Business software, ERP systems, CRM platforms and enterprise solutions.',
        details: 'Clean compiler code, microservices paradigms, and secure enterprise integration.'
    },
    {
        icon: Palette,
        title: 'UI / UX Design',
        description: 'Premium user interface and user experience design focused on usability and branding.',
        details: 'Sleek custom layout configurations, interactive wireframes, and dark-glow themes.'
    },
    {
        icon: Cloud,
        title: 'Cloud & Backend Development',
        description: 'Secure cloud infrastructure, APIs, authentication and scalable backend systems.',
        details: 'Military-grade access controls, database redundancy, and highly-scalable networks.'
    },
    {
        icon: Database,
        title: 'IoT & Embedded Systems',
        description: 'Smart devices, automation systems, embedded electronics and intelligent connected solutions.',
        details: 'Hardware-level compiler optimizations, low-latency sensory controls, and custom firmware.'
    },
    {
        icon: RobotIcon,
        title: 'Robotics & Automation',
        description: 'AI-powered robotic systems, automation projects and industrial innovation.',
        details: 'Autonomous hardware systems configured with edge compute target acquisition layers.'
    }
];

export default function ServicesPage() {
    return (
        <div className="w-full bg-[#000000] min-h-screen text-white pt-32 pb-24 relative overflow-hidden custom-grid selection:bg-[#ea0614] selection:text-white">
            {/* Decorative Background Elements */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ea0614]/5 rounded-full filter blur-[150px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ea0614_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header HUD Info */}
                <div className="flex items-center gap-2 mb-4 font-mono text-[9px] text-[#555] tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ea0614] pulse-red" />
                    KALKI CORE CAPABILITIES LISTING // REV_7.1
                </div>

                {/* Title */}
                <div className="mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl font-extrabold tracking-tight font-orbitron uppercase text-white"
                    >
                        OUR <span className="text-radial-glow">SERVICES</span>
                    </motion.h1>
                    <div className="w-20 h-[2.5px] bg-[#ea0614] mt-4 mb-6" />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-zinc-400 text-sm max-w-xl leading-relaxed"
                    >
                        We build cutting-edge software applications, responsive web portals, intelligent user interfaces, custom mechanical control frameworks, and embedded IoT systems optimized for extreme autonomy.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((svc, idx) => {
                        const Icon = svc.icon;
                        return (
                            <motion.div
                                key={svc.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.08 }}
                                className="glass-node p-8 rounded-sm hover:border-[#ea0614]/40 flex flex-col justify-between min-h-[340px] transition-all duration-300 relative group glow-border"
                            >
                                {/* Visual HUD coordinate background elements */}
                                <div className="absolute top-4 right-4 font-mono text-[8px] text-[#222] group-hover:text-[#444] transition-colors tracking-widest">
                  // SEC_SVC_{idx + 1}
                                </div>

                                <div>
                                    <div className="w-12 h-12 rounded-sm bg-[#ea0614]/10 border border-[#ea0614]/25 flex items-center justify-center text-[#ea0614] mb-8 group-hover:bg-[#ea0614] group-hover:text-white transition-all duration-300">
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    <h3 className="text-base font-bold font-mono tracking-wider text-white mb-3 uppercase group-hover:text-[#ea0614] transition-colors duration-300">
                                        {svc.title}
                                    </h3>

                                    <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4 text-[#88888b] group-hover:text-zinc-300 transition-colors">
                                        {svc.description}
                                    </p>
                                </div>

                                <div>
                                    <div className="border-t border-white/5 pt-4 mt-2">
                                        <p className="text-[10px] text-[#555] font-mono leading-normal mb-4 font-light truncate">
                                            {svc.details}
                                        </p>
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-1 text-[10px] font-mono text-[#ea0614] font-bold tracking-wider group-hover:text-white uppercase transition-colors"
                                        >
                                            LEARN MORE
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Global capability summary banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 glass-node border border-[#ea0614]/20 rounded-sm flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border border-green-500/25 bg-green-500/5 flex items-center justify-center text-green-500">
                            <ShieldCheck className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold font-mono uppercase tracking-wider text-white">Full-Scale Technology Integration Matrix</h4>
                            <p className="text-[11px] text-[#888] font-mono mt-1 font-light leading-relaxed">All services adhere strictly to ISO certification standard compliance logs and are monitored by real-time hardware telemetry diagnostics.</p>
                        </div>
                    </div>
                    <Link
                        href="/contact"
                        className="px-8 py-3.5 bg-[#ea0614] hover:bg-[#ff0015] text-white text-xs font-mono font-bold tracking-[0.2em] rounded-sm transition-all flex items-center gap-2 flex-shrink-0"
                    >
                        REQUEST CONSULTATION
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
