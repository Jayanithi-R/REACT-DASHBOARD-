import { NextResponse } from 'next/server';
import tasks from '@/lib/tasks.json';

export async function GET() {
  return NextResponse.json(tasks);
}