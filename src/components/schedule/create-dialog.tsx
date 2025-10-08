
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Upload,
  Link,
  Users,
  Flag,
  Calendar,
  ChevronDown,
} from "lucide-react";

export function CreateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
          <DialogDescription>
            Required fields are marked with an asterisk *
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project" className="text-right">
              Project *
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="My Scrum Project (SCRUM)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scrum">My Scrum Project (SCRUM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="work-type" className="text-right">
              Work type *
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Task" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="task">Task</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="To Do" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="inreview">In Review</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="summary" className="text-right">
              Summary *
            </Label>
            <Input id="summary" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <div className="col-span-3">
              <Textarea id="description" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="assignee" className="text-right">
              Assignee
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Automatic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="automatic">Automatic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Medium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medium">Medium</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="parent" className="text-right">
              Parent
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select parent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parent1">Parent 1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="due-date" className="text-right">
              Due date
            </Label>
            <div className="col-span-3 flex items-center">
              <Input type="date" id="due-date" />
              <Calendar className="ml-2 h-4 w-4" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="labels" className="text-right">
              Labels
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select label" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="label1">Label 1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="team" className="text-right">
              Team
            </Label>
            <div className="col-span-3 flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <Input placeholder="Choose a team" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sprint" className="text-right">
              Sprint
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select sprint" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sprint1">Sprint 1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="story-points" className="text-right">
              Story point estimate
            </Label>
            <Input id="story-points" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reporter" className="text-right">
              Reporter *
            </Label>
            <Input id="reporter" value="JAYANITHI R MTECH CSE" disabled className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="attachment" className="text-right">
              Attachment
            </Label>
            <div className="col-span-3">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Drop files to attach or browse
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="linked-work" className="text-right">
              Linked Work items
            </Label>
            <div className="col-span-3">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="blocks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blocks">blocks</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Type, search or paste URL" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="restrict" className="text-right">
              Restrict to
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="flagged" className="text-right">
              Flagged
            </Label>
            <div className="col-span-3 flex items-center">
              <Checkbox id="impediment" />
              <Label htmlFor="impediment" className="ml-2">Impediment</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="flex items-center">
            <Checkbox id="create-another" />
            <Label htmlFor="create-another" className="ml-2">Create another</Label>
          </div>
          <Button variant="ghost">Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
