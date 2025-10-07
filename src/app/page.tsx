'use client';
import { SidebarProvider, Sidebar, AppSidebar, SidebarInset } from '@/components/sidebar';
import { Header } from '@/components/dashboard/header';
import { AttendanceReport } from '@/components/dashboard/attendance-report';
import { Tasks } from '@/components/dashboard/tasks';
import { SchedulePanel } from '@/components/dashboard/schedule-panel';
import { LeaveRequests } from '@/components/dashboard/leave-requests';
import { attendance, leaveRequests, schedule, tasks } from '@/lib/data';
import { InternshipCard } from '@/components/dashboard/internship-card';

export default function Home() {
  return (
    <SidebarProvider>
        <Sidebar>
            <AppSidebar />
        </Sidebar>
        <SidebarInset>
            <div className="flex flex-col min-h-screen bg-gray-50">
                <header className="sticky top-0 z-10 w-full">
                    <Header />
                </header>
                <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1600px] mx-auto">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AttendanceReport attendance={attendance} />
                                <Tasks tasks={tasks} />
                            </div>
                            <div>
                                <LeaveRequests leaveRequests={leaveRequests} />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <SchedulePanel schedule={schedule} />
                            <InternshipCard />
                        </div>
                    </div>
                </main>
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
