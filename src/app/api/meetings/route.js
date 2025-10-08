import { NextResponse } from 'next/server';
import meetings from '@/lib/meetings.json';

export async function GET() {
  return NextResponse.json(meetings);
}