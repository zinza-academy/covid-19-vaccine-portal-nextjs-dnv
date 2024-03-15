'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import { Button, FormHelperText, MenuItem, Select, Stack } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const cities = ['Hà Nội', 'Hưng Yên', 'Lào Cai'];
const districts = ['Cầu Giấy', 'Nam Từ Liêm'];
const wards = ['Mai Dịch', 'Dịch Vọng Hậu'];

type SearchParamsType = {
  city: string;
  district: string;
  ward: string;
};

export default function VaccinationPointToolbar() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm<SearchParamsType>({
    defaultValues: {
      city: '',
      district: '',
      ward: ''
    }
  });

  const onSubmit: SubmitHandler<SearchParamsType> = (data) => {
    console.log(data);
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
