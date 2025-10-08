'use client';
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditTaskDialog } from './edit-task-dialog';
import { cn } from "@/lib/utils";

const priorityConfig = {
  High: "bg-red-500 text-white",
  Medium: "bg-yellow-500 text-white",
  Low: "bg-green-500 text-white",
};

const statusConfig = {
  Todo: "bg-gray-500 text-white",
  "In Progress": "bg-blue-500 text-white",
  Done: "bg-green-500 text-white",
};

export function TaskCard({ task, onUpdateTask }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="p-4 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">{task.title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsEditDialogOpen(true)}>Edit</Button>
        </CardHeader>
        <CardContent className="p-4 text-sm text-gray-600">
          <div className="flex justify-between items-center mb-2">
            {task.status && (
              <Badge className={cn("text-xs", statusConfig[task.status])}>
                {task.status}
              </Badge>
            )}
            {task.priority && (
              <Badge className={cn("text-xs", priorityConfig[task.priority])}>
                {task.priority}
              </Badge>
            )}
          </div>
          {task.assignee && (
            <p className="text-xs text-gray-500">Assigned to: {task.assignee}</p>
          )}
          {task.due_date && (
            <p className="text-xs text-gray-500">Due: {task.due_date}</p>
          )}
        </CardContent>
      </Card>
      <EditTaskDialog
        task={task}
        onUpdateTask={onUpdateTask}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </>
  );
}
