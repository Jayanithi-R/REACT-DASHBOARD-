"use client";

import type { ScheduleItem } from '@/lib/types';
import { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Calendar as CalendarIcon, ChevronDown, ChevronUp, Clock, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

type SchedulePanelProps = {
  schedule: ScheduleItem[];
};

export function SchedulePanel({ schedule }: SchedulePanelProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date('2025-10-13'));

  const { filteredMeetings, filteredEvents } = useMemo(() => {
    if (!selectedDate) return { filteredMeetings: [], filteredEvents: [] };
    const dateString = selectedDate.toISOString().split('T')[0];
    const itemsForDate = schedule.filter((item) => item.date === dateString);
    return {
      filteredMeetings: itemsForDate.filter((item) => item.type === 'Meeting'),
      filteredEvents: itemsForDate.filter((item) => item.type === 'Event'),
    };
  }, [schedule, selectedDate]);
  
  return (
    <div className="space-y-6 sticky top-6">
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Schedule</CardTitle>
                <Button variant="ghost" size="sm">See All</Button>
            </CardHeader>
            <CardContent>
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md p-0"
                    />
                <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search..." className="pl-10" />
                </div>
            </CardContent>
        </Card>

      <Tabs defaultValue="meetings" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="meetings" className="mt-4">
            <ScheduleAccordion items={filteredMeetings} emptyMessage="No meetings scheduled for this day." />
        </TabsContent>
        <TabsContent value="events" className="mt-4">
            <ScheduleAccordion items={filteredEvents} emptyMessage="No events scheduled for this day." />
        </TabsContent>
      </Tabs>
      <InternshipCard />
    </div>
  );
}

function ScheduleAccordion({ items, emptyMessage }: { items: ScheduleItem[]; emptyMessage: string }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border-dashed border-2 rounded-lg mt-4 bg-card">
        <CalendarIcon className="w-10 h-10 text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
      {items.map((item, index) => (
        <AccordionItem key={item.id} value={`item-${index}`} className="border-none">
          <Card>
            <CardHeader className="p-4">
              <AccordionTrigger className="p-0 font-semibold text-base w-full justify-between hover:no-underline">
                <span>{item.title}</span>
              </AccordionTrigger>
            </CardHeader>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{item.time}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2 overflow-hidden">
                        {item.avatars?.slice(0, 3).map((avatar, i) => (
                            <Avatar key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                                <AvatarImage src={avatar.src} alt={avatar.alt} />
                                <AvatarFallback>{avatar.fallback}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                    {item.avatars && item.avatars.length > 3 && <span className="text-sm text-muted-foreground">+{item.avatars.length - 3}</span>}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.location}</span>
                    <Badge variant="outline" className="py-1 px-3 bg-primary/10 text-primary border-primary/20">{item.team}</Badge>
                </div>
              </div>
            </AccordionContent>
          </Card>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function InternshipCard() {
    return (
        <Card>
            <CardHeader className="flex-row justify-between items-start">
                <div>
                    <CardTitle className="text-lg">Internship</CardTitle>
                    <CardDescription>Total Intern: 8</CardDescription>
                </div>
                <Button variant="outline" size="sm">Details</Button>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                         <div className="flex -space-x-2 overflow-hidden">
                            <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                                <AvatarImage src="https://picsum.photos/seed/emp1/100/100" />
                            </Avatar>
                             <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                                <AvatarImage src="https://picsum.photos/seed/emp2/100/100" />
                            </Avatar>
                             <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                                <AvatarImage src="https://picsum.photos/seed/emp3/100/100" />
                            </Avatar>
                        </div>
                        <span className="text-sm text-muted-foreground">8 Attended</span>
                    </div>
                    <Button variant="default">View Progress</Button>
                </div>
            </CardContent>
        </Card>
    )
}
