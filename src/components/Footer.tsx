'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Globe } from 'lucide-react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubscribed(true);
        setEmail('');
    };

    return (
        <footer className="relative w-full border-t border-[#ea0614]/15 bg-[#000000] text-[#c0c0c0] pt-16 pb-8 z-10 custom-grid overflow-hidden">

            {/* Decorative Top glow line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-right from-transparent via-[#ea0614] to-transparent opacity-60" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

                {/* Brand Column */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <Link href="/" className="flex items-center gap-3">
                        <svg
                            viewBox="0 0 100 100"
                            className="w-9 h-9 fill-[#ea0614]"
                            style={{ filter: 'drop-shadow(0px 0px 8px #ea0614)' }}
                        >
                            <polygon points="50,15 70,35 60,35 75,55 58,55 58,75 50,65 42,75 42,55 25,55 40,35 30,35" />
                        </svg>
                        <span className="font-mono tracking-[0.3em] font-extrabold text-base text-white">
                            KALKI <span className="text-[#ea0614]">DYNAMICS</span>
                        </span>
                    </Link>

                    <p className="text-xs leading-relaxed max-w-sm text-[#88888b]">
                        Empowering global defence systems, edge intelligence aggregates, and high-performance computing clusters with advanced quantum robotics and computer vision models.
                    </p>

                    <div className="flex gap-4">
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#ea0614] hover:text-white transition-colors duration-300" aria-label="LinkedIn Profile">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#ea0614] hover:text-white transition-colors duration-300" aria-label="X (formerly Twitter)">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#ea0614] hover:text-white transition-colors duration-300" aria-label="GitHub Profile">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        </a>
                        <a href="https://www.instagram.com/kalki_dynamics?igsh=MW1ycWFrNGYxb3hseg==" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#ea0614] hover:text-white transition-colors duration-300" aria-label="Instagram Profile">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links Column */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-mono font-bold tracking-[0.2em] text-white uppercase">RESOURCES</h4>
                    <ul className="flex flex-col gap-2.5 text-xs font-medium">
                        <li><Link href="/" className="hover:text-white transition-colors">Home Page</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors">Our Vision</Link></li>
                        <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                        <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors font-semibold">Integrations</Link></li>
                    </ul>
                </div>

                {/* Technologies Column */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-mono font-bold tracking-[0.2em] text-white uppercase">TECHNOLOGY</h4>
                    <ul className="flex flex-col gap-2.5 text-xs font-medium text-[#888]">
                        <li>Edge Computing Grid</li>
                        <li>Computer Vision AI</li>
                        <li>Robotic Tactility</li>
                        <li>Next-Gen Defense</li>
                        <li>Satellite Quantum links</li>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-mono font-bold tracking-[0.2em] text-white uppercase">SECURITY CABLE</h4>
                    <p className="text-xs text-[#88888b]">Subscribe to KALKI Intelligence briefs.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative">
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="SECURE EMAIL"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={subscribed}
                                className="w-full bg-[#121212] border border-white/5 rounded-xs p-3 pr-10 text-xs text-white placeholder-[#444] font-mono tracking-wider focus:outline-none focus:border-[#ea0614]/50 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={subscribed}
                                aria-label="Submit subscriber email"
                                className="absolute right-0 top-0 bottom-0 px-3 text-[#ea0614] hover:text-white transition-colors"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        {subscribed && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[10px] text-[#ea0614] font-mono"
                            >
                                ACCESS SECURED. VERIFYING LINK...
                            </motion.div>
                        )}
                    </form>
                </div>

            </div>

            {/* Footer Bottom info */}
            <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-[#555] tracking-widest">
                <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#ea0614]" />
                    <span>MILITARY-GRADE SECURITY LAYER ENABLED.</span>
                </div>
                <div>
                    © {new Date().getFullYear()} KALKI DYNAMICS. ALL RIGHTS RESERVED.
                </div>
                <div className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" />
                    <span>LATENCY: 12MS | GLOBAL ORTHOGONAL</span>
                </div>
            </div>
        </footer>
    );
}
