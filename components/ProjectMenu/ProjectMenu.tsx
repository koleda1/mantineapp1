'use client';

import { Modal, Tabs, Text, Group, Button, Stack, Badge } from '@mantine/core';
import { IconCalendar, IconList, IconSettings, IconUsers, IconFile } from '@tabler/icons-react';
import { Project, Task } from '@/types';

interface ProjectMenuProps {
  project: Project | null;
  opened: boolean;
  onClose: () => void;
  tasks: Task[];
}

export function ProjectMenu({ project, opened, onClose, tasks }: ProjectMenuProps) {
  if (!project) return null;

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      size="xl"
      title={
        <Group>
          <Text size="lg" fw={500}>{project.name}</Text>
          <Badge color={getStatusColor(project.status)} variant="light">
            {project.status}
          </Badge>
        </Group>
      }
    >
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview" leftSection={<IconList size={16} />}>
            Overview
          </Tabs.Tab>
          <Tabs.Tab value="schedule" leftSection={<IconCalendar size={16} />}>
            Schedule
          </Tabs.Tab>
          <Tabs.Tab value="team" leftSection={<IconUsers size={16} />}>
            Team
          </Tabs.Tab>
          <Tabs.Tab value="files" leftSection={<IconFile size={16} />}>
            Files
          </Tabs.Tab>
          <Tabs.Tab value="settings" leftSection={<IconSettings size={16} />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview" pt="md">
          <Stack>
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed">Start Date</Text>
                <Text>{project.startDate}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">End Date</Text>
                <Text>{project.endDate}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">Tasks</Text>
                <Text>{tasks.length} total</Text>
              </div>
            </Group>

            <Text size="sm" fw={500} mt="md">Recent Activity</Text>
            {tasks.map(task => (
              <div key={task.id} style={{ padding: '8px', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                <Group justify="space-between">
                  <Text size="sm">{task.name}</Text>
                  <Badge size="sm" color={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </Group>
                <Text size="xs" c="dimmed">Due: {task.dueDate}</Text>
              </div>
            ))}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="schedule" pt="md">
          <Text>Calendar and timeline view will go here</Text>
        </Tabs.Panel>

        <Tabs.Panel value="team" pt="md">
          <Text>Team members and roles will go here</Text>
        </Tabs.Panel>

        <Tabs.Panel value="files" pt="md">
          <Text>Project files and documents will go here</Text>
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="md">
          <Text>Project settings will go here</Text>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
}

function getStatusColor(status: string) {
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
} 