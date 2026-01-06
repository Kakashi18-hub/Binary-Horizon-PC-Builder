'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        // Trigger loading state for at least 1.5s on every route change
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-6"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative w-48 h-48 md:w-64 md:h-64"
                    >
                        {/* Animated Logo Container */}
                        <div className="w-full h-full relative overflow-hidden rounded-[40px] shadow-[0_0_100px_rgba(255,255,255,0.05)]">
                            <img
                                src="/Binary-Horizon-animated.gif"
                                alt="Binary Horizon"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Status Label */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="absolute -bottom-16 left-0 right-0 text-center space-y-2"
                        >
                            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">
                                Authenticating Index
                            </p>
                            <div className="flex justify-center gap-1">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.2, 1, 0.2] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                        className="w-1 h-1 bg-white rounded-full"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
