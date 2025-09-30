"use client";

import type { LeaveRequest } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Search, Users2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type LeaveRequestsProps = {
  leaveRequests: LeaveRequest[];
};

export function LeaveRequests({ leaveRequests }: LeaveRequestsProps) {

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-600';
      case 'Approved':
        return 'bg-green-100 text-green-600';
      case 'Rejected':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2">
         <div className='flex items-center gap-2'>
            <Users2 className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">Leave Requests</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-40">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 h-8 rounded-md bg-secondary" />
          </div>
          <Button variant="link" size="sm" className="text-primary">See All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Employee</TableHead>
              <TableHead className="text-xs">Leave Type & Date</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaveRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={request.employee.avatar} alt={request.employee.name} />
                      <AvatarFallback>
                        {request.employee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{request.employee.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                    <p className="text-sm font-medium">{request.leaveType}</p>
                    <p className="text-xs text-muted-foreground">{request.dateRange}</p>
                </TableCell>
                <TableCell className="py-2">
                  <Badge className={`capitalize flex items-center gap-1.5 font-normal ${getStatusClasses(request.status)}`}>
                    <span className={`h-2 w-2 rounded-full ${request.status === 'Approved' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Approve</DropdownMenuItem>
                            <DropdownMenuItem>Reject</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
