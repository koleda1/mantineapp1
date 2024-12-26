export interface ProjectTemplate {
  id: number;
  name: string;
  type: string;
  description?: string;
  taskTemplateIds: number[]; // task template ids
  estimatedDuration: number; // in days
  requiredRoles: number[]; // role ids
}

export const projectTemplates: ProjectTemplate[] = [
  {
    id: 1,
    name: 'Standard Instagram Post',
    type: 'Insta Post',
    description: 'Template for regular Instagram posts',
    taskTemplateIds: [1, 2, 3],
    estimatedDuration: 14,
    requiredRoles: [1, 2, 3] // photographer, editor, social media manager
  },
  {
    id: 2,
    name: 'OF Special Content',
    type: 'OF Special Post',
    description: 'Template for special OF content',
    taskTemplateIds: [4, 5, 6],
    estimatedDuration: 7,
    requiredRoles: [1, 2, 4] // photographer, editor, content creator
  }
]; 