'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export function LeaveRequest({ leaveRequests, employees }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Leave Request</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {leaveRequests.map((request) => {
            const employee = employees.find(emp => emp.id === request.employeeId);
            return (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={employee.avatar} />
                            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-gray-500">{request.leaveType} ({request.days} days)</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-red-100 text-red-600 border-red-200 hover:bg-red-200">
                            <X className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-green-100 text-green-600 border-green-200 hover:bg-green-200">
                            <Check className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            );
        })}
      </CardContent>
    </Card>
  );
}
