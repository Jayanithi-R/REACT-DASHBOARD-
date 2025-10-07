import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const employee = {
    name: 'Maria Smith',
    position: 'Software Developer',
    employeeId: 'IM06587UT',
    joiningDate: '12 January 2015',
    department: 'Account',
    avatar: '/avatars/01.png',
};

const attendanceRecords = [
    { date: '22 OCT, 2020', checkIn: '05:51 am', checkOut: '12:01 pm', status: 'Present' },
    { date: '1 FEB, 2020', checkIn: '01:08 pm', checkOut: '05:49 pm', status: 'Present' },
    { date: '8 SEP, 2020', checkIn: '05:36 pm', checkOut: '11:23 pm', status: 'Leave' },
    { date: '21 SEP, 2020', checkIn: '11:49 pm', checkOut: '07:40 am', status: 'Present' },
    { date: '17 OCT, 2020', checkIn: '02:02 am', checkOut: '11:49 pm', status: 'Leave' },
    { date: '24 MAY, 2020', checkIn: '02:34 am', checkOut: '10:41 pm', status: 'Present' },
];

export function AttendancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Attendance</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={employee.avatar} />
                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">{employee.name}</p>
                <p className="text-sm text-gray-500">{employee.position}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Employee ID</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{employee.employeeId}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Joining Date</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{employee.joiningDate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Department</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{employee.department}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Average Working Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">08:00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average In Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">10:30 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Out Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">07:30 PM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Break Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">01:00</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceRecords.map((record) => (
                <TableRow key={record.date}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.checkIn}</TableCell>
                  <TableCell>{record.checkOut}</TableCell>
                  <TableCell>
                    <Badge
                      className={record.status === 'Present' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
