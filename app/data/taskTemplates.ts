export interface TaskTemplate {
  id: number;
  name: string;
  description?: string;
  typeId: number; // task type id
  estimatedDuration: number; // in hours
  requiredRoles: number[]; // role ids
  dependencyTemplateIds?: number[]; // other task template ids that must be completed first
}

export const taskTemplates: TaskTemplate[] = [
  {
    id: 1,
    name: 'Photo Shoot Template',
    description: 'Standard photo shoot process',
    typeId: 1,
    estimatedDuration: 4,
    requiredRoles: [1] // photographer
  },
  {
    id: 2,
    name: 'Photo Editing Template',
    description: 'Standard photo editing process',
    typeId: 2,
    estimatedDuration: 3,
    requiredRoles: [2], // editor
    dependencyTemplateIds: [1]
  },
  {
    id: 3,
    name: 'Social Media Post Creation',
    description: 'Create and schedule social media posts',
    typeId: 3,
    estimatedDuration: 2,
    requiredRoles: [3], // social media manager
    dependencyTemplateIds: [2]
  }
]; 