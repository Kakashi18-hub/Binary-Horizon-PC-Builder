'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { IPart } from '@/models';
import { GripVertical } from 'lucide-react';

interface DraggablePartProps {
    part: IPart;
}

export default function DraggablePart({ part }: DraggablePartProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: (part as any)._id,
        data: part
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`group relative p-4 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50 z-50' : ''}`}
        >
            <div className="flex items-start gap-4">
                <div className="mt-1 text-neutral-300 group-hover:text-neutral-900 transition-colors">
                    <GripVertical size={16} />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 leading-none mb-1">
                        {part.brand}
                    </p>
                    <p className="text-sm font-bold leading-tight line-clamp-2">{part.name}</p>
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-xs font-mono font-black">₹{part.price.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-neutral-50 rounded italic text-neutral-500">
                            {Object.values(part.specs)[0]}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
