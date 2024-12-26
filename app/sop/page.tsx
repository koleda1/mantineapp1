'use client';

import { Container, Title, Card, Text, Group, Button, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

interface SOP {
  id: number;
  title: string;
  description: string;
  category: string;
  lastUpdated: string;
}

const sops: SOP[] = [
  {
    id: 1,
    title: 'Content Creation Guidelines',
    description: 'Standard procedures for creating and reviewing content across all platforms',
    category: 'Content',
    lastUpdated: '2024-01-15'
  },
  {
    id: 2,
    title: 'Photo Shoot Protocol',
    description: 'Step-by-step guide for conducting professional photo shoots',
    category: 'Production',
    lastUpdated: '2024-01-10'
  },
  {
    id: 3,
    title: 'Social Media Publishing Process',
    description: 'Guidelines for scheduling and publishing content on social media platforms',
    category: 'Marketing',
    lastUpdated: '2024-01-05'
  }
];

export default function SOPPage() {
  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={1}>Standard Operating Procedures</Title>
        <Button leftSection={<IconPlus size={16} />}>
          Create SOP
        </Button>
      </Group>

      <Stack gap="md">
        {sops.map((sop) => (
          <Card key={sop.id} withBorder shadow="sm">
            <Group justify="space-between" mb="xs">
              <Text size="lg" fw={500}>{sop.title}</Text>
              <Text size="sm" c="dimmed">Last updated: {sop.lastUpdated}</Text>
            </Group>
            <Text size="sm" c="dimmed" mb="md">
              {sop.description}
            </Text>
            <Group gap="xs">
              <Button variant="light" size="xs">View</Button>
              <Button variant="light" size="xs">Edit</Button>
            </Group>
          </Card>
        ))}
      </Stack>
    </Container>
  );
} 