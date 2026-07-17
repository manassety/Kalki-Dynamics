'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ShieldAlert } from 'lucide-react';

const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'CONTACT', path: '/contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
                ? 'py-4 bg-[#000000]/70 backdrop-blur-md border-b border-[#ea0614]/15 shadow-[0_4px_30px_rgba(234,6,20,0.03)]'
                : 'py-7 bg-transparent border-b border-transparent'
                }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">

                {/* LOGO */}
                <Link href="/" className="flex items-center gap-3 group relative" style={{ viewTransitionName: 'site-logo' } as React.CSSProperties}>
                    <svg
                        viewBox="0 0 100 100"
                        className="w-8 h-8 fill-[#ea0614] transition-transform duration-500 group-hover:rotate-[180deg]"
                        style={{ filter: 'drop-shadow(0px 0px 4px #ea0614)' }}
                    >
                        <polygon points="50,15 70,35 60,35 75,55 58,55 58,75 50,65 42,75 42,55 25,55 40,35 30,35" />
                    </svg>
                    <span className="font-mono tracking-[0.3em] font-extrabold text-sm text-white group-hover:text-[#ea0614] transition-colors duration-300">
                        KALKI <span className="text-[#ea0614]">DYNAMICS</span>
                    </span>
                </Link>

                {/* DESKTOP NAV ITEMS */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className="relative text-xs font-mono tracking-[0.2em] text-[#c0c0c0] hover:text-white transition-colors duration-300 py-2 inline-block font-medium"
                            >
                                {item.name}

                                {/* Active Underline Pill (Framer Motion) */}
                                {isActive && (
                                    <motion.span
                                        layoutId="activeNavIndicator"
                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ea0614] shadow-[0_0_8px_#ea0614]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* CTA BUTTON */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/admin"
                        className="relative px-5 py-2.5 rounded-sm overflow-hidden group text-[10px] font-mono font-bold tracking-[0.2em] transition-all bg-transparent border border-[#ea0614]/30 hover:border-[#ea0614] flex items-center gap-1.5 focus:outline-none"
                        style={{ viewTransitionName: 'action-button' } as React.CSSProperties}
                    >
                        {/* Magnetic/Glow Background */}
                        <span className="absolute inset-0 bg-[#ea0614]/10 transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-left z-0" />

                        <ShieldAlert className="w-3.5 h-3.5 text-[#ea0614]" />
                        <span className="relative z-10 text-white group-hover:text-white transition-colors">COMMAND DECK</span>
                        <ArrowRight className="w-3 h-3 relative z-10 transition-transform group-hover:translate-x-1 duration-300 text-white" />
                    </Link>
                </div>

                {/* MOBILE MENU TOGGLE */}
                <button
                    className="md:hidden text-[#c0c0c0] hover:text-white focus:outline-none p-1"
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="Toggle Navigation Menu"
                >
                    <Menu className="w-6 h-6" />
                </button>

            </div>

            {/* MOBILE NAV OVERLAY */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 w-full h-screen bg-[#000000] z-50 flex flex-col p-8 justify-between scanline"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-mono tracking-[0.3em] font-extrabold text-sm text-white">
                                KALKI <span className="text-[#ea0614]">DYNAMICS</span>
                            </span>
                            <button
                                className="text-[#c0c0c0] hover:text-white focus:outline-none p-2"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Close Navigation Menu"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-6 my-auto items-center">
                            {navItems.map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`text-2xl font-mono tracking-[0.25em] relative py-2 ${isActive ? 'text-[#ea0614] font-bold' : 'text-[#c0c0c0] hover:text-white'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="flex flex-col gap-4 w-full">
                            <Link
                                href="/admin"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full text-center py-4 bg-[#ea0614] hover:bg-[#ff0015] text-xs font-mono font-bold tracking-[0.2em] rounded flex items-center justify-center gap-2"
                            >
                                <ShieldAlert className="w-4 h-4" />
                                COMMAND DECK (CMS)
                            </Link>
                            <div className="text-[9px] font-mono text-center text-[#444] tracking-[0.1em]">
                                KALKI DYNAMICS GLOBAL SECURITY ACCESS KEY REQUIRED.
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
