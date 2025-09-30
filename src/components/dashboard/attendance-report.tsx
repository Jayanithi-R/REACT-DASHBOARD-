"use client";
import type { Attendance } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Users2 } from 'lucide-react';
import { Separator } from '../ui/separator';

type AttendanceReportProps = {
  attendance: Attendance;
};

export function AttendanceReport({ attendance }: AttendanceReportProps) {
    const getBadgeVariant = (status: string): "destructive" | "warning" | "info" | "secondary" => {
        switch (status) {
            case 'Absent': return 'destructive';
            case 'Sick': return 'warning';
            case 'WFH': return 'info';
            default: return 'secondary';
        }
    }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className='flex items-center gap-2'>
            <Users2 className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">Attendance Report</CardTitle>
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <p className="text-xs text-muted-foreground mb-2">Absent</p>
            <div className="space-y-3">
                {attendance.absent.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={employee.avatar} alt={employee.name} />
                        <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">{employee.role}</p>
                    </div>
                    </div>
                    <Badge variant={getBadgeVariant(employee.status)} className="font-normal">{employee.status}</Badge>
                </div>
                ))}
            </div>
        </div>
        <Separator />
        <div>
            <p className="text-xs text-muted-foreground mb-2">Present</p>
            <div className="space-y-3">
                {attendance.present.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={employee.avatar} alt={employee.name} />
                        <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">{employee.role}</p>
                    </div>
                    </div>
                    <Badge variant="secondary" className="text-green-600 bg-green-100 font-mono text-sm">{employee.time}</Badge>
                </div>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
