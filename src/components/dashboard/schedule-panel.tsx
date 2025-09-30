import type { ScheduleItem } from '@/lib/types';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, CalendarDays, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';

type SchedulePanelProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  meetings: ScheduleItem[];
  events: ScheduleItem[];
};

export function SchedulePanel({ selectedDate, setSelectedDate, meetings, events }: SchedulePanelProps) {
  return (
    <div className="space-y-6 sticky top-6">
      <Card>
        <CardContent className="p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md"
            />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Schedule for {selectedDate ? format(selectedDate, 'PPP') : 'Today'}
        </h2>
        <Tabs defaultValue="meetings" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="meetings">Meetings ({meetings.length})</TabsTrigger>
            <TabsTrigger value="events">Events ({events.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="meetings" className="mt-4">
            <ScheduleList items={meetings} emptyMessage="No meetings scheduled for this day." />
          </TabsContent>
          <TabsContent value="events" className="mt-4">
            <ScheduleList items={events} emptyMessage="No events scheduled for this day." />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ScheduleList({ items, emptyMessage }: { items: ScheduleItem[]; emptyMessage: string }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border-dashed border-2 rounded-lg mt-4 bg-card">
        <CalendarDays className="w-10 h-10 text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="p-4 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="bg-accent rounded-full p-3">
            <Briefcase className="h-5 w-5 text-accent-foreground" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {item.time}
            </p>
            {item.type === 'Meeting' && item.attendees && (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                {item.attendees.join(', ')}
              </p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
