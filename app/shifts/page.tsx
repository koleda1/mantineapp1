'use client';

import { Container, Title, Grid, Paper, Table, Badge, Text, Group, Stack, Select } from '@mantine/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  backgroundColor?: string;
  assignedTo?: string[];
  location?: string;
}

const timeZones = [
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'UTC', label: 'UTC' }
];

const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Morning Shift',
    start: '2024-01-25T09:00:00',
    end: '2024-01-25T17:00:00',
    backgroundColor: 'var(--mantine-color-blue-6)',
    assignedTo: ['You'],
    location: 'Studio A'
  },
  {
    id: '2',
    title: 'Evening Shift',
    start: '2024-01-26T14:00:00',
    end: '2024-01-26T22:00:00',
    backgroundColor: 'var(--mantine-color-green-6)',
    assignedTo: ['Alice', 'Bob'],
    location: 'Studio B'
  },
  {
    id: '3',
    title: 'Morning Shift',
    start: '2024-01-29T09:00:00',
    end: '2024-01-29T17:00:00',
    backgroundColor: 'var(--mantine-color-blue-6)',
    assignedTo: ['You'],
    location: 'Studio A'
  }
];

export default function ShiftsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [timeZone, setTimeZone] = useState('America/Los_Angeles');

  const handleEventClick = (info: any) => {
    console.log('Shift clicked:', info.event);
  };

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt('Enter shift details:');
    if (title) {
      const newEvent: Event = {
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: 'var(--mantine-color-blue-6)',
        assignedTo: ['You']
      };
      setEvents([...events, newEvent]);
    }
  };

  // Filter shifts
  const today = new Date();
  const myShifts = events.filter(event => 
    event.assignedTo?.includes('You') && 
    new Date(event.start) >= today
  ).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  const upcomingShifts = events.filter(event => 
    !event.assignedTo?.includes('You') && 
    new Date(event.start) >= today
  ).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timeZone
    });
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={1}>Shifts</Title>
          <Select
            label="Time Zone"
            placeholder="Select time zone"
            data={timeZones}
            value={timeZone}
            onChange={(value) => value && setTimeZone(value)}
            style={{ width: 200 }}
          />
        </Group>

        <Paper withBorder p="md" radius="md">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridTwoWeeks"
            views={{
              timeGridTwoWeeks: {
                type: 'timeGrid',
                duration: { weeks: 2 },
                buttonText: '2 weeks'
              }
            }}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridDay,timeGridWeek,timeGridTwoWeeks'
            }}
            events={events}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            eventClick={handleEventClick}
            select={handleDateSelect}
            height="70vh"
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={false}
            timeZone={timeZone}
          />
        </Paper>

        <Grid gutter="md">
          <Grid.Col span={6}>
            <Paper withBorder p="md">
              <Title order={3} mb="md">My Shifts</Title>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Shift</Table.Th>
                    <Table.Th>Time</Table.Th>
                    <Table.Th>Location</Table.Th>
                    <Table.Th>Status</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {myShifts.length === 0 ? (
                    <Table.Tr>
                      <Table.Td colSpan={4}>
                        <Text c="dimmed" ta="center" py="sm">No upcoming shifts</Text>
                      </Table.Td>
                    </Table.Tr>
                  ) : (
                    myShifts.map(shift => (
                      <Table.Tr key={shift.id}>
                        <Table.Td>{shift.title}</Table.Td>
                        <Table.Td>{formatDateTime(shift.start)}</Table.Td>
                        <Table.Td>{shift.location || 'TBD'}</Table.Td>
                        <Table.Td>
                          <Badge color="blue">Scheduled</Badge>
                        </Table.Td>
                      </Table.Tr>
                    ))
                  )}
                </Table.Tbody>
              </Table>
            </Paper>
          </Grid.Col>

          <Grid.Col span={6}>
            <Paper withBorder p="md">
              <Title order={3} mb="md">Upcoming Shifts</Title>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Shift</Table.Th>
                    <Table.Th>Time</Table.Th>
                    <Table.Th>Location</Table.Th>
                    <Table.Th>Assigned To</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {upcomingShifts.length === 0 ? (
                    <Table.Tr>
                      <Table.Td colSpan={4}>
                        <Text c="dimmed" ta="center" py="sm">No upcoming shifts</Text>
                      </Table.Td>
                    </Table.Tr>
                  ) : (
                    upcomingShifts.map(shift => (
                      <Table.Tr key={shift.id}>
                        <Table.Td>{shift.title}</Table.Td>
                        <Table.Td>{formatDateTime(shift.start)}</Table.Td>
                        <Table.Td>{shift.location || 'TBD'}</Table.Td>
                        <Table.Td>{shift.assignedTo?.join(', ') || 'Unassigned'}</Table.Td>
                      </Table.Tr>
                    ))
                  )}
                </Table.Tbody>
              </Table>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
} 