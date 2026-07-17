'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ShieldCheck, UserCheck, Send } from 'lucide-react';
import { addDocument, getCollectionData } from '@/utils/firebase';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [msg, setMsg] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [contact, setContact] = useState<any | null>(null);

    useEffect(() => {
        const loadContact = async () => {
            try {
                const settingsData = await getCollectionData('settings');
                const found = settingsData.find(s => s.id === 'contact');
                if (found) {
                    setContact(found);
                }
            } catch (err) {
                console.error(err);
            }
        };
        loadContact();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !subject || !msg) return;

        try {
            await addDocument('inquiries', {
                name,
                email,
                subject,
                message: msg,
                date: new Date().toISOString().split('T')[0],
                status: 'Unread'
            });

            // Send to Google Sheet Web App if configured
            const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
            if (sheetUrl) {
                await fetch(sheetUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        subject,
                        message: msg,
                        date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                    })
                });
            }

            setSubmitted(true);
            setName('');
            setEmail('');
            setSubject('');
            setMsg('');
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="min-h-screen bg-[#000000] relative custom-grid pt-32 pb-24 text-white">

            {/* Top red nebula glow */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#ea0614]/5 rounded-full filter blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Header content */}
                <div className="text-center mb-16 animate-fade-in">
                    <span className="font-mono text-xs text-[#ea0614] tracking-[0.4em] font-bold uppercase mb-2 block animate-pulse">
                        COMMUNICATION PORTAL
                    </span>
                    <h1
                        className="text-4xl sm:text-5xl font-extrabold uppercase font-orbitron text-white leading-tight"
                        style={{ viewTransitionName: 'hero-title' } as React.CSSProperties}
                    >
                        ESTABLISH CONNECTION
                    </h1>
                    <p className="text-sm text-[#88888b] max-w-xl mx-auto mt-4 font-light leading-relaxed">
                        Partner with KALKI Dynamics, register to deploy regional units, or join our cybernetic research laboratory teams.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">

                    {/* Company Details (Left grid - col span 5) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">

                        {/* Headquarters details */}
                        <div className="glass-node p-8 rounded-sm text-left border border-white/5 relative">
                            <div className="absolute top-4 right-4 font-mono text-[8px] text-[#444] tracking-widest">
                // SYSTEM_HQ_LOCK
                            </div>

                            <h3 className="text-sm font-bold font-mono tracking-widest text-[#ea0614] uppercase mb-6">
                                CORPORATE OFFICES
                            </h3>

                            <ul className="space-y-6 text-xs text-[#c0c0c0]">
                                <li className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 text-[#ea0614] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-bold text-white block uppercase mb-1 font-mono">HEADQUARTERS</span>
                                        <span>{contact?.address || 'Uttrakhand, Pithoragarh, Krishnapuri, 262501'}</span>
                                    </div>
                                </li>

                                <li className="flex items-start gap-4">
                                    <Phone className="w-5 h-5 text-[#ea0614] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-bold text-white block uppercase mb-1 font-mono">Communications Hub</span>
                                        <span>{contact?.phone || '+91 9411596016'}</span>
                                    </div>
                                </li>

                                <li className="flex items-start gap-4">
                                    <Mail className="w-5 h-5 text-[#ea0614] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-bold text-white block uppercase mb-1 font-mono">Secured Relays</span>
                                        <span>{contact?.email || 'manas@kalkidynamics.in'}</span>
                                    </div>
                                </li>

                                <li className="flex items-start gap-4">
                                    <Clock className="w-5 h-5 text-[#ea0614] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-bold text-white block uppercase mb-1 font-mono">Active Monitoring Hours</span>
                                        <span>{contact?.businessHours || '09:00 — 18:00 IST | Monday — Saturday'}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Google Map Embedded Live */}
                        <div className="h-[250px] border border-[#ea0614]/20 rounded-sm bg-[#0a0a0a] relative overflow-hidden group">
                            <iframe
                                src="https://maps.google.com/maps?q=Pithoragarh%20krishnapuri%20262501&t=&z=14&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'invert(0.9) contrast(1.2) hue-rotate(180deg)' }}
                                allowFullScreen={true}
                                loading="lazy"
                            />
                            {/* Overlay frame indicator */}
                            <div className="absolute top-3 left-3 bg-black/80 border border-[#ea0614]/30 px-2 py-0.5 font-mono text-[7px] text-[#ea0614] tracking-widest pointer-events-none uppercase">
                                MAP LOCK // 29.5843° N, 80.2184° E
                            </div>
                        </div>

                    </div>

                    {/* Secure Interactive Forms (Right grid - col span 7) */}
                    <div className="lg:col-span-7 glass-node p-8 md:p-10 rounded-sm border border-white/5 relative">
                        <div className="absolute top-4 right-4 font-mono text-[8px] text-[#444] tracking-widest">
              // DISPATCH_CONSOLE
                        </div>

                        {/* Contact Form Header */}
                        <div className="flex border-b border-white/5 gap-6 mb-8 text-[11px] font-mono font-bold tracking-widest pb-4">
                            <span className="pb-2 text-[#ea0614] border-b-2 border-[#ea0614] uppercase">
                                CONTACT FORM
                            </span>
                        </div>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center min-h-[300px] text-center"
                            >
                                <div className="w-12 h-12 rounded-full border border-[#ea0614] flex items-center justify-center text-[#ea0614] mb-6">
                                    <ShieldCheck className="w-6 h-6 animate-pulse" />
                                </div>
                                <h3 className="text-lg font-bold font-mono tracking-widest uppercase mb-2">
                                    TRANSMISSION COMPLETED
                                </h3>
                                <span className="text-[10px] text-[#ea0614] font-mono tracking-[0.2em] uppercase mb-4 block">
                                    SECURITY KEY SECURED
                                </span>
                                <p className="text-xs text-[#88888b] max-w-sm leading-relaxed">
                                    Your inquiry message was routing successfully onto active dashboard files. Command personnel will verify coordinates and follow up.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 px-5 py-2.5 bg-transparent border border-white/10 hover:border-white text-white text-[10px] font-mono tracking-widest transition-all"
                                >
                                    DISPATCH ANOTHER BREIF
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex flex-col">
                                        <label className="text-[9px] font-mono text-[#555] tracking-widest uppercase mb-2">IDENTIFICATION NAME</label>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. MARCUS VANCE"
                                            className="w-full bg-[#121212]/50 border border-white/5 rounded-xs p-3 text-xs text-white placeholder-[#333] focus:outline-none focus:border-[#ea0614]/50 font-mono tracking-normal"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[9px] font-mono text-[#555] tracking-widest uppercase mb-2">SECURE RETURN EMAIL</label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="e.g. m.vance@defense.gov"
                                            className="w-full bg-[#121212]/50 border border-white/5 rounded-xs p-3 text-xs text-white placeholder-[#333] focus:outline-none focus:border-[#ea0614]/50 font-mono tracking-normal"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-[9px] font-mono text-[#555] tracking-widest uppercase mb-2">MESSAGE SUBJECT</label>
                                    <input
                                        type="text"
                                        required
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="e.g. Partnership, Careers, or General Inquiry"
                                        className="w-full bg-[#121212]/50 border border-white/5 rounded-xs p-3 text-xs text-white placeholder-[#333] focus:outline-none focus:border-[#ea0614]/50 font-mono tracking-normal"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-[9px] font-mono text-[#555] tracking-widest uppercase mb-2">BRIEF DETAIL MESSAGE</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={msg}
                                        onChange={(e) => setMsg(e.target.value)}
                                        placeholder="Enter security coordinates list or detail description..."
                                        className="w-full bg-[#121212]/50 border border-white/5 rounded-xs p-3 text-xs text-white placeholder-[#333] focus:outline-none focus:border-[#ea0614]/50 font-mono"
                                    />
                                </div>

                                <div className="flex items-center gap-2 pt-2 text-[10px] font-mono text-[#555]">
                                    <UserCheck className="w-4 h-4 text-[#ea0614]" />
                                    <span>TRANSMISSION IS ENCRYPTED OUTSIDE HOST NETWORKS.</span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#ea0614] hover:bg-[#ff0015] text-white text-[10px] font-mono font-bold tracking-[0.25em] rounded-xs transition-all uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,6,20,0.2)]"
                                >
                                    DISPATCH SECURE RELAY
                                    <Send className="w-3.5 h-3.5" />
                                </button>

                            </form>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}
