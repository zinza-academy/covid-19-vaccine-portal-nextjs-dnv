'use client';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email không đúng định dạng.')
    .required('Email không được để trống.')
});
type ForgotPasswordFields = { email: string };

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFields>({
    resolver: yupResolver(schema)
  });

  const isInValidateVals = Object.keys(errors).length !== 0;

  const onSubmit: SubmitHandler<ForgotPasswordFields> = (data) => {
    // fake call api in 2s and redirect to login page
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/auth/login');
    }, 2000);
  };

  return (
    <div className="flex-1 px-10 grid place-content-center">
      <div className="flex flex-col gap-6">
        <p className="px-8">
          Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để đăng ký{' '}
          <Typography
            component="span"
            display="inline"
            className={`text-errorText`}>
            (*)
          </Typography>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-3">
          <FormControl>
            <TextField
              {...register('email')}
              id="email"
              type="email"
              label="Email"
              placeholder="Your email"
              variant="outlined"
              error={!!errors.email?.message}
              helperText={errors.email?.message}
            />
          </FormControl>
          <div className="flex items-center justify-center gap-2 mt-6">
            <Link href={'/auth/login'}>
              <Button
                variant="outlined"
                sx={{
                  color: '#303F9F',
                  borderColor: '#303F9F',
                  borderRadius: '8px 8px 8px 0',
                  fontWeight: 500
                }}>
                QUAY LẠI{' '}
              </Button>
            </Link>
            <Button
              disabled={isSubmitting || isInValidateVals}
              type="submit"
              variant="contained"
              sx={{
                borderColor: '#303F9F',
                borderRadius: '8px 8px 8px 0',
                fontWeight: 500,
                paddingX: '32px'
              }}>
              GỬI
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
