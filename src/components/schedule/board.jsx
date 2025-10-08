'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { TaskCard } from "./task-card";
import { CreateTaskDialog } from "./create-task-dialog"; // Changed from CreateTaskButton
import { StrictModeDroppable } from './strict-mode-droppable';
import projectsData from '@/lib/projects.json';

export function Board() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(projectsData.projects);
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceProjectIndex = projects.findIndex(p => p.id.toString() === source.droppableId);
    const destProjectIndex = projects.findIndex(p => p.id.toString() === destination.droppableId);
    const newProjects = [...projects];
    const [removed] = newProjects[sourceProjectIndex].tasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      newProjects[sourceProjectIndex].tasks.splice(destination.index, 0, removed);
    } else {
      newProjects[destProjectIndex].tasks.splice(destination.index, 0, removed);
    }

    setProjects(newProjects);
  };

  const handleAddTask = (project, title, assignee, dueDate, status, priority) => {
    const newTask = {
      id: Date.now(),
      title: title,
      assignee: assignee,
      due_date: dueDate,
      status: status,
      priority: priority,
      tags: [],
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      comments: 0,
      attachments: 0,
      members: []
    };

    const projectIndex = projects.findIndex(p => p.id === project.id);
    const newProjects = [...projects];
    newProjects[projectIndex].tasks.push(newTask);
    setProjects(newProjects);
  };

  const handleUpdateTask = (updatedTask) => {
    const newProjects = projects.map(project => ({
      ...project,
      tasks: project.tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    }));
    setProjects(newProjects);
  };


  if (!projects.length) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4 sm:p-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div key={project.id} className="bg-white rounded-lg shadow">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold">{project.title}</h3>
                <span className="text-sm text-gray-500 bg-gray-200 rounded-full px-2 py-0.5">{project.tasks.length}</span>
              </div>
              <StrictModeDroppable droppableId={String(project.id)} isDropDisabled={false}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="p-4 bg-gray-100 rounded-lg min-h-[100px]"
                  >
                    {project.tasks && project.tasks.length > 0 && (
                        project.tasks.map((task, taskIndex) => (
                          <Draggable key={task.id} draggableId={String(task.id)} index={taskIndex}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-4"
                              >
                                <TaskCard task={task} onUpdateTask={handleUpdateTask} />
                              </div>
                            )}
                          </Draggable>
                        ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
              <div className="p-2">
                <CreateTaskDialog project={project} onAddTask={handleAddTask} />
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}