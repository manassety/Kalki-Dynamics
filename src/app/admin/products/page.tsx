'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Trash2,
    Edit,
    Eye,
    EyeOff,
    Check,
    AlertTriangle,
    RefreshCw,
    Cpu
} from 'lucide-react';
import {
    getCollectionData,
    setDocument,
    addDocument,
    deleteDocument
} from '@/utils/firebase';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Form states
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Surveillance Hardware');
    const [price, setPrice] = useState(185000);
    const [stock, setStock] = useState(10);
    const [status, setStatus] = useState('published');
    const [featured, setFeatured] = useState(false);
    const [features, setFeatures] = useState('');
    const [specifications, setSpecifications] = useState('');
    const [image, setImage] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getCollectionData('products');
            setProducts(data);
        } catch (e) {
            console.error('Error fetching products:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const resetForm = () => {
        setId('');
        setName('');
        setShortDescription('');
        setDescription('');
        setCategory('Surveillance Hardware');
        setPrice(185000);
        setStock(10);
        setStatus('published');
        setFeatured(false);
        setFeatures('');
        setSpecifications('');
        setImage('');
    };

    const handleEditProduct = (prod: any) => {
        setId(prod.id);
        setName(prod.name);
        setShortDescription(prod.shortDescription || '');
        setDescription(prod.description || '');
        setCategory(prod.category || 'Surveillance Hardware');
        setPrice(prod.price || 0);
        setStock(prod.stock || 0);
        setStatus(prod.status || 'published');
        setFeatured(prod.featured || false);
        setFeatures(prod.features || '');
        setSpecifications(prod.specifications || '');
        setImage(prod.image || '');
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;

        const data: any = {
            name,
            shortDescription,
            description,
            category,
            price: Number(price),
            stock: Number(stock),
            status,
            featured: Boolean(featured),
            features,
            specifications,
            image: image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80'
        };

        try {
            if (id) {
                // Update
                await setDocument('products', id, data);
            } else {
                // Create
                const docId = 'prod_' + Math.random().toString(36).substr(2, 9);
                await setDocument('products', docId, data);
            }
            resetForm();
            setIsFormOpen(false);
            await fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (prodId: string) => {
        if (!confirm('Are you sure you want to delete this system record?')) return;
        try {
            await deleteDocument('products', prodId);
            await fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const toggleFeatured = async (prod: any) => {
        try {
            await setDocument('products', prod.id, {
                ...prod,
                featured: !prod.featured
            });
            await fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const toggleStatus = async (prod: any) => {
        const nextStatus = prod.status === 'published' ? 'draft' : 'published';
        try {
            await setDocument('products', prod.id, {
                ...prod,
                status: nextStatus
            });
            await fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in font-mono selection:bg-[#ea0614] selection:text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="font-mono text-[9px] text-[#ea0614] tracking-[0.3em] font-bold uppercase mb-1 block">
                        PRODUCTION SHEETS
                    </span>
                    <h1 className="text-2xl font-extrabold font-orbitron text-white uppercase tracking-wider">
                        PRODUCT SPEC CATALOG
                    </h1>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={fetchProducts}
                        className="p-3 bg-zinc-950 hover:bg-[#ea0614]/10 border border-white/5 hover:border-[#ea0614]/30 rounded-xs transition-colors flex items-center justify-center text-[#ea0614]"
                        title="Reload Database"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => { resetForm(); setIsFormOpen(true); }}
                        className="py-3 px-5 bg-[#ea0614] hover:bg-[#ff0015] text-white text-[10px] items-center justify-center gap-2 font-bold tracking-widest rounded-xs transition-all uppercase flex shadow-[0_0_15px_rgba(234,6,20,0.15)]"
                    >
                        <Plus className="w-4 h-4" />
                        ADD PRODUCT RECORD
                    </button>
                </div>
            </div>

            {/* Catalog Grid View */}
            {loading ? (
                <div className="text-center py-16 text-[#ea0614] text-xs">
                    SYNCDIR DETECT: SCANNING ARCHIVES CATALOG...
                </div>
            ) : products.length === 0 ? (
                <div className="border border-dashed border-white/5 p-12 text-center text-zinc-500 rounded-sm">
                    No active product schemas defined inside database. Create a prototype registry file using the button above.
                </div>
            ) : (
                <div className="glass-node border border-white/5 rounded-sm overflow-hidden select-none">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="border-b border-white/10 bg-black/60 font-mono font-bold text-white uppercase tracking-wider">
                                    <th className="p-4 text-[9px] text-[#555]">Image</th>
                                    <th className="p-4 text-[9px] text-[#555]">Blueprint Name</th>
                                    <th className="p-4 text-[9px] text-[#555]">Segment</th>
                                    <th className="p-4 text-[9px] text-[#555] text-center">Featured</th>
                                    <th className="p-4 text-[9px] text-[#555] text-center">Status</th>
                                    <th className="p-4 text-[9px] text-[#555] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-[#c0c0c0]">
                                {products.map((prod) => (
                                    <tr key={prod.id} className="hover:bg-white/2 transition-colors">
                                        <td className="p-4">
                                            <div className="w-10 h-10 border border-white/10 rounded-sm overflow-hidden bg-black flex-shrink-0">
                                                <img
                                                    src={prod.image}
                                                    alt={prod.name}
                                                    className="w-full h-full object-cover filter brightness-[0.8]"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 font-bold text-white">
                                            <div>{prod.name}</div>
                                            <div className="text-[8px] text-[#555] font-light truncate max-w-xs uppercase mt-0.5">{prod.id}</div>
                                        </td>
                                        <td className="p-4 uppercase text-[10px] text-zinc-400">{prod.category}</td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => toggleFeatured(prod)}
                                                className={`text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest ${prod.featured
                                                    ? 'bg-[#ea0614]/10 border border-[#ea0614]/40 text-[#ea0614]'
                                                    : 'bg-zinc-950 border border-white/5 text-zinc-600'
                                                    }`}
                                            >
                                                {prod.featured ? 'FEATURED' : 'STANDARD'}
                                            </button>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => toggleStatus(prod)}
                                                className={`text-[9.5px] font-bold inline-flex items-center gap-1.5 uppercase ${prod.status === 'published' ? 'text-green-500' : 'text-zinc-500'
                                                    }`}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${prod.status === 'published' ? 'bg-green-500 animate-pulse' : 'bg-zinc-500'}`} />
                                                {prod.status}
                                            </button>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-1.5">
                                                <button
                                                    onClick={() => handleEditProduct(prod)}
                                                    className="p-1 px-2 border border-white/5 hover:border-white/20 text-[#888] hover:text-white transition-colors"
                                                    title="Modify specifications catalog"
                                                >
                                                    <Edit className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(prod.id)}
                                                    className="p-1 px-2 border border-white/5 hover:border-red-950 text-[#888] hover:text-[#ea0614] transition-colors"
                                                    title="Purge catalog blueprint"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Product editor Overlay Drawer Model */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-50 flex justify-end">
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFormOpen(false)}
                            className="absolute inset-0 bg-black backdrop-blur-xs"
                        />

                        {/* Editor Box Drawer layout */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-xl bg-zinc-950 border-l border-white/5 h-full relative z-10 flex flex-col justify-between"
                        >
                            <div className="absolute top-4 right-4 text-[7px] text-[#444] tracking-widest">// DECODE_WRITE_CONSOLE</div>

                            {/* Header */}
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <h3 className="text-sm font-bold font-orbitron text-white uppercase tracking-wider flex items-center gap-2">
                                    <Cpu className="w-4 h-4 text-[#ea0614]" />
                                    {id ? 'EDIT SYSTEM MODEL SCHEMA' : 'COMPILE NEW PROTOTYPE SCHEMA'}
                                </h3>
                                <button
                                    onClick={() => setIsFormOpen(false)}
                                    className="p-2 border border-white/5 text-zinc-500 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Scrollable Form Body content */}
                            <form onSubmit={handleSubmit} className="flex-grow p-6 overflow-y-auto space-y-6 text-left">
                                {/* Name fields */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">SYSTEM MODEL BRAND NAME</label>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Kalki Sentinel X"
                                            className="bg-black border border-white/5 rounded-xs p-3 text-xs text-white placeholder-[#222] focus:outline-none focus:border-[#ea0614]/50"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">SEGMENT GROUP</label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="bg-black border border-white/5 rounded-xs p-3 text-xs text-brand focus:outline-none focus:border-[#ea0614]/50"
                                        >
                                            <option value="Surveillance Hardware">Surveillance Hardware</option>
                                            <option value="Tactical Wearables">Tactical Wearables</option>
                                            <option value="AI Platforms">AI Platforms</option>
                                            <option value="Embedded Systems">Embedded Systems</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Image URL */}
                                <div className="flex flex-col">
                                    <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">IMAGE DEPLOY IMAGE URL</label>
                                    <input
                                        type="text"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        placeholder="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format..."
                                        className="bg-black border border-white/5 rounded-xs p-3 text-xs text-white placeholder-[#222] focus:outline-none focus:border-[#ea0614]/50"
                                    />
                                </div>

                                {/* Short description */}
                                <div className="flex flex-col">
                                    <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">TELEMETRY SHORT DESCRIPTION</label>
                                    <input
                                        type="text"
                                        value={shortDescription}
                                        onChange={(e) => setShortDescription(e.target.value)}
                                        placeholder="Brief 1-sentence design pitch..."
                                        className="bg-black border border-white/5 rounded-xs p-3 text-xs text-white placeholder-[#222] focus:outline-none focus:border-[#ea0614]/50"
                                    />
                                </div>

                                {/* Main long description */}
                                <div className="flex flex-col">
                                    <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">DETAILED DESCRIPTION STRUCTURE</label>
                                    <textarea
                                        rows={4}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter the full operational capabilities specifications of the AI components..."
                                        className="bg-black border border-white/5 rounded-xs p-3 text-xs text-white placeholder-[#222] focus:outline-none focus:border-[#ea0614]/50 font-sans"
                                    />
                                </div>

                                {/* Specs & features list */}
                                <div className="flex flex-col">
                                    <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">SPECIFICATIONS SHEET DATA (CSV/Lines)</label>
                                    <textarea
                                        rows={3}
                                        value={specifications}
                                        onChange={(e) => setSpecifications(e.target.value)}
                                        placeholder="Battery: 7 days active, Weight: 12 grams, Radios: LoRa/BLE/GPS"
                                        className="bg-black border border-white/5 rounded-xs p-3 text-xs text-white placeholder-[#222] focus:outline-none focus:border-[#ea0614]/50"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-[9px] text-[#555] font-bold tracking-widest uppercase mb-2">CORE HIGHLIGHT FEATURES (CSV)</label>
                                    <textarea
                                        rows={3}
                                        value={features}
                                        onChange={(e) => setFeatures(e.target.value)}
                                        placeholder="Edge AI Detection, solar-powered active grid, PTZ auto-vector tracking"
                                        className="bg-black border border-white/5 rounded-xs p-3 text-xs text-white placeholder-[#222] focus:outline-none focus:border-[#ea0614]/50"
                                    />
                                </div>

                                {/* Featured and Status selection */}
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="featured"
                                            checked={featured}
                                            onChange={(e) => setFeatured(e.target.checked)}
                                            className="w-4 h-4 rounded-xs border-white/10 accent-[#ea0614]"
                                        />
                                        <label htmlFor="featured" className="text-[10px] text-zinc-300 font-bold uppercase cursor-pointer">FEATURED SLOT PROTOCOL</label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="bg-black border border-white/5 p-2 text-[10px] text-white focus:outline-none"
                                        >
                                            <option value="published">PUBLISHED (LIVE)</option>
                                            <option value="draft">DRAFT (OFFLINE)</option>
                                        </select>
                                    </div>
                                </div>
                            </form>

                            {/* Footer actions */}
                            <div className="p-6 border-t border-white/5 bg-zinc-950 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="flex-grow py-3 bg-transparent border border-white/10 hover:border-white text-white text-[10px] font-bold tracking-widest uppercase rounded-xs transition-colors"
                                >
                                    ABORT COMPILATION
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-grow py-3 bg-[#ea0614] hover:bg-[#ff0015] text-white text-[10px] font-bold tracking-widest uppercase rounded-xs transition-all flex items-center justify-center gap-2"
                                >
                                    <Check className="w-3.5 h-3.5" />
                                    LOCK PROTOCOL
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
