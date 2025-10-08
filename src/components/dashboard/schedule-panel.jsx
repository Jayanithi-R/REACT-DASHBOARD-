'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SchedulePanel({ meetings }) {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-lg font-semibold">Schedule</CardTitle>
        </CardHeader>
      <CardContent className="space-y-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex flex-col items-center justify-center bg-gray-100 p-2 rounded-md">
                <span className="text-sm font-medium text-gray-700">10:00</span>
                <span className="text-xs text-gray-500">AM</span>
            </div>
            <div>
                <p className="font-medium">{meeting.title}</p>
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex -space-x-2">
                        {meeting.participants.map(p => 
                            <Avatar key={p.id} className="h-6 w-6 border-2 border-white">
                                <AvatarImage src={`https://i.pravatar.cc/24?u=${p.name}`} />
                                <AvatarFallback>{p.name[0]}</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                    <span className="text-xs text-gray-500">+3 more</span>
                </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
