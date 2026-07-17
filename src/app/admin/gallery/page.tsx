'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Upload, Trash } from 'lucide-react';

export default function AdminGalleryPage() {
    const [images, setImages] = useState([
        { id: 1, name: 'Raksha Schematics.png', size: '2.4 MB', type: 'image/png' },
        { id: 2, name: 'Sentinel Blueprint Edge.jpg', size: '4.8 MB', type: 'image/jpg' },
        { id: 3, name: 'Cura Diagnostic Medical Interface.jpg', size: '1.2 MB', type: 'image/jpg' }
    ]);

    return (
        <div className="space-y-8 animate-fade-in font-mono selection:bg-[#ea0614] selection:text-white">
            <div>
                <span className="font-mono text-[9px] text-[#ea0614] tracking-[0.3em] font-bold uppercase mb-1 block">
                    MEDIA ARCHIVE TELEMETRY STORAGE
                </span>
                <h1 className="text-2xl font-extrabold font-orbitron text-white uppercase tracking-wider">
                    GALLERY ASSETS LOG
                </h1>
            </div>

            <div className="glass-node p-6 border border-white/5 rounded-sm bg-black/40">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] text-[#555] tracking-widest">// SECURED MEDIA TARGET MATRIX</span>
                    <button className="py-2.5 px-4 bg-[#ea0614] hover:bg-[#ff0015] text-white text-[9px] font-bold tracking-widest rounded-xs transition-all uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(234,6,20,0.15)]">
                        <Upload className="w-3.5 h-3.5" /> UPLOAD MEDIA FILE
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="border-b border-white/10 bg-black/60 font-mono font-bold text-white uppercase tracking-wider">
                                <th className="p-4 text-[9px] text-[#555]">File Identifier</th>
                                <th className="p-4 text-[9px] text-[#555]">Image Size</th>
                                <th className="p-4 text-[9px] text-[#555]">Mime Type</th>
                                <th className="p-4 text-[9px] text-[#555] text-right">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-[#c0c0c0]">
                            {images.map((img) => (
                                <tr key={img.id} className="hover:bg-white/2 transition-colors">
                                    <td className="p-4 font-bold text-white uppercase">
                                        <div className="flex items-center gap-2">
                                            <Image className="w-4 h-4 text-[#ea0614]" />
                                            <span>{img.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-zinc-400 font-mono">{img.size}</td>
                                    <td className="p-4 text-zinc-500 font-mono">{img.type}</td>
                                    <td className="p-4 text-right">
                                        <button className="text-[#ea0614] hover:text-white uppercase transition-colors">
                                            <Trash className="w-4 h-4 ml-auto" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
