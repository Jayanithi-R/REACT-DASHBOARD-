'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tasksData = [
  {
    title: "Update Payroll Records",
    description: "Verify salary adjustments and overtime lo...",
    status: "Pending",
    dueDate: "Today",
  },
  {
    title: "Interview with Sarah Lee",
    description: "Conduct candidate interview for Marketin...",
    tag: "Recruitment",
    dueDate: "Today",
  },
  {
    title: "Review Leave Applications",
    description: "Check pending leave requests and approv...",
    tag: "Important",
    dueDate: "Yesterday",
  },
];

export function Tasks() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Tasks</CardTitle>
        <Button variant="outline" size="sm">+ Add</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasksData.map((task, index) => (
            <div key={index} className="p-2 border rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{task.title}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${task.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : ''}`}>{task.status}</span>
              </div>
              <p className="text-sm text-gray-500">{task.description}</p>
              <div className="flex items-center justify-between mt-2">
                {task.tag && <span className={`px-2 py-1 text-xs rounded-full ${task.tag === 'Recruitment' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>{task.tag}</span>}
                <span className="text-sm text-gray-500">{task.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}