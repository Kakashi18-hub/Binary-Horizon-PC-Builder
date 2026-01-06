'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, CheckCircle2, Info } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'error' | 'success' | 'info';

interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    onClose: (id: string) => void;
}

export default function Toast({ id, message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 5000);
        return () => clearTimeout(timer);
    }, [id, onClose]);

    const icons = {
        error: <AlertCircle className="text-red-500" size={20} />,
        success: <CheckCircle2 className="text-green-500" size={20} />,
        info: <Info className="text-blue-500" size={20} />
    };

    const bgColors = {
        error: 'bg-red-50 border-red-100',
        success: 'bg-green-50 border-green-100',
        info: 'bg-blue-50 border-blue-100'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`flex items-center gap-4 p-5 rounded-[24px] border shadow-2xl backdrop-blur-xl min-w-[320px] max-w-[400px] ${bgColors[type]}`}
        >
            <div className={`p-2 rounded-xl bg-white shadow-sm`}>
                {icons[type]}
            </div>
            <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-0.5">
                    System {type}
                </p>
                <p className="text-[13px] font-bold text-black leading-tight">
                    {message}
                </p>
            </div>
            <button
                onClick={() => onClose(id)}
                className="p-1 hover:bg-black/5 rounded-full transition-colors"
            >
                <X size={16} className="text-neutral-400" />
            </button>
        </motion.div>
    );
}

export function ToastContainer({ toasts, removeToast }: { toasts: any[], removeToast: (id: string) => void }) {
    return (
        <div className="fixed bottom-12 right-12 z-[100] flex flex-col gap-4 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <Toast
                            id={toast.id}
                            message={toast.message}
                            type={toast.type}
                            onClose={removeToast}
                        />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
}
