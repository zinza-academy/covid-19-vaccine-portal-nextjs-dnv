'use client';
import {
  QueryParamsType,
  defaultSearachParams,
  handleChangePage,
  searchVaccinationPoints,
  updateQueryParams
} from '@/app/lib/features/vaccinationPoint/vaccinationPointSlice';
import { useAppDispatch } from '@/app/lib/hooks';
import SearchIcon from '@mui/icons-material/Search';
import { Button, MenuItem, Select, Stack } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

type AdminSearchParamsType = Pick<QueryParamsType, 'address' | 'name'>;

const names = ['Bệnh viện Đa khoa Medlatec', 'Bệnh viện Đa khoa Hà Nội'];
const addresses = ['42-44 Nghĩa Dũng'];

export default function SearchSection() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<AdminSearchParamsType>({
    defaultValues: {
      address: '',
      name: ''
    }
  });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<AdminSearchParamsType> = (data) => {
    dispatch(updateQueryParams({ ...defaultSearachParams, ...data }));
    dispatch(handleChangePage(0));
    dispatch(searchVaccinationPoints(defaultSearachParams));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2}>
        <div className="block input-group mb-4">
          <Select
            displayEmpty
            variant="outlined"
            defaultValue=""
            placeholder="a"
            sx={{ minWidth: '260px' }}
            {...register('name')}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value="">Điểm tiêm</MenuItem>
            {names.map((item) => (
              <MenuItem key={'p' + item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="block input-group mb-4">
          <Select
            displayEmpty
            variant="outlined"
            defaultValue=""
            sx={{ minWidth: '260px' }}
            {...register('address')}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value="">Địa chỉ</MenuItem>
            {addresses.map((item) => (
              <MenuItem key={'d' + item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>

        <Button
          disabled={isSubmitting}
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
