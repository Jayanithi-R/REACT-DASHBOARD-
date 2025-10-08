import { NextResponse } from 'next/server';
import employees from '@/lib/employees.json';

export async function GET() {
  return NextResponse.json(employees);
}