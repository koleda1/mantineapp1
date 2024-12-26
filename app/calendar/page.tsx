'use client';

import { Container, Title, Paper, Group, MultiSelect, Stack, Button, Checkbox, Menu, Text } from '@mantine/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import { IconFilter, IconPlus, IconTemplate } from '@tabler/icons-react';

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  backgroundColor?: string;
  department?: string;
  assignedTo?: string[];
  taskType?: string;
  project?: string;
  isTemplate?: boolean;
  reservedBy?: string;
}

const departments = [
  { value: 'Production', group: 'Departments' },
  { value: 'Post-Production', group: 'Departments' },
  { value: 'Marketing', group: 'Departments' },
  { value: 'Administrative', group: 'Departments' },
  { value: 'Chatter', group: 'SOPs' },
  { value: 'Editor', group: 'SOPs' },
  { value: 'Shooter', group: 'SOPs' },
  { value: 'Social Media', group: 'SOPs' },
  { value: 'Customer Service', group: 'SOPs' },
  { value: 'Content Planning', group: 'SOPs' },
  { value: 'Quality Control', group: 'SOPs' },
  { value: 'Post Processing', group: 'SOPs' },
  { value: 'Community Management', group: 'SOPs' },
  { value: 'Analytics', group: 'SOPs' }
];

const people = [
  'Alice Johnson',
  'Bob Smith',
  'Carol Williams',
  'David Brown',
  'Eve Taylor'
];

const taskTypes = [
  'Regular Task',
  'Morning Shift',
  'Evening Shift',
  'Night Shift',
  'Meeting',
  'Shoot',
  'Editing'
];

const projectTypes = [
  'Insta Post',
  'Insta Reels',
  'Insta Stories',
  'OF Custom',
  'OF Free Post',
  'OF Paid Post',
  'OF Special Post',
  'OF Script',
  'Reddit Shoot',
  'X / Twitter Shoot',
  'Miscellaneous Project'
];

const templates = [
  'Standard Instagram Post',
  'Instagram Story Series',
  'Instagram Reel',
  'OF Standard Content',
  'OF Special Content',
  'OF Custom Request',
  'Reddit Content Pack',
  'Twitter Content Pack',
  'Monthly Content Plan',
  'Weekly Content Plan'
];

const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Photo Shoot - Project Alpha',
    start: '2024-01-20T10:00:00',
    end: '2024-01-20T12:00:00',
    backgroundColor: 'var(--mantine-color-blue-6)',
    department: 'Shooter',
    assignedTo: ['Alice Johnson', 'Bob Smith'],
    taskType: 'Morning Shift',
    project: 'OF Special Post',
    isTemplate: true,
    reservedBy: 'Alice Johnson'
  },
  {
    id: '2',
    title: 'Content Review - Project Beta',
    start: '2024-01-22T14:00:00',
    end: '2024-01-22T15:30:00',
    backgroundColor: 'var(--mantine-color-green-6)',
    department: 'Editor',
    assignedTo: ['Carol Williams'],
    taskType: 'Evening Shift',
    project: 'Insta Post',
    isTemplate: false,
    reservedBy: 'Carol Williams'
  }
];

const sopTemplates = [
  { label: 'Chatter SOP', value: 'chatter_sop' },
  { label: 'Editor SOP', value: 'editor_sop' },
  { label: 'Shooter SOP', value: 'shooter_sop' },
  { label: 'Social Media SOP', value: 'social_media_sop' },
  { label: 'Customer Service SOP', value: 'customer_service_sop' },
  { label: 'Content Planning SOP', value: 'content_planning_sop' },
  { label: 'Quality Control SOP', value: 'quality_control_sop' },
  { label: 'Post Processing SOP', value: 'post_processing_sop' },
  { label: 'Community Management SOP', value: 'community_management_sop' },
  { label: 'Analytics SOP', value: 'analytics_sop' }
];

const taskTemplates = [
  { label: 'Morning Shift Template', value: 'morning_shift' },
  { label: 'Evening Shift Template', value: 'evening_shift' },
  { label: 'Night Shift Template', value: 'night_shift' },
  { label: 'Meeting Template', value: 'meeting' },
  { label: 'Shoot Template', value: 'shoot' },
  { label: 'Editing Template', value: 'editing' }
];

const projectTemplates = [
  { label: 'Instagram Post Template', value: 'insta_post' },
  { label: 'Instagram Reels Template', value: 'insta_reels' },
  { label: 'Instagram Stories Template', value: 'insta_stories' },
  { label: 'OF Custom Template', value: 'of_custom' },
  { label: 'OF Free Post Template', value: 'of_free' },
  { label: 'OF Paid Post Template', value: 'of_paid' },
  { label: 'OF Special Post Template', value: 'of_special' },
  { label: 'OF Script Template', value: 'of_script' },
  { label: 'Reddit Shoot Template', value: 'reddit_shoot' },
  { label: 'X / Twitter Template', value: 'twitter_shoot' }
];

const peopleTemplates = [
  { label: 'New Chatter', value: 'new_chatter' },
  { label: 'New Editor', value: 'new_editor' },
  { label: 'New Shooter', value: 'new_shooter' },
  { label: 'New Social Media Manager', value: 'new_social_media' },
  { label: 'New Customer Service', value: 'new_customer_service' },
  { label: 'New Content Manager', value: 'new_content_manager' }
];

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedTaskTypes, setSelectedTaskTypes] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [showTemplates, setShowTemplates] = useState<boolean | null>(null);

  const handleEventClick = (info: any) => {
    const event = info.event;
    if (event.extendedProps.taskType?.includes('Shift')) {
      const currentReservation = event.extendedProps.reservedBy;
      const message = currentReservation 
        ? `This shift is currently reserved by ${currentReservation}` 
        : 'This shift is not reserved';
      
      if (!currentReservation) {
        const reservedBy = prompt('Would you like to reserve this shift? Enter your name:');
        if (reservedBy) {
          const updatedEvents = events.map(e => {
            if (e.id === event.id) {
              return { ...e, reservedBy, backgroundColor: 'var(--mantine-color-yellow-6)' };
            }
            return e;
          });
          setEvents(updatedEvents);
        }
      } else if (confirm(`${message}. Would you like to release this reservation?`)) {
        const updatedEvents = events.map(e => {
          if (e.id === event.id) {
            return { ...e, reservedBy: undefined, backgroundColor: 'var(--mantine-color-blue-6)' };
          }
          return e;
        });
        setEvents(updatedEvents);
      }
    }
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
        backgroundColor: 'var(--mantine-color-blue-6)',
        taskType: 'Regular Task'
      };

      if (title.toLowerCase().includes('shift')) {
        const reservedBy = prompt('Who is reserving this shift?');
        if (reservedBy) {
          newEvent.reservedBy = reservedBy;
          newEvent.backgroundColor = 'var(--mantine-color-yellow-6)';
        }
      }

      setEvents([...events, newEvent]);
    }
  };

  const filteredEvents = events.filter(event => {
    const departmentMatch = selectedDepartments.length === 0 || 
      (event.department && selectedDepartments.includes(event.department));
    
    const peopleMatch = selectedPeople.length === 0 || 
      (event.assignedTo && event.assignedTo.some(person => selectedPeople.includes(person)));
    
    const taskTypeMatch = selectedTaskTypes.length === 0 || 
      (event.taskType && selectedTaskTypes.includes(event.taskType));

    const projectMatch = selectedProjects.length === 0 ||
      (event.project && selectedProjects.includes(event.project));

    const templateMatch = showTemplates === null || event.isTemplate === showTemplates;

    return departmentMatch && peopleMatch && taskTypeMatch && projectMatch && templateMatch;
  });

  const clearFilters = () => {
    setSelectedDepartments([]);
    setSelectedPeople([]);
    setSelectedTaskTypes([]);
    setSelectedProjects([]);
    setShowTemplates(null);
  };

  const eventContent = (eventInfo: any) => {
    const event = eventInfo.event;
    const isShift = event.extendedProps.taskType?.includes('Shift');
    
    return (
      <div>
        <div>{event.title}</div>
        {isShift && event.extendedProps.reservedBy && (
          <div style={{ fontSize: '0.8em', color: 'var(--mantine-color-gray-6)' }}>
            Reserved by: {event.extendedProps.reservedBy}
          </div>
        )}
      </div>
    );
  };

  const handleTemplateSelect = (template: string, type: string) => {
    console.log(`Creating new ${type} from template:`, template);
  };

  const TemplateMenu = ({ templates, type }: { templates: { label: string; value: string }[], type: string }) => (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button 
          variant="light" 
          size="xs" 
          leftSection={<IconPlus size={14} />}
          mt="xs"
        >
          Add New {type}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Quick Add</Menu.Label>
        {type === 'SOP' && (
          <>
            <Menu.Item>New Department SOP</Menu.Item>
            <Menu.Item>New Process SOP</Menu.Item>
            <Menu.Item>New Training SOP</Menu.Item>
          </>
        )}
        {type === 'Person' && (
          <>
            <Menu.Item>Add Team Member</Menu.Item>
            <Menu.Item>Add Contractor</Menu.Item>
            <Menu.Item>Add Manager</Menu.Item>
          </>
        )}
        {type === 'Task' && (
          <>
            <Menu.Item>New Shift</Menu.Item>
            <Menu.Item>New Regular Task</Menu.Item>
            <Menu.Item>New Meeting</Menu.Item>
          </>
        )}
        {type === 'Project' && (
          <>
            <Menu.Item>New Social Media Project</Menu.Item>
            <Menu.Item>New OF Project</Menu.Item>
            <Menu.Item>New Platform Project</Menu.Item>
          </>
        )}

        <Menu.Divider />
        
        <Menu.Label>From Template</Menu.Label>
        {templates.map(template => (
          <Menu.Item
            key={template.value}
            onClick={() => handleTemplateSelect(template.value, type)}
            leftSection={<IconTemplate size={14} />}
          >
            {template.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={1}>Admin Calendar</Title>
          <Group>
            <Checkbox
              label="Show Templates Only"
              checked={showTemplates === true}
              indeterminate={showTemplates === null}
              onChange={(event) => {
                if (showTemplates === null) {
                  setShowTemplates(true);
                } else if (showTemplates === true) {
                  setShowTemplates(false);
                } else {
                  setShowTemplates(null);
                }
              }}
            />
            <Button 
              variant="light" 
              leftSection={<IconFilter size={16} />}
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </Group>
        </Group>

        <Paper withBorder p="md" radius="md">
          <Group mb="md" grow>
            <Stack>
              <MultiSelect
                label="Department / SOP"
                placeholder="Filter by department or SOP"
                data={departments}
                value={selectedDepartments}
                onChange={setSelectedDepartments}
                clearable
                searchable
              />
              <TemplateMenu templates={sopTemplates} type="SOP" />
            </Stack>

            <Stack>
              <MultiSelect
                label="People"
                placeholder="Filter by people"
                data={people}
                value={selectedPeople}
                onChange={setSelectedPeople}
                clearable
                searchable
              />
              <TemplateMenu templates={peopleTemplates} type="Person" />
            </Stack>

            <Stack>
              <MultiSelect
                label="Task Type"
                placeholder="Filter by task type"
                data={taskTypes}
                value={selectedTaskTypes}
                onChange={setSelectedTaskTypes}
                clearable
                searchable
              />
              <TemplateMenu templates={taskTemplates} type="Task" />
            </Stack>

            <Stack>
              <MultiSelect
                label="Project Type"
                placeholder="Filter by project type"
                data={projectTypes}
                value={selectedProjects}
                onChange={setSelectedProjects}
                clearable
                searchable
              />
              <TemplateMenu templates={projectTemplates} type="Project" />
            </Stack>
          </Group>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={filteredEvents}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            eventClick={handleEventClick}
            select={handleDateSelect}
            eventContent={eventContent}
            height="70vh"
          />
        </Paper>
      </Stack>
    </Container>
  );
} 