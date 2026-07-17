'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLogs = [
    'INITIALIZING QUANTUM ENCRYPTED KERNEL...',
    'CONNECTING SATELLITE NODES [GEO-SYNC ORBIT]...',
    'SYNCHRONIZING COMPUTER VISION DATASTREAMS...',
    'ESTABLISHING EDGE AI DUPLEX PATHWAYS...',
    'LOADING COMPUTER VISION MODELS...',
    'BOOTING KALKI DYNAMICS DEFENSE NETS...',
    'POWERING THE NEXT ERA...'
];

export default function LoadingScreen() {
    const [complete, setComplete] = useState(false);
    const [progress, setProgress] = useState(0);
    const [logIndex, setLogIndex] = useState(0);

    useEffect(() => {
        // Skip simulated loader if user has already loaded the app in the current session
        if (typeof window !== 'undefined' && window.sessionStorage && sessionStorage.getItem('kalki-loaded') === 'true') {
            setComplete(true);
            return;
        }

        // Prevent scroll during loading
        document.body.style.overflow = 'hidden';

        // Simulate boot progress - optimized interval and steps for snappier startup
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setComplete(true);
                        document.body.style.overflow = 'unset';
                        try {
                            sessionStorage.setItem('kalki-loaded', 'true');
                        } catch (e) {
                            // Ignore sessionStorage errors (e.g. private browsing mode)
                        }
                    }, 300);
                    return 100;
                }

                // Substantially faster progress jumps (8-20% per tick)
                const diff = Math.floor(Math.random() * 12) + 8;
                return Math.min(100, prev + diff);
            });
        }, 35);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Map progress thresholds to log indices
        const nextIdx = Math.min(
            bootLogs.length - 1,
            Math.floor((progress / 100) * bootLogs.length)
        );
        setLogIndex(nextIdx);
    }, [progress]);

    return (
        <AnimatePresence>
            {!complete && (
                <motion.div
                    key="loader"
                    className="fixed inset-0 w-full h-full bg-[#000000] z-[99999] flex flex-col items-center justify-center scanline text-white"
                    exit={{
                        opacity: 0,
                        y: -30,
                        filter: 'blur(10px)',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Main Visual container */}
                    <div className="flex flex-col items-center justify-center max-w-lg w-full px-6">

                        {/* Glowing SVG Logo */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-28 h-28 mb-8"
                        >
                            {/* Outer Energy Ring */}
                            <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                                <circle
                                    cx="56"
                                    cy="56"
                                    r="52"
                                    className="stroke-[#121210] stroke-[2] fill-none"
                                />
                                <motion.circle
                                    cx="56"
                                    cy="56"
                                    r="52"
                                    className="stroke-[#ea0614] stroke-[3] fill-none"
                                    strokeDasharray="327"
                                    animate={{ strokeDashoffset: 327 - (327 * progress) / 100 }}
                                    transition={{ ease: 'easeOut' }}
                                />
                            </svg>

                            {/* Dragon Emblem (Futuristic Minimalist Geo-Graphic Vector) */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                    viewBox="0 0 100 100"
                                    className="w-16 h-16 fill-[#ea0614]"
                                    style={{ filter: 'drop-shadow(0px 0px 8px #ea0614)' }}
                                >
                                    {/* Futuristic abstract geometric dragon head icon */}
                                    <polygon points="50,15 70,35 60,35 75,55 58,55 58,75 50,65 42,75 42,55 25,55 40,35 30,35" />
                                    <polygon points="50,28 55,38 45,38" className="fill-black" />
                                    <line x1="50" y1="70" x2="50" y2="85" stroke="#ea0614" strokeWidth="2.5" />
                                    <circle cx="50" cy="88" r="2.5" className="fill-[#ea0614] pulse-red" />
                                </svg>
                            </div>
                        </motion.div>

                        {/* Percentage Indicator */}
                        <motion.span
                            className="text-4xl font-mono tracking-[0.2em] text-white font-bold mb-2 cursor-default"
                            style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                        >
                            {progress}%
                        </motion.span>

                        {/* Loading text status */}
                        <div className="text-[#ea0614] tracking-[0.3em] font-mono text-[10px] uppercase font-semibold mb-6 flex items-center gap-1.5">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ea0614] animate-pulse"></span>
                            INITIALIZING SECURE LINK...
                        </div>

                        {/* Simulated Live Logs */}
                        <div className="w-full bg-[#0a0a0a] border border-[#1c1c1e] rounded p-4 font-mono text-[10px] text-[#88888b] text-left min-h-[70px]">
                            <div className="text-white flex items-center gap-2 mb-1">
                                <span className="text-[#ea0614] font-semibold">&gt;</span>
                                <span className="w-fit">{bootLogs[logIndex]}</span>
                            </div>
                            <div className="opacity-40">&gt; SYSTEM ACCEL: ACTIVE [GPU ACCELERATION: ON]</div>
                            <div className="opacity-40">&gt; LOCALE: ASIA/PACIFIC | SECURITY OVERRIDE [OK]</div>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
