'use client';

import { Paper } from '@mantine/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  backgroundColor?: string;
}

interface ProjectCalendarProps {
  events: Event[];
  onEventClick: (info: any) => void;
  onDateSelect: (selectInfo: any) => void;
}

export function ProjectCalendar({ events, onEventClick, onDateSelect }: ProjectCalendarProps) {
  return (
    <Paper withBorder p="md" radius="md" mb="xl">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek'
        }}
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={3}
        weekends={true}
        eventClick={onEventClick}
        select={onDateSelect}
        height="40vh"
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
      />
    </Paper>
  );
} 