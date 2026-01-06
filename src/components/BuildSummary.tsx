'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IPart } from '@/models';

interface BuildSummaryProps {
    selectedParts: Record<string, IPart | null>;
    totalPrice: number;
}

export default function BuildSummary({ selectedParts, totalPrice }: BuildSummaryProps) {
    const partsList = Object.entries(selectedParts).filter(([_, part]) => part !== null);
    const [isSharing, setIsSharing] = useState(false);
    const [shareUrl, setShareUrl] = useState<string | null>(null);

    const handleShare = async () => {
        if (partsList.length === 0) {
            alert("Add some parts before sharing!");
            return;
        }

        setIsSharing(true);
        try {
            const res = await fetch('/api/builds', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    parts: selectedParts,
                    totalPrice: totalPrice,
                    name: `Custom Build ${new Date().toLocaleDateString()}`
                })
            });
            const data = await res.json();
            if (data.id) {
                const url = `${window.location.origin}/builds/${data.id}`;
                setShareUrl(url);
                await navigator.clipboard.writeText(url);
            }
        } catch (error) {
            console.error('Error sharing:', error);
            alert('Failed to share build. Please try again.');
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 italic">Build Registry</h2>

            <div className="space-y-4 mb-8">
                <AnimatePresence mode="popLayout">
                    {partsList.length === 0 && (
                        <p className="text-neutral-400 font-bold uppercase text-[10px] tracking-widest italic py-4">No components selected</p>
                    )}
                    {partsList.map(([type, part]) => (
                        part && (
                            <motion.div
                                key={type + (part as any)._id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex justify-between items-center py-3 border-b border-neutral-200 last:border-0"
                            >
                                <div>
                                    <p className="text-[10px] uppercase font-black text-neutral-400 tracking-widest">{type}</p>
                                    <p className="font-bold text-sm tracking-tight">{part.name}</p>
                                </div>
                                <p className="font-mono font-black italic text-sm">₹{part.price.toLocaleString('en-IN')}</p>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>

            <div className="pt-6 border-t border-neutral-200">
                <div className="flex justify-between items-end mb-8">
                    <span className="text-neutral-500 font-black uppercase text-[10px] tracking-widest">Total Valuation</span>
                    <motion.span
                        key={totalPrice}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-mono font-black italic tracking-tighter"
                    >
                        ₹{totalPrice.toLocaleString('en-IN')}
                    </motion.span>
                </div>

                {!shareUrl ? (
                    <button
                        onClick={handleShare}
                        disabled={isSharing}
                        className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 shadow-xl shadow-black/10 flex items-center justify-center gap-2"
                    >
                        {isSharing ? 'Recording Specs...' : 'Save & Share Forge'}
                    </button>
                ) : (
                    <div className="space-y-3">
                        <div className="p-4 bg-white rounded-xl border border-neutral-200 flex flex-col gap-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-green-600 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                Link Copied to Clipboard
                            </p>
                            <input
                                readOnly
                                value={shareUrl}
                                className="text-[10px] font-mono bg-neutral-50 p-2 rounded border-none w-full"
                            />
                        </div>
                        <button
                            onClick={() => setShareUrl(null)}
                            className="w-full text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
                        >
                            Reset Share
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
