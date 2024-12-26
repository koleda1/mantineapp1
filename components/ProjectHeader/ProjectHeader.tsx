'use client';

import { Title, Menu, Button } from '@mantine/core';

export const projectTypes = [
  'Insta Post',
  'Insta Reels',
  'Insta Stories',
  'Miscellaneous Project',
  'OF Custom',
  'OF Free Post',
  'OF Paid Post',
  'OF Special Post',
  'OF Script',
  'Reddit Shoot',
  'X / Twitter Shoot'
];

interface ProjectHeaderProps {
  onNewProject: (type: string) => void;
}

export function ProjectHeader({ onNewProject }: ProjectHeaderProps) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: 'var(--mantine-spacing-lg)' 
    }}>
      <Title order={1}>Projects</Title>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>Add Project</Button>
        </Menu.Target>

        <Menu.Dropdown>
          {projectTypes.map((type) => (
            <Menu.Item key={type} onClick={() => onNewProject(type)}>
              {type}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
} 