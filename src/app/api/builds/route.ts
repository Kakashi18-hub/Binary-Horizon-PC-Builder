import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Build } from '@/models';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const data = await req.json();

        // Map keys to their IDs if they are objects
        const parts: any = {};
        for (const [key, value] of Object.entries(data.parts)) {
            if (value && (value as any)._id) {
                parts[key] = (value as any)._id;
            }
        }

        const build = await Build.create({
            name: data.name || 'New Build',
            parts: parts,
            totalPrice: data.totalPrice,
        });

        return NextResponse.json({ id: build._id });
    } catch (error: any) {
        console.error('Error saving build:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const builds = await Build.find({}).sort({ createdAt: -1 }).limit(20);
        return NextResponse.json(builds);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
