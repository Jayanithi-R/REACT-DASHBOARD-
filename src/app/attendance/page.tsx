'use client';
import { Header } from '@/components/dashboard/header';
import { AttendancePage } from '@/components/attendance/attendance-page';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 w-full">
            <Header />
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
            <AttendancePage />
        </main>
    </div>
  );
}
