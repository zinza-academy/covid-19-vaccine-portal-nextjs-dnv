import SearchSection from '@/components/admin/vaccineRegistration/SearchSection';
import VaccineRegistrationTable from '@/components/admin/vaccineRegistration/VaccineRegistrationTable';
import { Stack } from '@mui/material';

export default function VaccinationRegistrationResultPage() {
  return (
    <Stack spacing={2}>
      <SearchSection />
      <VaccineRegistrationTable />
    </Stack>
  );
}
