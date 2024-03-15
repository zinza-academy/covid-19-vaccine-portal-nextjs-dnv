'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import { Button, FormHelperText, MenuItem, Select, Stack } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const cities = ['Hà Nội', 'Hưng Yên', 'Lào Cai'];
const districts = ['Cầu Giấy', 'Nam Từ Liêm'];
const wards = ['Mai Dịch', 'Dịch Vọng Hậu'];

const formSchema = yup.object({
  city: yup.string().required('Thành phố không được để trống.'),
  district: yup.string().required('Quân/Huyệnkhông được để trống.'),
  ward: yup.string().required('Xã/Phường không được để trống.')
});

type Payload = yup.InferType<typeof formSchema>;

export default function VaccinationPointToolbar() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm<Payload>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      city: '',
      district: '',
      ward: ''
    }
  });

  const onSubmit: SubmitHandler<Payload> = (data) => {
    setTimeout(() => {
      console.log(data);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2}>
        <div className="block input-group mb-4">
          <Select
            displayEmpty
            id="province_id"
            variant="outlined"
            defaultValue=""
            sx={{ minWidth: '260px' }}
            {...register('city')}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value="" disabled>
              Tỉnh/thành phố
            </MenuItem>
            {cities.map((item) => (
              <MenuItem key={'p' + item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{errors.city?.message}</FormHelperText>
        </div>
        <div className="block input-group mb-4">
          <Select
            displayEmpty
            id="district_id"
            variant="outlined"
            defaultValue=""
            sx={{ minWidth: '260px' }}
            {...register('district')}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value="" disabled>
              Quận/Huyện
            </MenuItem>
            {districts.map((item) => (
              <MenuItem key={'d' + item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{errors.district?.message}</FormHelperText>
        </div>
        <div className="block input-group mb-4">
          <Select
            size="medium"
            displayEmpty
            id="ward_id"
            variant="outlined"
            defaultValue=""
            sx={{ minWidth: '260px' }}
            {...register('ward')}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value="" disabled>
              Xã/Phường
            </MenuItem>
            {wards.map((item) => (
              <MenuItem key={'w' + item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{errors.ward?.message}</FormHelperText>
        </div>
        <Button
          disabled={!isValid || isSubmitting}
          type="submit"
          startIcon={<SearchIcon />}
          variant="contained"
          size="large"
          sx={{
            fontWeight: '600',
            marginLeft: '24px',
            borderRadius: '8px 8px 8px 0px'
          }}>
          Tìm kiếm
        </Button>
      </Stack>
    </form>
  );
}
