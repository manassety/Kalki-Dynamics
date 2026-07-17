'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Award, Compass, Cpu, Layers } from 'lucide-react';
import { getStoredFounderInfo } from '@/utils/storage';
import { FounderInfo } from '@/data/products';

export default function AboutPage() {
    const [founders, setFounders] = useState<FounderInfo[]>([]);

    useEffect(() => {
        setFounders(getStoredFounderInfo());
    }, []);

    const ceo = founders[0] || {
        name: 'Manas Sety(Kalki)',
        role: 'Founder & CEO',
        description: 'Visionary entrepreneur leading KALKI Dynamics in AI, Robotics, Smart Surveillance, and Future Technologies.'
    };

    return (
        <div className="min-h-screen bg-[#000000] relative custom-grid pt-32 pb-24 text-white">

            {/* Top Background Glow */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ea0614]/5 rounded-full filter blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* HERO */}
                <div className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-2 mb-4"
                    >
                        <div className="h-[1px] w-8 bg-[#ea0614]" />
                        <span className="font-mono text-xs text-[#ea0614] tracking-[0.4em] uppercase font-bold">
                            ESTABLISHED IN 2026
                        </span>
                        <div className="h-[1px] w-8 bg-[#ea0614]" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-extrabold uppercase font-orbitron text-white mb-6"
                        style={{ viewTransitionName: 'hero-title' } as React.CSSProperties}
                    >
                        CORPORATE CHARTER
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-sm text-[#c0c0c0] max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        KALKI Dynamics is a high-performance computer vision and defense hardware robotics manufacturer, setting the standard for offline Edge automation.
                    </motion.p>
                </div>

                {/* NARRATIVE SECTION: STORY & FOUNDER */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 flex flex-col gap-6"
                    >
                        <h2 className="text-xl font-bold font-mono tracking-widest text-[#ea0614] uppercase">
              // FOUNDING PRINCIPLES
                        </h2>
                        <h3 className="text-2xl font-semibold text-white uppercase font-orbitron">
                            {ceo.role} : {ceo.name}
                        </h3>

                        <p className="text-xs text-[#88888b] leading-relaxed">
                            {ceo.description}
                        </p>

                        {/* Micro stats banner */}
                        <div className="grid grid-cols-2 gap-4 mt-4 border-t border-white/5 pt-6">
                            <div>
                                <span className="font-mono text-xl font-bold text-white block">{ceo.name}</span>
                                <span className="text-[9px] font-mono text-[#555] tracking-wider uppercase">Founder & CEO</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Founder Photo & Visual System (Right side) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 h-[340px] border border-[#ea0614]/20 bg-[#121212]/30 rounded-sm relative overflow-hidden group"
                    >
                        <img
                            src="/Founder.png"
                            alt="Manas Sety, Founder of KALKI Dynamics"
                            className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05] transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute top-3 left-3 bg-black/85 border border-[#ea0614]/30 px-2.5 py-1 font-mono text-[8px] text-[#ea0614] tracking-widest">
                            SYS_RECORD_99042 // FOUNDER_IMAGE
                        </div>
                        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 font-mono text-[9px] text-[#ea0614] bg-black/80 px-2 py-1 border border-white/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ea0614] pulse-red" />
                            FOUNDING SPECIMEN INDEX
                        </div>
                    </motion.div>
                </div>

                {/* ROADMAP TIMELINE */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-xl font-bold font-mono tracking-widest text-[#ea0614] uppercase">
              // CORPORATE JOURNEY
                        </h2>
                        <h3 className="text-2xl font-semibold text-white uppercase font-orbitron/80 text-glow">
                            THE KALKI Dynamics CHRONOLOGY
                        </h3>
                        <div className="w-10 h-[1.5px] bg-[#ea0614] mx-auto mt-3" />
                    </div>

                    <div className="space-y-6 max-w-4xl mx-auto">
                        {[
                            {
                                year: '2023',
                                title: 'Robotics, AI & Core Foundations',
                                bullets: [
                                    'Started learning Robotics, AI, IoT and Software Development.',
                                    'Built multiple hardware and software projects.',
                                    'Focused on practical engineering and embedded systems.'
                                ]
                            },
                            {
                                year: '2024',
                                title: 'Freelancing & Technical Expansion',
                                bullets: [
                                    'Started freelance development projects.',
                                    'Successfully developed websites and mobile applications.',
                                    'Worked on AI, IoT and automation solutions.',
                                    'Expanded technical expertise in Full Stack Development.'
                                ]
                            },
                            {
                                year: '2026',
                                title: 'Officially Founded KALKI Dynamics',
                                tagline: 'Powering the Next Era.',
                                label: 'Expanded Into:',
                                bullets: [
                                    'Artificial Intelligence',
                                    'Robotics',
                                    'Web Development',
                                    'Mobile Applications',
                                    'IoT',
                                    'Embedded Systems',
                                    'Automation',
                                    'Smart Surveillance'
                                ]
                            }
                        ].map((node, idx) => (
                            <motion.div
                                key={node.year}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="glass-node p-6 rounded-sm border border-white/5 flex flex-col md:flex-row gap-6 items-start hover:border-[#ea0614]/30 duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-[2px] h-full bg-[#ea0614]" />
                                <div className="w-20 font-orbitron text-2xl font-extrabold text-[#ea0614] tracking-wide flex-shrink-0">
                                    {node.year}
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-sm font-bold font-mono uppercase tracking-wider text-white mb-2">
                                        {node.title}
                                    </h4>
                                    {node.tagline && (
                                        <div className="text-xs text-[#ea0614] font-bold font-mono uppercase tracking-widest mb-3">
                                            {node.tagline}
                                        </div>
                                    )}
                                    {node.label && (
                                        <div className="text-[10px] text-[#555] font-mono uppercase font-bold tracking-wider mb-2">
                                            {node.label}
                                        </div>
                                    )}
                                    <ul className={`grid gap-2 text-xs text-[#88888b] leading-relaxed font-light ${node.year === '2025' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                                        {node.bullets.map((bullet, bIdx) => (
                                            <li key={bIdx} className="flex items-start gap-2">
                                                <span className="text-[#ea0614] mt-1 font-mono text-[9px]">&#9670;</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="text-[8px] font-mono text-[#444] self-center hidden md:block">
                  // LOG_VERIFIED
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>



                {/* ACTIVE R&D PRODUCTS */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-xl font-bold font-mono tracking-widest text-[#ea0614] uppercase">
              // ACTIVE R&D LABS
                        </h2>
                        <h3 className="text-2xl font-semibold text-white uppercase font-orbitron text-glow">
                            CURRENT ACTIVE R&D PROJECTS
                        </h3>
                        <div className="w-10 h-[1.5px] bg-[#ea0614] mx-auto mt-3" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Raksha AI',
                                description: 'AI-powered Women Safety Platform.',
                                status: 'Research & Development',
                                badge: 'Active R&D',
                                features: ['SOS Trigger', 'Live Location Sharing', 'Emergency Alerts', 'AI Active Monitoring', 'Evidence Collection Ledger', 'Emergency Dispatch Response'],
                                image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80'
                            },
                            {
                                name: 'Skillora',
                                description: 'Digital marketplace securing and connecting skilled workers with customers.',
                                status: 'Research & Development',
                                badge: 'Active R&D',
                                features: ['Direct Skill Routing', 'Verified Talent Portals', 'Distributed Labor Match', 'Crypto Transaction Escrow'],
                                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
                            },
                            {
                                name: 'Cura AI',
                                description: 'Connected healthcare ecosystem linking clinical services, experts, and users.',
                                status: 'Research & Development',
                                badge: 'Active R&D',
                                features: ['Patient Portal Refines', 'Doctor Consult Network', 'Expert Nutrition Modules', 'Fitness Trainer Panels', 'AI Assistant Core'],
                                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
                            },
                            {
                                name: 'Kalki Sentinel',
                                description: 'Next Generation AI Smart Surveillance Platform.',
                                status: 'Research & Development',
                                badge: 'Active R&D',
                                features: ['Edge AI Target Detection', 'Autonomous PTZ Tracking', 'Solar Powered Batteries', 'Cloud Status Dashboard', 'Enterprise Monitoring API'],
                                image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80'
                            },
                            {
                                name: 'Smart Safety Locket',
                                description: 'Wearable Emergency Device integrated with Raksha AI.',
                                status: 'Research & Development',
                                badge: 'Active R&D',
                                features: ['Smart Panic Trigger', 'Voice Stress Detection', 'Haptic Signal Mesh', 'Compact Wearable Form Factor'],
                                image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'
                            },
                            {
                                name: 'KALKI EvacX',
                                description: 'Intelligent emergency fire escape route automation system.',
                                status: 'Research & Development',
                                badge: 'Active R&D',
                                features: ['Real-Time Smoke Detection', 'Real-Time Flame Detection', 'Automatic Escape Route Opening', 'Motorized Cog Wheel Mechanism', 'Battery Backup Support', 'Future IoT Connectivity'],
                                image: '/EvacX.png'
                            }
                        ].map((project, idx) => (
                            <motion.div
                                key={project.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="glass-node rounded-sm border border-white/5 flex flex-col justify-between overflow-hidden hover:border-[#ea0614]/30 duration-300"
                            >
                                <div>
                                    {/* Project Image */}
                                    <div className="h-44 w-full relative overflow-hidden bg-black/40 border-b border-white/5">
                                        <img
                                            src={project.image}
                                            alt={project.name}
                                            className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1] hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3 bg-[#ea0614] text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm flex items-center gap-1.5 shadow-md">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                            {project.badge}
                                        </div>
                                    </div>

                                    {/* Project Content */}
                                    <div className="p-6">
                                        <h4 className="text-base font-bold font-mono tracking-wide text-white uppercase mb-2">
                                            {project.name}
                                        </h4>
                                        <p className="text-xs text-[#88888b] leading-relaxed mb-4">
                                            {project.description}
                                        </p>

                                        {project.features && (
                                            <div className="border-t border-white/5 pt-4">
                                                <span className="text-[9px] text-[#ea0614] font-mono tracking-widest uppercase block mb-2">// FEATURES</span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {project.features.map((feat, fidx) => (
                                                        <span key={fidx} className="bg-white/5 text-[9px] font-mono text-[#c0c0c0] px-2 py-0.5 rounded-xs">
                                                            {feat}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 pt-0 mt-4 border-t border-white/5 pt-4 text-left flex justify-between items-center bg-[#050505]/40 select-none">
                                    <span className="text-[9px] font-mono text-[#555] tracking-widest uppercase">
                                        STATUS:
                                    </span>
                                    <span className="text-[9px] font-mono text-[#ea0614] font-bold tracking-widest uppercase">
                                        {project.status}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom disclaimer section */}
                    <div className="mt-16 border border-dashed border-[#ea0614]/20 p-8 rounded-sm bg-[#ea0614]/5 text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ea0614] pulse-red" />
                        <h4 className="text-sm font-bold font-mono text-white tracking-widest uppercase">
                            DEVELOPMENT COMPILER ACTIVE
                        </h4>
                        <p className="text-xs text-[#88888b] leading-relaxed font-light font-mono">
                            Many more innovative AI products are currently under research and development. <br />
                            <span className="text-white font-bold">Stay tuned for future launches.</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
