
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
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
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-10 flex items-center h-20 px-4 sm:px-8">
            <DashboardHeader />
          </header>
          <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-5 max-w-[1600px] mx-auto">
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <AttendanceReport attendance={attendance} />
                  <Tasks tasks={tasks} />
                </div>
                <div>
                  <LeaveRequests leaveRequests={leaveRequests} />
                </div>
              </div>
              <div className="space-y-5">
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
