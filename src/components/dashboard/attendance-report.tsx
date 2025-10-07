'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const attendance = {
    absent: [
        { id: 1, name: 'Gordon Paucek', role: 'Finance', avatar: 'https://i.pravatar.cc/150?img=1', status: 'Absent' },
        { id: 2, name: 'Nora Kreiger', role: 'Product Manager', avatar: 'https://i.pravatar.cc/150?img=2', status: 'Sick' },
        { id: 3, name: 'Amber Wolf', role: 'UI/UX Designer', avatar: 'https://i.pravatar.cc/150?img=3', status: 'WFH' },
    ],
    present: [
        { id: 4, name: 'Alonzo Sauer', role: 'SQA', avatar: 'https://i.pravatar.cc/150?img=4', time: '08:22' },
    ]
}

const getBadgeClasses = (status: string) => {
    switch (status) {
      case 'Absent':
        return 'bg-red-100 text-red-800';
      case 'Sick':
        return 'bg-yellow-100 text-yellow-800';
      case 'WFH':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

export function AttendanceReport() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Attendance Report</CardTitle>
        <Button variant="link" size="sm">See All</Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <p className="text-xs text-muted-foreground mb-2 pb-2 border-b">Absent</p>
            <div className='pt-2'>
                {attendance.absent.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between py-2">
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
                      <Badge variant="outline" className={`font-semibold border-none text-xs rounded-md ${getBadgeClasses(employee.status)}`}>{employee.status}</Badge>
                  </div>
                ))}
            </div>
        </div>
        <div>
            <p className="text-xs text-muted-foreground mt-4 md:mt-0 mb-2 pb-2 border-b">Present</p>
            <div className='pt-2'>
                {attendance.present.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between py-2">
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
                      <div className="text-sm font-semibold text-green-600 bg-green-100 rounded-md px-2 py-1">{employee.time}</div>
                  </div>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
