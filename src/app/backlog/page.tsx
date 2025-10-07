'use client';
import { Header } from '@/components/dashboard/header';
import { BacklogPage } from '@/components/backlog/backlog-page';

export default function Page() {
  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-10 w-full">
        <Header />
      </header>
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
        <BacklogPage />
      </main>
    </div>
  );
}
