'use client';
import { useState, useEffect } from 'react';
import { Header } from '@/components/dashboard/header';
import { AttendanceReport } from '@/components/dashboard/attendance-report';
import { Tasks } from '@/components/dashboard/tasks';
import { Schedule } from '@/components/dashboard/schedule';
import { LeaveRequests } from '@/components/dashboard/leave-requests';
import { Internship } from '@/components/dashboard/internship';
import scheduleData from '@/lib/schedule.json';

// Helper function to format a date as YYYY-MM-DD
function formatDate(date) {
  if (!date) return null;
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  // Initialize with a date object for October 13, 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 13));
  const [activeTab, setActiveTab] = useState('Meetings');
  const [schedule, setSchedule] = useState({ meetings: [], events: [] });

  useEffect(() => {
    const formattedDate = formatDate(selectedDate);
    setSchedule(scheduleData[formattedDate] || { meetings: [], events: [] });
  }, [selectedDate]);

  return (
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 w-full">
          <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AttendanceReport />
                <Tasks />
                <LeaveRequests />
              </div>
            </div>
            <div className="col-span-1">
              <div className="space-y-6">
                <Schedule
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  meetings={schedule.meetings}
                  events={schedule.events}
                />
                <Internship />
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}
