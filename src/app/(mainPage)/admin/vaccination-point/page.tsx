import AdminVaccinePointsTable from '@/components/admin/vaccine-points/AdminVaccinePointsTable';
import SearchSection from '@/components/admin/vaccine-points/SearchSection';
import { Stack } from '@mui/material';

export default function VaccinationPointPage() {
  return (
    <Stack spacing={2}>
      <SearchSection />
      <AdminVaccinePointsTable />
    </Stack>
  );
}
