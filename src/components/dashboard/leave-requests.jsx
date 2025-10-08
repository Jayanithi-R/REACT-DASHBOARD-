'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const leaveRequestsData = [
  { name: "Bobby Gibson", leaveType: "Annual Leave", date: "Aug 21 - Sep 04", status: "Pending", avatar: "/avatars/05.png" },
  { name: "Yvonne Hartmann", leaveType: "Sick Leave", date: "Aug 02 - Aug 18", status: "Pending", avatar: "/avatars/06.png" },
  { name: "Russell Bartell", leaveType: "Annual Leave", date: "June 24 - July 03", status: "Approved", avatar: "/avatars/07.png" },
  { name: "Pearl Franecki", leaveType: "Annual Leave", date: "June 04 - June 28", status: "Approved", avatar: "/avatars/08.png" },
  { name: "Margarita Wilderman", leaveType: "Annual Leave", date: "June 04 - June 28", status: "Approved", avatar: "/avatars/09.png" },
  { name: "Kim Mosciski", leaveType: "Annual Leave", date: "June 04 - June 28", status: "Approved", avatar: "/avatars/10.png" },
];

export function LeaveRequests() {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Leave Requests</CardTitle>
        <a href="#" className="text-sm text-blue-500">See All</a>
      </CardHeader>
      <CardContent>
        <div className="-mx-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type & Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveRequestsData.map((request) => (
                <tr key={request.name}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Avatar>
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback>{request.name[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.leaveType}</div>
                    <div className="text-sm text-gray-500">{request.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">...</a>
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