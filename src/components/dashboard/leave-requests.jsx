'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const leaveRequests = [
    {
        id: 1,
        name: 'Bobby Gibson',
        role: 'Product Manager',
        avatar: 'https://i.pravatar.cc/150?img=5',
        leaveType: 'Annual Leave',
        date: 'Aug 21 - Sep 04',
        status: 'Pending',
    },
    {
        id: 2,
        name: 'Yvonne Hartmann',
        role: 'SQA',
        avatar: 'https://i.pravatar.cc/150?img=6',
        leaveType: 'Sick Leave',
        date: 'Aug 02 - Aug 18',
        status: 'Pending',
    },
    {
        id: 3,
        name: 'Russell Bartell',
        role: 'Product Manager',
        avatar: 'https://i.pravatar.cc/150?img=7',
        leaveType: 'Annual Leave',
        date: 'June 24 - July 03',
        status: 'Approved',
    },
    {
        id: 4,
        name: 'Pearl Franecki',
        role: 'Frontend Developer',
        avatar: 'https://i.pravatar.cc/150?img=8',
        leaveType: 'Annual Leave',
        date: 'June 04 - June 28',
        status: 'Approved',
    },
    {
        id: 5,
        name: 'Margarita Wilderman',
        role: 'Product Web Officer',
        avatar: 'https://i.pravatar.cc/150?img=12',
        leaveType: 'Annual Leave',
        date: 'June 04 - June 28',
        status: 'Approved',
    },
    {
        id: 6,
        name: 'Kim Mosciski',
        role: 'Future Marketing Strategist',
        avatar: 'https://i.pravatar.cc/150?img=13',
        leaveType: 'Annual Leave',
        date: 'June 04 - June 28',
        status: 'Approved',
    },
];

const getStatusBadgeClasses = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

export function LeaveRequests() {
    const [search, setSearch] = React.useState('');

    const filteredRequests = leaveRequests.filter(request =>
        request.name.toLowerCase().includes(search.toLowerCase()) ||
        request.leaveType.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Leave Requests</CardTitle>
        <div className="flex items-center gap-2">
            <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search..." 
                    className="pl-10" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Button variant="link" size="sm">See All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="text-left text-xs text-muted-foreground">
                        <th className="p-2">Employee</th>
                        <th className="p-2">Leave Type & Date</th>
                        <th className="p-2">Status</th>
                        <th className="p-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRequests.map((request) => (
                        <tr key={request.id} className="border-b">
                            <td className="p-2">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={request.avatar} alt={request.name} />
                                        <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">{request.name}</p>
                                        <p className="text-xs text-muted-foreground">{request.role}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-2">
                                <p className="text-sm font-medium">{request.leaveType}</p>
                                <p className="text-xs text-muted-foreground">{request.date}</p>
                            </td>
                            <td className="p-2">
                                <Badge variant="outline" className={`font-semibold text-xs rounded-md ${getStatusBadgeClasses(request.status)}`}>{request.status}</Badge>
                            </td>
                            <td className="p-2 text-right">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </CardContent>
    </Card>
  );
}
