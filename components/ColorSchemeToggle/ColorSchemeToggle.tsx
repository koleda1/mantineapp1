'use client';

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      <IconSun
        className={cx('', {
          'display-none': computedColorScheme === 'light',
        })}
        stroke={1.5}
      />
      <IconMoon
        className={cx('', {
          'display-none': computedColorScheme === 'dark',
        })}
        stroke={1.5}
      />
    </ActionIcon>
  );
}
