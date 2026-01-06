'use client';

import React from 'react';
import { useBuild } from '@/context/BuildContext';
import { Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ImportBuildButton({ build }: { build: any }) {
    const { setSelectedParts } = useBuild();
    const router = useRouter();

    const handleImport = () => {
        const partsToImport: any = {
            cpu: build.parts.cpu || null,
            motherboard: build.parts.motherboard || null,
            gpu: build.parts.gpu || null,
            ram: build.parts.ram || null,
            storage: build.parts.storage || null,
            psu: build.parts.psu || null,
            case: build.parts.case || null,
        };

        setSelectedParts(partsToImport);
        router.push('/');
    };

    return (
        <button
            onClick={handleImport}
            className="flex items-center gap-2 px-8 py-4 bg-white text-black border-2 border-black rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all shadow-xl shadow-black/5"
        >
            <Download size={18} />
            Import Configuration to Builder
        </button>
    );
}
