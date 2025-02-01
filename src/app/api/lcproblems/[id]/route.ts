// app/api/problems/[id]/route.ts
import { connectDB } from '@/lib/db';
import { LCProblem } from '@/models/LCProblem';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400 });
        }

        const problem = await LCProblem.findById(id).lean() as any;

        if (!problem) {
            return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
        }

        const problemData = {
            ...problem,
            _id: (problem as any)._id.toString(),
        };

        return NextResponse.json(problemData);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch problem' },
            { status: 500 }
        );
    }
}