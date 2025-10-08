import { NextResponse } from 'next/server';
import interns from '@/lib/interns.json';

export async function GET() {
  return NextResponse.json(interns);
}