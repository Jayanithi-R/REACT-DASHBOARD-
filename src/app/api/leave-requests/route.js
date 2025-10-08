import { NextResponse } from 'next/server';
import leaveRequests from '@/lib/leave-requests.json';

export async function GET() {
  return NextResponse.json(leaveRequests);
}