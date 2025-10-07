
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';
import { BarChart, CheckCircle, Edit, List, Calendar, Maximize2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function SchedulePage() {
  const router = useRouter();
  const [recentActivity, setRecentActivity] = useState([]);

  const handleCreate = (event) => {
    event.preventDefault();
    const summary = event.target.summary.value;
    if (summary) {
      const newActivity = {
        id: `SCRUM-${recentActivity.length + 1}`,
        summary,
        timestamp: new Date(),
      };
      setRecentActivity([newActivity, ...recentActivity]);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold">Schedule</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Create schedule</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new schedule item.
              </DialogDescription>
            </DialogHeader>
            <div className='overflow-y-auto'>
            <form onSubmit={handleCreate} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project" className="text-right">
                  Project
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scrum">My Scrum Project (SCRUM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="work-type" className="text-right">
                  Work type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a work type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="task">Task</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="summary" className="text-right">
                  Summary
                </Label>
                <Input id="summary" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignee" className="text-right">
                  Assignee
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select an assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medium">Medium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="parent" className="text-right">
                  Parent
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a parent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="due-date" className="text-right">
                  Due date
                </Label>
                <div className="col-span-3 flex items-center border rounded-md">
                  <Input id="due-date" type="text" placeholder="dd-mm-yyyy" className="border-0" />
                  <Calendar className="mr-2" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="labels" className="text-right">
                  Labels
                </Label>
                <Input id="labels" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="team" className="text-right">
                  Team
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Choose a team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start-date" className="text-right">
                  Start date
                </Label>
                <Input id="start-date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sprint" className="text-right">
                  Sprint
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a sprint" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="story-points" className="text-right">
                  Story point estimate
                </Label>
                <Input id="story-points" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reporter" className="text-right">
                  Reporter
                </Label>
                <Input id="reporter" value="JAYANITHI R MTECH CSE" disabled className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="linked-work" className="text-right">
                  Linked Work items
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a linked work item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter className="sticky bottom-0 bg-background py-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="attachment-input" className="cursor-pointer">
                    <Button asChild>
                      <span>Choose File</span>
                    </Button>
                    <Input id="attachment-input" type="file" className="sr-only" />
                  </Label>
                  <Button type="submit">Create</Button>
                </div>
              </DialogFooter>
            </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="summary">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="backlog">Backlog</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="border rounded-lg p-4 flex items-center gap-4">
              <CheckCircle className="text-gray-500" />
              <div>
                <p className="text-2xl font-bold">0 completed</p>
                <p className="text-sm text-gray-500">in the last 7 days</p>
              </div>
            </div>
            <div className="border rounded-lg p-4 flex items-center gap-4">
              <Edit className="text-gray-500" />
              <div>
                <p className="text-2xl font-bold">1 updated</p>
                <p className="text-sm text-gray-500">in the last 7 days</p>
              </div>
            </div>
            <div className="border rounded-lg p-4 flex items-center gap-4">
              <List className="text-gray-500" />
              <div>
                <p className="text-2xl font-bold">{recentActivity.length} created</p>
                <p className="text-sm text-gray-500">in the last 7 days</p>
              </div>
            </div>
            <div className="border rounded-lg p-4 flex items-center gap-4">
              <Calendar className="text-gray-500" />
              <div>
                <p className="text-2xl font-bold">0 due soon</p>
                <p className="text-sm text-gray-500">in the next 7 days</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Status overview</h2>
                <a href="#" className="text-sm text-blue-500">View all work items</a>
              </div>
              <div className="flex items-center justify-center mt-4">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-3xl font-bold">{recentActivity.length}</p>
                  </div>
                </div>
                <div className="ml-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500"></div>
                    <p>To Do: {recentActivity.length}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Recent activity</h2>
                <Maximize2 className="text-gray-500" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Today</p>
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-2 mt-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      JC
                    </div>
                    <div>
                      <p>JAYANITHI R MTECH CSE <span className="text-gray-500">created</span> {activity.id}: {activity.summary} <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">TO DO</span></p>
                      <p className="text-sm text-gray-500">{Math.round((new Date() - activity.timestamp) / 60000)} minutes ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Priority breakdown</h2>
                <a href="#" className="text-sm text-blue-500">See what your team's been focusing on</a>
              </div>
              <div className="mt-4">
                <BarChart className="w-full h-40" />
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold">Types of work</h2>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <p>Task</p>
                  <div className="w-1/2 bg-gray-300 rounded-full h-4">
                    <div className="bg-blue-500 h-4 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p>Epic</p>
                  <div className="w-1/2 bg-gray-300 rounded-full h-4"></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p>Story</p>
                  <div className="w-1/2 bg-gray-300 rounded-full h-4"></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p>Subtask</p>
                  <div className="w-1/2 bg-gray-300 rounded-full h-4"></div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="backlog">
          Backlog content goes here.
        </TabsContent>
        <TabsContent value="board">
          Board content goes here.
        </TabsContent>
      </Tabs>
    </div>
  );
}
