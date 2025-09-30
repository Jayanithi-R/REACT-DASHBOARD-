import { employees, schedule } from '@/lib/data';
import { DashboardClient } from '@/components/dashboard/dashboard-client';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardClient employees={employees} schedule={schedule} />
    </div>
  );
}
