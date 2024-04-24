'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import * as yup from 'yup';
import FieldLabel from './FieldLabel';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { RegisterData, Role, useRegisterUser } from '@/api/auth/signUp';
import { useDistricts, useProvinces, useWards } from '@/api/location';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  citizenId: yup
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

  dateOfBirth: yup.mixed<Dayjs>().required('Ngày sinh không được để trống.'),
  gender: yup
    .string()
    .required('Giới tính không được để trống.')
    .oneOf(['nam', 'nữ'], 'Giới tính không hợp lệ'),
  province: yup.string().required('Thành phố không được để trống.'),
  district: yup.string().required('Quân/Huyệnkhông được để trống.'),
  ward: yup.string().required('Xã/Phường không được để trống.')
});

export type RegisterFormFields = yup.InferType<typeof schema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control
  } = useForm<RegisterFormFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      citizenId: '',
      email: '',
      password: '',
      fullName: '',
      dateOfBirth: dayjs(),
      province: '',
      district: '',
      gender: '',
      ward: ''
    }
  });
  const { provinces } = useProvinces();
  const provinceId = watch('province');
  const { districts } = useDistricts(+provinceId);
  const districtId = watch('district');
  const { wards } = useWards(+districtId);
  const registerMutation = useRegisterUser();
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    const { fullName, email, password, gender, citizenId } = data;

    const userInfo: RegisterData = {
      fullName: fullName,
      email,
      password,
      gender: gender === 'nam' ? 'M' : 'F',
      dateOfBirth: data.dateOfBirth.toISOString(),
      role: Role.User,
      ward: +data.ward,
      citizenId
    };
    try {
      await registerMutation.mutateAsync(userInfo);
      toast.success('Đăng ký thành công');
      router.push('/auth/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') toast.error('Lỗi mạng!');
        else if (error?.response?.status === 409)
          toast.error('Email này đã được sử dụng.');
        else toast.error('Đăng ký thất bại!');
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3">
      {/* Số CCCD */}
      <FormControl>
        <FieldLabel htmlFor="citizenID" text="Số CMND/CCCD" required />
        <TextField
          {...register('citizenId')}
          id="citizenID"
          label=""
          placeholder="Số CMND/CCCD"
          variant="outlined"
          error={!!errors.citizenId?.message}
          helperText={errors.citizenId?.message}
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  label="Ngày/Tháng/Năm"
                  format="DD/MM/YYYY"
                />
                {errors.dateOfBirth?.message && (
                  <FormHelperText error>
                    {errors.dateOfBirth?.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </LocalizationProvider>
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
        <FieldLabel htmlFor="province" text="Tỉnh/Thành phố" required />
        <Controller
          control={control}
          name="province"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormControl>
              <InputLabel id="province">Tỉnh/Thành phố</InputLabel>
              <Select
                labelId="province"
                id="province"
                value={value || ''}
                onChange={onChange}
                error={!!errors.province?.message}
                onBlur={onBlur}>
                {provinces?.map((province) => (
                  <MenuItem key={province.id} value={province.id}>
                    {province.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <FormHelperText error>{errors.province?.message}</FormHelperText>
      </FormControl>
      {/* quận/huyện */}
      <FormControl>
        <FieldLabel htmlFor="district" text="Quận/Huyện" required />
        <Controller
          control={control}
          name="district"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormControl>
              <InputLabel id="district">Quận/Huyện</InputLabel>
              <Select
                labelId="district"
                id="district"
                value={value || ''}
                label="Quận/Huyện"
                onChange={onChange}
                error={!!errors.district?.message}
                onBlur={onBlur}>
                {districts?.map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <FormControl>
              <InputLabel id="ward">Xã/Phường</InputLabel>
              <Select
                labelId="ward"
                id="ward"
                label="Xã/Phường"
                value={value || ''}
                onChange={onChange}
                error={!!errors.ward?.message}
                onBlur={onBlur}>
                {wards?.map((ward) => (
                  <MenuItem key={ward.id} value={ward.id}>
                    {ward.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
