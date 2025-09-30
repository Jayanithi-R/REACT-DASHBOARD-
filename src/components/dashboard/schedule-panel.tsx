"use client";

import type { ScheduleItem } from '@/lib/types';
import { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Calendar as CalendarIcon, Clock, Filter, Search } from 'lucide-react';
import { Badge } from '../ui/badge';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type SchedulePanelProps = {
  schedule: ScheduleItem[];
};

export function SchedulePanel({ schedule: initialSchedule }: SchedulePanelProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date('2025-10-13'));
  const [schedule, setSchedule] = useState(initialSchedule);
  const [view, setView] = useState('meetings');

  const filteredItems = useMemo(() => {
    if (!selectedDate) return [];
    const dateString = selectedDate.toISOString().split('T')[0];
    const itemsForDate = schedule.filter((item) => item.date === dateString);
    if (view === 'meetings') {
        return itemsForDate.filter(item => item.type === 'Meeting');
    }
    if (view === 'events') {
        return itemsForDate.filter(item => item.type === 'Event');
    }
    return itemsForDate;
  }, [schedule, selectedDate, view]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Schedule</CardTitle>
            <Button variant="link" size="sm" className="text-primary">See All</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border p-0"
        />
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 h-8 rounded-md bg-secondary" />
             <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7">
                <Filter className="h-4 w-4" />
            </Button>
        </div>
        <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value)} className="w-full">
          <ToggleGroupItem value="meetings" aria-label="Meetings" className="w-full data-[state=on]:bg-primary/10 data-[state=on]:text-primary">
            Meetings
          </ToggleGroupItem>
          <ToggleGroupItem value="events" aria-label="Events" className="w-full data-[state=on]:bg-primary/10 data-[state=on]:text-primary">
            Events
          </ToggleGroupItem>
        </ToggleGroup>

        <Accordion type="multiple" defaultValue={['item-m1']} className="w-full space-y-2">
            {filteredItems.map((item) => (
                <AccordionItem key={item.id} value={`item-${item.id}`} className="border-none">
                     <Card className="p-0">
                        <AccordionTrigger className="p-4 text-sm font-semibold hover:no-underline">
                           {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{item.time}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-2 overflow-hidden">
                                        {item.avatars?.slice(0, 3).map((avatar, i) => (
                                            <Avatar key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                                                <AvatarImage src={avatar.src} alt={avatar.alt} />
                                                <AvatarFallback>{avatar.fallback}</AvatarFallback>
                                            </Avatar>
                                        ))}
                                        {item.avatars && item.avatars.length > 3 && <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-muted text-muted-foreground text-xs items-center justify-center flex">+{item.avatars.length - 3}</Avatar>}
                                    </div>
                                    <Badge variant="outline" className="font-normal text-primary border-primary/20 bg-primary/10">{item.team}</Badge>
                                </div>
                                {item.location && <p className="text-sm text-muted-foreground">{item.location}</p>}
                            </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
            ))}
        </Accordion>
        {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center p-8 border-dashed border-2 rounded-lg mt-4 bg-card">
                <CalendarIcon className="w-10 h-10 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">No {view} for this day.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
