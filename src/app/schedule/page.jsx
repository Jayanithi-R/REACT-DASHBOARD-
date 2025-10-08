'use client';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/dashboard/header';
import { Board } from '@/components/schedule/board';

export default function SchedulePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 w-full">
          <Header />
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
          <Board />
        </main>
      </div>
    </div>
  );
}