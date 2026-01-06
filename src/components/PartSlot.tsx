'use client';

import React, { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { IPart } from '@/models';
import { X, AlertCircle } from 'lucide-react';

interface PartSlotProps {
    id: string;
    label: string;
    part: IPart | null;
    onRemove: () => void;
    isOver?: boolean;
    activePart?: IPart | null;
    compatibilityError?: string | null;
}

export default function PartSlot({ id, label, part, onRemove, isOver, activePart, compatibilityError }: PartSlotProps) {
    const { setNodeRef } = useDroppable({
        id: id,
        data: { accept: id }
    });

    const isHinted = activePart?.type === id && !isOver;

    return (
        <div
            ref={setNodeRef}
            className={`relative h-32 rounded-3xl border-2 transition-all duration-300 flex items-center justify-center overflow-hidden ${isOver
                ? (compatibilityError ? 'border-red-500 bg-red-50' : 'border-black bg-neutral-50 scale-[1.02]')
                : isHinted
                    ? 'border-green-500 bg-green-50/30 border-solid shadow-[0_0_15px_rgba(34,197,94,0.3)] scale-[1.01]'
                    : 'border-dashed border-neutral-200 bg-white'
                }`}
        >
            <AnimatePresence mode="wait">
                {part ? (
                    <motion.div
                        key="installed"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full h-full p-4 flex items-center justify-between"
                    >
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</span>
                            <span className="font-bold text-sm leading-tight">{part.name}</span>
                            <span className="text-xs font-mono mt-1 italic">₹{part.price.toLocaleString('en-IN')}</span>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); onRemove(); }}
                            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-2 pointer-events-none"
                    >
                        <div className={`w-10 h-10 rounded-full border-2 border-neutral-100 flex items-center justify-center text-neutral-300`}>
                            {label[0]}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-300">{label} Slot</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Snap Preview / Warning */}
            {isOver && activePart && (
                <div className="absolute inset-x-0 bottom-0 p-2 pointer-events-none">
                    {compatibilityError ? (
                        <div className="bg-red-500 text-white text-[10px] font-bold py-1 px-3 rounded-full flex items-center gap-2 animate-bounce">
                            <AlertCircle size={10} /> {compatibilityError}
                        </div>
                    ) : (
                        <div className="bg-black text-white text-[10px] font-bold py-1 px-3 rounded-full text-center">
                            Snap {activePart.name}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
