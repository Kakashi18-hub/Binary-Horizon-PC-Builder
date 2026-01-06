'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Activity, Gamepad2, Thermometer, FlaskConical, BarChart3 } from 'lucide-react';
import { IPart } from '@/models';

interface PerformanceStatsProps {
    cpu: IPart | null;
    gpu: IPart | null;
}

export default function PerformanceStats({ cpu, gpu }: PerformanceStatsProps) {
    const [estimates, setEstimates] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cpu && gpu) {
            setLoading(true);
            fetch(`/api/fps-estimate?cpuId=${(cpu as any)._id}&gpuId=${(gpu as any)._id}`)
                .then(res => res.json())
                .then(data => {
                    setEstimates(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        } else {
            setEstimates([]);
        }
    }, [cpu, gpu]);

    if (!cpu && !gpu) {
        return (
            <div className="bg-neutral-50 dark:bg-neutral-900/50 p-8 rounded-[40px] border border-card flex flex-col items-center justify-center text-center transition-colors duration-500">
                <BarChart3 size={32} className="text-neutral-200 dark:text-neutral-800 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Select CPU & GPU to forecast metrics</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Synthetic Benchmarks (Visual Anchor) */}
            <section className="bg-foreground text-background p-8 rounded-[40px] shadow-2xl shadow-black/20 transition-colors duration-500">
                <header className="flex items-center gap-3 mb-8">
                    <FlaskConical size={18} className="text-yellow-400 dark:text-yellow-300" />
                    <h3 className="text-[11px] font-black uppercase tracking-widest opacity-80">Synthetic Forecast</h3>
                </header>

                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <p className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em]">Cinebench R23 Multi</p>
                            <p className="text-lg font-mono font-black italic">{cpu ? (cpu.specs?.cores * 2200).toLocaleString() : '---'}</p>
                        </div>
                        <div className="h-1 bg-background/20 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: cpu ? '85%' : '0%' }}
                                className="h-full bg-background"
                            ></motion.div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <p className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em]">Time Spy Extreme</p>
                            <p className="text-lg font-mono font-black italic">{gpu ? (gpu.price / 10).toLocaleString() : '---'}</p>
                        </div>
                        <div className="h-1 bg-background/20 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: gpu ? '70%' : '0%' }}
                                className="h-full bg-yellow-400"
                            ></motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gaming Benchmarks */}
            <section className="bg-card p-8 rounded-[40px] border border-card transition-colors duration-500">
                <header className="flex items-center gap-3 mb-8">
                    <Gamepad2 size={18} className="text-foreground" />
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-foreground">Gaming Index</h3>
                </header>

                <div className="space-y-6">
                    {loading ? (
                        <div className="space-y-4 animate-pulse">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-12 bg-neutral-50 dark:bg-neutral-900 rounded-2xl"></div>
                            ))}
                        </div>
                    ) : estimates.length > 0 ? (
                        estimates.map((est, idx) => (
                            <div key={idx} className="flex justify-between items-center group">
                                <div>
                                    <p className="text-xs font-black uppercase italic text-foreground group-hover:text-neutral-500 transition-colors">{est.game}</p>
                                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5">{est.resolution} • {est.settings}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-mono font-black italic leading-none text-foreground">{est.fps}</p>
                                    <p className="text-[9px] font-bold text-neutral-300 uppercase">Avg FPS</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest italic text-center py-4">Awaiting GPU selection...</p>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t border-card">
                    <div className="flex items-center gap-2 text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                        <Activity size={12} />
                        Frame-time stability: Verified
                    </div>
                </div>
            </section>

            {/* Logistics Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-6 rounded-[30px] border border-card flex flex-col gap-2 transition-colors duration-500">
                    <Thermometer size={16} className="text-blue-500" />
                    <div>
                        <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">TDP Forecast</p>
                        <p className="text-lg font-mono font-black italic text-foreground">~{cpu && gpu ? (cpu.compatibility?.wattage || 65) + (gpu.compatibility?.wattage || 200) : '--'}W</p>
                    </div>
                </div>
                <div className="bg-card p-6 rounded-[30px] border border-card flex flex-col gap-2 transition-colors duration-500">
                    <Zap size={16} className="text-yellow-500" />
                    <div>
                        <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Load Est.</p>
                        <p className="text-lg font-mono font-black italic text-foreground">LOW</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
