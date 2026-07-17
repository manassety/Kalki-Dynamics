'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    FolderGit,
    Server,
    Mail,
    Image,
    FileText,
    Users,
    Building2,
    Settings,
    LineChart,
    LogOut,
    Lock,
    Key,
    Cpu,
    Menu,
    X,
    ShieldCheck
} from 'lucide-react';
import { getCurrentUser, loginWithGoogle, logoutUser } from '@/utils/firebase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        const unsubscribe = getCurrentUser((currentUser) => {
            if (currentUser) {
                if (currentUser.email === 'setymanas4@gmail.com') {
                    setUser(currentUser);
                    setLoading(false);
                } else {
                    // Trigger logout and redirect on unauthorized email
                    setUser(null);
                    logoutUser().then(() => {
                        router.push('/unauthorized');
                    });
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => {
            if (unsubscribe && typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [router]);

    const handleGoogleLogin = async () => {
        setLoginError('');
        try {
            const loggedUser = await loginWithGoogle();
            if (loggedUser.email !== 'setymanas4@gmail.com') {
                await logoutUser();
                router.push('/unauthorized');
            }
        } catch (err: any) {
            console.error(err);
            setLoginError('Authentication check failed or aborted.');
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            router.push('/');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    // Sidebar navigation routes mapping
    const navItems = [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { label: 'Projects', path: '/admin/projects', icon: FolderGit },
        { label: 'Services', path: '/admin/services', icon: Server },
        { label: 'Messages', path: '/admin/messages', icon: Mail },
        { label: 'Gallery', path: '/admin/gallery', icon: Image },
        { label: 'Blogs', path: '/admin/blogs', icon: FileText },
        { label: 'Team Members', path: '/admin/team', icon: Users },
        { label: 'Company Info', path: '/admin/company', icon: Building2 },
        { label: 'Settings', path: '/admin/settings', icon: Settings },
        { label: 'Analytics', path: '/admin/analytics', icon: LineChart }
    ];

    // High Tech Loading splash screen
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6 font-mono selection:bg-[#ea0614] selection:text-white">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#ea0614]/5 rounded-full filter blur-[100px] pointer-events-none" />
                <div className="flex flex-col items-center max-w-sm w-full gap-5">
                    {/* Spinning tech core design */}
                    <div className="relative w-16 h-16 flex items-center justify-center animate-spin">
                        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#ea0614] fill-none stroke-2">
                            <circle cx="50" cy="50" r="40" strokeDasharray="25 15" />
                            <circle cx="50" cy="50" r="30" strokeDasharray="10 10" />
                        </svg>
                        <Cpu className="absolute w-6 h-6 text-[#ea0614]" />
                    </div>
                    <div className="text-[10px] text-center tracking-[0.3em] text-[#ea0614] font-bold uppercase animate-pulse">
                        DECRYPTING INTEGRITY BLOCKS...
                    </div>
                </div>
            </div>
        );
    }

    // Force secure check login if not authenticated
    if (!user) {
        return (
            <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center text-white p-6 font-mono relative">
                {/* Visual grid backdrop styling */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ea0614_1px,transparent_1px),linear-gradient(to_bottom,#ea0614_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

                {/* Floating ambient orb */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#ea0614]/5 rounded-full filter blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full glass-node border border-white/5 p-8 rounded-sm text-center relative overflow-hidden"
                >
                    <div className="absolute top-4 right-4 font-mono text-[8px] text-[#444] tracking-widest">// CORE_SECURE_AUTH</div>

                    {/* Glowing lock badge */}
                    <div className="w-14 h-14 rounded-full border border-[#ea0614]/40 bg-zinc-950 flex items-center justify-center mx-auto mb-6 text-[#ea0614]">
                        <Lock className="w-6 h-6" />
                    </div>

                    <h2 className="text-lg font-bold font-orbitron text-white uppercase tracking-wider mb-1">
                        KALKI CENTRAL SYSTEM
                    </h2>
                    <span className="text-[9px] text-[#ea0614] font-mono font-bold tracking-[0.3em] uppercase block mb-6">
                        ADMINISTRATORY ACCESS
                    </span>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-8 font-light">
                        Clearance authentication via verified Google Security Token is required. System access logs are active.
                    </p>

                    {loginError && (
                        <div className="bg-red-950/20 border border-[#ea0614]/30 text-[#ea0614] text-[10px] p-3 mb-6 rounded-xs text-left">
                            ✕ {loginError}
                        </div>
                    )}

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full py-4 bg-[#ea0614] hover:bg-[#ff0015] text-white text-[10px] items-center justify-center gap-3 font-bold tracking-[0.25em] rounded-xs transition-all uppercase flex shadow-[0_0_20px_rgba(234,6,20,0.2)]"
                    >
                        <Key className="w-4 h-4" />
                        DECRYPT VIA GOOGLE KEY
                    </button>

                    <Link
                        href="/"
                        className="mt-6 inline-block text-[10px] text-zinc-500 hover:text-white transition-colors"
                    >
                        ← RETREAT TO BASE SECTOR
                    </Link>
                </motion.div>
            </div>
        );
    }

    // Render Side Menu layout for authenticated users
    return (
        <div className="min-h-screen bg-[#070707] text-[#c0c0c0] font-mono flex selection:bg-[#ea0614] selection:text-white relative">
            {/* Ambient edge vectors */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ea0614]/2 rounded-full filter blur-[150px] pointer-events-none" />

            {/* Sidebar Navigation - LEFT */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-black border-r border-white/5 flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div>
                    {/* Sidebar Brand header */}
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <Link href="/admin" className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-sm bg-[#ea0614] flex items-center justify-center text-black font-extrabold text-sm font-orbitron">K</span>
                            <span className="font-orbitron font-extrabold text-sm text-white tracking-widest uppercase">KALKI ADMIN</span>
                        </Link>
                        {/* Close button inside mobile menu drawer */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="md:hidden p-1 bg-zinc-950 border border-white/5 text-[#888] hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Navigation list */}
                    <nav className="p-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3.5 px-4 py-3 text-xs tracking-wider uppercase font-medium rounded-xs border transition-all ${isActive
                                        ? 'bg-zinc-950 border-white/10 text-white font-bold shadow-[inset_3px_0_0_#ea0614]'
                                        : 'bg-transparent border-transparent text-[#888] hover:text-zinc-300 hover:bg-white/2 hover:border-white/5'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#ea0614]' : 'text-[#555]'}`} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Sidebar footer user metadata */}
                <div className="p-4 border-t border-white/5 flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-zinc-950/80 p-3 border border-white/5 rounded-xs">
                        <div className="w-8 h-8 rounded-full border border-[#ea0614]/40 bg-[#ea0614]/5 flex items-center justify-center text-[#ea0614] font-orbitron font-bold">
                            M
                        </div>
                        <div className="overflow-hidden flex-grow">
                            <span className="text-[10px] text-white block truncate uppercase font-bold">Manas Sety</span>
                            <span className="text-[8px] text-[#555] block truncate">setymanas4@gmail.com</span>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full py-3.5 bg-zinc-950 hover:bg-[#ea0614]/10 border border-[#ea0614]/20 text-[#ea0614] hover:text-white text-[9px] font-bold tracking-widest rounded-xs transition-all uppercase flex items-center justify-center gap-2"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        TERMINATE SESSION
                    </button>
                </div>
            </aside>

            {/* Sidebar mobile layout backdrop overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs md:hidden"
                />
            )}

            {/* Content Display frame on right section */}
            <div className="flex-grow flex flex-col min-h-screen md:pl-72 relative">
                {/* Header status bar */}
                <header className="sticky top-0 z-20 h-16 bg-[#070707]/90 backdrop-blur-md border-b border-white/5 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden p-2 bg-zinc-950 border border-white/5 text-[#888] hover:text-white"
                        >
                            <Menu className="w-4 h-4" />
                        </button>

                        <div className="hidden sm:flex items-center gap-2 text-[9px] font-bold text-[#555] tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ea0614] pulse-red" />
                            SECURE CORE RELAY STATION // SECURED
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                        <div className="flex items-center gap-2 bg-[#ea0614]/5 border border-[#ea0614]/20 px-3 py-1 font-mono text-[9px] text-[#ea0614] rounded-sm uppercase font-bold tracking-wide">
                            <ShieldCheck className="w-3 h-3 text-[#ea0614]" />
                            SEC_AUTH_LEVEL_5
                        </div>
                    </div>
                </header>

                {/* Page view children rendered */}
                <main className="flex-grow p-6 md:p-8 relative">
                    {children}
                </main>
            </div>
        </div>
    );
}
