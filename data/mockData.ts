import { Task, TaskType, Project } from '@/types';

export const taskTypes: TaskType[] = [
  { id: 1, name: 'Planning', category: 'Pre-Production' },
  { id: 2, name: 'Script Writing', category: 'Pre-Production' },
  { id: 3, name: 'Location Scouting', category: 'Pre-Production' },
  { id: 4, name: 'Shooting', category: 'Production' },
  { id: 5, name: 'Editing', category: 'Post-Production' },
  { id: 6, name: 'Review', category: 'Post-Production' },
];

export const mockTasks: Task[] = [
  {
    id: 1,
    name: 'Write initial script',
    status: 'In Progress',
    dueDate: '2024-01-25',
    projectId: 1,
    typeId: 2
  },
  {
    id: 2,
    name: 'Scout locations',
    status: 'Planning',
    dueDate: '2024-01-26',
    projectId: 1,
    typeId: 3
  },
  {
    id: 3,
    name: 'Main shoot',
    status: 'Planning',
    dueDate: '2024-01-27',
    projectId: 1,
    typeId: 4
  },
  {
    id: 4,
    name: 'Review content',
    status: 'Completed',
    dueDate: '2024-01-22',
    projectId: 2,
    typeId: 6
  },
  {
    id: 5,
    name: 'Final edits',
    status: 'In Progress',
    dueDate: '2024-01-23',
    projectId: 2,
    typeId: 5
  }
];

export const mockProjects: Project[] = [
  { id: 1, name: 'Project Alpha', status: 'In Progress', startDate: '2023-01-01', endDate: '2023-12-31' },
  { id: 2, name: 'Project Beta', status: 'Completed', startDate: '2023-03-15', endDate: '2023-09-30' },
  { id: 3, name: 'Project Gamma', status: 'Planning', startDate: '2024-01-01', endDate: '2024-06-30' },
]; 