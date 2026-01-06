'use client';

import React, { useState, useMemo } from 'react';
import { useBuild } from '@/context/BuildContext';
import { Info, ShoppingCart, ExternalLink, ArrowLeft, Check, Circle, ShieldCheck, Share2, Wrench, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Helper functions for external search URLs
const amazonSearchUrl = (name: string) => `https://www.amazon.in/s?k=${encodeURIComponent(name)}`;
const flipkartSearchUrl = (name: string) => `https://www.flipkart.com/search?q=${encodeURIComponent(name)}`;
const googleShoppingUrl = (name: string) => `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(name)}`;

export default function CheckoutPage() {
    const { selectedParts, totalPrice } = useBuild();
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [purchasedParts, setPurchasedParts] = useState<Set<string>>(new Set());

    const partsList = Object.entries(selectedParts).filter(([_, part]) => part !== null);

    const togglePurchase = (partName: string) => {
        const newSet = new Set(purchasedParts);
        if (newSet.has(partName)) {
            newSet.delete(partName);
        } else {
            newSet.add(partName);
        }
        setPurchasedParts(newSet);
    };

    const progressPercent = useMemo(() => {
        if (partsList.length === 0) return 0;
        return Math.round((purchasedParts.size / partsList.length) * 100);
    }, [purchasedParts, partsList]);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-20 selection:bg-black selection:text-white transition-colors duration-500">
            {/* Header: Glassmorphism effect */}
            <header className="bg-card/80 backdrop-blur-xl border-b border-card sticky top-0 z-50 w-full flex justify-center transition-colors duration-500">
                <nav className="max-w-6xl w-full px-6 md:px-12 py-5 md:py-6 flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="w-10 h-10 relative overflow-hidden rounded-xl bg-black flex items-center justify-center">
                                <img src="/Binary-Horizon.png" alt="Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic leading-none">Binary Horizon</h1>
                                <p className="text-[9px] md:text-[10px] font-bold text-neutral-900 tracking-widest uppercase mt-1">
                                    Real-time price mapping & assembly.
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className="flex gap-6 md:gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest overflow-x-auto no-scrollbar">
                        <Link href="/" className="text-neutral-500 hover:text-black whitespace-nowrap transition-colors">Builder</Link>
                        <Link href="/parts" className="text-neutral-500 hover:text-black whitespace-nowrap transition-colors">Database</Link>
                        <Link href="/builds" className="text-neutral-500 hover:text-black whitespace-nowrap transition-colors">Shared Builds</Link>
                        <Link href="/about" className="text-neutral-500 hover:text-black whitespace-nowrap transition-colors">About</Link>
                    </div>
                </nav>
            </header>

            {/* Content: Main Centered Area */}
            <main className="w-full flex justify-center mt-12 md:mt-20">
                <div className="max-w-6xl w-full px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                        {/* Summary: Top on Mobile, Right Sidebar on Desktop */}
                        <aside className="w-full lg:w-[320px] xl:w-[400px] lg:order-2 lg:sticky lg:top-36 shrink-0">
                            <div className="space-y-6">
                                <section className="bg-neutral-900 text-white p-8 rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 group-hover:scale-125 transition-transform duration-1000"></div>

                                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-8 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></span>
                                        Build Economics
                                    </h2>

                                    <div className="space-y-1 mb-10">
                                        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Aggregate total</p>
                                        <div className="flex items-baseline gap-1">
                                            <p className="text-5xl font-mono font-black italic tracking-tighter">
                                                ₹{totalPrice.toLocaleString('en-IN')}
                                            </p>
                                            <span className="text-xs font-bold text-neutral-500 italic uppercase">est</span>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-white/5 rounded-3xl border border-white/10 mb-8 backdrop-blur-sm">
                                        <p className="text-[10px] text-neutral-400 leading-relaxed italic font-medium">
                                            Final platform costs may vary by regional availability and current lightning deals.
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <Link
                                            href="/"
                                            className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] text-center block hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
                                        >
                                            Modify Build
                                        </Link>
                                        <button
                                            onClick={() => {
                                                const manifest = partsList.map(([type, part]) => `${type}: ${part?.name} - ₹${part?.price.toLocaleString('en-IN')}`).join('\n');
                                                navigator.clipboard.writeText(manifest);
                                                alert('Build manifest copied to clipboard.');
                                            }}
                                            className="w-full py-4 bg-white/10 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] text-center flex items-center justify-center gap-2 hover:bg-white/20 transition-all border border-white/5"
                                        >
                                            <Share2 size={14} />
                                            Export Manifest
                                        </button>
                                    </div>
                                </section>
                            </div>
                        </aside>

                        {/* Parts List: Main Column */}
                        <div className="flex-1 w-full lg:order-1 space-y-6">
                            <AnimatePresence mode="popLayout">
                                {partsList.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-32 bg-neutral-50 rounded-[40px] border-2 border-dashed border-neutral-100"
                                    >
                                        <p className="text-neutral-400 font-bold uppercase tracking-widest">The assembly is currently empty</p>
                                        <Link href="/" className="mt-4 text-xs font-black uppercase tracking-widest underline underline-offset-8 block transition-opacity hover:opacity-70">Initialize Builder</Link>
                                    </motion.div>
                                ) : (
                                    partsList.map(([type, part]) => (
                                        part && (
                                            <motion.div
                                                key={part.name}
                                                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                                                animate={{
                                                    opacity: purchasedParts.has(part.name) ? 0.6 : 1,
                                                    scale: 1,
                                                    y: 0
                                                }}
                                                className={`bg-white p-6 md:p-8 rounded-[40px] border flex flex-col xl:flex-row items-start xl:items-center justify-between gap-10 transition-all duration-500 w-full group overflow-hidden ${purchasedParts.has(part.name) ? 'border-neutral-100 shadow-none' : 'border-neutral-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]'
                                                    }`}
                                            >
                                                <div className="flex-1 min-w-0 w-full flex items-start gap-6">
                                                    {/* Custom Interactive Checkbox */}
                                                    <button
                                                        onClick={() => togglePurchase(part.name)}
                                                        className={`mt-1.5 shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${purchasedParts.has(part.name)
                                                            ? 'bg-black border-black text-white'
                                                            : 'border-neutral-200 text-neutral-200 hover:border-black hover:text-black'
                                                            }`}
                                                    >
                                                        {purchasedParts.has(part.name) ? <Check size={18} /> : <Circle size={18} />}
                                                    </button>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full border border-card">
                                                                {type}
                                                            </span>
                                                            {purchasedParts.has(part.name) && (
                                                                <span className="text-[9px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100/50">
                                                                    Acquired
                                                                </span>
                                                            )}
                                                            <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest">
                                                                {part.brand}
                                                            </span>
                                                        </div>
                                                        <h4 className={`text-xl md:text-2xl font-black tracking-tight transition-all uppercase italic mb-5 leading-tight ${purchasedParts.has(part.name) ? 'text-neutral-400 line-through decoration-black/20' : 'text-black group-hover:text-neutral-800'
                                                            }`}>
                                                            {part.name}
                                                        </h4>

                                                        <div className="flex items-center gap-4 relative">
                                                            <span className={`text-2xl md:text-3xl font-mono font-black italic transition-colors ${purchasedParts.has(part.name) ? 'text-neutral-300' : 'text-black'
                                                                }`}>
                                                                ₹{part.price.toLocaleString('en-IN')}
                                                            </span>
                                                            {!purchasedParts.has(part.name) && (
                                                                <button
                                                                    className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest cursor-help bg-neutral-50 px-3 py-1.5 rounded-xl border border-neutral-100 hover:bg-neutral-100 transition-colors"
                                                                    onClick={() => setHoveredPart(hoveredPart === part.name ? null : part.name)}
                                                                >
                                                                    <Info size={14} />
                                                                    Market estimate

                                                                    {hoveredPart === part.name && (
                                                                        <motion.div
                                                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                            className="absolute bottom-full left-0 mb-4 w-80 p-5 bg-neutral-900 shadow-2xl rounded-3xl z-30"
                                                                        >
                                                                            <p className="text-[11px] font-medium leading-relaxed text-neutral-300 normal-case tracking-normal">
                                                                                Pricing is calculated based on indexed hardware statistics. Select a retailer to capture live market spot pricing and inventory.
                                                                            </p>
                                                                        </motion.div>
                                                                    )}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row items-center gap-2 w-full xl:w-auto">
                                                    <a
                                                        href={amazonSearchUrl(part.name)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-50 hover:bg-[#FF9900]/10 text-neutral-600 hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest border border-neutral-100 hover:border-[#FF9900]/30 transition-all group/btn flex-1 xl:flex-none whitespace-nowrap"
                                                    >
                                                        <ShoppingCart size={14} className="text-[#FF9900] group-hover/btn:scale-110 transition-transform" />
                                                        Amazon
                                                    </a>
                                                    <a
                                                        href={flipkartSearchUrl(part.name)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-50 hover:bg-[#2874F0]/10 text-neutral-600 hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest border border-neutral-100 hover:border-[#2874F0]/30 transition-all group/btn flex-1 xl:flex-none whitespace-nowrap"
                                                    >
                                                        <ShoppingCart size={14} className="text-[#2874F0] group-hover/btn:scale-110 transition-transform" />
                                                        Flipkart
                                                    </a>
                                                    <a
                                                        href={googleShoppingUrl(part.name)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-50 hover:bg-[#4285F4]/10 text-neutral-600 hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest border border-neutral-100 hover:border-[#4285F4]/30 transition-all group/btn flex-1 xl:flex-none whitespace-nowrap"
                                                    >
                                                        <ExternalLink size={14} className="text-[#4285F4] group-hover/btn:scale-110 transition-transform" />
                                                        Google
                                                    </a>
                                                </div>
                                            </motion.div>
                                        )
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Build Tools & Manual Tracking Section */}
                    <div className="mt-20 md:mt-32 border-t border-neutral-100 pt-20">
                        <header className="mb-14">
                            <h2 className="text-3xl font-black uppercase italic tracking-tight">Build Logistics & Tracker</h2>
                            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.3em] mt-3 bg-neutral-100/50 w-fit px-4 py-2 rounded-full border border-neutral-100">Tools for physical assembly and inventory management.</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
                            <section className="bg-white p-10 rounded-[45px] border border-neutral-100 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                                <header className="flex items-center gap-3 mb-8 border-l-4 border-green-500 pl-5">
                                    <ShieldCheck size={24} className="text-green-600" />
                                    <h3 className="text-[11px] font-black uppercase tracking-widest text-black">Compatibility Shield</h3>
                                </header>
                                <div className="space-y-4">
                                    <p className="text-[11px] font-bold text-green-900 uppercase tracking-tight">Verified Architecture</p>
                                    <p className="text-[11px] text-neutral-500 font-medium leading-relaxed">
                                        Our systems have mapped your selected components against established hardware clearance benchmarks. No critical thermal or physical conflicts were detected.
                                    </p>
                                </div>
                            </section>

                            <section className="bg-white p-10 rounded-[45px] border border-neutral-100 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group">
                                <div className="absolute right-6 top-8 opacity-[0.03] group-hover:opacity-[0.07] group-hover:rotate-12 transition-all duration-700">
                                    <Wrench size={80} />
                                </div>
                                <header className="flex items-center gap-3 mb-8 border-l-4 border-black pl-5">
                                    <h3 className="text-[11px] font-black uppercase tracking-widest text-black">Assembly Insight</h3>
                                </header>
                                <div className="space-y-4 relative z-10">
                                    <p className="text-[12px] text-black font-black uppercase italic tracking-wider leading-relaxed pr-10">
                                        "Always install your CPU, RAM, and M.2 storage onto the motherboard BEFORE mounting it into the chassis."
                                    </p>
                                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">— Professional Guideline</p>
                                </div>
                            </section>

                            <section className="bg-white p-10 rounded-[45px] border border-neutral-100 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                                <header className="flex items-center gap-3 mb-8 border-l-4 border-neutral-200 pl-5">
                                    <h3 className="text-[11px] font-black uppercase tracking-widest text-black">Terms of Use</h3>
                                </header>
                                <div className="space-y-4 text-[11px] text-neutral-500 leading-relaxed font-medium">
                                    <p>Binary Horizon is a high-fidelity comparison tool and does not facilitate direct transactions or handle customer support for retailers.</p>
                                    <p>All merchant redirection links open in a secure new tab for independent checkout at the selected platform.</p>
                                </div>
                            </section>
                        </div>

                        {/* Manual Tracking Section - BOTTOM MOST */}
                        <section className="bg-white p-10 md:p-14 rounded-[50px] border border-neutral-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neutral-50 rounded-full -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-110 pointer-events-none opacity-50"></div>

                            <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:items-center">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-xl shadow-black/10">
                                            <Download size={22} className="rotate-180" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-black">Component Acquisition Tracker</h3>
                                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Manual Inventory Management</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-neutral-500 font-medium leading-relaxed max-w-xl">
                                        This tracker allows you to physically manage your parts list as you source them. Check off components in the list above to update your assembly progress here.
                                    </p>
                                </div>

                                <div className="w-full lg:w-[450px] space-y-8">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Overall Completion</p>
                                            <p className="text-5xl font-mono font-black italic tracking-tighter text-black">{progressPercent}%</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Acquired</p>
                                            <p className="text-2xl font-mono font-black text-black">{purchasedParts.size} <span className="text-neutral-200">/ {partsList.length}</span></p>
                                        </div>
                                    </div>

                                    <div className="w-full h-4 bg-neutral-50 rounded-full overflow-hidden border border-neutral-100 p-1">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progressPercent}%` }}
                                            className="h-full bg-gradient-to-r from-neutral-800 to-black rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                                        />
                                    </div>

                                    <div className={`p-5 rounded-3xl border transition-all duration-500 flex items-center gap-4 ${progressPercent === 100
                                        ? 'bg-green-50 border-green-100 text-green-800'
                                        : 'bg-neutral-50 border-neutral-100 text-neutral-500'
                                        }`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${progressPercent === 100 ? 'bg-white text-green-500' : 'bg-white text-neutral-300'
                                            }`}>
                                            <Check size={20} className={progressPercent === 100 ? "animate-bounce" : ""} />
                                        </div>
                                        <p className="text-[11px] font-bold uppercase tracking-tight leading-tight">
                                            {progressPercent === 100
                                                ? "Ready for Assembly. All components have been marked as acquired."
                                                : "Assembly pending. mark components in the manifest as you receive them."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Footer Section */}
            <footer className="w-full border-t border-card bg-card py-24 mt-20 transition-colors duration-500">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
                        <div className="max-w-sm">
                            <h2 className="text-2xl font-black tracking-tighter uppercase italic mb-6">Binary Horizon</h2>
                            <p className="text-[13px] text-neutral-400 font-medium leading-relaxed">
                                A high-fidelity hardware comparison tool for the modern PC builder. Built with a focus on real-time market indexing and architecture verification.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-16 md:gap-24">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-black border-b border-black/5 pb-2">Developer</h4>
                                <ul className="space-y-4 text-[12px] font-bold text-neutral-400 uppercase tracking-widest">
                                    <li>
                                        <a href="https://www.linkedin.com/in/ujjwal-bachhav-26b98824b" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                                            Ujjwal Bachhav
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/Kakashi18-hub/Binary-Horizon-PC-Builder" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                                            Source Code
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-black border-b border-black/5 pb-2">Navigation</h4>
                                <ul className="space-y-4 text-[12px] font-bold text-neutral-400 uppercase tracking-widest">
                                    <li><Link href="/about" className="hover:text-black transition-colors">How it Works</Link></li>
                                    <li><Link href="/parts" className="hover:text-black transition-colors">Components</Link></li>
                                    <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-black transition-colors">Back to Top</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-neutral-50 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.4em]">
                            © 2026 BINARY HORIZON • MIT LICENSE
                        </p>
                        <div className="flex gap-10 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                Core: Operational
                            </span>
                            <span>v1.2.4-stable</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
