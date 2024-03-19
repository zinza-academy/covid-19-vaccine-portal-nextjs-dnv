'use client';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import * as yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '@/app/lib/hooks';
import FieldLabel from '@/components/auth/FieldLabel';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const cities = ['Hà Nội', 'Hưng Yên', 'Lào Cai'];
const districts = ['Cầu Giấy', 'Nam Từ Liêm'];
const wards = ['Mai Dịch', 'Dịch Vọng Hậu'];

const schema = yup.object().shape({
  fullName: yup.string().required('Họ tên không được để trống.'),
  dateOfBirth: yup.mixed<Dayjs>().required('Ngày sinh không được để trống.'),
  gender: yup.string().required('Giới tính không được để trống.'),

  city: yup.string().required('Thành phố không được để trống.'),
  district: yup.string().required('Quân/Huyệnkhông được để trống.'),
  ward: yup.string().required('Xã/Phường không được để trống.')
});

type PersonalInfoFormData = yup.InferType<typeof schema>;

export default function EditPersonalInfo() {
  // fake userInfo
  const userInfo: PersonalInfoFormData = {
    city: '',
    dateOfBirth: dayjs().add(-1, 'day'),
    district: '',
    fullName: '',
    gender: '',
    ward: ''
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control
  } = useForm<PersonalInfoFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: userInfo.fullName,
      dateOfBirth: userInfo.dateOfBirth,
      city: userInfo.city,
      district: userInfo.district,
      gender: userInfo.gender,
      ward: userInfo.ward
    }
  });
  const onSubmit: SubmitHandler<PersonalInfoFormData> = (data) => {
    console.log('🚀 ~ EditPersonalInfo ~ data:', data);
    // handle udpate user info
  };
  //   birthday must before today
  const dateOfBirthRule = dayjs().subtract(1, 'day');
  return (
    <form className="max-w-[80%]" onSubmit={handleSubmit(onSubmit)}>
      <Typography fontWeight={'bold'} fontSize={'18px'}>
        Thông tin cá nhân
      </Typography>
      <Grid container spacing={2}>
        {/* fullName */}
        <Grid item xs={4}>
          <FormControl fullWidth>
            <FieldLabel htmlFor="fullName" text="Họ và tên" />
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
        </Grid>
        <Grid item xs={4}>
          {/* dateOfBirth */}
          <FormControl fullWidth>
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
                      maxDate={dateOfBirthRule}
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
        </Grid>
        {/* gender */}
        <Grid item xs={4}>
          <FormControl fullWidth>
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
        </Grid>
        {/* city */}
        <Grid item xs={4}>
          <FormControl fullWidth>
            <FieldLabel htmlFor="city" text="Tỉnh/Thành phố" required />
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <FormControl fullWidth>
                  <InputLabel id="city">Tỉnh/Thành phố</InputLabel>
                  <Select
                    labelId="city"
                    id="city"
                    value={value || ''}
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
                </FormControl>
              )}
            />
            <FormHelperText error>{errors.city?.message}</FormHelperText>
          </FormControl>
        </Grid>
        {/* district */}
        <Grid item xs={4}>
          <FormControl fullWidth>
            <FieldLabel htmlFor="district" text="Quận/Huyện" required />
            <Controller
              control={control}
              name="district"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <FormControl fullWidth>
                  <InputLabel id="district">Quận/Huyện</InputLabel>
                  <Select
                    labelId="district"
                    id="district"
                    value={value || ''}
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
                </FormControl>
              )}
            />
            <FormHelperText error>{errors.district?.message}</FormHelperText>
          </FormControl>
        </Grid>
        {/* ward */}
        <Grid item xs={4}>
          <FormControl fullWidth>
            <FieldLabel htmlFor="ward" text="Xã/Phường" required />
            <Controller
              control={control}
              name="ward"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <FormControl fullWidth>
                  <InputLabel id="ward">Xã/Phường</InputLabel>
                  <Select
                    labelId="ward"
                    id="ward"
                    label="Xã/Phường"
                    value={value || ''}
                    onChange={onChange}
                    error={!!errors.ward?.message}
                    onBlur={onBlur}>
                    {wards.map((ward) => (
                      <MenuItem key={ward} value={ward}>
                        {ward}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <FormHelperText error>{errors.ward?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={'row'} spacing={2} mt={4}>
            <Button variant="outlined" disabled={!isDirty}>
              HỦY BỎ
            </Button>
            <Button type="submit" variant="contained">
              LƯU
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
