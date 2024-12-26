'use client';

import { Container } from '@mantine/core';
import { useState } from 'react';
import { ProjectHeader } from '@/components/ProjectHeader';
import { ProjectCalendar } from '@/components/ProjectCalendar';
import { ProjectsTable } from '@/components/ProjectsTable';

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  backgroundColor?: string;
}

const initialEvents: Event[] = [
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
];

export default function ProjectsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const handleEventClick = (info: any) => {
    console.log('Event clicked:', info.event);
  };

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt('Please enter a title for the new event:');
    if (title) {
      const newEvent: Event = {
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: 'var(--mantine-color-blue-6)'
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleNewProject = (type: string) => {
    console.log('Creating new project of type:', type);
    // TODO: Implement project creation
  };

  return (
    <Container size="xl" py="xl">
      <ProjectHeader onNewProject={handleNewProject} />
      <ProjectCalendar 
        events={events}
        onEventClick={handleEventClick}
        onDateSelect={handleDateSelect}
      />
      <ProjectsTable />
    </Container>
  );
} 