'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { IPart } from '@/models';

interface BuildContextType {
    selectedParts: Record<string, IPart | null>;
    setSelectedParts: React.Dispatch<React.SetStateAction<Record<string, IPart | null>>>;
    totalPrice: number;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export function BuildProvider({ children }: { children: React.ReactNode }) {
    const [selectedParts, setSelectedParts] = useState<Record<string, IPart | null>>({
        cpu: null,
        motherboard: null,
        gpu: null,
        ram: null,
        storage: null,
        psu: null,
        case: null,
    });

    // Persistence
    useEffect(() => {
        const saved = localStorage.getItem('bh-current-build');
        if (saved) {
            try {
                setSelectedParts(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse saved build', e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('bh-current-build', JSON.stringify(selectedParts));
    }, [selectedParts]);

    const totalPrice = Object.values(selectedParts).reduce((acc, part) => acc + (part?.price || 0), 0);

    return (
        <BuildContext.Provider value={{ selectedParts, setSelectedParts, totalPrice }}>
            {children}
        </BuildContext.Provider>
    );
}

export function useBuild() {
    const context = useContext(BuildContext);
    if (context === undefined) {
        throw new Error('useBuild must be used within a BuildProvider');
    }
    return context;
}
