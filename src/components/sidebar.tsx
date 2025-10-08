'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { 
  Users, Calendar, Briefcase, Settings, Menu, LayoutDashboard, 
  Clock, FileText, Dot, HelpCircle, ChevronRight, LogOut 
} from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  TooltipProvider,
} from '@/components/ui/tooltip';

// Sidebar component definitions
const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContext = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
  hydrated: boolean;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  ({ defaultOpen: defaultOpenProp = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
    const isMobile = useIsMobile();
    const [hydrated, setHydrated] = React.useState(false);
    const [openMobile, setOpenMobile] = React.useState(false);

    const getCookie = () => {
        if (typeof window === 'undefined') return defaultOpenProp.toString();
        const cookie = document.cookie
            .split(';')
            .find(c => c.trim().startsWith(`${SIDEBAR_COOKIE_NAME}=`));
        return cookie ? cookie.split('=')[1] : defaultOpenProp.toString();
    };

    const [_open, _setOpen] = React.useState(getCookie() === 'true');
    const open = openProp ?? _open;

    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === 'function' ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );

    const toggleSidebar = React.useCallback(() => {
      return isMobile ? setOpenMobile((v) => !v) : setOpen((v) => !v);
    }, [isMobile, setOpen, setOpenMobile]);

    React.useEffect(() => {
      setHydrated(true);
      _setOpen(getCookie() === 'true');
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMobile, toggleSidebar]);

    const state = open ? 'expanded' : 'collapsed';

    const contextValue = React.useMemo<SidebarContext>(
      () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar, hydrated }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar, hydrated]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={{ ...style } as React.CSSProperties}
            className={cn('group/sidebar-wrapper', className)}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = 'SidebarProvider';

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(
  ({ className, children, ...props }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile, hydrated } = useSidebar();

    if (!hydrated) {
        return <div ref={ref} className={cn("hidden md:block text-sidebar-foreground", className)} {...props}>
            <div className={cn("fixed inset-y-0 z-10 h-svh flex", 'left-0')}>
                <div className={cn("bg-sidebar h-full w-16")}>
                    {/* Skeleton UI can go here */}
                </div>
            </div>
        </div>;
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            side='left'
            className='w-[--sidebar-width-mobile] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden'
            style={{ '--sidebar-width-mobile': SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}
          >
          <SheetHeader>
            <SheetTitle className="sr-only">Sidebar</SheetTitle>
          </SheetHeader>
            <div className='flex h-full w-full flex-col'>{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div ref={ref} className={cn('hidden md:block text-sidebar-foreground', className)} {...props}>
        <div className={cn('fixed inset-y-0 z-10 h-svh flex', 'left-0')}>
            <div className={cn('bg-sidebar h-full', state === 'expanded' ? 'w-64' : 'w-16', 'transition-all duration-300')}>
                {children}
            </div>
        </div>
      </div>
    );
  }
);
Sidebar.displayName = 'Sidebar';

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, children, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      variant='ghost'
      size='icon'
      className={cn('md:hidden', className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {children || <Menu/>}
    </Button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'main'>
>(({ className, ...props }, ref) => {
    const { state, hydrated } = useSidebar();
    if (!hydrated) {
        return <main ref={ref} className={cn('flex-1 transition-all duration-300', 'md:ml-16', className)} {...props}/>;
    }
  return (
    <main
      ref={ref}
      className={cn(
        'flex-1 transition-all duration-300', 
        state === 'expanded' ? 'md:ml-64' : 'md:ml-16',
        className
        )}
      {...props}
    />
  );
});
SidebarInset.displayName = 'SidebarInset';

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  const { state } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn('flex items-center p-4', state === 'collapsed' && 'justify-center', className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = 'SidebarHeader';

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex-1 overflow-y-auto', className)}
      {...props}
    />
  );
});
SidebarContent.displayName = 'SidebarContent';

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('p-4', className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = 'SidebarFooter';

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-col gap-1 px-4', className)}
    {...props}
  />
));
SidebarMenu.displayName = 'SidebarMenu';

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('relative', className)}
    {...props}
  />
));
SidebarMenuItem.displayName = 'SidebarMenuItem';

const SidebarMenuButton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & { isActive?: boolean, asChild?: boolean }
>(({ className, isActive, asChild, children, ...props }, ref) => {
  const { state } = useSidebar();
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      ref={ref}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isActive 
          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        state === 'collapsed' && 'justify-center',
        className
      )}
      {...props}
    >
        {children}
    </Comp>
  );
});
SidebarMenuButton.displayName = 'SidebarMenuButton';

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, children, ...props }, ref) => {
    const { state } = useSidebar();
    if (state === 'collapsed') return null;
    return (
        <div ref={ref} className={cn('px-3 py-2 text-xs font-semibold text-sidebar-foreground/50', className)} {...props}>
            {children}
        </div>
    );
});
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

const mainNav = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Schedule', href: '/schedule', icon: Clock },
    { name: 'Attendance', href: '/attendance', icon: Calendar },
    { name: 'Departments', href: '/departments', icon: Users },
    { name: 'Integrations', href: '/integrations', icon: Briefcase },
    { name: 'Reports', href: '/reports', icon: FileText },
];

const shortcuts = [
    { name: 'New Hire Onboarding', href: '/onboarding', icon: Dot, color: 'text-green-400', count: 1 },
    { name: 'Leave Requests', href: '/leaves', icon: Dot, color: 'text-red-400', count: 2 },
    { name: 'Performance Reviews', href: '/reviews', icon: Dot, color: 'text-yellow-400', count: 3 },
];

const helpNav = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help Center', href: '/help', icon: HelpCircle },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { state, hydrated } = useSidebar();

    if (!hydrated) {
        return (
            <>
            <SidebarHeader>
                <div className='flex items-center gap-2'>
                    <Avatar className='w-8 h-8' />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarGroupLabel>MAIN</SidebarGroupLabel>
                    {mainNav.map((item) => (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton isActive={pathname === item.href}>
                                <item.icon className='h-5 w-5' />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            </>
        );
    }

    return (
      <>
        <SidebarHeader>
          <Link href='/'>
            <div className='flex items-center gap-2'>
              <Avatar className={cn(state === 'collapsed' && 'w-8 h-8')}>
                <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              </Avatar>
              {state === 'expanded' && <div className='flex flex-col'>
                <h2 className='font-bold text-lg'>HRSync</h2>
                <p className='text-xs text-sidebar-foreground/60'>HR Management</p>
              </div>}
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                <SidebarGroupLabel>MAIN</SidebarGroupLabel>
                {mainNav.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <Link href={item.href}>
                            <SidebarMenuButton isActive={pathname === item.href}>
                                <item.icon className='h-5 w-5' />
                                {state === 'expanded' && <><span>{item.name}</span> {item.name === 'Dashboard' && <ChevronRight className='ml-auto h-4 w-4'/>} </>}
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>

            <SidebarMenu className='mt-4'>
                <SidebarGroupLabel>SHORTCUTS</SidebarGroupLabel>
                {shortcuts.map((item) => (
                    <SidebarMenuItem key={item.name}>
                       <Link href={item.href}>
                            <SidebarMenuButton isActive={pathname.startsWith(item.href)}>
                                <item.icon className={cn('h-5 w-5', item.color)} />
                                {state === 'expanded' && <span className="flex-1">{item.name}</span>}
                                {state === 'expanded' && <span className="text-xs bg-gray-300 text-gray-800 rounded-full px-2 py-0.5">{item.count}</span>}
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
             <SidebarMenu className='mt-4'>
                {helpNav.map((item) => (
                    <SidebarMenuItem key={item.name}>
                       <Link href={item.href}>
                            <SidebarMenuButton isActive={pathname.startsWith(item.href)}>
                                <item.icon className='h-5 w-5' />
                                {state === 'expanded' && <span>{item.name}</span>}
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className='flex items-center gap-3 p-2 rounded-md'>
              <Avatar>
                <AvatarImage src='https://github.com/juwita.png' alt='Juwita' />
                <AvatarFallback>J</AvatarFallback>
              </Avatar>
              {state === 'expanded' && 
                <div className='flex flex-col grow-1'>
                  <p className='font-semibold text-sm'>Juwita</p>
                  <p className='text-xs text-sidebar-foreground/70'>juvv@hr-mikom.com</p>
                </div>
              }
              {state === 'expanded' && <LogOut className='h-5 w-5 text-sidebar-foreground/70' />}
            </div>
        </SidebarFooter>
      </>
    );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
};
