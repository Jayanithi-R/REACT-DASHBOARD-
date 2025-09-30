"use client";

import type { Task } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

type TasksProps = {
  tasks: Task[];
};

export function Tasks({ tasks }: TasksProps) {
  const getTagColor = (tag: string) => {
    switch(tag.toLowerCase()) {
        case 'payroll': return 'bg-orange-100 text-orange-800';
        case 'recruitment': return 'bg-blue-100 text-blue-800';
        case 'important': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Tasks</CardTitle>
        <Button variant="ghost" size="sm">+ Add</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="space-y-2">
            <div className="flex items-start gap-4">
                <Checkbox id={`task-${task.id}`} className="mt-1" />
                <div className="flex-1">
                    <label htmlFor={`task-${task.id}`} className="font-medium">{task.title}</label>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <div className="flex items-center justify-between mt-2">
                        <div>
                             <Badge variant={task.status === 'Pending' ? 'warning' : 'success'} className="mr-2">{task.status}</Badge>
                             <Badge className={`${getTagColor(task.tag)}`}>{task.tag}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{task.date}</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
