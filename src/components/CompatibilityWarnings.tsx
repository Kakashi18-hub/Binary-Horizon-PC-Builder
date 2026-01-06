'use client';

import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { IPart } from '@/models';

interface CompatibilityProps {
    selectedParts: Record<string, IPart | null>;
}

export default function CompatibilityWarnings({ selectedParts }: CompatibilityProps) {
    const warnings: string[] = [];
    const cpu = selectedParts.cpu;
    const mobo = selectedParts.motherboard;
    const psu = selectedParts.psu;

    if (cpu && mobo) {
        if (cpu.compatibility.socket !== mobo.compatibility.socket) {
            warnings.push(`Socket mismatch: ${cpu.brand} ${cpu.name} needs ${cpu.compatibility.socket}, but ${mobo.name} has ${mobo.compatibility.socket}.`);
        }
    }

    // Simplified PSU check
    if (psu) {
        const totalWattage = Object.values(selectedParts).reduce((acc, part) => acc + (part?.compatibility?.wattage || 0), 0);
        if ((psu.compatibility?.wattage || 0) < totalWattage + 100) {
            warnings.push(`Power supply might be insufficient. Total estimated draw: ${totalWattage}W.`);
        }
    }

    return (
        <div className={`p-4 rounded-2xl border ${warnings.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-center gap-3 mb-2">
                {warnings.length > 0 ? (
                    <AlertTriangle className="text-amber-600" size={20} />
                ) : (
                    <CheckCircle2 className="text-green-600" size={20} />
                )}
                <h4 className={`font-bold ${warnings.length > 0 ? 'text-amber-800' : 'text-green-800'}`}>
                    {warnings.length > 0 ? 'Compatibility Issues' : 'All parts compatible'}
                </h4>
            </div>
            {warnings.length > 0 && (
                <ul className="text-sm text-amber-700 space-y-1 list-disc ml-5">
                    {warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
            )}
        </div>
    );
}
