export interface Task {
  id: number;
  name: string;
  description?: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked';
  typeId: number; // task type id
  assignedTo: number[]; // people ids
  projectId: number;
  dueDate: string;
  templateId?: number; // task template id
  dependencies?: number[]; // task ids that must be completed before this task
  uploads?: number[]; // upload ids
}

export const tasks: Task[] = [
  {
    id: 1,
    name: 'Photo Shoot',
    description: 'Summer themed photo shoot',
    status: 'Completed',
    typeId: 1,
    assignedTo: [1, 2],
    projectId: 1,
    dueDate: '2024-01-05',
    templateId: 1,
    uploads: [1, 2]
  },
  {
    id: 2,
    name: 'Photo Editing',
    description: 'Edit and retouch summer photos',
    status: 'In Progress',
    typeId: 2,
    assignedTo: [2],
    projectId: 1,
    dueDate: '2024-01-10',
    templateId: 2,
    dependencies: [1]
  },
  {
    id: 3,
    name: 'Post Creation',
    description: 'Create Instagram posts with edited photos',
    status: 'Not Started',
    typeId: 3,
    assignedTo: [1],
    projectId: 1,
    dueDate: '2024-01-15',
    templateId: 3,
    dependencies: [2]
  }
]; 