"use client";

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
  LayoutDashboard,
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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function AppSidebar() {
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-dollar-sign"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4h-6"/><path d="M12 18V6"/></svg>
            </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">HRsync</h2>
            <p className="text-xs text-muted-foreground">HR Management</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel>MAIN</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Calendar />
                Schedule
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Users />
                Attendance
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Briefcase />
                Departments
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 22h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2"/><path d="M12 18v-5"/><path d="M12 8V6"/><path d="m9 11 3-3 3 3"/></svg>
                Integrations
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FileText />
                Reports
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>SHORTCUTS</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
                New Hire Onboarding
                <Badge variant="secondary" className="ml-auto">1</Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                 <span className="w-2 h-2 mr-2 bg-red-500 rounded-full"></span>
                Leave Requests
                <Badge variant="secondary" className="ml-auto">2</Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <span className="w-2 h-2 mr-2 bg-yellow-500 rounded-full"></span>
                Performance Reviews
                <Badge variant="secondary" className="ml-auto">3</Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2">
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
              <p className="font-semibold">Juwita</p>
              <p className="text-xs text-muted-foreground">juvv@hr-mikom.com</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </SidebarFooter>
    </>
  );
}
