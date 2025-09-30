
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { AttendanceReport } from '@/components/dashboard/attendance-report';
import { Tasks } from '@/components/dashboard/tasks';
import { SchedulePanel } from '@/components/dashboard/schedule-panel';
import { LeaveRequests } from '@/components/dashboard/leave-requests';
import { attendance, leaveRequests, schedule, tasks, employees } from '@/lib/data';
import { InternshipCard } from '@/components/dashboard/internship-card';
import { StatsCard } from '@/components/dashboard/stats-card';

export default function Home() {
  const totalEmployees = employees.length;
  const totalOnLeave = employees.filter(e => e.status === 'On Leave').length;
  const activeInterns = 8;
  const newHires = 4;

  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-10 flex items-center h-20 px-4 border-b bg-background sm:px-8">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
            </div>
            <DashboardHeader />
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AttendanceReport attendance={attendance} />
                  <Tasks tasks={tasks} />
                </div>
                <LeaveRequests leaveRequests={leaveRequests} />
              </div>
              <div className="xl:col-span-1 flex flex-col gap-6">
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
