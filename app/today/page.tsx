'use client';

import { Container } from '@mantine/core';
import { TodayView } from '@/components/TodayView';

export default function TodayPage() {
  return (
    <Container size="xl" py="xl">
      <TodayView />
    </Container>
  );
} 