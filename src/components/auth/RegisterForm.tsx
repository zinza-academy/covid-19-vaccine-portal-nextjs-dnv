'use client';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import FieldLabel from './FieldLabel';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export type RegisterFormFields = {
  citizenID: string;
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  city: string;
  district: string;
  ward: string;
};

const defaultFormValues: RegisterFormFields = {
  citizenID: '123456789',
  email: 'nguyen@gmail.com',
  password: '123445667',
  fullName: 'a',
  dateOfBirth: 'b',
  gender: 'c',
  city: '',
  district: '',
  ward: ''
};

const schema = yup.object().shape({
  citizenID: yup
    .string()
    .matches(/^\d{9}$|^\d{12}$/, 'Citizen ID phải có độ dài 9 hoặc 12 số.')
    .required('Số CMND/CCCD không được để trống.'),
  email: yup
    .string()

    .email('Email không đúng định dạng.')
    .required('Email không được để trống.'),
  password: yup
    .string()
    .required('Password không được để trống.')
    .min(8, 'Password cần dài ít nhất 8 ký tự.'),
  fullName: yup.string().required('Họ tên không được để trống.'),
  dateOfBirth: yup.string().required('Ngày sinh không được để trống.'),
  gender: yup.string().required('Giới tính không được để trống.'),
  city: yup.string().required('Thành phố không được để trống.'),
  district: yup.string().required('Quân/Huyệnkhông được để trống.'),
  ward: yup.string().required('Xã/Phường không được để trống.')
});

const cities = ['Hà Nội', 'Hưng Yên', 'Lào Cai'];
const districts = ['Cầu Giấy', 'Nam Từ Liêm'];
const wards = ['Mai Dịch', 'Dịch Vọng Hậu'];

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm<RegisterFormFields>({
    defaultValues: defaultFormValues,
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3">
      {/* Số CCCD */}
      <FormControl>
        <FieldLabel htmlFor="citizenID" text="Số CMND/CCCD" required />
        <TextField
          {...register('citizenID')}
          id="citizenID"
          label=""
          placeholder="Số CMND/CCCD"
          variant="outlined"
          error={!!errors.citizenID?.message}
          helperText={errors.citizenID?.message}
        />
      </FormControl>
      {/* Email */}
      <FormControl>
        <FieldLabel htmlFor="email" text="Email" required />
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
      {/* Pasword */}
      <FormControl>
        <FieldLabel htmlFor="password" text="Mật khẩu" required />
        <TextField
          {...register('password')}
          id="password"
          type="password"
          label=""
          placeholder="********"
          variant="outlined"
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
      </FormControl>
      {/* full name */}
      <FormControl>
        <FieldLabel htmlFor="fullName" text="Họ và tên" required />
        <TextField
          {...register('fullName')}
          id="fullName"
          label=""
          placeholder="Họ và tên"
          variant="outlined"
          error={!!errors.fullName?.message}
          helperText={errors.fullName?.message}
        />
      </FormControl>
      {/* Ngày sinh */}
      <FormControl>
        <FieldLabel htmlFor="dateOfBirth" text="Ngày sinh" required />
        <TextField
          {...register('dateOfBirth')}
          id="dateOfBirth"
          label=""
          type="date"
          placeholder="Ngày sinh"
          variant="outlined"
          error={!!errors.dateOfBirth?.message}
          helperText={errors.dateOfBirth?.message}
        />
      </FormControl>
      {/* Giới tính */}
      <FormControl>
        <FieldLabel htmlFor="gender" text="Giới tính" required />
        <TextField
          {...register('gender')}
          id="gender"
          label=""
          placeholder="Giới tính"
          variant="outlined"
          error={!!errors.gender?.message}
          helperText={errors.gender?.message}
        />
      </FormControl>
      {/* Tỉnh/Thành phố */}
      <FormControl>
        <FieldLabel htmlFor="city" text="Tỉnh/Thành phố" required />
        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Select
              labelId="city"
              id="city"
              value={value}
              label="Tỉnh/Thành phố"
              onChange={onChange}
              error={!!errors.city?.message}
              onBlur={onBlur}>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText error>{errors.city?.message}</FormHelperText>
      </FormControl>
      {/* quận/huyện */}
      <FormControl>
        <FieldLabel htmlFor="district" text="Quận/Huyện" required />
        {/* <InputLabel id="city">Quận/Huyện</InputLabel> */}
        <Controller
          control={control}
          name="district"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Select
              labelId="district"
              id="district"
              value={value}
              label="Quận/Huyện"
              onChange={onChange}
              error={!!errors.district?.message}
              onBlur={onBlur}>
              {districts.map((district) => (
                <MenuItem key={district} value={district}>
                  {district}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText error>{errors.district?.message}</FormHelperText>
      </FormControl>
      {/* xã/phường */}
      <FormControl>
        <FieldLabel htmlFor="ward" text="Xã/Phường" required />
        <Controller
          control={control}
          name="ward"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Select
              labelId="city"
              id="city"
              value={value}
              label="Xã/Phường"
              onChange={onChange}
              error={!!errors.ward?.message}
              onBlur={onBlur}>
              {wards.map((ward) => (
                <MenuItem key={ward} value={ward}>
                  {ward}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText error>{errors.ward?.message}</FormHelperText>
      </FormControl>
      {/* continue button */}
      <Button
        type="submit"
        endIcon={<ArrowForwardIcon />}
        sx={{
          alignSelf: 'end'
        }}>
        Tiếp tục
      </Button>
    </form>
  );
}
