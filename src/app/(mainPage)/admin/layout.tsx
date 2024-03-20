import AdminNavigation from '@/components/admin/AdminNavigation';
import RequireAdmin from '@/components/common/authRequire/RequireAdmin';
import RequireLogin from '@/components/common/authRequire/RequireLogin';
import { Stack, Box } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function AdminPageLayout({ children }: PropsWithChildren) {
  return (
    <RequireLogin>
      <RequireAdmin>
        <Stack spacing={4} paddingX={2}>
          <AdminNavigation />
          <Box paddingX={2} pb={'40%'}>
            {children}
          </Box>
        </Stack>
      </RequireAdmin>
    </RequireLogin>
  );
}
