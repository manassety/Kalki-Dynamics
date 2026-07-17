'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Settings,
    RefreshCw,
    Save,
    Database,
    Mail,
    Phone,
    MapPin,
    Clock,
    User,
    Check
} from 'lucide-react';
import {
    getCollectionData,
    setDocument,
    initializeDefaultMockData
} from '@/utils/firebase';

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    // Contact Details States
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [businessHours, setBusinessHours] = useState('');
    const [googleMapsUrl, setGoogleMapsUrl] = useState('');

    // Founder States
    const [founderName, setFounderName] = useState('Manas Sety');
    const [founderRole, setFounderRole] = useState('Founder & Lead Roboticist');
    const [founderDescription, setFounderDescription] = useState('');

    const fetchConfig = async () => {
        setLoading(true);
        try {
            // Fetch contact info
            const contactData = await getCollectionData('settings');
            const contactEntry = contactData.find(s => s.id === 'contact') || {
                phone: '+91 99999 99999',
                email: 'info@kalkidynamics.com',
                address: 'KALKI HQ, New Delhi, India',
                businessHours: 'MON - FRI : 0900 - 1800 HOURS',
                googleMapsUrl: '#'
            };
            setPhone(contactEntry.phone);
            setEmail(contactEntry.email);
            setAddress(contactEntry.address);
            setBusinessHours(contactEntry.businessHours);
            setGoogleMapsUrl(contactEntry.googleMapsUrl);

            // Fetch founder info
            const founderData = await getCollectionData('founders');
            const founderEntry = founderData.find(f => f.id === 'founder') || {
                name: 'Manas Sety',
                role: 'Founder & Lead Roboticist',
                description: 'Driving the advancement of autonomous AI and tactical cybernetics solutions at KALKI Dynamics.'
            };
            setFounderName(founderEntry.name);
            setFounderRole(founderEntry.role);
            setFounderDescription(founderEntry.description);

        } catch (err) {
            console.error('Settings fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMsg('');

        try {
            // Save Contact settings
            await setDocument('settings', 'contact', {
                phone,
                email,
                address,
                businessHours,
                googleMapsUrl
            });

            // Save Founder settings
            await setDocument('founders', 'founder', {
                name: founderName,
                role: founderRole,
                description: founderDescription
            });

            setSuccessMsg('SYSTEM STACK CONFIGURATION SECURED SUCCESSFUL.');
            setTimeout(() => setSuccessMsg(''), 5000);
        } catch (err) {
            console.error('Saving error:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleRestoreDatabase = async () => {
        if (!confirm('WARNING: This will reload default mock data values for all collections. Continue?')) return;
        setLoading(true);
        try {
            localStorage.clear();
            await initializeDefaultMockData();
            await fetchConfig();
            setSuccessMsg('DATABASE BASELINE REBUILT.');
            setTimeout(() => setSuccessMsg(''), 5000);
        } catch (err) {
            console.error('Restoring baseline error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in font-mono selection:bg-[#ea0614] selection:text-white">
            <div>
                <span className="font-mono text-[9px] text-[#ea0614] tracking-[0.3em] font-bold uppercase mb-1 block">
                    PARAMETRIC CONTROLS
                </span>
                <h1 className="text-2xl font-extrabold font-orbitron text-white uppercase tracking-wider">
                    CORE CONFIGURATION
                </h1>
            </div>

            {loading ? (
                <div className="text-center py-16 text-[#ea0614] text-xs">
                    GETTING CONFIGURATION TELEMETRY...
                </div>
            ) : (
                <div className="space-y-6">
                    {successMsg && (
                        <div className="bg-[#ea0614]/15 border border-[#ea0614]/40 p-4 text-[10.5px] text-white uppercase tracking-wider flex items-center gap-2 rounded-xs">
                            <Check className="w-4 h-4 text-[#ea0614]" />
                            {successMsg}
                        </div>
                    )}

                    <form onSubmit={handleSaveSettings} className="space-y-8 max-w-3xl text-left select-none">

                        {/* Section 1: Headquarters & Communications details */}
                        <div className="glass-node border border-white/5 rounded-sm p-6 space-y-6">
                            <h3 className="text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2.5">
                                <Settings className="w-4 h-4 text-[#ea0614]" />
                                TACTICAL COMMUNICATIONS CHANNELS
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">OPERATIONAL EMAIL HQ</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-650" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-black border border-white/5 pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#ea0614]/50"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">ENCRYPTED CALL SIGN (Phone)</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-650" />
                                        <input
                                            type="text"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full bg-black border border-white/5 pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#ea0614]/50"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">MAILING PHYSICAL HQ COORD (Address)</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-zinc-650" />
                                    <textarea
                                        rows={2}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full bg-black border border-white/5 pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#ea0614]/50 font-sans"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">SYNC WINDOW SECTORS (Hours)</label>
                                    <input
                                        type="text"
                                        value={businessHours}
                                        onChange={(e) => setBusinessHours(e.target.value)}
                                        className="bg-black border border-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ea0614]/50"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">GOOGLE MAPS COORD LINK (Embed URL)</label>
                                    <input
                                        type="text"
                                        value={googleMapsUrl}
                                        onChange={(e) => setGoogleMapsUrl(e.target.value)}
                                        className="bg-black border border-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ea0614]/50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Founder biography details */}
                        <div className="glass-node border border-white/5 rounded-sm p-6 space-y-6">
                            <h3 className="text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2.5">
                                <User className="w-4 h-4 text-[#ea0614]" />
                                SOVEREIGN FOUNDER BIO REGISTRATION
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">FOUNDER COMPLETE NAME</label>
                                    <input
                                        type="text"
                                        required
                                        value={founderName}
                                        onChange={(e) => setFounderName(e.target.value)}
                                        className="bg-black border border-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ea0614]/50"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">OFFICIAL ROLE TITLE</label>
                                    <input
                                        type="text"
                                        required
                                        value={founderRole}
                                        onChange={(e) => setFounderRole(e.target.value)}
                                        className="bg-black border border-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ea0614]/50"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">FOUNDER STATEMENT BIO</label>
                                <textarea
                                    rows={4}
                                    value={founderDescription}
                                    onChange={(e) => setFounderDescription(e.target.value)}
                                    className="bg-black border border-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ea0614]/50 font-sans"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="py-4 px-8 bg-[#ea0614] hover:bg-[#ff0015] text-white text-[10px] font-bold tracking-widest uppercase rounded-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(234,6,20,0.15)] flex-grow"
                            >
                                <Save className="w-4 h-4" />
                                {saving ? 'LOCKING CONFIG...' : 'LOCK CONFIGURATION DATA'}
                            </button>

                            <button
                                type="button"
                                onClick={handleRestoreDatabase}
                                className="py-4 px-8 bg-transparent border border-dashed border-red-950 text-[#ea0614] hover:bg-[#ea0614]/10 hover:text-white text-[10px] font-bold tracking-widest uppercase rounded-xs transition-all flex items-center justify-center gap-2"
                            >
                                <Database className="w-4 h-4" />
                                REBUILD DATABASE BASELINE
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
