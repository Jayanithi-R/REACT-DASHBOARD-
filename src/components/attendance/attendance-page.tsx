import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

type AttendanceStatus = 'Present' | 'On Leave';
type LeaveType = 'Annual Leave' | 'Sick Leave';
type LeaveStatus = 'Approved' | 'Pending' | 'Rejected';

interface Employee {
  id: string;
  name: string;
  avatar: string;
  status: AttendanceStatus;
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: LeaveType;
  from: string;
  to: string;
  status: LeaveStatus;
}

const employees: Employee[] = [
  { id: 'IM06587UT', name: 'Maria Smith', avatar: '/avatars/01.png', status: 'Present' },
  { id: 'IM06587UV', name: 'John Doe', avatar: '/avatars/02.png', status: 'On Leave' },
  { id: 'IM06587UW', name: 'Jane Doe', avatar: '/avatars/03.png', status: 'Present' },
  { id: 'IM06587UX', name: 'Peter Jones', avatar: '/avatars/04.png', status: 'On Leave' },
  { id: 'IM06587UY', name: 'User 1', avatar: '/avatars/05.png', status: 'Present' },
];

let leaveRequests: LeaveRequest[] = [
  { id: 'lr1', employeeId: 'IM06587UV', leaveType: 'Annual Leave', from: '2024-07-29', to: '2024-07-30', status: 'Approved' },
  { id: 'lr2', employeeId: 'IM06587UX', leaveType: 'Sick Leave', from: '2024-07-29', to: '2024-07-29', status: 'Pending' },
  { id: 'lr3', employeeId: 'IM06587UT', leaveType: 'Annual Leave', from: '2024-08-05', to: '2024-08-10', status: 'Rejected' },
];

const getStatusBadgeClass = (status: AttendanceStatus | LeaveStatus) => {
  switch (status) {
    case 'Present': return 'bg-green-500 text-white';
    case 'On Leave': return 'bg-yellow-500 text-white';
    case 'Approved': return 'bg-green-500 text-white';
    case 'Pending': return 'bg-yellow-500 text-white';
    case 'Rejected': return 'bg-red-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const updateLeaveStatus = (leaveId: string, newStatus: LeaveStatus) => {
  const request = leaveRequests.find(r => r.id === leaveId);
  if (request) {
    request.status = newStatus;
    console.log(`Leave request ${leaveId} status updated to ${newStatus}`);
    if (newStatus === 'Approved') {
      console.log(`Updating dashboard for employee ${request.employeeId}. Status: Absent`);
    }
  }
};

export function AttendancePage() {
  return (
    <div className="space-y-4 p-2 sm:p-4 md:p-6">
        <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold">Attendance</h1>
            <div className="block sm:hidden">
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                </Button>
            </div>
        </div>
      <Tabs defaultValue="all">
        <TabsList className="block sm:inline-block whitespace-nowrap overflow-x-auto">
          <TabsTrigger value="all">All Employees</TabsTrigger>
          <TabsTrigger value="leave-requests">Leave Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <EmployeeTable employees={employees} />
        </TabsContent>
        <TabsContent value="leave-requests">
          <LeaveRequestTable leaveRequests={leaveRequests} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmployeeTable({ employees }: { employees: Employee[] }) {
  return (
    <Card>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead className="hidden sm:table-cell">Employee ID</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={employee.avatar} />
                      <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{employee.name}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{employee.id}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClass(employee.status)}>
                    {employee.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function LeaveRequestTable({ leaveRequests }: { leaveRequests: LeaveRequest[] }) {
    const getEmployee = (employeeId: string) => employees.find(e => e.id === employeeId);

    return (
        <Card>
            <CardContent className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead className="hidden sm:table-cell">Leave Type</TableHead>
                            <TableHead className="hidden md:table-cell">From</TableHead>
                            <TableHead className="hidden md:table-cell">To</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaveRequests.map((request) => {
                            const employee = getEmployee(request.employeeId);
                            return (
                                <TableRow key={request.id}>
                                    <TableCell>
                                        {employee && (
                                            <div className="flex items-center space-x-2">
                                                <Avatar>
                                                    <AvatarImage src={employee.avatar} />
                                                    <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{employee.name}</span>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{request.leaveType}</TableCell>
                                    <TableCell className="hidden md:table-cell">{request.from}</TableCell>
                                    <TableCell className="hidden md:table-cell">{request.to}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusBadgeClass(request.status)}>
                                            {request.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => updateLeaveStatus(request.id, 'Approved')}>Approved</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateLeaveStatus(request.id, 'Pending')}>Pending</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateLeaveStatus(request.id, 'Rejected')}>Rejected</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
