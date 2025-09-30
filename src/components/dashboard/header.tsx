import { Bell, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '../ui/input';

export function DashboardHeader() {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

  return (
    <div className="flex items-center justify-between w-full">
        <div>
            <h1 className="text-2xl font-bold">Juwita</h1>
            <p className="text-muted-foreground">Welcome back to HRsync 👋</p>
        </div>
      <div className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
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
        <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
        </Button>
        <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
        </Button>
        <Button>+ Create Request</Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src={userAvatar?.imageUrl} alt="Juwita" data-ai-hint={userAvatar?.imageHint} />
          <AvatarFallback>J</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
