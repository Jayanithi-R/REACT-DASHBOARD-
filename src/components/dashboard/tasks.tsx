"use client";

import type { Task } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar, MoreHorizontal } from 'lucide-react';

type TasksProps = {
  tasks: Task[];
};

export function Tasks({ tasks }: TasksProps) {
  const getTagColor = (tag: string) => {
    switch(tag.toLowerCase()) {
        case 'payroll': return 'bg-orange-100 text-orange-800';
        case 'recruitment': return 'bg-blue-100 text-blue-800';
        case 'urgent': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Task Today</CardTitle>
        <Button variant="ghost" size="sm">See All</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="space-y-2">
            <div className="flex items-start gap-4">
                <Checkbox id={`task-${task.id}`} className="mt-1" />
                <div className="flex-1">
                    <label htmlFor={`task-${task.id}`} className="font-medium">{task.title}</label>
                     <div className="flex items-center justify-between mt-1">
                        <div>
                             <Badge variant={task.status === 'Pending' ? 'warning' : 'success'} className={`capitalize ${task.status === "Completed" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>{task.status}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{task.date}</span>
                        </div>
                    </div>
                </div>
                 <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
