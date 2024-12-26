export interface Role {
  id: number;
  name: string;
  description?: string;
  permissions: string[];
  defaultHourlyRate?: number;
}

export const roles: Role[] = [
  {
    id: 1,
    name: 'Photographer',
    description: 'Takes and manages photo shoots',
    permissions: ['create_shoot', 'upload_photos', 'edit_shoot'],
    defaultHourlyRate: 75
  },
  {
    id: 2,
    name: 'Editor',
    description: 'Edits and retouches photos and videos',
    permissions: ['edit_media', 'upload_edited'],
    defaultHourlyRate: 60
  },
  {
    id: 3,
    name: 'Social Media Manager',
    description: 'Manages social media content and scheduling',
    permissions: ['create_post', 'schedule_post', 'analyze_metrics'],
    defaultHourlyRate: 55
  },
  {
    id: 4,
    name: 'Content Creator',
    description: 'Creates and manages content',
    permissions: ['create_content', 'edit_content', 'upload_content'],
    defaultHourlyRate: 70
  }
]; 