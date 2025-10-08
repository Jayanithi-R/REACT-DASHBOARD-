'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export function TaskCard({ task }) {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-base font-medium">{task.title}</CardTitle>
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
  );
}
