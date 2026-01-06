'use client';

import { Zap } from 'lucide-react';

interface FPSBadgeProps {
    cpuId?: string;
    gpuId?: string;
}

export default function FPSConfidenceBadge({ cpuId, gpuId }: FPSBadgeProps) {
    if (!cpuId || !gpuId) return null;

    return (
        <div className="bg-black text-white p-6 rounded-3xl mt-4">
            <div className="flex items-center gap-2 mb-4">
                <Zap className="text-yellow-400 fill-yellow-400" size={18} />
                <span className="text-sm font-bold uppercase tracking-widest">Performance Estimate</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-neutral-400 text-xs">Cyberpunk 2077</p>
                    <p className="text-2xl font-mono font-bold">85 <span className="text-sm opacity-50">FPS</span></p>
                    <p className="text-[10px] text-neutral-500 uppercase">1440p High</p>
                </div>
                <div>
                    <p className="text-neutral-400 text-xs">Valorant</p>
                    <p className="text-2xl font-mono font-bold">420 <span className="text-sm opacity-50">FPS</span></p>
                    <p className="text-[10px] text-neutral-500 uppercase">1080p Max</p>
                </div>
            </div>
        </div>
    );
}
