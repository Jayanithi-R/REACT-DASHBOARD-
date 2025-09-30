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
  avatars?: { src: string; alt: string; fallback: string }[];
  location?: string;
  team?: string;
};

export type Attendance = {
  absent: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    status: 'Absent' | 'Sick' | 'WFH';
  }[];
  present: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    time: string;
  }[];
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'Completed';
  tag: string;
  date: string;
};

export type LeaveRequest = {
  id: string;
  employee: {
    name: string;
    role: string;
    avatar: string;
  };
  leaveType: string;
  dateRange: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};
