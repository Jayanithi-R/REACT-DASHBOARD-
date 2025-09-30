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
            <CardContent className="p-4">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md"
                    />
            </CardContent>
        </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {selectedDate ? format(selectedDate, "MMMM dd, yyyy") : "Schedule"}
        </h3>
        <ScheduleAccordion items={[...filteredMeetings, ...filteredEvents]} emptyMessage="No meetings or events for this day." />
      </div>

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
    <div className="w-full space-y-4">
      {items.map((item, index) => (
          <Card key={item.id} className="p-4">
              <div className="space-y-2">
                 <p className="font-semibold">{item.title}</p>
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
              </div>
          </Card>
      ))}
    </div>
  );
}
