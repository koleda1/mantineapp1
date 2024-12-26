'use client';

import React, { useState } from 'react';
import { Container, Title, Table, Paper, Group, Text, ActionIcon, Badge, Stack, Button, Select, MultiSelect } from '@mantine/core';
import { IconChevronDown, IconChevronRight, IconEdit, IconTrash, IconPlus, IconFilter } from '@tabler/icons-react';
import { LineChart } from '@mantine/charts';

interface Payment {
  id: string;
  date: string;
  amount: number;
  type: string;
  status: string;
}

interface Person {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: string;
  startDate: string;
  paymentRate: number;
  paymentType: string; // hourly, per-project, monthly
  paymentFrequency: string; // weekly, bi-weekly, monthly
  payments: Payment[];
  contactMethods: {
    instagram?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
    whatsapp?: string;
    preferred: string;
  };
}

// Mock data
const mockPeople: Person[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Editor',
    email: 'alice@example.com',
    phone: '(555) 123-4567',
    status: 'Active',
    startDate: '2023-01-15',
    paymentRate: 25,
    paymentType: 'hourly',
    paymentFrequency: 'bi-weekly',
    payments: [
      { id: '1', date: '2024-01-01', amount: 500, type: 'Regular', status: 'Paid' },
      { id: '2', date: '2024-01-15', amount: 450, type: 'Regular', status: 'Pending' }
    ],
    contactMethods: {
      instagram: '@alice.editor',
      telegram: '@aliceedits',
      discord: 'alice#1234',
      preferred: 'telegram'
    }
  },
  {
    id: '2',
    name: 'Bob Smith',
    role: 'Shooter',
    email: 'bob@example.com',
    phone: '(555) 234-5678',
    status: 'Active',
    startDate: '2023-02-01',
    paymentRate: 30,
    paymentType: 'per-project',
    paymentFrequency: 'weekly',
    payments: [
      { id: '3', date: '2024-01-01', amount: 600, type: 'Project', status: 'Paid' },
      { id: '4', date: '2024-01-15', amount: 750, type: 'Project', status: 'Paid' }
    ],
    contactMethods: {
      whatsapp: '+1234567890',
      instagram: '@bob.shoots',
      discord: 'bobsmith#5678',
      preferred: 'whatsapp'
    }
  }
];

// Mock data for the chart
const mockExpensesData = [
  { date: 'Jan 1', amount: 2500 },
  { date: 'Jan 8', amount: 3200 },
  { date: 'Jan 15', amount: 2800 },
  { date: 'Jan 22', amount: 3400 },
  { date: 'Jan 29', amount: 2900 },
  { date: 'Feb 5', amount: 3600 },
];

export default function PeoplePage() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState('1m'); // 1w, 1m, 3m, 6m, 1y

  // Extract unique departments and people from mock data
  const departments = Array.from(new Set(mockPeople.map(p => p.role)));
  const people = mockPeople.map(p => p.name);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'red';
      case 'pending':
        return 'yellow';
      case 'paid':
        return 'green';
      default:
        return 'gray';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getNextPaymentDate = (frequency: string) => {
    // This is a placeholder implementation. You might want to implement a more robust date calculation based on the frequency.
    // For example, you could use a switch statement to handle different frequencies.
    switch (frequency) {
      case 'weekly':
        return 'Next Monday';
      case 'bi-weekly':
        return 'Next two weeks';
      case 'monthly':
        return 'Next month';
      default:
        return 'N/A';
    }
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <Title order={1}>People & Payments</Title>
          <Button>Add Person</Button>
        </Group>

        <Paper withBorder radius="md" p="md">
          <Stack gap="md">
            <Group justify="space-between" align="center">
              <Title order={3}>Total Expenses</Title>
              <Group>
                <Select
                  size="xs"
                  placeholder="Time Range"
                  data={[
                    { value: '1w', label: 'Last Week' },
                    { value: '1m', label: 'Last Month' },
                    { value: '3m', label: 'Last 3 Months' },
                    { value: '6m', label: 'Last 6 Months' },
                    { value: '1y', label: 'Last Year' },
                  ]}
                  value={timeRange}
                  onChange={(value) => value && setTimeRange(value)}
                  w={120}
                />
                <Select
                  size="xs"
                  placeholder="Filter by Department"
                  data={departments}
                  value={selectedDepartment}
                  onChange={setSelectedDepartment}
                  clearable
                  w={150}
                />
                <MultiSelect
                  size="xs"
                  placeholder="Filter by People"
                  data={people}
                  value={selectedPeople}
                  onChange={setSelectedPeople}
                  clearable
                  w={200}
                />
                <Button 
                  size="xs"
                  variant="subtle"
                  onClick={() => {
                    setSelectedDepartment(null);
                    setSelectedPeople([]);
                  }}
                  leftSection={<IconFilter size={14} />}
                >
                  Clear Filters
                </Button>
              </Group>
            </Group>

            <Paper withBorder p="md" radius="md">
              <Group justify="space-between" mb="md">
                <Stack gap={0}>
                  <Text size="sm" c="dimmed">Total Spent</Text>
                  <Text size="xl" fw={500}>{formatCurrency(18400)}</Text>
                </Stack>
                <Stack gap={0} align="flex-end">
                  <Text size="sm" c="dimmed">Average per Person</Text>
                  <Text size="xl" fw={500}>{formatCurrency(3680)}</Text>
                </Stack>
              </Group>
              <LineChart
                h={300}
                data={mockExpensesData}
                dataKey="date"
                series={[
                  { name: 'amount', color: 'blue.6' }
                ]}
                tickLine="y"
                gridAxis="y"
                withLegend={false}
                yAxisProps={{ tickFormatter: (value: number) => `$${value}` }}
              />
            </Paper>
          </Stack>
        </Paper>

        <Paper withBorder radius="md">
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th>Name</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Payment Rate</Table.Th>
                <Table.Th>Frequency</Table.Th>
                <Table.Th>Start Date</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {mockPeople.map((person) => (
                <React.Fragment key={person.id}>
                  <Table.Tr>
                    <Table.Td>
                      <ActionIcon
                        variant="subtle"
                        onClick={() => toggleRow(person.id)}
                      >
                        {expandedRows.has(person.id) ? (
                          <IconChevronDown size={16} />
                        ) : (
                          <IconChevronRight size={16} />
                        )}
                      </ActionIcon>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={500}>{person.name}</Text>
                      <Text size="sm" c="dimmed">{person.email}</Text>
                    </Table.Td>
                    <Table.Td>{person.role}</Table.Td>
                    <Table.Td>
                      <Badge color={getStatusColor(person.status)}>
                        {person.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {formatCurrency(person.paymentRate)}/{person.paymentType}
                    </Table.Td>
                    <Table.Td>
                      <Text tt="capitalize">{person.paymentFrequency}</Text>
                    </Table.Td>
                    <Table.Td>{person.startDate}</Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ActionIcon variant="subtle" color="blue">
                          <IconEdit size={16} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" color="red">
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                  {expandedRows.has(person.id) && (
                    <Table.Tr>
                      <Table.Td colSpan={8}>
                        <Stack p="md" bg="var(--mantine-color-gray-0)">
                          <Stack gap="md">
                            <Group grow align="flex-start">
                              <Stack gap="xs">
                                <Text fw={500}>Contact Information</Text>
                                <Group>
                                  <Text size="sm" fw={500}>Preferred Method:</Text>
                                  <Badge>{person.contactMethods.preferred}</Badge>
                                </Group>
                                <Group gap="lg">
                                  {person.contactMethods.instagram && (
                                    <Text size="sm">Instagram: {person.contactMethods.instagram}</Text>
                                  )}
                                  {person.contactMethods.twitter && (
                                    <Text size="sm">Twitter: {person.contactMethods.twitter}</Text>
                                  )}
                                  {person.contactMethods.telegram && (
                                    <Text size="sm">Telegram: {person.contactMethods.telegram}</Text>
                                  )}
                                  {person.contactMethods.discord && (
                                    <Text size="sm">Discord: {person.contactMethods.discord}</Text>
                                  )}
                                  {person.contactMethods.whatsapp && (
                                    <Text size="sm">WhatsApp: {person.contactMethods.whatsapp}</Text>
                                  )}
                                </Group>
                                <Group>
                                  <Text size="sm">Email: {person.email}</Text>
                                  <Text size="sm">Phone: {person.phone}</Text>
                                </Group>
                              </Stack>

                              <Group grow>
                                <Paper withBorder p="md" radius="md">
                                  <Group justify="space-between" mb="xs">
                                    <Text fw={500}>Next Payment</Text>
                                    <Badge color="blue">Scheduled</Badge>
                                  </Group>
                                  <Text size="sm">Due: {getNextPaymentDate(person.paymentFrequency)}</Text>
                                  <Text size="sm">Estimated: {formatCurrency(person.paymentRate * 40)}</Text>
                                </Paper>

                                <Paper withBorder p="md" radius="md">
                                  <Group justify="space-between" mb="xs">
                                    <Text fw={500}>Previous Payment</Text>
                                    <Badge color={getStatusColor(person.payments[0]?.status || 'pending')}>
                                      {person.payments[0]?.status || 'N/A'}
                                    </Badge>
                                  </Group>
                                  <Text size="sm">Date: {person.payments[0]?.date || 'N/A'}</Text>
                                  <Text size="sm">Amount: {person.payments[0] ? formatCurrency(person.payments[0].amount) : 'N/A'}</Text>
                                </Paper>
                              </Group>
                            </Group>
                            
                            <Group justify="space-between" mt="md">
                              <Text fw={500}>Payment History</Text>
                              <Button 
                                size="xs"
                                leftSection={<IconPlus size={14} />}
                                variant="light"
                              >
                                New Payment
                              </Button>
                            </Group>
                            <Table>
                              <Table.Thead>
                                <Table.Tr>
                                  <Table.Th>Date</Table.Th>
                                  <Table.Th>Amount</Table.Th>
                                  <Table.Th>Type</Table.Th>
                                  <Table.Th>Status</Table.Th>
                                </Table.Tr>
                              </Table.Thead>
                              <Table.Tbody>
                                {person.payments.map((payment) => (
                                  <Table.Tr key={payment.id}>
                                    <Table.Td>{payment.date}</Table.Td>
                                    <Table.Td>{formatCurrency(payment.amount)}</Table.Td>
                                    <Table.Td>{payment.type}</Table.Td>
                                    <Table.Td>
                                      <Badge color={getStatusColor(payment.status)}>
                                        {payment.status}
                                      </Badge>
                                    </Table.Td>
                                  </Table.Tr>
                                ))}
                              </Table.Tbody>
                            </Table>
                          </Stack>
                        </Stack>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </React.Fragment>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>
    </Container>
  );
} 