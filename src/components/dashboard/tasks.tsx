"use client";

import type { Task } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckSquare, MoreHorizontal, Plus } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';

type TasksProps = {
  tasks: Task[];
};

export function Tasks({ tasks }: TasksProps) {
  const getTagColor = (tag: string) => {
    switch(tag.toLowerCase()) {
        case 'payroll': return 'text-orange-600 bg-orange-100 border-transparent';
        case 'recruitment': return 'text-blue-600 bg-blue-100 border-transparent';
        case 'important': return 'text-red-600 bg-red-100 border-transparent';
        default: return 'bg-gray-100 text-gray-800';
    }
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className='flex items-center gap-2'>
            <CheckSquare className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">Tasks</CardTitle>
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-0 pt-4 px-0">
        {tasks.map((task, index) => (
          <div key={task.id}>
            <div  className="flex items-start gap-3 p-4">
              <Checkbox id={`task-${task.id}`} className="mt-1" checked={task.status === 'Completed'} />
              <div className="flex-1">
                  <label htmlFor={`task-${task.id}`} className="font-medium text-sm">{task.title}</label>
                  <p className="text-xs text-muted-foreground">{task.description}</p>
                   <div className="flex items-center justify-between mt-2">
                      <div>
                           <Badge variant="outline" className={`font-normal text-xs ${getTagColor(task.tag)}`}>{task.tag}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{task.date}</span>
                      </div>
                  </div>
              </div>
               <Button variant="ghost" size="icon" className="w-8 h-8 -mr-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            {index < tasks.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
