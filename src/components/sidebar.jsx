'use client';
import Link from 'next/link';
import {
  LayoutGrid,
  Calendar,
  Users,
  Briefcase,
  GitMerge,
  BarChart2,
  Settings,
  HelpCircle,
  ChevronRight,
  Circle,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const mainNavLinks = [
  { href: '/', icon: <LayoutGrid className="h-5 w-5" />, label: 'Dashboard' },
  { href: '/schedule', icon: <Calendar className="h-5 w-5" />, label: 'Schedule' },
  { href: '/attendance', icon: <Users className="h-5 w-5" />, label: 'Attendance' },
  { href: '/departments', icon: <Briefcase className="h-5 w-5" />, label: 'Departments' },
  { href: '/integrations', icon: <GitMerge className="h-5 w-5" />, label: 'Integrations' },
  { href: '/reports', icon: <BarChart2 className="h-5 w-5" />, label: 'Reports' },
];

const shortcutLinks = [
    { href: '/onboarding', icon: <Circle className="h-2 w-2 text-green-500 fill-current" />, label: 'New Hire Onboarding', count: 1 },
    { href: '/leave-requests', icon: <Circle className="h-2 w-2 text-red-500 fill-current" />, label: 'Leave Requests', count: 2 },
    { href: '/reviews', icon: <Circle className="h-2 w-2 text-yellow-500 fill-current" />, label: 'Performance Reviews', count: 3 },
];

const bottomNavLinks = [
    { href: '/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' },
    { href: '/support', icon: <HelpCircle className="h-5 w-5" />, label: 'Help Center' },
];

function NavLink({ href, icon, label, isActive, isMain }) {
  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 rounded-md px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 ${
          isActive ? 'bg-gray-100 text-gray-900 font-semibold' : ''
        }`}
      >
        {icon}
        <span>{label}</span>
        {isActive && isMain && <ChevronRight className="ml-auto h-5 w-5 text-gray-500" />}
      </div>
    </Link>
  );
}

function ShortcutLink({ href, icon, label, count }) {
    return (
      <Link href={href}>
        <div className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900">
            {icon}
            <span>{label}</span>
            {count && <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700">{count}</span>}
        </div>
      </Link>
    );
  }

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-white p-4">
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="white"/>
            </svg>
        </div>
        <div>
            <h1 className="font-bold text-lg">HRsync</h1>
            <p className="text-sm text-gray-500">HR Management</p>
        </div>
      </div>

      <div className="mt-8 flex-1">
        <div className="space-y-6">
            <div>
                <h3 className="px-3 text-xs font-semibold uppercase text-gray-400 tracking-wider">Main</h3>
                <nav className="mt-2 space-y-1">
                    {mainNavLinks.map((link) => (
                        <NavLink key={link.href} {...link} isActive={pathname === link.href} isMain={true} />
                    ))}
                </nav>
            </div>
            <div>
                <h3 className="px-3 text-xs font-semibold uppercase text-gray-400 tracking-wider">Shortcuts</h3>
                <nav className="mt-2 space-y-1">
                    {shortcutLinks.map((link) => <ShortcutLink key={link.label} {...link} />)}
                </nav>
            </div>
        </div>
      </div>

      <div className="mt-auto space-y-2">
        <nav className="space-y-1">
            {bottomNavLinks.map((link) => (
                <NavLink key={link.href} {...link} isActive={pathname === link.href} />
            ))}
        </nav>
        <div className="border-t pt-4">
            <div className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100">
                <img src="/avatars/01.png" alt="Juwita" className="h-10 w-10 rounded-full" />
                <div>
                    <p className="font-semibold">Juwita</p>
                    <p className="text-xs text-gray-500">juvv@hr-mikom.com</p>
                </div>
                <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
            </div>
        </div>
      </div>
    </aside>
  );
}
