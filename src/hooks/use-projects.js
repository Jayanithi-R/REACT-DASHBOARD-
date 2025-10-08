import { create } from 'zustand';

const useProjects = create((set) => ({
  projects: [
    {
      id: 'PROJ-001',
      name: 'E-commerce Platform',
      status: 'in-progress',
      assignedDate: '2024-07-01',
      deadline: '2024-09-30',
      description: 'Developing a full-featured e-commerce platform with a modern tech stack.',
      team: ['U001', 'U002', 'U003'],
      tasks: ['TASK-001', 'TASK-002']
    },
    {
        id: 'PROJ-002',
        name: 'Mobile App for Task Management',
        status: 'completed',
        assignedDate: '2024-05-15',
        deadline: '2024-07-20',
        description: 'A mobile application to help users manage their daily tasks efficiently.',
        team: ['U004', 'U005'],
        tasks: ['TASK-003']
    }
  ],
  tasks: [
    {
      id: 'TASK-001',
      projectId: 'PROJ-001',
      title: 'Set up project structure',
      status: 'completed',
      assignee: 'U001',
      type: 'Development',
      completed: true
    },
    {
      id: 'TASK-002',
      projectId: 'PROJ-001',
      title: 'Design the database schema',
      status: 'in-progress',
      assignee: 'U002',
      type: 'Database',
      completed: false
    },
    {
        id: 'TASK-003',
        projectId: 'PROJ-002',
        title: 'Develop the main user interface',
        status: 'completed',
        assignee: 'U004',
        type: 'UI/UX Design',
        completed: true
    }
  ],
  users: [
    { id: 'U001', name: 'Alice' },
    { id: 'U002', name: 'Bob' },
    { id: 'U003', name: 'Charlie' },
    { id: 'U004', name: 'David' },
    { id: 'U005', name: 'Eve' }
  ],

  createTask: (task) => set((state) => ({ tasks: [...state.tasks, { ...task, id: `TASK-${Date.now()}` }] })),
  updateTaskStatus: (taskId, status) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, status, completed: status === 'completed' } : task
    ),
  })),
  updateProjectStatus: (projectId, status) => set((state) => ({
    projects: state.projects.map((project) =>
      project.id === projectId ? { ...project, status } : project
    ),
  })),
  requestDeadlineExtension: (projectId, newDeadline) => set((state) => ({
    projects: state.projects.map((project) =>
      project.id === projectId ? { ...project, deadline: newDeadline } : project
    ),
  })),
}));

export { useProjects };
