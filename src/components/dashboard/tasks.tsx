'use client';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus } from "lucide-react";

const tasks = [
    { id: 1, title: 'Update Payroll Records', description: 'Verify salary adjustments and overtime lo...', status: 'Pending', tag: 'Recruitment', date: 'Today' },
    { id: 2, title: 'Interview with Sarah Lee', description: 'Conduct candidate interview for Marketin...', status: 'Recruitment', tag: 'Recruitment', date: 'Today' },
    { id: 3, title: 'Review Leave Applications', description: 'Check pending leave requests and approv...', status: 'Important', tag: 'Recruitment', date: 'Yesterday' },
];

const getStatusBadgeClasses = (status: string) => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'Recruitment':
            return 'bg-blue-100 text-blue-800';
        case 'Important':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export function Tasks() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tasks</CardTitle>
        <Button variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" /> Add</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
            <div key={task.id} className="p-3 rounded-lg border bg-background">
                <h3 className="font-semibold text-sm mb-1">{task.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
                <div className="flex items-center justify-between">
                    <div>
                        <Badge variant="outline" className={`font-semibold border-none text-xs rounded-md ${getStatusBadgeClasses(task.status)}`}>{task.status}</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{task.date}</span>
                    </div>
                </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
