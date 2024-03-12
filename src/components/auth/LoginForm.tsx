'use client';
import { Button, FormControl, TextField } from '@mui/material';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import FieldLabel from './FieldLabel';

export type LoginFormFields = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormFields>();

  const isInValidateVals = Object.keys(errors).length !== 0;

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3">
      <FormControl>
        <FieldLabel htmlFor="email" text="Email" />
        <TextField
          {...register('email')}
          id="email"
          type="email"
          label=""
          placeholder="Your email"
          variant="outlined"
          error={!!errors.email?.message}
          helperText={errors.email?.message}
        />
      </FormControl>
      <FormControl>
        <FieldLabel htmlFor="password" text="Mật khẩu" />
        <TextField
          {...register('password')}
          id="password"
          type="password"
          label=""
          placeholder="Your password"
          variant="outlined"
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
      </FormControl>

      <Link
        href={'/auth/forgot-password'}
        className="text-sm text-[#3949AB] font-normal my-2 text-right">
        {' '}
        Quên mật khẩu?
      </Link>
      <Button
        disabled={isSubmitting || isInValidateVals}
        type="submit"
        variant="contained"
        className="bg-[#66BB6A] "
        size="large"
        color="success">
        Đăng nhập
      </Button>
      <p className="text-center font-normal mt-2">
        Hoặc đăng ký tài khoản, nếu bạn chưa đăng ký !
      </p>
    </form>
  );
}
