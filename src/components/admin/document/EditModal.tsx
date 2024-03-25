'use client';

import FieldLabel from '@/components/auth/FieldLabel';
import RequiredTag from '@/components/common/RequiredTag';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { red } from '@mui/material/colors';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Document } from './DocumentTable';

interface EditModalProps {
  editModalOpen: boolean;
  handleCloseEditModal: () => void;
  document: Document | null;
}

const schema = yup.object().shape({
  name: yup.string().required('Tên tài liệu không được bỏ trống'),
  file: yup
    .mixed<File>()
    .test('pdf', 'File tải lên phải là file PDF', (file) => {
      if (!file) {
        return true;
      } else if (file.type === 'application/pdf') return true;
      return false;
    })
    .nullable()
});

export interface DocumentCreateFormData {
  name: string;
  file: File | null;
}
type DocumentUpdateFormData = yup.InferType<typeof schema>;

export default function EditModal({
  editModalOpen,
  handleCloseEditModal,
  document
}: EditModalProps) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    trigger,
    reset,
    register,
    formState: { errors, isValid }
  } = useForm<DocumentUpdateFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      file: null
    },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (document !== null)
      reset({
        name: document.name,
        file: null
      });
  }, [document, document, reset]);

  const onSubmit = async (data: DocumentUpdateFormData) => {};

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setValue('file', e.target.files[0], {
      shouldValidate: true
    });
  };

  return (
    <Modal hideBackdrop open={editModalOpen} onClose={handleCloseEditModal}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '4px',
          width: '500px'
        }}>
        <Stack direction="row" justifyContent="space-between" spacing={2} p={2}>
          <Typography variant="h6">Cập nhật tài liệu</Typography>
          <IconButton color="default" onClick={handleCloseEditModal}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Stack spacing={2} p={2}>
          <FormControl>
            <FieldLabel htmlFor="name" text="Tên tài liệu" required />
            <TextField
              {...register('name')}
              id="name"
              name="name"
              label=""
              placeholder="Tên tài liệu"
              variant="outlined"
              error={!!errors.name?.message}
              helperText={errors.name?.message}
            />
          </FormControl>
          <Typography>
            File tài liệu:
            <RequiredTag />
          </Typography>
          {getValues('file') && getValues('file')?.name}
          <Typography
            sx={{ display: !errors?.file ? 'none' : 'block', color: red[500] }}>
            {errors?.file?.message}
          </Typography>
          <Button variant="contained" component="label">
            Tải lên pdf mới
            <input type="file" hidden onChange={handleChangeFile} />
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="end" spacing={2} p={2}>
          <Button variant="outlined" onClick={handleCloseEditModal}>
            Hủy bỏ
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !isValid}>
            Cập nhật
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
