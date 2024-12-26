'use client';

import { Container, Title, Paper, Text, Group, Avatar, Stack, Button, Grid, TextInput, Select, Badge, Switch } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { ChangeEvent } from 'react';

interface WorkingHours {
  day: string;
  isWorking: boolean;
  startTime?: string;
  endTime?: string;
}

interface UserProfile {
  name: string;
  email: string;
  role: string;
  hourlyRate: number;
  phone: string;
  avatar: string;
  skills: string[];
  availability: {
    status: 'Available' | 'Busy' | 'Away';
    nextAvailable?: string;
  };
  timezone: string;
  workingHours: WorkingHours[];
}

const userProfile: UserProfile = {
  name: 'Alice Johnson',
  email: 'alice@example.com',
  role: 'Content Creator',
  hourlyRate: 75,
  phone: '555-0101',
  avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
  skills: ['Photography', 'Content Creation', 'Social Media'],
  availability: {
    status: 'Available',
    nextAvailable: '2024-01-20'
  },
  timezone: 'America/Los_Angeles',
  workingHours: [
    { day: 'Monday', isWorking: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Tuesday', isWorking: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Wednesday', isWorking: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Thursday', isWorking: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Friday', isWorking: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Saturday', isWorking: false },
    { day: 'Sunday', isWorking: false }
  ]
};

export default function ProfilePage() {
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>(userProfile.workingHours);

  const handleWorkingDayToggle = (index: number) => {
    setWorkingHours(current => {
      const updated = [...current];
      updated[index] = {
        ...updated[index],
        isWorking: !updated[index].isWorking,
        startTime: !updated[index].isWorking ? '09:00' : undefined,
        endTime: !updated[index].isWorking ? '17:00' : undefined
      };
      return updated;
    });
  };

  const handleTimeChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    setWorkingHours(current => {
      const updated = [...current];
      updated[index] = {
        ...updated[index],
        [field]: value
      };
      return updated;
    });
  };

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">Profile</Title>

      <Grid gutter="lg">
        <Grid.Col span={4}>
          <Paper withBorder p="lg" radius="md">
            <Stack align="center" mb="md">
              <Avatar 
                src={userProfile.avatar} 
                size={120} 
                radius={120}
              />
              <div style={{ textAlign: 'center' }}>
                <Text size="xl" fw={500}>{userProfile.name}</Text>
                <Text size="sm" c="dimmed">{userProfile.role}</Text>
              </div>
            </Stack>

            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm" fw={500}>Availability</Text>
                <Badge 
                  color={userProfile.availability.status === 'Available' ? 'green' : 
                         userProfile.availability.status === 'Busy' ? 'red' : 'yellow'}
                >
                  {userProfile.availability.status}
                </Badge>
              </Group>

              <Group justify="space-between">
                <Text size="sm" fw={500}>Hourly Rate</Text>
                <Text size="sm">${userProfile.hourlyRate}/hr</Text>
              </Group>

              <Button variant="light" leftSection={<IconEdit size={16} />} fullWidth mt="md">
                Edit Profile
              </Button>
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={8}>
          <Paper withBorder p="lg" radius="md">
            <Title order={3} mb="md">Personal Information</Title>
            
            <Stack gap="md">
              <TextInput
                label="Full Name"
                value={userProfile.name}
                readOnly
              />
              
              <TextInput
                label="Email"
                value={userProfile.email}
                readOnly
              />
              
              <TextInput
                label="Phone"
                value={userProfile.phone}
                readOnly
              />
              
              <Select
                label="Role"
                value={userProfile.role}
                data={['Content Creator', 'Photographer', 'Editor', 'Social Media Manager']}
                readOnly
              />

              <TextInput
                label="Hourly Rate"
                value={`$${userProfile.hourlyRate}`}
                readOnly
              />
            </Stack>
          </Paper>

          <Paper withBorder p="lg" radius="md" mt="lg">
            <Title order={3} mb="md">Skills & Expertise</Title>
            <Group gap="xs">
              {userProfile.skills.map((skill) => (
                <Badge key={skill} size="lg" variant="light">
                  {skill}
                </Badge>
              ))}
            </Group>
          </Paper>

          <Paper withBorder p="lg" radius="md" mt="lg">
            <Group justify="space-between" mb="md">
              <Title order={3}>Working Hours</Title>
              <Select
                size="sm"
                label="Time Zone"
                value={userProfile.timezone}
                data={[
                  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
                  { value: 'America/Denver', label: 'Mountain Time (MT)' },
                  { value: 'America/Chicago', label: 'Central Time (CT)' },
                  { value: 'America/New_York', label: 'Eastern Time (ET)' }
                ]}
                style={{ width: 200 }}
              />
            </Group>

            <Stack gap="sm">
              {workingHours.map((day, index) => (
                <Paper key={day.day} withBorder p="sm" radius="sm">
                  <Group justify="space-between" wrap="nowrap">
                    <Group gap="xl" wrap="nowrap">
                      <Switch
                        checked={day.isWorking}
                        onChange={() => handleWorkingDayToggle(index)}
                        label={day.day}
                        labelPosition="left"
                        styles={{ label: { minWidth: 100 } }}
                      />
                      {day.isWorking && (
                        <Group gap="xs">
                          <TimeInput
                            size="xs"
                            value={day.startTime}
                            onChange={(event) => handleTimeChange(index, 'startTime', event.currentTarget.value)}
                          />
                          <Text size="sm">to</Text>
                          <TimeInput
                            size="xs"
                            value={day.endTime}
                            onChange={(event) => handleTimeChange(index, 'endTime', event.currentTarget.value)}
                          />
                        </Group>
                      )}
                    </Group>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Paper>

          <Paper withBorder p="lg" radius="md" mt="lg">
            <Title order={3} mb="md">Time Off</Title>
            <Button 
              variant="light" 
              leftSection={<IconPlus size={16} />}
              size="sm"
            >
              Add Time Off
            </Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
} 