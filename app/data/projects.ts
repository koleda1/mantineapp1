export interface Project {
  id: number;
  name: string;
  type: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold' | 'Cancelled';
  startDate: string;
  endDate: string;
  description?: string;
  assignedTo: number[]; // people ids
  taskIds: number[]; // task ids
  templateId?: number; // project template id
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'Summer Instagram Campaign',
    type: 'Insta Post',
    status: 'In Progress',
    startDate: '2024-01-01',
    endDate: '2024-01-15',
    description: 'Summer themed Instagram content series',
    assignedTo: [1, 2],
    taskIds: [1, 2, 3],
    templateId: 1
  },
  {
    id: 2,
    name: 'Valentine Special',
    type: 'OF Special Post',
    status: 'Planning',
    startDate: '2024-02-01',
    endDate: '2024-02-14',
    description: 'Valentine\'s day special content',
    assignedTo: [1, 3],
    taskIds: [4, 5],
    templateId: 2
  }
]; 