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
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface CreateModalProps {
  createModalOpen: boolean;
  handleCloseCreateModal: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  file: yup
    .mixed<File>()
    .test('pdf', 'File tải lên phải là file PDF', (file) => {
      if (!file) {
        return true;
      } else if (file.type === 'application/pdf') return true;
      return false;
    })
    .required()
});

type DocumentCreateFormData = yup.InferType<typeof schema>;

const defaultValues: DocumentCreateFormData = {
  name: '',
  file: new File([], '')
};

const CreateModal: FC<CreateModalProps> = ({
  createModalOpen,
  handleCloseCreateModal
}) => {
  const [loading, setLoading] = useState(false);

  const {
    getValues,
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<DocumentCreateFormData>({
    mode: 'onChange',
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    reset(defaultValues);
  }, [createModalOpen, reset]);

  const onSubmit = async (data: DocumentCreateFormData) => {};

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setValue('file', e.target.files[0], {
      shouldValidate: true
    });
  };

  return (
    <Modal hideBackdrop open={createModalOpen} onClose={handleCloseCreateModal}>
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
          <Typography variant="h6">Thêm mới tài liệu</Typography>
          <IconButton color="default" onClick={handleCloseCreateModal}>
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
          <Button variant="outlined" onClick={handleCloseCreateModal}>
            Hủy bỏ
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !isValid}>
            Thêm mới
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateModal;
