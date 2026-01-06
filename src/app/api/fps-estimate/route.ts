import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Part } from '@/models';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const cpuId = searchParams.get('cpuId');
    const gpuId = searchParams.get('gpuId');

    if (!cpuId || !gpuId) {
        return NextResponse.json({ error: 'Missing cpuId or gpuId' }, { status: 400 });
    }

    try {
        await dbConnect();
        const cpu = await Part.findById(cpuId);
        const gpu = await Part.findById(gpuId);

        if (!cpu || !gpu) {
            return NextResponse.json({ error: 'Components not found' }, { status: 404 });
        }

        // Tier estimation based on price (proxy for performance)
        const gpuTier = gpu.price > 80000 ? 3 : gpu.price > 40000 ? 2 : 1;
        const resolution = gpuTier === 3 ? '4K' : gpuTier === 2 ? '1440p' : '1080p';

        const estimates = [
            {
                game: 'Cyberpunk 2077',
                resolution,
                settings: 'Ultra / RT On',
                fps: Math.round((gpu.price / 1000) * (gpuTier === 3 ? 0.8 : 1.2))
            },
            {
                game: 'Modern Warfare III',
                resolution,
                settings: 'Extreme',
                fps: Math.round((gpu.price / 400) * 0.9)
            },
            {
                game: 'Valorant',
                resolution: '1080p',
                settings: 'Competitve',
                fps: Math.round((cpu.price / 100) * 1.5)
            },
            {
                game: 'Forza Horizon 5',
                resolution,
                settings: 'Extreme',
                fps: Math.round((gpu.price / 600) * 1.1)
            }
        ];

        return NextResponse.json(estimates);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
