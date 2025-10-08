import { useState, useEffect } from 'react';
import initialSchedule from '@/lib/schedule.json';

export const useSchedule = () => {
  const [schedule, setSchedule] = useState(initialSchedule);

  // In a real application, you might fetch this data from an API
  useEffect(() => {
    // For now, we just use the local JSON file
    setSchedule(initialSchedule);
  }, []);

  return { schedule, setSchedule };
};