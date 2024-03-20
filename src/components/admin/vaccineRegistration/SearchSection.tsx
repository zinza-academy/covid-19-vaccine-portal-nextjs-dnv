'use client';
import { useAppDispatch } from '@/app/lib/hooks';
import FieldLabel from '@/components/auth/FieldLabel';
import SelectInput from '@/components/common/SelectInput';
import jobGroups from '@/utils/constant/jobGroups';
import SearchIcon from '@mui/icons-material/Search';
import { Button, FormControl, Stack, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

type AdminSearchParamsType = {
  healthInsuranceNumber: string;
  job: string;
};

export default function SearchSection() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors }
  } = useForm<AdminSearchParamsType>({
    defaultValues: {
      healthInsuranceNumber: '',
      job: ''
    }
  });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<AdminSearchParamsType> = (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl">
      <Stack direction="row" spacing={2} alignItems={'end'}>
        <FormControl>
          <FieldLabel
            htmlFor="healthInsuranceNumber"
            text="Số thẻ bảo hiểm y tế"
            required
          />
          <TextField
            {...register('healthInsuranceNumber')}
            id="healthInsuranceNumber"
            placeholder="Tên điểm tiêm"
            variant="outlined"
            error={!!errors.healthInsuranceNumber?.message}
            helperText={errors.healthInsuranceNumber?.message}
          />
        </FormControl>
        <SelectInput
          name="job"
          control={control}
          label="Nghề nghiệp"
          placeholder="Nghề nghiệp"
          selections={jobGroups}
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          startIcon={<SearchIcon />}
          variant="contained"
          size="large"
          sx={{
            fontWeight: '600',
            borderRadius: '8px 8px 8px 0px',
            height: '56px'
          }}>
          Tìm kiếm
        </Button>
      </Stack>
    </form>
  );
}
