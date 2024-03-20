'use client';
import {
  QueryParamsType,
  handleChangePage,
  searchVaccinationPoints,
  updateQueryParams
} from '@/app/lib/features/vaccinationPoint/vaccinationPointSlice';
import { useAppDispatch } from '@/app/lib/hooks';
import SearchIcon from '@mui/icons-material/Search';
import { Button, MenuItem, Select, Stack } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

const cities = ['Hà Nội', 'Hưng Yên', 'Lào Cai'];
const districts = ['Cầu Giấy', 'Quận Ba Đình'];
const wards = ['Mai Dịch', 'Dịch Vọng Hậu'];

export default function VaccinationPointToolbar() {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting }
  } = useForm<QueryParamsType>({
    defaultValues: {
      city: '',
      district: '',
      ward: ''
    }
  });
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<QueryParamsType> = (data) => {
    dispatch(updateQueryParams(data));
    dispatch(handleChangePage(0));
    dispatch(searchVaccinationPoints(data));
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
            <MenuItem value="">Tỉnh/Thành phố</MenuItem>
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
            <MenuItem value="">Quận/Huyện</MenuItem>
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
            <MenuItem value="">Xã/Phường</MenuItem>
            {wards.map((item) => (
              <MenuItem key={'w' + item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button
          disabled={isSubmitting || !isValid}
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
