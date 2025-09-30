"use client";

import type { ScheduleItem } from '@/lib/types';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Filter, Search } from 'lucide-react';
import { Badge } from '../ui/badge';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { format, addDays, subDays, startOfWeek, isSameDay } from 'date-fns';

type SchedulePanelProps = {
  schedule: ScheduleItem[];
};

const WeekCalendar = ({ selectedDate, onSelectDate }: { selectedDate: Date, onSelectDate: (date: Date) => void }) => {
    const [currentDate, setCurrentDate] = useState(selectedDate);

    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const week = Array.from({ length: 5 }).map((_, i) => addDays(start, i));

    const handlePrevWeek = () => {
        const newDate = subDays(currentDate, 7);
        setCurrentDate(newDate);
    }

    const handleNextWeek = () => {
        const newDate = addDays(currentDate, 7);
        setCurrentDate(newDate);
    }
    
    return (
        <div className="rounded-xl border">
            <div className="flex items-center justify-between p-3">
                <h3 className="text-sm font-semibold">{format(currentDate, 'MMMM yyyy')}</h3>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handlePrevWeek}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleNextWeek}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-between px-3 pb-3">
                <div className="flex items-center gap-1 w-full justify-between">
                    {week.map((day) => (
                        <div key={day.toString()} 
                             onClick={() => onSelectDate(day)}
                             className={`flex flex-col items-center justify-center w-12 h-16 rounded-lg cursor-pointer transition-colors ${
                                isSameDay(day, selectedDate)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-accent'
                             }`}
                        >
                            <p className="text-xs">{format(day, 'EEE')}</p>
                            <p className="font-bold text-lg">{format(day, 'd')}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function SchedulePanel({ schedule: initialSchedule }: SchedulePanelProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date('2025-10-13'));
  const [schedule, setSchedule] = useState(initialSchedule);
  const [view, setView] = useState('meetings');

  const filteredItems = useMemo(() => {
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
            <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base font-semibold">Schedule</CardTitle>
            </div>
            <Button variant="link" size="sm" className="text-primary">See All</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <WeekCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 h-9 rounded-lg bg-secondary" />
             <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7">
                <Filter className="h-4 w-4" />
            </Button>
        </div>
        <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value)} className="w-full grid grid-cols-2 gap-2">
          <ToggleGroupItem value="meetings" aria-label="Meetings" className="w-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground flex items-center gap-2 rounded-md h-9">
            <CalendarIcon className="h-4 w-4" />
            Meetings
          </ToggleGroupItem>
          <ToggleGroupItem value="events" aria-label="Events" className="w-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground flex items-center gap-2 rounded-md h-9">
             <CalendarIcon className="h-4 w-4" />
            Events
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="w-full space-y-2">
            {filteredItems.map((item) => (
                 <Card key={item.id} className="p-0 rounded-lg">
                    <Accordion type="single" collapsible>
                        <AccordionItem value={`item-${item.id}`} className="border-none">
                            <AccordionTrigger className="p-4 text-sm font-semibold hover:no-underline rounded-lg data-[state=open]:bg-slate-50">
                               <div className="flex items-center gap-3 text-left">
                                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                    <CalendarIcon className="h-5 w-5" />
                                  </div>
                                  <div className="flex flex-col items-start">
                                    <span className="font-semibold">{item.title}</span>
                                    <span className="text-xs text-muted-foreground">{item.time}</span>
                                  </div>
                               </div>
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
                        </AccordionItem>
                    </Accordion>
                </Card>
            ))}
        </div>
        {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center p-8 border-dashed border-2 rounded-lg mt-4 bg-card">
                <CalendarIcon className="w-10 h-10 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">No {view === 'meetings' ? 'Meetings' : 'Events'} for this day.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
