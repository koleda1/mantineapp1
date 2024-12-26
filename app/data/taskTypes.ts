export interface TaskType {
  id: number;
  name: string;
  description?: string;
  category: 'Production' | 'Post-Production' | 'Marketing' | 'Administrative';
  defaultDuration: number; // in hours
  requiredRoles: number[]; // role ids
}

export const taskTypes: TaskType[] = [
  {
    id: 1,
    name: 'Photo Shoot',
    description: 'Professional photo shooting session',
    category: 'Production',
    defaultDuration: 4,
    requiredRoles: [1] // photographer
  },
  {
    id: 2,
    name: 'Photo Editing',
    description: 'Photo editing and retouching',
    category: 'Post-Production',
    defaultDuration: 3,
    requiredRoles: [2] // editor
  },
  {
    id: 3,
    name: 'Social Media Post',
    description: 'Create and schedule social media content',
    category: 'Marketing',
    defaultDuration: 2,
    requiredRoles: [3] // social media manager
  },
  {
    id: 4,
    name: 'Content Creation',
    description: 'Create original content',
    category: 'Production',
    defaultDuration: 6,
    requiredRoles: [4] // content creator
  }
]; 