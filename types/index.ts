export interface Task {
  id: number;
  name: string;
  status: string;
  dueDate: string;
  projectId: number;
  typeId: number;
}

export interface Project {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
}

export interface TaskType {
  id: number;
  name: string;
  category: 'Pre-Production' | 'Production' | 'Post-Production';
}

export interface TaskState {
  isTimerRunning: boolean;
  completed: boolean;
  startTime?: number;
  completedIn?: number;
}

export interface GroupedTasks {
  'Pre-Production': Task[];
  'Production': Task[];
  'Post-Production': Task[];
}

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  backgroundColor?: string;
} 