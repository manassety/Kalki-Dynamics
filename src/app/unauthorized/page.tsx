'use client';

import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { logoutUser } from '@/utils/firebase';
import { useEffect } from 'react';

export default function UnauthorizedPage() {
    // Automatically log out user on reaching unauthorized page to clear bad session state
    useEffect(() => {
        logoutUser().catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6 font-mono selection:bg-[#ea0614] selection:text-white">
            {/* Ambient Red glow background overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#ea0614]/10 rounded-full filter blur-[80px] pointer-events-none" />

            <div className="max-w-md w-full border border-[#ea0614]/40 bg-zinc-950/70 p-8 rounded-sm text-center relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 via-transparent to-red-600" />

                <div className="mx-auto w-16 h-16 rounded-full border border-[#ea0614]/40 bg-[#ea0614]/5 flex items-center justify-center text-[#ea0614] mb-6 animate-pulse">
                    <ShieldAlert className="w-8 h-8" />
                </div>

                <h1 className="text-xl font-bold font-orbitron text-white uppercase tracking-wider mb-2">
                    ACCESS DENIED
                </h1>
                <span className="text-[10px] text-[#ea0614] font-bold tracking-[0.25em] uppercase mb-4 block">
                    MIL-SECURITY CLEARANCE FAILED
                </span>

                <p className="text-xs text-zinc-400 leading-relaxed mb-8">
                    Your authenticated interface is unauthorized to connect with administrative commands. This incident is registered under host logs.
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/"
                        className="py-3 px-4 bg-zinc-900 hover:bg-zinc-850 hover:text-white text-zinc-300 text-[10px] font-bold tracking-widest border border-white/5 uppercase rounded-xs transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 text-[#ea0614]" />
                        RETURN HOME
                    </Link>
                </div>
            </div>
        </div>
    );
}
