import EditUserPassword from '@/components/portal/account/EditUserPassword';
import { Stack } from '@mui/material';

export default function AccountPage() {
  return (
    <Stack spacing={2}>
      <h2>EditPersonalInfo</h2>
      <EditUserPassword />
    </Stack>
  );
}
