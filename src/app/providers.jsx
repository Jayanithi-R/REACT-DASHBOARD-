'use client';
import { SidebarProvider, Sidebar, AppSidebar, SidebarInset } from '@/components/sidebar';

export function AppProviders({ children }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
