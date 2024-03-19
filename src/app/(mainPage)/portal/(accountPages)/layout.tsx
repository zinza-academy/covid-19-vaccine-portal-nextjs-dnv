import PortalNavigation from '@/components/portal/PortalNavigation';
import { Box, Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function AccountPagesLayout({ children }: PropsWithChildren) {
  return (
    <Stack spacing={4} paddingX={2}>
      <PortalNavigation />
      <Box paddingX={2} pb={'40%'}>
        {children}
      </Box>
    </Stack>
  );
}
