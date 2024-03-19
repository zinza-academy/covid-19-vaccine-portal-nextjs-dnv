'use client';

import { Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC, useCallback } from 'react';

const tabs = [
  {
    label: 'Chứng nhận tiêm chủng',
    path: 'vaccine-certificate'
  },
  {
    label: 'Kết quả đăng ký',
    path: 'injection-registration-results'
  },
  {
    label: 'Tài khoản',
    path: 'account'
  }
];

const PortalNavigation: FC = () => {
  const pathname = usePathname();

  const getPath = useCallback(() => {
    const paths = pathname.split('/');
    return paths[paths.length - 1];
  }, [pathname]);

  return (
    <Stack direction="row">
      {tabs.map((tab, index) => (
        <Link
          key={index}
          href={`/portal/${tab.path}`}
          passHref
          style={{
            color: tab.path === getPath() ? '#000' : 'rgba(0, 0, 0, 0.6)',
            borderBottom: tab.path === getPath() ? '2px solid #000' : '0'
          }}>
          <Stack
            sx={{
              height: '48px',
              justifyContent: 'center',
              padding: '0 16px'
            }}>
            <Typography>{tab.label}</Typography>
          </Stack>
        </Link>
      ))}
    </Stack>
  );
};

export default PortalNavigation;
