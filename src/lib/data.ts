import type { Employee, ScheduleItem, Attendance, Task, LeaveRequest } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImageUrl = (id: string) => {
  return PlaceHolderImages.find(img => img.id === id)?.imageUrl ?? `https://picsum.photos/seed/${id}/100/100`;
}

const getRelativeDate = (dayOffset: number): string => {
  const date = new Date('2025-10-13');
  date.setDate(date.getDate() + dayOffset);
  return date.toISOString().split('T')[0];
};

export const employees: Employee[] = [
  { id: '1', name: 'Anjali Sharma', role: 'Frontend Developer', avatar: getImageUrl('emp1'), email: 'anjali@example.com', status: 'Active' },
  { id: '2', name: 'Raj Patel', role: 'Backend Developer', avatar: getImageUrl('emp2'), email: 'raj@example.com', status: 'Active' },
  { id: '3', name: 'Priya Singh', role: 'UI/UX Designer', avatar: getImageUrl('emp3'), email: 'priya@example.com', status: 'On Leave' },
  { id: '4', name: 'Amit Kumar', role: 'Project Manager', avatar: getImageUrl('emp4'), email: 'amit@example.com', status: 'Active' },
  { id: '5', name: 'Sunita Devi', role: 'QA Engineer', avatar: getImageUrl('emp5'), email: 'sunita@example.com', status: 'Active' },
  { id: '6', name: 'Vikram Rathore', role: 'DevOps Engineer', avatar: getImageUrl('emp6'), email: 'vikram@example.com', status: 'Active' },
  { id: '7', name: 'Kavita Iyer', role: 'Data Scientist', avatar: getImageUrl('emp7'), email: 'kavita@example.com', status: 'On Leave' },
  { id: '8', name: 'Arjun Mehta', role: 'Mobile Developer', avatar: getImageUrl('emp8'), email: 'arjun@example.com', status: 'Active' },
  { id: '9', name: 'Gordon Paucek', role: 'Finance', avatar: getImageUrl('emp9'), email: 'gordon@example.com', status: 'On Leave' },
  { id: '10', name: 'Nora Kreiger', role: 'Product Manager', avatar: getImageUrl('emp10'), email: 'nora@example.com', status: 'On Leave' },
  { id: '11', name: 'Amber Wolf', role: 'UI/UX Designer', avatar: getImageUrl('emp11'), email: 'amber@example.com', status: 'On Leave' },
  { id: '12', name: 'Alonzo Sauer', role: 'SQA', avatar: getImageUrl('emp12'), email: 'alonzo@example.com', status: 'Active' },
  { id: '13', name: 'Bobby Gibson', role: 'Product Manager', avatar: getImageUrl('emp13'), email: 'bobby@example.com', status: 'Active' },
  { id: '14', name: 'Yvonne Hartmann', role: 'SQA', avatar: getImageUrl('emp14'), email: 'yvonne@example.com', status: 'Active' },
  { id: '15', name: 'Russell Bartell', role: 'Product Manager', avatar: getImageUrl('emp15'), email: 'russell@example.com', status: 'Active' },
  { id: '16', name: 'Pearl Franecki', role: 'Frontend Developer', avatar: getImageUrl('emp16'), email: 'pearl@example.com', status: 'Active' },
  { id: '17', name: 'Margarita Wilderman', role: 'Product Web Officer', avatar: getImageUrl('emp17'), email: 'margarita@example.com', status: 'Active' },
  { id: '18', name: 'Kim Mosciski', role: 'Future Marketing Strategist', avatar: getImageUrl('emp18'), email: 'kim@example.com', status: 'Active' },
];

export const schedule: ScheduleItem[] = [
  { 
    id: 'm0', 
    title: 'Daily Standup', 
    type: 'Meeting', 
    time: '9:00 - 9:30 AM', 
    date: getRelativeDate(1), // Tuesday
    description: 'Daily sync up for the project team.',
    avatars: [
      { src: getImageUrl('emp1'), alt: 'Anjali Sharma', fallback: 'AS' },
      { src: getImageUrl('emp2'), alt: 'Raj Patel', fallback: 'RP' },
    ],
    team: 'Engineering',
  },
  { 
    id: 'm1', 
    title: 'Product Strategy Meeting', 
    type: 'Meeting', 
    time: '9:00 - 9:45 AM', 
    date: getRelativeDate(0), // Monday
    attendees: ['Anjali', 'Raj', 'Amit'], 
    description: 'Weekly product strategy sync.',
    avatars: [
      { src: getImageUrl('emp10'), alt: 'Nora Kreiger', fallback: 'NK' },
      { src: getImageUrl('emp4'), alt: 'Amit Kumar', fallback: 'AK' },
      { src: getImageUrl('emp3'), alt: 'Priya Singh', fallback: 'PS' },
      { src: getImageUrl('emp13'), alt: 'Bobby Gibson', fallback: 'BG' },
      { src: getImageUrl('emp15'), alt: 'Russell Bartell', fallback: 'RB' },
    ],
    location: 'On Zoom',
    team: 'Product Team',
  },
  { 
    id: 'm2', 
    title: 'Design Review', 
    type: 'Meeting', 
    time: '11:00 - 12:00 PM', 
    date: getRelativeDate(0), // Monday
    attendees: ['Anjali', 'Priya', 'Amit'], 
    description: 'Discussing the new UI components.',
    avatars: [
      { src: getImageUrl('emp3'), alt: 'Priya Singh', fallback: 'PS' },
      { src: getImageUrl('emp11'), alt: 'Amber Wolf', fallback: 'AW' },
    ],
    location: 'Figma',
    team: 'Design Team',
  },
    { 
    id: 'm3', 
    title: 'Backend Architecture', 
    type: 'Meeting', 
    time: '2:00 - 3:30 PM', 
    date: getRelativeDate(2), // Wednesday
    attendees: ['Raj', 'Vikram'], 
    description: 'Session on new microservices.',
    avatars: [
      { src: getImageUrl('emp2'), alt: 'Raj Patel', fallback: 'RP' },
      { src: getImageUrl('emp6'), alt: 'Vikram Rathore', fallback: 'VR' },
    ],
    location: 'Conference Room 2',
    team: 'Backend',
  },
  {
    id: 'e1',
    title: 'Company Town Hall',
    type: 'Event',
    time: '4:00 PM - 5:00 PM',
    date: getRelativeDate(0), // Monday
    description: 'All-hands meeting with the CEO.',
    avatars: [
      { src: getImageUrl('emp1'), alt: 'Anjali Sharma', fallback: 'AS' },
      { src: getImageUrl('emp2'), alt: 'Raj Patel', fallback: 'RP' },
      { src: getImageUrl('emp3'), alt: 'Priya Singh', fallback: 'PS' },
      { src: getImageUrl('emp4'), alt: 'Amit Kumar', fallback: 'AK' },
      { src: getImageUrl('emp5'), alt: 'Sunita Devi', fallback: 'SD' },
      { src: getImageUrl('emp6'), alt: 'Vikram Rathore', fallback: 'VR' },
    ],
    location: 'Auditorium',
    team: 'Company-wide',
  },
  {
    id: 'e2',
    title: 'Project Phoenix Kickoff',
    type: 'Event',
    time: '10:00 AM - 11:00 AM',
    date: getRelativeDate(3), // Thursday
    description: 'Kickoff meeting for the new project "Phoenix".',
     avatars: [
      { src: getImageUrl('emp1'), alt: 'Anjali Sharma', fallback: 'AS' },
      { src: getImageUrl('emp2'), alt: 'Raj Patel', fallback: 'RP' },
      { src: getImageUrl('emp4'), alt: 'Amit Kumar', fallback: 'AK' },
    ],
    location: 'Conference Room 3',
    team: 'Project Phoenix',
  },
    {
    id: 'e3',
    title: 'Team Lunch',
    type: 'Event',
    time: '1:00 PM - 2:00 PM',
    date: getRelativeDate(4), // Friday
    description: 'Weekly team lunch.',
     avatars: [
      { src: getImageUrl('emp1'), alt: 'Anjali Sharma', fallback: 'AS' },
      { src: getImageUrl('emp2'), alt: 'Raj Patel', fallback: 'RP' },
      { src: getImageUrl('emp4'), alt: 'Amit Kumar', fallback: 'AK' },
      { src: getImageUrl('emp6'), alt: 'Vikram Rathore', fallback: 'VR' },
    ],
    location: 'Local Restaurant',
    team: 'Engineering',
  },
];

export const attendance: Attendance = {
  absent: [
    { id: '9', name: 'Gordon Paucek', role: 'Finance', avatar: getImageUrl('emp9'), status: 'Absent' },
    { id: '10', name: 'Nora Kreiger', role: 'Product Manager', avatar: getImageUrl('emp10'), status: 'Sick' },
    { id: '11', name: 'Amber Wolf', role: 'UI/UX Designer', avatar: getImageUrl('emp11'), status: 'WFH' },
  ],
  present: [
    { id: '12', name: 'Alonzo Sauer', role: 'SQA', avatar: getImageUrl('emp12'), time: '08.22' },
  ]
};

export const tasks: Task[] = [
    { id: 't1', title: 'Update Payroll Records', description: 'Verify salary adjustments and overtime', status: 'Pending', tag: 'Payroll', date: 'Today' },
    { id: 't2', title: 'Interview with Sarah Lee', description: 'Conduct candidate interview for Marketin...', status: 'Completed', tag: 'Recruitment', date: 'Today' },
    { id: 't3', title: 'Review Leave Applications', description: 'Check pending leave requests and approv...', status: 'Pending', tag: 'Important', date: 'Yesterday' },
];

export const leaveRequests: LeaveRequest[] = [
    { id: 'lr1', employee: { name: 'Bobby Gibson', role: 'Product Manager', avatar: getImageUrl('emp13') }, leaveType: 'Annual Leave', dateRange: 'Aug 21 - Sep 04', status: 'Pending' },
    { id: 'lr2', employee: { name: 'Yvonne Hartmann', role: 'SQA', avatar: getImageUrl('emp14') }, leaveType: 'Sick Leave', dateRange: 'Aug 02 - Aug 18', status: 'Pending' },
    { id: 'lr3', employee: { name: 'Russell Bartell', role: 'Product Manager', avatar: getImageUrl('emp15') }, leaveType: 'Annual Leave', dateRange: 'June 24 - July 03', status: 'Approved' },
    { id: 'lr4', employee: { name: 'Pearl Franecki', role: 'Frontend Developer', avatar: getImageUrl('emp16') }, leaveType: 'Annual Leave', dateRange: 'June 04 - June 28', status: 'Approved' },
    { id: 'lr5', employee: { name: 'Margarita Wilderman', role: 'Product Web Officer', avatar: getImageUrl('emp17')}, leaveType: 'Annual Leave', dateRange: 'June 04 - June 28', status: 'Approved' },
    { id: 'lr6', employee: { name: 'Kim Mosciski', role: 'Future Marketing Strategist', avatar: getImageUrl('emp18') }, leaveType: 'Annual Leave', dateRange: 'June 04 - June 28', status: 'Approved' },
];

