'use client';
import { Header } from '@/components/dashboard/header';
import { AttendanceReport } from '@/components/dashboard/attendance-report';
import { Schedule } from '@/components/dashboard/schedule';
import { Tasks } from '@/components/dashboard/tasks';
import { LeaveRequests } from '@/components/dashboard/leave-requests';
import { Internship } from '@/components/dashboard/internship';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full">
        <Header />
      </header>
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <AttendanceReport />
            <LeaveRequests />
          </div>
          <div className="space-y-6">
            <Schedule />
            <Tasks />
            <Internship />
          </div>
        </div>
      </main>
    </div>
  );
}
