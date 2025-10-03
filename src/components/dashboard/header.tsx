
import { Bell, Calendar, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '../ui/input';

export function DashboardHeader() {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

  return (
    <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
             <Avatar className="h-12 w-12 hidden sm:flex">
                <AvatarImage src={userAvatar?.imageUrl} alt="Juwita" data-ai-hint={userAvatar?.imageHint} />
                <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-xl sm:text-2xl font-semibold">HRsync Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, Juwita 👋</p>
            </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:inline-flex">
                  <Search className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Search</DialogTitle>
                <DialogDescription>
                  Search for employees, departments, and more.
                </DialogDescription>
              </DialogHeader>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10" />
              </div>
            </DialogContent>
          </Dialog>
           <div className="relative">
            <Button variant="ghost" size="icon" className="h-9 w-9">
                <Bell className="h-5 w-5" />
            </Button>
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </span>
          </div>
          <Button variant="outline" className="hidden lg:flex h-9">
            <Calendar className="h-4 w-4 mr-2"/>
            Schedule
          </Button>
          <Button className="h-9">
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Create Request</span>
          </Button>
        </div>
    </div>
  );
}
