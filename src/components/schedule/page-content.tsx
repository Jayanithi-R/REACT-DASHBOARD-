
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { CheckCircle, Edit, PlusCircle, Calendar, MoreHorizontal, Plus, Search, ChevronDown, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CreateDialog } from "./create-dialog";

export function SchedulePageContent() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Schedule</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <CreateDialog />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">0 completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">in the last 7 days</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">1 updated</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">in the last 7 days</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">1 created</CardTitle>
            <PlusCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">in the last 7 days</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">0 due soon</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">in the next 7 days</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Status overview</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Status overview chart */}
            <div className="h-48 w-full bg-muted" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Recent activity */}
            <div className="h-48 w-full bg-muted" />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Priority breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Priority breakdown chart */}
            <div className="h-48 w-full bg-muted" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Types of work</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Types of work chart */}
            <div className="h-48 w-full bg-muted" />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Team workload</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Team workload chart */}
            <div className="h-48 w-full bg-muted" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Epic progress</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Epic progress */}
            <div className="h-48 w-full bg-muted" />
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Input placeholder="Search backlog" className="w-64" />
          <Button variant="outline">Filter</Button>
          </div>
          </div>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ChevronDown className="h-5 w-5" />
              <h2 className="font-semibold">SCRUM Sprint 1 (1 work item)</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">Start sprint</Button>
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between p-2 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox id="task1" />
                <label htmlFor="task1" className="font-medium">jjhjjjji</label>
              </div>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">TO DO</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>In Progress</DropdownMenuItem>
                    <DropdownMenuItem>Done</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <User className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <Button variant="ghost" size="sm"><Plus className="h-4 w-4 mr-2" />Create</Button>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ChevronRight className="h-5 w-5" />
              <h2 className="font-semibold">Backlog (0 work items)</h2>
            </div>
            <Button>Create sprint</Button>
          </div>
          <div className="mt-4 text-center text-gray-500 border-2 border-dashed border-gray-300 p-6 rounded-lg">
            <p>Your backlog is empty.</p>
          </div>
          <div className="mt-2">
            <Button variant="ghost" size="sm"><Plus className="h-4 w-4 mr-2" />Create</Button>
          </div>
        </div>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-white rounded-lg">
            <h2 className="font-semibold mb-4 text-gray-500 text-sm">TO DO</h2>
            <div className="text-center p-6 border-dashed border-2 rounded-lg flex flex-col items-center">
              <ReloadIcon className="w-16 h-16 text-blue-500 mb-4" />
              <h3 className="font-semibold mb-2">Get started in the backlog</h3>
              <p className="text-gray-500 text-sm mb-4">Plan and start a sprint to see work here.</p>
              <Link href="/backlog">
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
    </div>
  );
}

function FilterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
