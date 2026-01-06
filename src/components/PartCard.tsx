'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, ArrowUpRight } from 'lucide-react';
import { IPart } from '@/models';

interface PartCardProps {
    part: IPart;
    isSelected: boolean;
    onSelect: (part: IPart) => void;
}

export default function PartCard({ part, isSelected, onSelect }: PartCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(part)}
            className={`p-1 flex flex-col h-full rounded-[32px] transition-all duration-500 group cursor-pointer ${isSelected
                ? 'bg-foreground shadow-2xl scale-[1.02]'
                : 'bg-card border border-card hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]'
                }`}
        >
            <div className={`p-8 flex-1 flex flex-col h-full rounded-[30px] transition-colors duration-500 relative overflow-hidden ${isSelected ? 'bg-background shadow-inner' : 'bg-card'}`}>
                {/* Selection Indicator Overlay */}
                <AnimatePresence>
                    {isSelected && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute top-8 right-8 text-foreground"
                        >
                            <div className="w-10 h-10 bg-foreground text-background rounded-xl flex items-center justify-center shadow-lg">
                                <Check size={20} strokeWidth={3} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border transition-colors ${isSelected ? 'border-foreground/60 text-neutral-700' : 'border-neutral-300 text-neutral-700'}`}>
                            {part.brand}
                        </span>
                        <h3 className={`text-xl font-black tracking-tight uppercase italic leading-tight mt-3 transition-colors ${isSelected ? 'text-foreground' : 'text-foreground group-hover:text-neutral-600'}`}>
                            {part.name}
                        </h3>
                    </div>
                </div>

                <div className="mt-auto space-y-6">
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(part.specs).map(([key, value]) => (
                            <div key={key} className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-colors ${isSelected ? 'border-foreground/30 bg-foreground/10' : 'border-card bg-neutral-100'}`}>
                                <span className="text-[8px] font-black uppercase tracking-widest text-neutral-500">{key}</span>
                                <span className={`text-[9px] font-black uppercase tracking-tighter transition-colors ${isSelected ? 'text-foreground' : 'text-neutral-900'}`}>
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-card flex items-center justify-between transition-colors">
                        <div className="space-y-0.5">
                            <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Market Est.</p>
                            <span className="text-2xl font-mono font-black italic tracking-tighter text-foreground">
                                ₹{part.price.toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
