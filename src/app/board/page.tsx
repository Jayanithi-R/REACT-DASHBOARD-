'use client';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function Board() {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-white rounded-lg">
                <h2 className="font-semibold mb-4 text-gray-500 text-sm">TO DO</h2>
                <div className="text-center p-6 border-dashed border-2 rounded-lg flex flex-col items-center">
                  <ReloadIcon className="w-16 h-16 text-blue-500 mb-4" />
                  <h3 className="font-semibold mb-2">Get started in the backlog</h3>
                  <p className="text-gray-500 text-sm mb-4">Plan and start a sprint to see work here.</p>
                  <Link href="/backlog" passHref>
                    <Button variant="outline">Go to Backlog</Button>
                  </Link>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h2 className="font-semibold mb-4 text-gray-500 text-sm">IN PROGRESS</h2>
                <div className="h-full min-h-[100px] border-dashed border-2 rounded-lg"></div>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h2 className="font-semibold mb-4 text-gray-500 text-sm">IN REVIEW</h2>
                <div className="h-full min-h-[100px] border-dashed border-2 rounded-lg"></div>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h2 className="font-semibold mb-4 text-gray-500 text-sm">DONE</h2>
                <div className="h-full min-h-[100px] border-dashed border-2 rounded-lg"></div>
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
