import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { AttendancePage } from '@/components/attendance/attendance-page';

export default function Page() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-y-auto">
          <DashboardHeader />
          <main className="p-4 md:p-6">
            <AttendancePage />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
