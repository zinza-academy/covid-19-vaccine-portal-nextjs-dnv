import EditPersonalInfo from '@/components/portal/account/EditPersonalInfo';
import EditUserPassword from '@/components/portal/account/EditUserPassword';
import { Stack } from '@mui/material';

export default function AccountPage() {
  return (
    <Stack spacing={2}>
      <EditPersonalInfo />
      <EditUserPassword />
    </Stack>
  );
}
