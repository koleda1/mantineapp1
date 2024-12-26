'use client';

import { Table, Badge, ActionIcon, Text, Group, Stack, Paper } from '@mantine/core';
import { IconChevronDown, IconChevronRight, IconPlayerPlay, IconPlayerStop, IconCheck, IconGripVertical, IconUpload, IconFileText, IconPlus } from '@tabler/icons-react';
import { useState, Fragment, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Task, Project, TaskState, GroupedTasks, TaskType } from '@/types';
import { ProjectMenu } from '@/components/ProjectMenu';

// Mock data (temporary, will be moved to a proper data file)
const taskTypes: TaskType[] = [
  { id: 1, name: 'Planning', category: 'Pre-Production' },
  { id: 2, name: 'Script Writing', category: 'Pre-Production' },
  { id: 3, name: 'Location Scouting', category: 'Pre-Production' },
  { id: 4, name: 'Shooting', category: 'Production' },
  { id: 5, name: 'Editing', category: 'Post-Production' },
  { id: 6, name: 'Review', category: 'Post-Production' },
];

const mockTasks: Task[] = [
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

const mockProjects: Project[] = [
  { id: 1, name: 'Project Alpha', status: 'In Progress', startDate: '2023-01-01', endDate: '2023-12-31' },
  { id: 2, name: 'Project Beta', status: 'Completed', startDate: '2023-03-15', endDate: '2023-09-30' },
  { id: 3, name: 'Project Gamma', status: 'Planning', startDate: '2024-01-01', endDate: '2024-06-30' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In Progress':
      return 'blue';
    case 'Completed':
      return 'green';
    case 'Planning':
      return 'yellow';
    case 'On Hold':
      return 'orange';
    case 'Cancelled':
      return 'red';
    default:
      return 'gray';
  }
};

const formatDuration = (ms: number) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

const groupTasksByPhase = (projectTasks: Task[]) => {
  const grouped: GroupedTasks = {
    'Pre-Production': [],
    'Production': [],
    'Post-Production': []
  };

  projectTasks.forEach(task => {
    const taskType = taskTypes.find(type => type.id === task.typeId);
    if (taskType) {
      grouped[taskType.category].push(task);
    }
  });

  return grouped;
};

export function ProjectsTable() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [taskStates, setTaskStates] = useState<{ [key: number]: TaskState }>({});
  const [groupedTasksState, setGroupedTasksState] = useState<{ [key: number]: GroupedTasks }>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Initialize grouped tasks for each project
  useEffect(() => {
    const initialGroupedTasks: { [key: number]: GroupedTasks } = {};
    mockProjects.forEach(project => {
      const projectTasks = mockTasks.filter(task => task.projectId === project.id);
      initialGroupedTasks[project.id] = groupTasksByPhase(projectTasks);
    });
    setGroupedTasksState(initialGroupedTasks);
  }, []);

  const handleRowClick = (project: Project) => {
    setSelectedProject(project);
  };

  const toggleRow = (projectId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedRows((current) => 
      current.includes(projectId)
        ? current.filter(id => id !== projectId)
        : [...current, projectId]
    );
  };

  const toggleTaskTimer = (taskId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setTaskStates(current => {
      const taskState = current[taskId] || { isTimerRunning: false, completed: false };
      if (taskState.completed) return current;

      const now = Date.now();
      if (!taskState.isTimerRunning) {
        return {
          ...current,
          [taskId]: {
            ...taskState,
            isTimerRunning: true,
            startTime: now
          }
        };
      } else {
        return {
          ...current,
          [taskId]: {
            ...taskState,
            isTimerRunning: false,
            completed: true,
            completedIn: taskState.startTime ? now - taskState.startTime : 0
          }
        };
      }
    });
  };

  const handleDragEnd = (result: any, projectId: number) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourcePhase = source.droppableId;
    const destPhase = destination.droppableId;

    setGroupedTasksState(current => {
      const newGroupedTasks = { ...current };
      const projectTasks = newGroupedTasks[projectId];
      
      const [removed] = projectTasks[sourcePhase as keyof GroupedTasks].splice(source.index, 1);
      projectTasks[destPhase as keyof GroupedTasks].splice(destination.index, 0, removed);

      return newGroupedTasks;
    });
  };

  const handleAddTask = (projectId: number, phase: string) => {
    console.log('Add task to', projectId, 'in phase', phase);
  };

  const rows = mockProjects.map((element, index) => {
    const isExpanded = expandedRows.includes(element.id);
    const groupedTasks = groupedTasksState[element.id] || {
      'Pre-Production': [],
      'Production': [],
      'Post-Production': []
    };

    return (
      <Fragment key={element.id}>
        <Table.Tr 
          style={{ 
            cursor: 'pointer',
            borderBottom: index < mockProjects.length - 1 ? '8px solid var(--mantine-color-gray-1)' : undefined
          }}
          onClick={() => handleRowClick(element)}
        >
          <Table.Td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ActionIcon 
              variant="subtle" 
              onClick={(e) => toggleRow(element.id, e)}
              aria-label="Toggle tasks"
            >
              {isExpanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
            </ActionIcon>
            {element.name}
          </Table.Td>
          <Table.Td>
            <Badge color={getStatusColor(element.status)} variant="light">
              {element.status}
            </Badge>
          </Table.Td>
          <Table.Td>{element.startDate}</Table.Td>
          <Table.Td>{element.endDate}</Table.Td>
        </Table.Tr>
        {isExpanded && (
          <Table.Tr>
            <Table.Td colSpan={4} p={0}>
              <DragDropContext onDragEnd={(result) => handleDragEnd(result, element.id)}>
                {Object.entries(groupedTasks).map(([phase, phaseTasks]) => (
                  <div key={phase} style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                    <div style={{ 
                      backgroundColor: 'var(--mantine-color-gray-0)',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Text size="sm" fw={500} c="dimmed">{phase}</Text>
                      <Group gap="xs">
                        {phase === 'Pre-Production' && (
                          <>
                            <ActionIcon
                              variant="light"
                              color="blue"
                              size="sm"
                              title="Upload Script"
                            >
                              <IconUpload size={16} />
                            </ActionIcon>
                            <ActionIcon
                              variant="light"
                              color="gray"
                              size="sm"
                              title="View Script"
                            >
                              <IconFileText size={16} />
                            </ActionIcon>
                          </>
                        )}
                        <ActionIcon
                          variant="light"
                          color="gray"
                          size="sm"
                          title={`Add ${phase} Task`}
                          onClick={() => handleAddTask(element.id, phase)}
                        >
                          <IconPlus size={16} />
                        </ActionIcon>
                      </Group>
                    </div>
                    <Droppable droppableId={phase}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{ backgroundColor: 'var(--mantine-color-white)' }}
                        >
                          {phaseTasks.map((task: Task, index: number) => {
                            const taskState = taskStates[task.id] || { isTimerRunning: false, completed: false };
                            return (
                              <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      padding: '0.75rem 1rem',
                                      borderBottom: '1px solid var(--mantine-color-gray-2)'
                                    }}
                                  >
                                    <div style={{ 
                                      display: 'flex', 
                                      alignItems: 'center', 
                                      gap: '0.75rem'
                                    }}>
                                      <div {...provided.dragHandleProps}>
                                        <IconGripVertical 
                                          size={16}
                                          style={{ color: 'var(--mantine-color-gray-5)' }}
                                        />
                                      </div>
                                      <ActionIcon
                                        variant="light"
                                        color={taskState.completed ? 'green' : taskState.isTimerRunning ? 'red' : 'blue'}
                                        onClick={(e) => toggleTaskTimer(task.id, e)}
                                        size="sm"
                                      >
                                        {taskState.completed ? (
                                          <IconCheck size={16} />
                                        ) : taskState.isTimerRunning ? (
                                          <IconPlayerStop size={16} />
                                        ) : (
                                          <IconPlayerPlay size={16} />
                                        )}
                                      </ActionIcon>
                                      <div style={{ flex: 1 }}>
                                        <Badge 
                                          size="sm" 
                                          variant="dot" 
                                          color={getStatusColor(task.status)}
                                          style={{ 
                                            textDecoration: taskState.completed ? 'line-through' : 'none',
                                            opacity: taskState.completed ? 0.7 : 1
                                          }}
                                        >
                                          {task.name}
                                        </Badge>
                                        {taskState.completed && taskState.completedIn && (
                                          <Text size="xs" c="dimmed" mt={4}>
                                            Completed in: {formatDuration(taskState.completedIn)}
                                          </Text>
                                        )}
                                      </div>
                                      <Badge 
                                        size="sm" 
                                        color={taskState.completed ? 'green' : getStatusColor(task.status)}
                                      >
                                        {taskState.completed ? 'Completed' : task.status}
                                      </Badge>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </DragDropContext>
            </Table.Td>
          </Table.Tr>
        )}
      </Fragment>
    );
  });

  return (
    <>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Start Date</Table.Th>
            <Table.Th>End Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <ProjectMenu
        project={selectedProject}
        opened={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        tasks={selectedProject ? mockTasks.filter(task => task.projectId === selectedProject.id) : []}
      />
    </>
  );
} 