'use client';

import dynamic from 'next/dynamic';

const DynamicScene = dynamic(() => import('./ThreeDScene'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-black/40 border border-white/5 rounded-xs p-4">
            {/* Sleek tech scanner loading placeholder */}
            <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-t-[#ea0614] border-r-transparent border-l-transparent border-b-transparent animate-spin" />
                <svg
                    viewBox="0 0 100 100"
                    className="w-8 h-8 fill-[#333]"
                >
                    <polygon points="50,15 70,35 60,35 75,55 58,55 58,75 50,65 42,75 42,55 25,55 40,35 30,35" />
                </svg>
            </div>
            <span className="font-mono text-[9px] text-[#ea0614] tracking-[0.3em] uppercase animate-pulse">
                CALIBRATING 3D BLUEPRINT...
            </span>
        </div>
    ),
});

export default function ThreeDView() {
    return <DynamicScene />;
}
