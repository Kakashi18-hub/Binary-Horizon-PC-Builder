'use client';

import { useState, useEffect } from 'react';
import PartCard from './PartCard';
import { IPart } from '@/models';

interface PartSelectProps {
    type: string;
    selectedPartId?: string;
    onSelect: (part: IPart) => void;
}

export default function PartSelect({ type, selectedPartId, onSelect }: PartSelectProps) {
    const [parts, setParts] = useState<IPart[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchParts() {
            setLoading(true);
            try {
                const res = await fetch(`/api/parts/${type}`);
                const data = await res.json();
                setParts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchParts();
    }, [type]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-40 bg-neutral-100 rounded-2xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parts.map((part: any) => (
                <PartCard
                    key={part._id}
                    part={part}
                    isSelected={(part as any)._id === selectedPartId}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}
