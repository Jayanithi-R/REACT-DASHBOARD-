"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Search,
  ArrowRight,
  Briefcase,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  format,
  addDays,
  subDays,
  startOfWeek,
  isSameDay,
} from "date-fns";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

type ScheduleItem = {
  id: string;
  title: string;
  type: "Meeting" | "Event";
  time: string;
  date: string; // YYYY-MM-DD
  description: string;
  avatars?: { src: string; alt: string; fallback: string }[];
  location?: string;
  team?: string;
};

// ✅ Internal JSON data
const scheduleData: ScheduleItem[] = [
  {
    id: "m1",
    title: "Meeting Product",
    type: "Meeting",
    time: "9:00 - 9:45 AM",
    date: "2025-10-13",
    description: "Weekly product strategy sync.",
    avatars: [
      { src: "/img/emp1.png", alt: "Nora", fallback: "NK" },
      { src: "/img/emp2.png", alt: "Amit", fallback: "AK" },
      { src: "/img/emp3.png", alt: "Priya", fallback: "PS" },
    ],
    location: "On Zoom",
    team: "Product Team",
  },
  {
    id: "e1",
    title: "Company Event",
    type: "Event",
    time: "4:00 PM - 5:00 PM",
    date: "2025-10-13",
    description: "All-hands with CEO.",
    avatars: [
      { src: "/img/emp1.png", alt: "Anjali", fallback: "AS" },
      { src: "/img/emp2.png", alt: "Raj", fallback: "RP" },
    ],
    location: "Auditorium",
    team: "Company-wide",
  },
  {
    id: "m2",
    title: "Daily Standup",
    type: "Meeting",
    time: "9:00 - 9:30 AM",
    date: "2025-10-14",
    description: "Daily sync up for the project team.",
    avatars: [
      { src: "/img/emp1.png", alt: "Anjali", fallback: "AS" },
      { src: "/img/emp2.png", alt: "Raj", fallback: "RP" },
    ],
    team: "Engineering",
  },
];

const WeekCalendar = ({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const week = Array.from({ length: 5 }).map((_, i) => addDays(start, i));

  return (
    <div className="rounded-xl border">
      <div className="flex items-center justify-between p-3">
        <h3 className="text-sm font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setCurrentDate(subDays(currentDate, 7))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between px-3 pb-3">
        {week.map((day) => (
          <div
            key={day.toString()}
            onClick={() => onSelectDate(day)}
            className={`flex flex-col items-center justify-center w-12 h-16 rounded-lg cursor-pointer transition-colors ${
              isSameDay(day, selectedDate)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            }`}
          >
            <p className="text-xs">{format(day, "EEE")}</p>
            <p className="font-bold text-lg">{format(day, "d")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ScheduleList = ({ title, items }: { title: string; items: ScheduleItem[] }) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border-dashed border-2 rounded-lg mt-4 bg-card">
        <CalendarIcon className="w-10 h-10 text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground">
          No {title.toLowerCase()} for this day.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card
          key={item.id}
          className="p-0 rounded-lg bg-card shadow-none border-0"
        >
          <Accordion type="single" collapsible className="bg-slate-50 rounded-lg">
            <AccordionItem value={`item-${item.id}`} className="border-none">
              <AccordionTrigger className="p-3 text-sm font-semibold hover:no-underline rounded-lg">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.time}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 bg-white rounded-b-lg">
                <div className="space-y-3 pt-2">
                  {item.location && (
                    <p className="text-sm text-muted-foreground">
                      {item.location}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2 overflow-hidden">
                      {item.avatars?.slice(0, 3).map((avatar, i) => (
                        <Avatar
                          key={i}
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-background"
                        >
                          <AvatarImage src={avatar.src} alt={avatar.alt} />
                          <AvatarFallback>{avatar.fallback}</AvatarFallback>
                        </Avatar>
                      ))}
                      {item.avatars && item.avatars.length > 3 && (
                        <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-muted text-muted-foreground text-xs flex items-center justify-center">
                          +{item.avatars.length - 3}
                        </Avatar>
                      )}
                    </div>
                    {item.team && (
                      <Badge
                        variant="outline"
                        className="font-normal text-primary border-primary/20 bg-primary/10"
                      >
                        {item.team}
                      </Badge>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      ))}
    </div>
  );
};

export function SchedulePanel() {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2025-10-13")
  );
  const [activeTab, setActiveTab] = useState("meetings");

  // ✅ Fixed date mapping using isSameDay
  const { meetings, events } = useMemo(() => {
    return {
      meetings: scheduleData.filter(
        (item) =>
          item.type === "Meeting" && isSameDay(new Date(item.date), selectedDate)
      ),
      events: scheduleData.filter(
        (item) =>
          item.type === "Event" && isSameDay(new Date(item.date), selectedDate)
      ),
    };
  }, [selectedDate]);

  return (
    <Card className="h-400">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">Schedule</CardTitle>
          </div>
          <Button
            variant="link"
            size="sm"
            className="h-8 rounded-full flex items-center gap-1"
          >
            See All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <WeekCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 h-9 rounded-lg bg-secondary" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <ToggleGroup
          type="single"
          value={activeTab}
          onValueChange={(value) => value && setActiveTab(value)}
          className="w-full"
          variant="schedule"
        >
          <ToggleGroupItem value="meetings" className="w-full gap-2">
            <Briefcase className="h-4 w-4" />
            Meetings
          </ToggleGroupItem>
          <ToggleGroupItem value="events" className="w-full gap-2">
            <Video className="h-4 w-4" />
            Events
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="space-y-6">
          {activeTab === "meetings" && (
            <ScheduleList title="Meetings" items={meetings} />
          )}
          {activeTab === "events" && (
            <ScheduleList title="Events" items={events} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
