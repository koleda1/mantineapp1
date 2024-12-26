'use client';

import { Modal, Text, Group, Stack, Badge, Button, ActionIcon, Textarea, TextInput, Select } from '@mantine/core';
import { Task } from '@/types';
import { IconPlayerPlay, IconPlayerStop, IconCheck, IconPencil, IconX } from '@tabler/icons-react';
import { useState } from 'react';

interface TaskModalProps {
  task: Task | null;
  opened: boolean;
  onClose: () => void;
  onTaskUpdate?: (updatedTask: Task) => void;
  isTimerRunning?: boolean;
  onToggleTimer?: () => void;
  completed?: boolean;
  completedIn?: number;
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

export function TaskModal({ 
  task, 
  opened, 
  onClose, 
  onTaskUpdate,
  isTimerRunning = false,
  onToggleTimer,
  completed = false,
  completedIn
}: TaskModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  // Reset edited task when modal opens with new task
  if (task && (!editedTask || editedTask.id !== task.id)) {
    setEditedTask(task);
  }

  const handleSave = () => {
    if (editedTask && onTaskUpdate) {
      onTaskUpdate(editedTask);
    }
    setIsEditing(false);
  };

  if (!task) return null;

  return (
    <Modal 
      opened={opened} 
      onClose={onClose}
      size="lg"
      title={
        <Group justify="space-between" w="100%">
          <Text size="lg" fw={500}>Task Details</Text>
          {!isEditing && (
            <Group>
              {onToggleTimer && (
                <ActionIcon
                  variant="light"
                  color={completed ? 'green' : isTimerRunning ? 'red' : 'blue'}
                  onClick={onToggleTimer}
                  size="lg"
                >
                  {completed ? (
                    <IconCheck size={20} />
                  ) : isTimerRunning ? (
                    <IconPlayerStop size={20} />
                  ) : (
                    <IconPlayerPlay size={20} />
                  )}
                </ActionIcon>
              )}
              <ActionIcon
                variant="light"
                onClick={() => setIsEditing(true)}
                size="lg"
              >
                <IconPencil size={20} />
              </ActionIcon>
            </Group>
          )}
        </Group>
      }
    >
      {isEditing ? (
        <Stack>
          <TextInput
            label="Task Name"
            value={editedTask?.name || ''}
            onChange={(e) => setEditedTask(prev => prev ? { ...prev, name: e.target.value } : null)}
          />
          <Select
            label="Status"
            value={editedTask?.status || ''}
            onChange={(value) => setEditedTask(prev => prev ? { ...prev, status: value || prev.status } : null)}
            data={[
              'Not Started',
              'In Progress',
              'Completed',
              'On Hold',
              'Cancelled'
            ]}
          />
          <TextInput
            label="Due Date"
            type="date"
            value={editedTask?.dueDate || ''}
            onChange={(e) => setEditedTask(prev => prev ? { ...prev, dueDate: e.target.value } : null)}
          />
          <Textarea
            label="Description"
            value={editedTask?.description || ''}
            onChange={(e) => setEditedTask(prev => prev ? { ...prev, description: e.target.value } : null)}
            minRows={3}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="light" color="red" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </Group>
        </Stack>
      ) : (
        <Stack>
          <Group justify="space-between" wrap="nowrap">
            <Text size="xl" fw={500}>{task.name}</Text>
            <Badge size="lg" color={getStatusColor(task.status)}>
              {task.status}
            </Badge>
          </Group>

          {task.description && (
            <Text c="dimmed" size="sm">
              {task.description}
            </Text>
          )}

          <Group>
            <Text size="sm" fw={500}>Due Date:</Text>
            <Text size="sm">{task.dueDate}</Text>
          </Group>

          {completed && completedIn && (
            <Group>
              <Text size="sm" fw={500}>Completed in:</Text>
              <Text size="sm">{formatDuration(completedIn)}</Text>
            </Group>
          )}

          {task.assignedTo && task.assignedTo.length > 0 && (
            <Group>
              <Text size="sm" fw={500}>Assigned to:</Text>
              <Text size="sm">{task.assignedTo.join(', ')}</Text>
            </Group>
          )}

          {task.dependencies && task.dependencies.length > 0 && (
            <Group>
              <Text size="sm" fw={500}>Dependencies:</Text>
              <Text size="sm">{task.dependencies.join(', ')}</Text>
            </Group>
          )}
        </Stack>
      )}
    </Modal>
  );
} 