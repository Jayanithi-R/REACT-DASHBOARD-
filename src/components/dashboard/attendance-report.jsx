'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const attendanceData = {
  absent: [
    { name: "Gordon Paucek", department: "Finance", avatar: "/avatars/01.png", status: "Absent" },
    { name: "Nora Kreiger", department: "Product Manager", avatar: "/avatars/02.png", status: "Sick" },
    { name: "Amber Wolf", department: "UI/UX Designer", avatar: "/avatars/03.png", status: "WFH" },
  ],
  present: [
    { name: "Alonzo Sauer", department: "SQA", avatar: "/avatars/04.png", time: "08.22" },
  ],
};

export function AttendanceReport() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Attendance Report</CardTitle>
        <a href="#" className="text-sm text-blue-500">See All</a>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Absent</h3>
            <div className="space-y-2 mt-2">
              {attendanceData.absent.map((person) => (
                <div key={person.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback>{person.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{person.name}</p>
                      <p className="text-xs text-gray-500">{person.department}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 text-xs rounded-full ${person.status === 'Absent' ? 'bg-red-100 text-red-600' : person.status === 'Sick' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
                    {person.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Present</h3>
            <div className="space-y-2 mt-2">
              {attendanceData.present.map((person) => (
                <div key={person.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback>{person.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{person.name}</p>
                      <p className="text-xs text-gray-500">{person.department}</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    {person.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}