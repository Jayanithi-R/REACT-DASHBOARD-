"use client";
import type { Attendance } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type AttendanceReportProps = {
  attendance: Attendance;
};

export function AttendanceReport({ attendance }: AttendanceReportProps) {
    const getBadgeVariant = (status: string) => {
        switch (status) {
            case 'Absent': return 'destructive';
            case 'Sick': return 'warning';
            case 'WFH': return 'info';
            default: return 'secondary';
        }
    }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Attendance Report</CardTitle>
        <Button variant="ghost" size="sm">See All</Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Absent</h3>
          <div className="space-y-4">
            {attendance.absent.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-muted-foreground">{employee.role}</p>
                  </div>
                </div>
                <Badge variant={getBadgeVariant(employee.status)}>{employee.status}</Badge>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Present</h3>
          <div className="space-y-4">
            {attendance.present.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-muted-foreground">{employee.role}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">{employee.time}</Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
