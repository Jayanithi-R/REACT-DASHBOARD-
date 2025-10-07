'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import React from "react";
import scheduleData from '@/lib/schedule.json';

// Helper to format a date as YYYY-MM-DD in a timezone-safe way
const toISODateString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export function Schedule() {
    const [currentDate, setCurrentDate] = React.useState(new Date('2025-10-13T00:00:00'));
    const [activeTab, setActiveTab] = React.useState('meetings');
    const [searchTerm, setSearchTerm] = React.useState('');

    const formattedDate = toISODateString(currentDate) as keyof typeof scheduleData;
    const scheduleForDay = scheduleData[formattedDate] || { meetings: [], events: [] };

    const handleWeekChange = (weeks: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + (weeks * 7));
        setCurrentDate(newDate);
    };

    const getWeekDays = (date: Date) => {
        const week = [];
        const firstDayOfWeek = new Date(date);
        const dayOfWeek = firstDayOfWeek.getDay();
        const diff = firstDayOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // adjust when day is sunday
        firstDayOfWeek.setDate(diff);

        for (let i = 0; i < 7; i++) {
            const weekDay = new Date(firstDayOfWeek);
            weekDay.setDate(firstDayOfWeek.getDate() + i);
            week.push(weekDay);
        }
        return week;
    };

    const weekDays = getWeekDays(currentDate);

    const filteredMeetings = scheduleForDay.meetings.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredEvents = scheduleForDay.events.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Schedule</CardTitle>
        <Button variant="link" size="sm">See All</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => handleWeekChange(-1)}><ChevronLeft className="h-4 w-4" /></Button>
          <span className="font-semibold text-sm">{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          <Button variant="ghost" size="icon" onClick={() => handleWeekChange(1)}><ChevronRight className="h-4 w-4" /></Button>
        </div>
        <div className="grid grid-cols-7 text-center text-xs text-muted-foreground">
            {weekDays.map((day, i) => (
                <span key={i}>{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
            ))}
        </div>
        <div className="grid grid-cols-7 text-center text-sm">
            {weekDays.map((day, i) => {
                const isSelected = day.toDateString() === currentDate.toDateString();
                return <span key={i} className={`p-2 cursor-pointer ${isSelected ? 'bg-primary text-primary-foreground rounded-full' : ''}`} onClick={() => setCurrentDate(day)}>{day.getDate()}</span>
            })}
        </div>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search..." 
                className="pl-10 w-full bg-transparent border-b"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="flex justify-around bg-gray-100 p-1 rounded-lg">
            <Button variant={activeTab === 'meetings' ? 'outline' : 'ghost'} size="sm" className={`flex-1 ${activeTab === 'meetings' && 'bg-background'}`} onClick={() => setActiveTab('meetings')}>Meetings</Button>
            <Button variant={activeTab === 'events' ? 'outline' : 'ghost'} size="sm" className={`flex-1 ${activeTab === 'events' && 'bg-background'}`} onClick={() => setActiveTab('events')}>Events</Button>
        </div>
        <div>
            {activeTab === 'meetings' && filteredMeetings.map((meeting) => (
                <div key={meeting.id} className="mt-2 p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold">{meeting.title}</p>
                            <p className="text-sm text-muted-foreground">{meeting.time}</p>
                            <div className="flex items-center mt-2">
                                <div className="flex -space-x-2 mr-2">
                                    {meeting.attendees.map((attendee, index) => (
                                        <Avatar key={index} className="h-6 w-6 border-2 border-background">
                                            <AvatarImage src={attendee} />
                                        </Avatar>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">{meeting.team}</Button>
                    </div>
                </div>
            ))}
            {activeTab === 'events' && filteredEvents.map((event) => (
                <div key={event.id} className="mt-2 p-3 rounded-lg bg-gray-50">
                     <p className="font-bold">{event.title}</p>
                     <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
            ))}
             {(activeTab === 'meetings' && filteredMeetings.length === 0) && <p className="text-center text-muted-foreground pt-4">No meetings for this day.</p>}
             {(activeTab === 'events' && filteredEvents.length === 0) && <p className="text-center text-muted-foreground pt-4">No events for this day.</p>}
        </div>
      </CardContent>
    </Card>
  );
}
