'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu, Plus } from 'lucide-react';
import { useAttendance } from '@/hooks/use-attendance';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from 'react';

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Present': return 'bg-green-500 text-white';
    case 'On Leave': return 'bg-yellow-500 text-white';
    case 'Approved': return 'bg-green-500 text-white';
    case 'Pending': return 'bg-yellow-500 text-white';
    case 'Rejected': return 'bg-red-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

export function AttendancePageComponent() {
  const { employees, leaveRequests, updateLeaveStatus, addLeaveRequest } = useAttendance();
  const [open, setOpen] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState({ leaveType: '', from: '', to: '', reason: '' });

  const handleAddLeaveRequest = () => {
    const newRequest = {
        id: leaveRequests.length + 1,
        employeeId: 'EMP001', // Assuming the current user is EMP001
        ...leaveDetails,
        status: 'Pending'
    };
    addLeaveRequest(newRequest);
    setOpen(false);
    setLeaveDetails({ leaveType: '', from: '', to: '', reason: '' });
  }

  return (
    <div className="space-y-4 p-2 sm:p-4 md:p-6">
        <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold">Attendance</h1>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4 mr-2" />Create Request</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Leave Request</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Leave Type" value={leaveDetails.leaveType} onChange={(e) => setLeaveDetails({...leaveDetails, leaveType: e.target.value})} />
                  <div className="flex space-x-2">
                    <Input type="date" placeholder="From" value={leaveDetails.from} onChange={(e) => setLeaveDetails({...leaveDetails, from: e.target.value})} />
                    <Input type="date" placeholder="To" value={leaveDetails.to} onChange={(e) => setLeaveDetails({...leaveDetails, to: e.target.value})} />
                  </div>
                  <Textarea placeholder="Reason" value={leaveDetails.reason} onChange={(e) => setLeaveDetails({...leaveDetails, reason: e.target.value})} />
                </div>
                <DialogFooter>
                  <Button onClick={handleAddLeaveRequest}>Submit Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
          <LeaveRequestTable employees={employees} leaveRequests={leaveRequests} updateLeaveStatus={updateLeaveStatus} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmployeeTable({ employees }) {
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

function LeaveRequestTable({ employees, leaveRequests, updateLeaveStatus }) {
    const getEmployee = (employeeId) => employees.find(e => e.id === employeeId);

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
