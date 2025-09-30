import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { AttendanceReport } from '@/components/dashboard/attendance-report';
import { Tasks } from '@/components/dashboard/tasks';
import { SchedulePanel } from '@/components/dashboard/schedule-panel';
import { LeaveRequests } from '@/components/dashboard/leave-requests';
import { attendance, leaveRequests, schedule, tasks, employees } from '@/lib/data';

export default function Home() {
  const onLeave = employees.filter((e) => e.status === 'On Leave').length;
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="bg-card">
        <AppSidebar />
      </Sidebar>
      <SidebarInset className="bg-background">
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-background sm:px-8">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <DashboardHeader />
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                  <AttendanceReport attendance={attendance} />
                  <Tasks tasks={tasks} />
                </div>
                <LeaveRequests leaveRequests={leaveRequests} />
              </div>
              <div className="lg:col-span-1">
                <SchedulePanel schedule={schedule} />
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
