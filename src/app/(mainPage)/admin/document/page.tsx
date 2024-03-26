'use client';
import CreateModal from '@/components/admin/document/CreateModal';
import DocumentTable from '@/components/admin/document/DocumentTable';
import { Button, Stack } from '@mui/material';
import React from 'react';

export default function AdminDocumentPage() {
  const [createModalOpen, setCreateModalOpen] = React.useState<boolean>(false);

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };
  return (
    <Stack spacing={2}>
      <Stack alignItems="end">
        <Button variant="contained" onClick={handleOpenCreateModal}>
          Thêm mới
        </Button>
        <CreateModal
          handleCloseCreateModal={handleCloseCreateModal}
          createModalOpen={createModalOpen}
        />
      </Stack>
      <DocumentTable />
    </Stack>
  );
}
