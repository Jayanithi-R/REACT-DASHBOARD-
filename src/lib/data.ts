import type { Employee, ScheduleItem } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImageUrl = (id: string) => {
  return PlaceHolderImages.find(img => img.id === id)?.imageUrl ?? `https://picsum.photos/seed/${id}/100/100`;
}

const getRelativeDate = (dayOffset: number): string => {
  const date = new Date();
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
];

export const schedule: ScheduleItem[] = [
  { id: 'm1', title: 'Daily Standup', type: 'Meeting', time: '10:00 AM - 10:15 AM', date: getRelativeDate(0), attendees: ['Anjali', 'Raj', 'Amit'], description: 'Daily sync up for the project team.' },
  { id: 'm2', title: 'Frontend Sync', type: 'Meeting', time: '11:00 AM - 12:00 PM', date: getRelativeDate(0), attendees: ['Anjali', 'Priya', 'Amit'], description: 'Discussing the new UI components.' },
  { id: 'e1', title: 'Yoga Session', type: 'Event', time: '08:00 AM - 09:00 AM', date: getRelativeDate(0), description: 'Company wide wellness event.' },
  { id: 'e2', title: 'Product Launch Celebration', type: 'Event', time: '05:00 PM - 06:00 PM', date: getRelativeDate(0), description: 'Celebrating the successful launch of Project Phoenix.' },
  
  { id: 'm3', title: 'Backend Architecture Review', type: 'Meeting', time: '02:00 PM - 03:30 PM', date: getRelativeDate(1), attendees: ['Raj', 'Vikram', 'Amit'], description: 'Review of the new microservice architecture.' },
  { id: 'e3', title: 'Tech Talk: WebAssembly', type: 'Event', time: '04:00 PM - 05:00 PM', date: getRelativeDate(1), description: 'Internal tech talk on the future of WebAssembly.' },

  { id: 'm4', title: 'Sprint Planning', type: 'Meeting', time: '10:00 AM - 11:30 AM', date: getRelativeDate(2), attendees: ['Amit', 'Sunita', 'Anjali', 'Raj'], description: 'Planning for the next sprint.' },

  { id: 'm5', title: 'Client Demo Prep', type: 'Meeting', time: '03:00 PM - 04:00 PM', date: getRelativeDate(-1), attendees: ['Amit', 'Anjali', 'Priya'], description: 'Preparing for the upcoming client demo.' },
  { id: 'e4', title: 'Monthly All-Hands', type: 'Event', time: '11:00 AM - 12:00 PM', date: getRelativeDate(-1), description: 'Company wide monthly update meeting.' }
];
