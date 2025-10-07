import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Plus, Search, ChevronDown, ChevronRight, Edit, User, Link, Trash } from 'lucide-react';

export function BacklogPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Backlog</h1>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search backlog" className="w-64" />
          <Button variant="outline">Filter</Button>
          <Button variant="outline">View</Button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ChevronDown className="h-5 w-5" />
              <h2 className="font-semibold">SCRUM Sprint 1 (2 work items)</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">Start sprint</Button>
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between p-2 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox id="task1" />
                <label htmlFor="task1" className="font-medium">jjhjjjji</label>
              </div>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">TO DO</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>In Progress</DropdownMenuItem>
                    <DropdownMenuItem>Done</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <User className="h-5 w-5 text-gray-500" />
              </div>
            </div>
            <div className="flex items-center justify-between p-2 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox id="task2" />
                <label htmlFor="task2" className="font-medium">Create schedule details page</label>
              </div>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">TO DO</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>In Progress</DropdownMenuItem>
                    <DropdownMenuItem>Done</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <User className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <Button variant="ghost" size="sm"><Plus className="h-4 w-4 mr-2" />Create</Button>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ChevronRight className="h-5 w-5" />
              <h2 className="font-semibold">Backlog (0 work items)</h2>
            </div>
            <Button>Create sprint</Button>
          </div>
          <div className="mt-4 text-center text-gray-500 border-2 border-dashed border-gray-300 p-6 rounded-lg">
            <p>Your backlog is empty.</p>
          </div>
          <div className="mt-2">
            <Button variant="ghost" size="sm"><Plus className="h-4 w-4 mr-2" />Create</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
