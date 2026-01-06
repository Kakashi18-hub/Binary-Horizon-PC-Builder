import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Part } from '@/models';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ type: string }> }
) {
    try {
        const { type } = await params;
        await dbConnect();
        const parts = await Part.find({ type });
        return NextResponse.json(parts);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
