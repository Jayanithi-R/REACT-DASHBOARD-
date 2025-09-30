"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Employee, ScheduleItem } from '@/lib/types';
import { DashboardHeader } from '@/components/dashboard/header';
import { EmployeeInfo } from '@/components/dashboard/employee-info';
import { SchedulePanel } from '@/components/dashboard/schedule-panel';
import { Skeleton } from '@/components/ui/skeleton';

type DashboardClientProps = {
  employees: Employee[];
  schedule: ScheduleItem[];
};

export function DashboardClient({ employees, schedule }: DashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredEmployees = useMemo(() => {
    if (!searchQuery) return employees;
    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [employees, searchQuery]);

  const { filteredMeetings, filteredEvents } = useMemo(() => {
    if (!selectedDate) return { filteredMeetings: [], filteredEvents: [] };
    const dateString = selectedDate.toISOString().split('T')[0];
    const itemsForDate = schedule.filter((item) => item.date === dateString);
    return {
      filteredMeetings: itemsForDate.filter((item) => item.type === 'Meeting'),
      filteredEvents: itemsForDate.filter((item) => item.type === 'Event'),
    };
  }, [schedule, selectedDate]);
  
  if (!isClient) {
    return (
        <div className="flex flex-col lg:flex-row">
            <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-9 w-48" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-10 w-64" />
                        <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                </div>
                <Skeleton className="h-96" />
            </main>
            <aside className="w-full lg:w-[380px] lg:border-l p-4 sm:p-6 lg:p-8 space-y-6">
                <Skeleton className="h-72" />
                <Skeleton className="h-64" />
            </aside>
        </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <DashboardHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <EmployeeInfo employees={filteredEmployees} allEmployees={employees} />
      </main>
      <aside className="w-full lg:w-[380px] lg:border-l p-4 sm:p-6 lg:p-8 bg-card/80 lg:bg-transparent">
        <SchedulePanel
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          meetings={filteredMeetings}
          events={filteredEvents}
        />
      </aside>
    </div>
  );
}
