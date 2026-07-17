'use client';

import { motion } from 'framer-motion';
import { Shield, Sparkles, Activity, Target, HelpCircle, ArrowRight, Layers, FileText, Flame } from 'lucide-react';
import Link from 'next/link';

const projects = [
    {
        id: 'raksha-ai',
        name: 'Raksha AI',
        tagline: 'Sovereign Surveillance & Warning Mesh',
        description: 'An independent emergency response surveillance network using low-latency optical vision compilers and localized warning triggers.',
        image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
        techStack: ['Python Core Model', 'Firebase Firestore', 'Gemini Neural API', 'YOLO Object-Detect'],
        status: 'ACTIVE FIELD STAGE',
        isResearch: true,
        icon: Shield,
        badgeText: 'NATIVE SURVEILLANCE'
    },
    {
        id: 'skillora',
        name: 'Skillora',
        tagline: 'Decentralized Cognitive Allocation',
        description: 'Deep tech automation framework mapping and routing operational tasks and mechanical logs to edge computing hubs.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
        techStack: ['React Native Core', 'FastAPI Relays', 'MongoDB cluster', 'TailwindCSS'],
        status: 'STABLE INTERNAL DEPLOY',
        isResearch: false,
        icon: Layers,
        badgeText: 'COGNITIVE FLOW'
    },
    {
        id: 'cura-ai',
        name: 'Cura AI',
        tagline: 'Clinical Telemetry Diagnostics Platform',
        description: 'A dynamic, high-integrity medical tracking suite designed for local device performance mapping and remote triage diagnostics compiling.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
        techStack: ['Expo Sensors SDK', 'NextJS Frontend', 'WebRTC Video streams', 'Cloudinary API'],
        status: 'BETA INTEGRATION V2',
        isResearch: true,
        icon: Activity,
        badgeText: 'TELEMETRY BIOLOGY'
    },
    {
        id: 'kalki-sentinel',
        name: 'Kalki Sentinel',
        tagline: 'Autonomous Perimeter Guard & Drone Hub',
        description: 'Military-grade coordinate parsing drone system running fully offline on local micro-processors without external cloud drops.',
        image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80',
        techStack: ['Edge Sensor Array', 'LIDAR Scanning SDK', 'SWARM Comms Network', 'Liquid Cooling Stack'],
        status: 'PROTOTYPE TESTING SECTOR',
        isResearch: true,
        icon: Target,
        badgeText: 'OFFLINE FIELD AUTO'
    },
    {
        id: 'smart-safety-locket',
        name: 'Smart Safety Locket',
        tagline: 'Embedded Mesh Communication Nodes',
        description: 'Low-frequency mesh sensor system encased inside a carbon-reinforced chassis designed for emergency rescue signaling and coordinate positioning.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
        techStack: ['LoRa Transceiver Hub', 'ESP32 Microcontroller', 'Dynamic Coordinates GPS', 'LiFePO4 Power Block'],
        status: 'FIELD DEPLOYED IN KA',
        isResearch: false,
        icon: HelpCircle,
        badgeText: 'MESH COMMUNICATION'
    },
    {
        id: 'kalki-evacx',
        name: 'KALKI EvacX',
        tagline: 'Smart Safety & Industrial Automation',
        description: 'The Fire Escape Route System is an intelligent emergency evacuation solution that continuously monitors the environment using smoke and flame detection sensors to automatically unlock and open emergency escape routes.',
        image: '/EvacX.png',
        techStack: ['Embedded Systems', 'IoT', 'Automation', 'Fire Safety', 'ESP32 / Arduino', 'Sensors', 'Motor Control'],
        status: 'Research & Development',
        isResearch: true,
        icon: Flame,
        badgeText: 'R&D Project'
    }
];

export default function ProjectsPage() {
    return (
        <div className="w-full bg-[#000000] min-h-screen text-white pt-32 pb-24 relative overflow-hidden custom-grid selection:bg-[#ea0614] selection:text-white">
            {/* Dynamic Background Gradients */}
            <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#ea0614]/3 rounded-full filter blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ea0614_1px,transparent_1px),linear-gradient(to_bottom,#ea0614_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="flex items-center gap-2 mb-4 font-mono text-[9px] text-[#555] tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ea0614] pulse-red" />
                    KALKI LABORATORY SYSTEM REGISTER // CLASS_A_CLEARANCE
                </div>

                <div className="mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl font-extrabold tracking-tight font-orbitron uppercase text-white"
                    >
                        ACTIVE <span className="text-radial-glow">PROJECTS</span>
                    </motion.h1>
                    <div className="w-20 h-[2.5px] bg-[#ea0614] mt-4 mb-6" />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-zinc-400 text-sm max-w-xl leading-relaxed"
                    >
                        Explore our portfolio of cybernetic hardware prototypes, cognitive surveillance software architectures, and active software integrations.
                    </motion.p>
                </div>

                {/* Projects Cards Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((proj, idx) => {
                        const IconComponent = proj.icon;
                        const isEvacX = proj.id === 'kalki-evacx';
                        return (
                            <motion.div
                                key={proj.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className={`glass-node relative rounded-sm border p-8 flex flex-col justify-between transition-all duration-300 group ${isEvacX
                                        ? 'border-[#ff4500]/20 hover:border-[#ff4500]/60 shadow-[0_0_15px_rgba(255,69,0,0.05)] hover:shadow-[0_0_25px_rgba(255,69,0,0.15)]'
                                        : 'border-white/5 hover:border-[#ea0614]/40'
                                    }`}
                            >
                                {/* Visual Category Index Overlay */}
                                <div className="absolute top-4 right-4 font-mono text-[8px] text-[#444] tracking-widest">
                                    // {proj.badgeText}
                                </div>

                                {/* Animated Smoke/Flame Particles for EvacX */}
                                {isEvacX && (
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                                        <div className="absolute bottom-[5%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#ff4500] animate-ping opacity-60" style={{ animationDuration: '4s' }} />
                                        <div className="absolute bottom-[10%] left-[45%] w-1 h-1 rounded-full bg-[#ff8c00] animate-ping opacity-80" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
                                        <div className="absolute bottom-[8%] left-[75%] w-2 h-2 rounded-full bg-zinc-650 animate-ping opacity-25" style={{ animationDuration: '5s', animationDelay: '2s' }} />
                                    </div>
                                )}

                                <div>
                                    {/* Image schematic viewer */}
                                    <div className="w-full h-48 mb-6 relative rounded-sm border border-white/5 overflow-hidden flex items-center justify-center bg-black">
                                        <img
                                            src={proj.image}
                                            alt={proj.name}
                                            className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 filter brightness-[0.8]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                        {/* Glowing Tech sensor pointer */}
                                        <div className={`absolute top-4 left-4 flex items-center gap-1.5 font-mono text-[8px] ${isEvacX ? 'text-[#ff4500]' : 'text-[#ea0614]'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${isEvacX ? 'bg-[#ff4500] animate-pulse shadow-[0_0_8px_#ff4500]' : 'bg-[#ea0614] pulse-red'}`} />
                                            {proj.status}
                                        </div>

                                        <div className={`relative z-10 w-12 h-12 bg-black/80 border flex items-center justify-center rounded-xs transition-colors duration-300 ${isEvacX
                                                ? 'border-[#ff4500]/30 text-[#ff4500] group-hover:bg-[#ff4500] group-hover:text-white group-hover:border-[#ff4500]'
                                                : 'border-[#ea0614]/30 text-[#ea0614] group-hover:bg-[#ea0614] group-hover:text-white'
                                            }`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className={`text-xl font-bold font-orbitron text-white uppercase transition-colors duration-300 ${isEvacX ? 'group-hover:text-[#ff4500]' : 'group-hover:text-[#ea0614]'}`}>
                                            {proj.name}
                                        </h3>
                                        {proj.isResearch && (
                                            <span className={`px-2 py-0.5 border font-mono text-[7.5px] uppercase tracking-wider rounded-xs ${isEvacX
                                                    ? 'bg-[#ff4500]/10 border-[#ff4500]/30 text-[#ff4500]'
                                                    : 'bg-[#ea0614]/10 border-[#ea0614]/30 text-[#ea0614]'
                                                }`}>
                                                RESEARCH NODE
                                            </span>
                                        )}
                                    </div>

                                    <span className="text-zinc-500 font-mono text-[10px] tracking-wide block mb-4 uppercase">
                                        {proj.tagline}
                                    </span>

                                    <p className="text-xs text-[#88888b] leading-relaxed mb-6 font-light group-hover:text-zinc-300 transition-colors">
                                        {proj.description}
                                    </p>
                                </div>

                                <div>
                                    {/* Tech stack pill tags */}
                                    <div className="border-t border-white/5 pt-4 mb-6 flex flex-wrap gap-1.5">
                                        {proj.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-[#121212] border border-white/5 font-mono text-[8.5px] text-zinc-400 rounded-sm tracking-wide lowercase"
                                            >
                                                #{tech}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href="/contact"
                                        className={`w-full text-center py-3 text-[10px] font-mono font-bold tracking-[0.2em] rounded-sm transition-all border block ${isEvacX
                                                ? 'bg-[#ff4500]/10 hover:bg-[#ff4500] text-white border-[#ff4500]/30'
                                                : 'bg-[#ea0614]/15 hover:bg-[#ea0614] text-white border-[#ea0614]/30'
                                            }`}
                                    >
                                        LEARN MORE BLUEPRINTS
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Dynamic call to action */}
                <div className="mt-20 p-12 glass-node border border-white/5 rounded-sm relative overflow-hidden flex flex-col items-center text-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#ea0614]/5 rounded-full filter blur-[100px] pointer-events-none" />
                    <FileText className="w-10 h-10 text-[#ea0614] mb-4 animate-pulse" />
                    <h3 className="text-lg font-bold font-orbitron uppercase text-white mb-2">Request Custom Research Integration</h3>
                    <p className="text-xs text-[#88888b] font-mono max-w-lg mb-6 leading-relaxed">Have a proprietary software algorithm, remote IoT network, or specialized cybernetics requirement? Our telemetry diagnostics modules are custom integrated for authorized national security branches.</p>
                    <Link
                        href="/contact"
                        className="px-8 py-3.5 bg-transparent border border-white/10 hover:border-[#ea0614] hover:bg-[#ea0614]/5 text-[#c0c0c0] hover:text-white text-xs font-mono font-bold tracking-[0.2em] rounded-sm transition-all cursor-target"
                    >
                        INITIATE SECURE LINK
                    </Link>
                </div>

            </div>
        </div>
    );
}
