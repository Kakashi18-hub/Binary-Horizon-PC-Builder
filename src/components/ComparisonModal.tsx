'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ExternalLink, Info } from 'lucide-react';
import { IPart } from '@/models';

interface ComparisonModalProps {
    part: IPart | null;
    onClose: () => void;
}

const amazonSearchUrl = (name: string) => `https://www.amazon.in/s?k=${encodeURIComponent(name)}`;
const flipkartSearchUrl = (name: string) => `https://www.flipkart.com/search?q=${encodeURIComponent(name)}`;
const googleShoppingUrl = (name: string) => `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(name)}`;

export default function ComparisonModal({ part, onClose }: ComparisonModalProps) {
    if (!part) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden border border-neutral-100"
                >
                    <div className="p-8">
                        <header className="flex justify-between items-start mb-8">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded mb-2 inline-block">
                                    {part.type} comparison
                                </span>
                                <h2 className="text-3xl font-black tracking-tight leading-none uppercase italic">{part.name}</h2>
                                <p className="text-sm font-medium text-neutral-500 mt-2">{part.brand} Hardware Selection</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </header>

                        <div className="space-y-3 mb-10">
                            <a
                                href={amazonSearchUrl(`${part.brand} ${part.name}`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-6 bg-neutral-50 hover:bg-[#FF9900]/10 rounded-2xl border border-neutral-100 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        <ShoppingCart size={20} className="text-[#FF9900]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#FF9900]">Retailer</p>
                                        <p className="font-bold">Amazon India</p>
                                    </div>
                                </div>
                                <ExternalLink size={18} className="text-neutral-300 group-hover:text-black transition-colors" />
                            </a>

                            <a
                                href={flipkartSearchUrl(`${part.brand} ${part.name}`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-6 bg-neutral-50 hover:bg-[#2874F0]/10 rounded-2xl border border-neutral-100 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        <ShoppingCart size={20} className="text-[#2874F0]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#2874F0]">Retailer</p>
                                        <p className="font-bold">Flipkart</p>
                                    </div>
                                </div>
                                <ExternalLink size={18} className="text-neutral-300 group-hover:text-black transition-colors" />
                            </a>

                            <a
                                href={googleShoppingUrl(`${part.brand} ${part.name}`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-6 bg-neutral-50 hover:bg-[#4285F4]/10 rounded-2xl border border-neutral-100 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        <ShoppingCart size={20} className="text-[#4285F4]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#4285F4]">Search Engine</p>
                                        <p className="font-bold">Google Shopping</p>
                                    </div>
                                </div>
                                <ExternalLink size={18} className="text-neutral-300 group-hover:text-black transition-colors" />
                            </a>
                        </div>

                        <div className="bg-neutral-900 text-white p-6 rounded-3xl relative overflow-hidden">
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <Info size={18} className="text-neutral-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Internal Base Estimate</p>
                                    <p className="text-2xl font-mono font-black italic">₹{part.price.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <p className="text-[9px] text-neutral-500 uppercase font-bold tracking-widest italic">
                                    * Real-time pricing found on external sites may vary.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
