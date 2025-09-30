export type Employee = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  status: 'Active' | 'On Leave';
};

export type ScheduleItem = {
  id: string;
  title: string;
  type: 'Meeting' | 'Event';
  time: string;
  date: string; // YYYY-MM-DD
  attendees?: string[]; // For meetings
  description: string;
};
