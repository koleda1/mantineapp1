export interface Upload {
  id: number;
  filename: string;
  url: string;
  type: 'image' | 'video' | 'document' | 'other';
  size: number; // in bytes
  uploadedBy: number; // person id
  uploadedAt: string;
  taskId?: number;
  projectId: number;
  metadata?: {
    width?: number;
    height?: number;
    duration?: number; // for videos, in seconds
    mimeType?: string;
  };
}

export const uploads: Upload[] = [
  {
    id: 1,
    filename: 'summer_shoot_1.jpg',
    url: '/uploads/summer_shoot_1.jpg',
    type: 'image',
    size: 2048576, // 2MB
    uploadedBy: 1,
    uploadedAt: '2024-01-05T10:30:00Z',
    taskId: 1,
    projectId: 1,
    metadata: {
      width: 1920,
      height: 1080,
      mimeType: 'image/jpeg'
    }
  },
  {
    id: 2,
    filename: 'summer_shoot_2.jpg',
    url: '/uploads/summer_shoot_2.jpg',
    type: 'image',
    size: 3145728, // 3MB
    uploadedBy: 1,
    uploadedAt: '2024-01-05T10:35:00Z',
    taskId: 1,
    projectId: 1,
    metadata: {
      width: 1920,
      height: 1080,
      mimeType: 'image/jpeg'
    }
  }
]; 