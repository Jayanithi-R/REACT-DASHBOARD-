'use client';
import { AppSidebar, Sidebar, SidebarProvider, SidebarInset } from "@/components/sidebar";
import { Header } from '@/components/dashboard/header';
import { SchedulePageContent } from '@/components/schedule/page-content';

export default function Page() {
  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-10 w-full">
            <Header />
          </header>
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
            <SchedulePageContent />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
