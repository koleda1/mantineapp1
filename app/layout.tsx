'use client';

import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle';
import { useState } from 'react';
import Link from 'next/link';
import { IconCalendar, IconList, IconUser, IconFileText, IconClock } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

const theme = createTheme({
  primaryColor: 'blue',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Daily', href: '/today', icon: IconClock },
    { label: 'Projects', href: '/projects', icon: IconList },
    { label: 'Admin Calendar', href: '/calendar', icon: IconCalendar },
    { label: 'Shifts', href: '/shifts', icon: IconCalendar },
    { label: 'People & Payments', href: '/people', icon: IconUser },
    { label: 'SOP Guides', href: '/sop', icon: IconFileText },
    { label: 'Profile', href: '/profile', icon: IconUser },
  ];

  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: 300,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }}
            padding="md"
          >
            <AppShell.Header>
              <Group h="100%" px="md" justify="space-between">
                <Group>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened(!opened)}
                    hiddenFrom="sm"
                    size="sm"
                  />
                  <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <strong>Content Manager</strong>
                  </Link>
                </Group>
                <ColorSchemeToggle />
              </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  component={Link}
                  href={item.href}
                  label={item.label}
                  leftSection={<item.icon size="1rem" stroke={1.5} />}
                  active={pathname === item.href}
                />
              ))}
            </AppShell.Navbar>

            <AppShell.Main>
              {children}
            </AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
