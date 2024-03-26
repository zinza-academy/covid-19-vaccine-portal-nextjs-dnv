'use client';
import AdminVaccinePointsTable from '@/components/admin/vaccine-points/AdminVaccinePointsTable';
import CreateModal from '@/components/admin/vaccine-points/CreateModal';
import SearchSection from '@/components/admin/vaccine-points/SearchSection';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';

export default function VaccinationPointPage() {
  const [createModal, setCreateModalOpen] = useState<boolean>(false);

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction={'row'}>
        <SearchSection />
        <Button variant="contained" onClick={() => handleOpenCreateModal()}>
          Tạo mới
        </Button>
      </Stack>
      <AdminVaccinePointsTable />
      <CreateModal
        createModalOpen={createModal}
        handleCloseCreateModal={handleCloseCreateModal}
      />
    </Stack>
  );
}
