'use client';

import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutGrid,
  Calendar,
  Users,
  Briefcase,
  FileText,
  Settings,
  HelpCircle,
  ChevronRight,
  LogOut,
  Bell,
  BarChart,
  GitBranch,
  Dot,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "./ui/button";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M12.378 1.602a.75.75 0 00-.756 0L3.366 6.166A.75.75 0 003 6.821v10.358c0 .32.18.601.458.715l8.256 3.44c.252.105.548.105.8 0l8.256-3.44a.75.75 0 00.458-.715V6.822a.75.75 0 00-.366-.655L12.378 1.602zM12 15.195a.75.75 0 00.732-.563l1.241-4.344a.75.75 0 10-1.464-.418l-.83 2.905-.83-2.905a.75.75 0 00-1.464.418l1.24 4.344A.75.75 0 0012 15.195z" />
              </svg>
            </div>
          <div className="flex flex-col">
            <h2 className="text-base font-semibold">HRsync</h2>
            <p className="text-xs text-muted-foreground">HR Management</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2">MAIN</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/">
                    <SidebarMenuButton isActive={pathname === '/'}>
                        <LayoutGrid />
                        Dashboard
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/schedule">
                    <SidebarMenuButton isActive={pathname === '/schedule'}>
                        <Calendar />
                        Schedule
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/attendance">
                <SidebarMenuButton isActive={pathname === '/attendance'}>
                  <Users />
                  Attendance
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/backlog">
                    <SidebarMenuButton isActive={pathname === '/backlog'}>
                        <Briefcase />
                        Backlog
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton>
                <GitBranch />
                Integrations
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BarChart />
                Reports
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2">SHORTCUTS</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="justify-between">
                 <div className="flex items-center gap-2">
                    <Dot className="text-green-500 w-5 h-5" /> New Hire Onboarding
                 </div>
                 <Badge variant="secondary" className="h-5">1</Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="justify-between">
                <div className="flex items-center gap-2">
                    <Dot className="text-red-500 w-5 h-5" /> Leave Requests
                 </div>
                 <Badge variant="secondary" className="h-5">2</Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="justify-between">
                <div className="flex items-center gap-2">
                    <Dot className="text-yellow-500 w-5 h-5" /> Performance Reviews
                 </div>
                 <Badge variant="secondary" className="h-5">3</Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
         <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                 <HelpCircle />
                Help Center
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        <SidebarSeparator />
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userAvatar?.imageUrl} alt="Juwita" />
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">Juwita</p>
              <p className="text-xs text-muted-foreground">juvv@hr-mikom.com</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </SidebarFooter>
    </>
  );
}
