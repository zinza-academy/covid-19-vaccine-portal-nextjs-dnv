'use client';
import FieldLabel from '@/components/auth/FieldLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface EditPasswordFormData {
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object()
  .shape({
    password: yup
      .string()
      .trim()
      .min(8)
      .required('Mật khẩu cần dài ít nhất 8 ký tự'),
    confirmPassword: yup
      .string()
      .trim()
      .min(8)
      .required()
      .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp')
  })
  .required();

export default function EditUserPassword() {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty }
  } = useForm<EditPasswordFormData>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<EditPasswordFormData> = (data) => {
    // handle update password
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <Typography fontWeight={'bold'} fontSize={'18px'}>
        Mật khẩu
      </Typography>
      <Stack spacing={2}>
        <FormControl>
          <FieldLabel htmlFor="password" text="Mật khẩu mới" />
          <TextField
            {...register('password')}
            id="password"
            label=""
            placeholder="Mật khẩu mới"
            variant="outlined"
            error={!!errors.password?.message}
            helperText={errors.password?.message}
          />
        </FormControl>
        <FormControl>
          <FieldLabel htmlFor="confirmPassword" text="Xác nhận lại mật khẩu" />
          <TextField
            {...register('confirmPassword')}
            id="confirmPassword"
            label=""
            placeholder="Xác nhận lại mật khẩu"
            variant="outlined"
            error={!!errors.confirmPassword?.message}
            helperText={errors.confirmPassword?.message}
          />
        </FormControl>
      </Stack>
      <Stack direction={'row'} spacing={2} mt={4}>
        <Button variant="outlined" onClick={() => reset()} disabled={!isDirty}>
          HỦY BỎ
        </Button>
        <Button type="submit" variant="contained">
          LƯU
        </Button>
      </Stack>
    </form>
  );
}
