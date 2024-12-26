'use client';

import { Paper, Title, Grid, Stack, Text, Badge, Group, ActionIcon } from '@mantine/core';
import { IconPlayerPlay, IconPlayerStop, IconCheck, IconClock, IconCalendar } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { Task } from '@/types';
import { tasks } from '@/app/data/tasks';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface SOPTask extends Task {
  isClockTask?: boolean;
  isComplete?: boolean;
  projectId?: number;
  typeId?: number;
}

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

export function TodayView() {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<number | null>(null);
  const [clockOutTime, setClockOutTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [taskStates, setTaskStates] = useState<{ [key: number]: { isTimerRunning: boolean; completed: boolean; startTime?: number; completedIn?: number } }>({});

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (clockedIn && clockInTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - clockInTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [clockedIn, clockInTime]);

  const handleClockIn = () => {
    const now = Date.now();
    setClockInTime(now);
    setClockedIn(true);
    setClockOutTime(null);
    setElapsedTime(0);
  };

  const handleClockOut = () => {
    const now = Date.now();
    setClockOutTime(now);
    setClockedIn(false);
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleTaskTimer = (taskId: number) => {
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

  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Photo Shoot - Project Alpha',
      start: '2024-01-20T10:00:00',
      end: '2024-01-20T12:00:00',
      backgroundColor: 'var(--mantine-color-blue-6)'
    },
    {
      id: '2',
      title: 'Content Review - Project Beta',
      start: '2024-01-22T14:00:00',
      end: '2024-01-22T15:30:00',
      backgroundColor: 'var(--mantine-color-green-6)'
    }
  ]);

  const handleEventClick = (info: any) => {
    console.log('Event clicked:', info.event);
  };

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt('Please enter a title for the new event:');
    if (title) {
      const newEvent = {
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        backgroundColor: 'var(--mantine-color-blue-6)'
      };
      setEvents([...events, newEvent]);
    }
  };

  // Filter tasks
  const today = new Date().toISOString().split('T')[0];
  const endOfWeek = new Date();
  endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
  const endOfWeekStr = endOfWeek.toISOString().split('T')[0];

  const todaysTasks = tasks.filter(task => task.dueDate === today);
  const thisWeeksTasks = tasks.filter(task => 
    task.dueDate > today && task.dueDate <= endOfWeekStr
  ).slice(0, 5);

  const sopTasks: SOPTask[] = [
    {
      id: -1, // Using negative IDs for special tasks
      name: 'Clock In',
      status: clockedIn ? 'Completed' : 'Not Started',
      dueDate: new Date().toISOString(),
      isClockTask: true,
      isComplete: clockedIn
    },
    ...tasks.filter(task => task.typeId === 1 || task.typeId === 2), // Regular SOP tasks
    {
      id: -2,
      name: 'Clock Out',
      status: clockOutTime ? 'Completed' : clockedIn ? 'In Progress' : 'Not Started',
      dueDate: new Date().toISOString(),
      isClockTask: true,
      isComplete: Boolean(clockOutTime)
    }
  ];
  const projectTasks = tasks.filter(task => task.typeId === 3 || task.typeId === 4);

  const getTaskColor = (task: SOPTask) => {
    if (task.isClockTask) {
      if (task.name === 'Clock In') {
        return clockedIn ? 'green' : 'blue';
      } else if (task.name === 'Clock Out') {
        return clockOutTime ? 'green' : clockedIn ? 'yellow' : 'gray';
      }
    }
    return task.status === 'Completed' ? 'green' : 'blue';
  };

  return (
    <Stack gap="md">
      <Grid gutter="md">
        <Grid.Col span={8}>
          <Paper withBorder p="md">
            <FullCalendar
              plugins={[timeGridPlugin, interactionPlugin]}
              initialView="timeGridDay"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: ''
              }}
              events={events}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              eventClick={handleEventClick}
              select={handleDateSelect}
              allDaySlot={false}
              slotMinTime="06:00:00"
              slotMaxTime="22:00:00"
              height="70vh"
            />
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Stack gap="md">
            <Paper withBorder p="md">
              <Title order={4} mb="md">Today's Tasks</Title>
              {todaysTasks.length === 0 ? (
                <Text c="dimmed" ta="center" py="xl">No tasks due today</Text>
              ) : (
                todaysTasks.map(task => {
                  const taskState = taskStates[task.id] || { isTimerRunning: false, completed: false };
                  return (
                    <div 
                      key={task.id}
                      style={{ 
                        padding: '12px',
                        borderBottom: '1px solid var(--mantine-color-gray-2)',
                        backgroundColor: 'var(--mantine-color-white)'
                      }}
                    >
                      <Group justify="space-between" mb={4}>
                        <Text 
                          size="sm"
                          style={{ 
                            textDecoration: taskState.completed ? 'line-through' : 'none',
                            opacity: taskState.completed ? 0.7 : 1
                          }}
                        >
                          {task.name}
                        </Text>
                        <ActionIcon
                          variant="light"
                          color={taskState.completed ? 'green' : taskState.isTimerRunning ? 'red' : 'blue'}
                          onClick={() => toggleTaskTimer(task.id)}
                          disabled={!clockedIn}
                        >
                          {taskState.completed ? (
                            <IconCheck size={16} />
                          ) : taskState.isTimerRunning ? (
                            <IconPlayerStop size={16} />
                          ) : (
                            <IconPlayerPlay size={16} />
                          )}
                        </ActionIcon>
                      </Group>
                      <Group justify="space-between">
                        <Badge size="sm" color={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        {taskState.completed && taskState.completedIn && (
                          <Text size="xs" c="dimmed">
                            Completed in: {formatDuration(taskState.completedIn)}
                          </Text>
                        )}
                      </Group>
                    </div>
                  );
                })
              )}
            </Paper>

            <Paper withBorder p="md">
              <Title order={4} mb="md">This Week</Title>
              {thisWeeksTasks.map(task => (
                <div 
                  key={task.id}
                  style={{ 
                    padding: '12px',
                    borderBottom: '1px solid var(--mantine-color-gray-2)'
                  }}
                >
                  <Text size="sm" mb={4}>{task.name}</Text>
                  <Group justify="space-between">
                    <Badge size="sm" color={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                    <Text size="xs" c="dimmed">Due: {task.dueDate}</Text>
                  </Group>
                </div>
              ))}
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>

      <Grid gutter="md">
        <Grid.Col span={6}>
          <Paper withBorder p="md">
            <Title order={4} mb="md">SOP Tasks</Title>
            <Stack gap="xs">
              {sopTasks.map(task => (
                <Paper
                  key={task.id}
                  withBorder
                  p="sm"
                  style={{
                    borderColor: task.isClockTask ? `var(--mantine-color-${getTaskColor(task)}-6)` : undefined,
                    backgroundColor: task.isClockTask ? `var(--mantine-color-${getTaskColor(task)}-0)` : undefined
                  }}
                >
                  <Group justify="space-between" wrap="nowrap">
                    <Group wrap="nowrap" gap="xs">
                      <ActionIcon
                        variant="light"
                        color={getTaskColor(task)}
                        onClick={() => {
                          if (task.isClockTask) {
                            if (task.name === 'Clock In') {
                              handleClockIn();
                            } else if (task.name === 'Clock Out') {
                              handleClockOut();
                            }
                          } else {
                            toggleTaskTimer(task.id);
                          }
                        }}
                        disabled={
                          (task.name === 'Clock Out' && !clockedIn) ||
                          (task.isComplete) ||
                          (!clockedIn && !task.isClockTask)
                        }
                      >
                        {task.isComplete ? (
                          <IconCheck size={16} />
                        ) : task.isClockTask ? (
                          <IconClock size={16} />
                        ) : taskStates[task.id]?.isTimerRunning ? (
                          <IconPlayerStop size={16} />
                        ) : (
                          <IconPlayerPlay size={16} />
                        )}
                      </ActionIcon>
                      <Text size="sm" style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>
                        {task.name}
                      </Text>
                    </Group>
                    <Group gap="xs" wrap="nowrap">
                      {task.isClockTask && clockInTime && (
                        <Text size="sm" c="dimmed">
                          {task.name === 'Clock In' && clockedIn && !clockOutTime && (
                            formatDuration(elapsedTime)
                          )}
                          {task.name === 'Clock Out' && clockOutTime && (
                            `Total: ${formatDuration(clockOutTime - clockInTime)}`
                          )}
                        </Text>
                      )}
                      {!task.isClockTask && taskStates[task.id]?.completedIn && (
                        <Text size="sm" c="dimmed">
                          {formatDuration(taskStates[task.id].completedIn!)}
                        </Text>
                      )}
                      <Badge 
                        color={getTaskColor(task)}
                        variant={task.isClockTask ? "filled" : "light"}
                      >
                        {task.status}
                      </Badge>
                    </Group>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={6}>
          <Paper withBorder p="md">
            <Title order={4} mb="md">Project Tasks</Title>
            <Stack gap="xs">
              {projectTasks.map(task => {
                const taskState = taskStates[task.id] || { isTimerRunning: false, completed: false };
                return (
                  <Paper
                    key={task.id}
                    withBorder
                    p="sm"
                  >
                    <Group justify="space-between" wrap="nowrap">
                      <Group wrap="nowrap" gap="xs">
                        <ActionIcon
                          variant="light"
                          color={taskState.completed ? 'green' : taskState.isTimerRunning ? 'red' : 'blue'}
                          onClick={() => toggleTaskTimer(task.id)}
                          disabled={!clockedIn}
                        >
                          {taskState.completed ? (
                            <IconCheck size={16} />
                          ) : taskState.isTimerRunning ? (
                            <IconPlayerStop size={16} />
                          ) : (
                            <IconPlayerPlay size={16} />
                          )}
                        </ActionIcon>
                        <Text size="sm" style={{ textDecoration: taskState.completed ? 'line-through' : 'none' }}>
                          {task.name}
                        </Text>
                      </Group>
                      <Group gap="xs" wrap="nowrap">
                        {taskState.completedIn && (
                          <Text size="sm" c="dimmed">
                            {formatDuration(taskState.completedIn)}
                          </Text>
                        )}
                        <Badge color={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </Group>
                    </Group>
                  </Paper>
                );
              })}
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
} 