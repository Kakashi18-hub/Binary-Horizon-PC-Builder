'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Linkedin, Cpu, Zap, ShieldCheck, Globe, Code } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-24 selection:bg-black selection:text-white">
            {/* Header: Glassmorphism effect */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-card sticky top-0 z-50 w-full flex justify-center">
                <nav className="max-w-6xl w-full px-6 md:px-12 py-5 md:py-6 flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="w-10 h-10 relative overflow-hidden rounded-xl bg-black flex items-center justify-center">
                                <img src="/Binary-Horizon.png" alt="Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">Binary Horizon</h1>
                                <p className="text-[9px] font-bold text-neutral-400 tracking-widest uppercase mt-0.5">Architecture Index</p>
                            </div>
                        </Link>
                    </div>

                    <div className="flex gap-6 md:gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest overflow-x-auto no-scrollbar">
                        <Link href="/" className="text-neutral-400 hover:text-black whitespace-nowrap transition-colors">Builder</Link>
                        <Link href="/parts" className="text-neutral-400 hover:text-black whitespace-nowrap transition-colors">Database</Link>
                        <Link href="/checkout" className="text-neutral-400 hover:text-black whitespace-nowrap transition-colors">Checkout</Link>
                    </div>
                </nav>
            </header>

            <main className="max-w-5xl mx-auto px-6 md:px-12 mt-20 md:mt-32 uppercase">
                {/* Hero Section */}
                <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 bg-neutral-100 px-4 py-2 rounded-full border border-neutral-100">Project Overview</span>
                        <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] text-black">
                            High Fidelity<br />
                            Hardware Indexing.
                        </h2>
                        <p className="text-lg md:text-xl text-neutral-500 font-medium leading-relaxed max-w-2xl lowercase">
                            Binary Horizon is a next-generation PC building platform designed to bridge the gap between abstract builds and real-world market availability.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-[60px] bg-black overflow-hidden shadow-2xl shadow-black/20 border border-black/5">
                            <img
                                src="/Binary-Horizon-animated.gif"
                                alt="Platform Animation"
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                    </motion.div>
                </section>

                {/* How it Works: The Engineering Level */}
                <section className="mb-40 space-y-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-6">
                            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-black/10">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-black italic tracking-tight text-black">The Indexing Engine</h3>
                            <p className="text-[11px] text-neutral-500 font-bold leading-relaxed tracking-widest lowercase">
                                Our core algorithm maps hardware parameters across distributed database nodes. It dynamically generates market estimates by synthesizing regional retail pricing with architectural release cycles.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-black/10">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-black italic tracking-tight text-black">Logical Verification</h3>
                            <p className="text-[11px] text-neutral-500 font-bold leading-relaxed tracking-widest lowercase">
                                Every component state is tracked via a centralized React Context. A validation layer monitors socket types, dimensions, and TDP thresholds—calculating interdependency errors in real-time.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-black/10">
                                <Globe size={24} />
                            </div>
                            <h3 className="text-xl font-black italic tracking-tight text-black">Regional Mapping</h3>
                            <p className="text-[11px] text-neutral-500 font-bold leading-relaxed tracking-widest lowercase">
                                Data is curated specifically for the Indian computing market, ensuring MSRP projections and retailer redirection links are localized for maximum fidelity and sourcing accuracy.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Technical Stack Section */}
                <section className="mb-40">
                    <div className="space-y-12">
                        <div className="text-center md:text-left">
                            <span className="text-[10px] font-black tracking-[0.4em] text-neutral-400 uppercase">Modular Engineering</span>
                            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-black mt-4 uppercase">The Infrastructure Blueprint</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Next.js */}
                            <div className="bg-white border border-neutral-100 rounded-[40px] p-8 space-y-6 transition-all hover:shadow-2xl hover:-translate-y-2 duration-500">
                                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <Globe size={24} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-black italic uppercase text-black">Next.js 15</h3>
                                    <p className="text-[11px] text-neutral-500 font-bold leading-relaxed tracking-widest lowercase">
                                        The backbone of the application. Utilizes the App Router for seamless page transitions and Server Components to optimize the delivery of the high-density hardware index.
                                    </p>
                                </div>
                            </div>

                            {/* MongoDB */}
                            <div className="bg-white border border-neutral-100 rounded-[40px] p-8 space-y-6 transition-all hover:shadow-2xl hover:-translate-y-2 duration-500">
                                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <Cpu size={24} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-black italic uppercase text-black">MongoDB Atlas</h3>
                                    <p className="text-[11px] text-neutral-500 font-bold leading-relaxed tracking-widest lowercase">
                                        Our persistence layer. It stores thousands of hardware module entries and handles the complex relational mapping required for shared build manifests and inventory states.
                                    </p>
                                </div>
                            </div>

                            {/* Framer Motion */}
                            <div className="bg-white border border-neutral-100 rounded-[40px] p-8 space-y-6 transition-all hover:shadow-2xl hover:-translate-y-2 duration-500">
                                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <Zap size={24} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-black italic uppercase text-black">Framer Motion</h3>
                                    <p className="text-[11px] text-neutral-500 font-bold leading-relaxed tracking-widest lowercase">
                                        Drives the "high-fidelity" feel. Powers the signature splash screen boot sequence, liquid-smooth theme transitions, and the interactive building animations.
                                    </p>
                                </div>
                            </div>

                            {/* React Context */}
                            <div className="bg-white border border-neutral-100 rounded-[40px] p-8 space-y-6 transition-all hover:shadow-2xl hover:-translate-y-2 duration-500">
                                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <ShieldCheck size={24} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-black italic uppercase text-black">React Context</h3>
                                    <p className="text-[11px] text-neutral-500 font-bold leading-relaxed tracking-widest lowercase">
                                        The global brain. It manages the multi-dimensional build state, conducting real-time compatibility checks and aggregate pricing updates.
                                    </p>
                                </div>
                            </div>

                            {/* Tailwind CSS */}
                            <div className="bg-white border border-neutral-100 rounded-[40px] p-8 space-y-6 transition-all hover:shadow-2xl hover:-translate-y-2 duration-500">
                                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <Code size={24} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-black italic uppercase text-black">Tailwind CSS 4.0</h3>
                                    <p className="text-[11px] text-neutral-500 font-bold leading-relaxed tracking-widest lowercase">
                                        Architects the design system. Provides the atomic utilities for our glassmorphism effects and ensures robust visual consistency.
                                    </p>
                                </div>
                            </div>

                            {/* TypeScript */}
                            <div className="bg-white border border-neutral-100 rounded-[40px] p-8 space-y-6 transition-all hover:shadow-2xl hover:-translate-y-2 duration-500">
                                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <Code size={24} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-black italic uppercase text-black">TypeScript</h3>
                                    <p className="text-[11px] text-neutral-500 font-bold leading-relaxed tracking-widest lowercase">
                                        Enforces architectural integrity. Provides the strict interface definitions for hardware types, eliminating runtime errors during assembly calculations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Developer Section */}
                <section className="py-24 border-y border-neutral-100 mb-32 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="max-w-xl">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 mb-8 block">Project Developer</span>
                            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 text-black">Ujjwal Bachhav</h2>
                            <p className="text-sm text-neutral-500 font-medium leading-relaxed uppercase tracking-widest lowercase">
                                A mid-level systems engineer focused on high-fidelity user experiences and modular web systems. Binary Horizon serves as a research project into the intersection of market data and visual configuration.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-6 shrink-0">
                            <a
                                href="https://www.linkedin.com/in/ujjwal-bachhav-26b98824b"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform"
                            >
                                <Linkedin size={16} />
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/Kakashi18-hub/Binary-Horizon-PC-Builder"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest border border-neutral-100 hover:bg-neutral-50 transition-colors"
                            >
                                <Github size={16} />
                                Github
                            </a>
                        </div>
                    </div>
                </section>

                {/* Open Source Info */}
                <section className="mb-20">
                    <div className="p-10 md:p-16 bg-white border border-neutral-100 rounded-[50px] relative group overflow-hidden">
                        <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                            <Globe size={300} />
                        </div>
                        <div className="relative z-10 text-center">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 text-black">Open Source Initiative</h3>
                            <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-[0.3em] max-w-lg mx-auto leading-loose mb-10 lowercase">
                                released under the mit license. binary horizon is an open-contribution platform. we invite hardware enthusiasts and engineers to contribute to our mapping index.
                            </p>
                            <a
                                href="https://github.com/Kakashi18-hub/Binary-Horizon-PC-Builder/fork"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] font-black uppercase tracking-[0.5em] underline underline-offset-8 hover:opacity-50 transition-opacity text-black"
                            >
                                Fork Repository
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* Simple Footer */}
            <footer className="max-w-6xl mx-auto px-6 md:px-12 pt-20 border-t border-neutral-100">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-neutral-300 uppercase tracking-widest">
                    <p>© 2026 BINARY HORIZON • DEVELOPED BY UJJWAL BACHHAV</p>
                    <div className="flex gap-10">
                        <Link href="/" className="hover:text-black transition-colors">Builder</Link>
                        <Link href="/parts" className="hover:text-black transition-colors">Index</Link>
                        <Link href="/checkout" className="hover:text-black transition-colors">Sourcing</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
