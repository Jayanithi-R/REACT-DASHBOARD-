'use client';

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { BarChart, CheckCircle, Edit, List, Calendar, Maximize2, ArrowLeft, MoreHorizontal, Plus, Search, ChevronDown, ChevronRight, User, Check, GitCommit, Book, Bookmark, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Activity {
  id: string;
  summary: string;
  timestamp: Date;
  creator: string;
}

// Hardcoded user for demonstration
const currentUser = "JAYANITHI R MTECH CSE";
const userInitial = "JC";

export default function SchedulePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("summary");
  const [recentActivity, setRecentActivity] = useState<Activity[]>([
    {
      id: 'SCRUM-1',
      summary: 'jjhjjji',
      timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
      creator: 'JAYANITHI R MTECH CSE'
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const summaryInput = form.elements.namedItem("summary") as HTMLInputElement;
    if (summaryInput && summaryInput.value) {
      const newActivity: Activity = {
        id: `SCRUM-${recentActivity.length + 1}`,
        summary: summaryInput.value,
        timestamp: new Date(),
        creator: currentUser,
      };
      setRecentActivity([newActivity, ...recentActivity]);
      summaryInput.value = '';
      setIsDialogOpen(false);
    }
  };

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (new Date().getDate() - date.getDate() === 1) return "Yesterday";
    let interval = seconds / 3600;
    if (interval > 1) return `about ${Math.floor(interval)} hours ago`;
    interval = seconds / 60;
    if (interval > 1) return `${Math.floor(interval)} minutes ago`;
    return `${Math.floor(seconds)} seconds ago`;
  };

  const totalWorkItems = recentActivity.length;
  const createdLast7Days = recentActivity.filter(a => (new Date().getTime() - a.timestamp.getTime()) < 7 * 24 * 60 * 60 * 1000).length;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4"><Button variant="ghost" size="icon" onClick={() => router.back()}><ArrowLeft /></Button><h1 className="text-2xl font-bold">Schedule</h1></div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}><DialogTrigger asChild><Button>Create</Button></DialogTrigger><DialogContent className="sm:max-w-[425px]"><DialogHeader><DialogTitle>Create work item</DialogTitle></DialogHeader><form onSubmit={handleCreate} className="grid gap-4 py-4"><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="summary-dialog" className="text-right">Summary</Label><Input id="summary-dialog" name="summary" className="col-span-3" /></div><DialogFooter><Button type="submit">Create</Button></DialogFooter></form></DialogContent></Dialog>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="summary">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="backlog">Backlog</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
        </TabsList>

        {/* SUMMARY TAB */}
        <TabsContent value="summary" className="space-y-6 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"><div className="border rounded-lg p-4 flex items-center gap-4"><CheckCircle className="text-gray-500" /><div><p className="text-2xl font-bold">0 completed</p><p className="text-sm text-gray-500">in the last 7 days</p></div></div><div className="border rounded-lg p-4 flex items-center gap-4"><Edit className="text-gray-500" /><div><p className="text-2xl font-bold">1 updated</p><p className="text-sm text-gray-500">in the last 7 days</p></div></div><div className="border rounded-lg p-4 flex items-center gap-4"><List className="text-gray-500" /><div><p className="text-2xl font-bold">{createdLast7Days} created</p><p className="text-sm text-gray-500">in the last 7 days</p></div></div><div className="border rounded-lg p-4 flex items-center gap-4"><Calendar className="text-gray-500" /><div><p className="text-2xl font-bold">0 due soon</p><p className="text-sm text-gray-500">in the next 7 days</p></div></div></div>
          <div className="grid gap-6 md:grid-cols-2"><div className="border rounded-lg p-4 flex flex-col justify-between"><div><h2 className="text-lg font-semibold">Status overview</h2><p className="text-sm text-muted-foreground">Get a snapshot of the status of your work items. <a href="#" className="text-sm text-blue-500 hover:underline">View all work items</a></p></div><div className="flex items-center justify-center my-4"><div className="relative w-40 h-40"><svg className="w-full h-full" viewBox="0 0 36 36"><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eee" strokeWidth="3" /><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="100, 100" /></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><p className="text-3xl font-bold">{totalWorkItems}</p><p className="text-sm text-muted-foreground">Total work items</p></div></div><div className="ml-8"><div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500"></div><p>To Do: {totalWorkItems}</p></div></div></div></div><div className="border rounded-lg p-4"><div className="flex justify-between items-center"><h2 className="text-lg font-semibold">Recent activity</h2><Maximize2 className="text-gray-500" /></div><p className="text-sm text-muted-foreground">Stay up to date with what's happening across the project.</p><div className="mt-4 space-y-4">{recentActivity.map((activity, index) => (<div key={activity.id}><p className="text-sm font-semibold text-gray-500">{index === 0 ? timeAgo(activity.timestamp) : ""}</p><div className="flex items-start gap-3 mt-2"><Avatar className="h-8 w-8"><AvatarFallback className="bg-green-500 text-white">{userInitial}</AvatarFallback></Avatar><div><p className="text-sm text-muted-foreground"><span className="font-semibold text-primary">{activity.creator}</span> created <span className="text-primary">{activity.id}</span>: {activity.summary} <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">TO DO</span></p><p className="text-xs text-gray-500">{timeAgo(activity.timestamp)}</p></div></div></div>))}</div></div></div>
          <div className="grid gap-6 md:grid-cols-2"><div className="border rounded-lg p-4"><h2 className="text-lg font-semibold">Priority breakdown</h2><p className="text-sm text-muted-foreground">Get a holistic view of how work is being prioritized. <a href="#" className="text-sm text-blue-500 hover:underline">See what your team's been focusing on</a></p><div className="h-40 mt-4 flex items-end justify-center"><BarChart className="w-full h-full text-gray-300"/></div></div><div className="border rounded-lg p-4"><h2 className="text-lg font-semibold">Types of work</h2><p className="text-sm text-muted-foreground">Get a breakdown of work items by their types. <a href="#" className="text-sm text-blue-500 hover:underline">View all items</a></p><div className="mt-4 space-y-2"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Check className="text-blue-500" size={16}/><span>Task</span></div><div className="w-1/2 bg-gray-200 rounded-full h-2.5"><div className="bg-blue-500 h-2.5 rounded-full" style={{width: "100%"}}></div></div></div><div className="flex items-center justify-between"><div className="flex items-center gap-2"><GitCommit className="text-purple-500" size={16}/><span>Epic</span></div><div className="w-1/2 bg-gray-200 rounded-full h-2.5"></div></div><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Book className="text-green-500" size={16}/><span>Story</span></div><div className="w-1/2 bg-gray-200 rounded-full h-2.5"></div></div><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Bookmark className="text-yellow-500" size={16}/><span>Subtask</span></div><div className="w-1/2 bg-gray-200 rounded-full h-2.5"></div></div></div></div></div>
        </TabsContent>

        {/* BACKLOG TAB */}
        <TabsContent value="backlog" className="pt-4"><div className="space-y-4"><div className="flex justify-between items-center"><div className="flex items-center space-x-2"><Search className="text-gray-400" /><Input placeholder="Search backlog" className="w-64" /></div><div className="flex items-center space-x-2"><Button variant="outline">Filter</Button><Button variant="outline">View</Button><MoreHorizontal className="h-5 w-5 text-gray-500" /></div></div><div className="space-y-4"><div className="p-4 bg-white rounded-lg border"><div className="flex justify-between items-center"><div className="flex items-center space-x-2"><ChevronDown className="h-5 w-5" /><h2 className="font-semibold">SCRUM Sprint 1 ({totalWorkItems} work item{totalWorkItems !== 1 ? 's' : ''})</h2></div><div className="flex items-center space-x-2"><Button variant="outline">Start sprint</Button><MoreHorizontal className="h-5 w-5 text-gray-500" /></div></div><div className="mt-4 space-y-2">{recentActivity.map((activity) => (<div key={activity.id} className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50"><div className="flex items-center space-x-2"><Checkbox id={activity.id} /><label htmlFor={activity.id} className="font-medium text-sm">{activity.id}: {activity.summary}</label></div><div className="flex items-center space-x-4"><Button variant="outline" size="sm" className="bg-gray-200">TO DO</Button><User className="h-5 w-5 text-gray-500" /></div></div>))}</div><div className="mt-2"><Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(true)}><Plus className="h-4 w-4 mr-2" />Create</Button></div></div><div className="p-4 bg-white rounded-lg border"><div className="flex justify-between items-center"><div className="flex items-center space-x-2"><ChevronRight className="h-5 w-5" /><h2 className="font-semibold">Backlog (0 work items)</h2></div><Button>Create sprint</Button></div><div className="mt-4 text-center text-gray-500 border-2 border-dashed border-gray-300 p-6 rounded-lg"><p>Your backlog is empty.</p></div><div className="mt-2"><Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(true)}><Plus className="h-4 w-4 mr-2" />Create</Button></div></div></div></div></TabsContent>

        {/* BOARD TAB */}
        <TabsContent value="board" className="pt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2"><Search className="text-gray-400" /><Input placeholder="Search board" className="w-64" /></div>
            <div className="flex items-center space-x-2"><Button variant="outline">Group</Button><Button variant="outline">Filter</Button><MoreHorizontal className="h-5 w-5 text-gray-500" /></div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-100 rounded-lg p-4"><h3 className="font-semibold">TO DO</h3><div className="mt-4 bg-white rounded-lg p-6 text-center"><RefreshCw className="mx-auto text-blue-500 h-12 w-12" />
                <h4 className="mt-4 font-semibold">Get started in the backlog</h4><p className="mt-2 text-sm text-gray-500">Plan and start a sprint to see work here.</p><Button className="mt-4" onClick={() => setActiveTab("backlog")}>Go to Backlog</Button></div></div>
            <div className="bg-gray-100 rounded-lg p-4"><h3 className="font-semibold">IN PROGRESS</h3></div>
            <div className="bg-gray-100 rounded-lg p-4"><h3 className="font-semibold">IN REVIEW</h3></div>
            <div className="bg-gray-100 rounded-lg p-4"><h3 className="font-semibold">DONE</h3></div>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
