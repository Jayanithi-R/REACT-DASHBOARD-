'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, LayoutGrid, List, MoreVertical } from 'lucide-react';
import { useProjects } from '@/hooks/use-projects';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function ProjectsPageContent() {
  const [layout, setLayout] = useState('grid');
  const { projects, tasks, users, updateTaskStatus, updateProjectStatus } = useProjects();

  const getTasksForProject = (projectId) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const getUser = (userId) => {
    return users.find(user => user.id === userId);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => {}} className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
          <Tabs value={layout} onValueChange={setLayout} className="hidden sm:block">
            <TabsList>
              <TabsTrigger value="grid" className="p-2">
                <LayoutGrid className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger value="list" className="p-2">
                <List className="h-5 w-5" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="on-hold">On Hold</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
            <ProjectGrid projects={projects} getTasksForProject={getTasksForProject} getUser={getUser} updateTaskStatus={updateTaskStatus} />
        </TabsContent>
         <TabsContent value="in-progress">
            <ProjectGrid projects={projects.filter(p => p.status === 'in-progress')} getTasksForProject={getTasksForProject} getUser={getUser} updateTaskStatus={updateTaskStatus} />
        </TabsContent>
         <TabsContent value="completed">
            <ProjectGrid projects={projects.filter(p => p.status === 'completed')} getTasksForProject={getTasksForProject} getUser={getUser} updateTaskStatus={updateTaskStatus} />
        </TabsContent>
         <TabsContent value="on-hold">
            <ProjectGrid projects={projects.filter(p => p.status === 'on-hold')} getTasksForProject={getTasksForProject} getUser={getUser} updateTaskStatus={updateTaskStatus} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProjectGrid({ projects, getTasksForProject, getUser, updateTaskStatus }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {project.name}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Request Extension</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
              <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>Assigned: {project.assignedDate}</span>
                  <span>Deadline: {project.deadline}</span>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Tasks</h4>
                {getTasksForProject(project.id).map(task => (
                  <div key={task.id} className="flex justify-between items-center mb-2">
                    <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">Assigned to: {getUser(task.assignee)?.name}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className={task.completed ? 'border-green-500 text-green-500' : ''}>
                          {task.status}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => updateTaskStatus(task.id, 'in-progress')}>In Progress</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateTaskStatus(task.id, 'completed')}>Completed</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
}
