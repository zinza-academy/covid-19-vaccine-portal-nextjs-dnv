import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {
  VaccineRegistrationFormDataType,
  VaccineRegistrationFormStepProps
} from '@/app/(mainPage)/portal/vaccine-registration/page';
import FieldLabel from '@/components/auth/FieldLabel';
import SelectInput from '@/components/common/SelectInput';
import desireddateOptions from '@/utils/constant/desireddateOptions';
import jobGroups from '@/utils/constant/jobGroups';
import priorityOptions from '@/utils/constant/priorityOptions';
import notes from '@/utils/constant/vaccinationRegisterNotes';
import {
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';
import { useAppDispatch } from '@/app/lib/hooks';
import {
  PersonalInfoType,
  submitFormData
} from '@/app/lib/features/vaccineRegistration/vaccineRegistrationSlice';

const appointmentDateRule = dayjs().add(0, 'day');

export default function PersonalInfoStep({
  vaccineRegistrationForm,
  setStep,
  step
}: VaccineRegistrationFormStepProps) {
  const {
    control,
    handleSubmit,
    register,
    formState: { isValid, errors }
  } = vaccineRegistrationForm;

  const dispatch = useAppDispatch();

  const onSubmit = (data: VaccineRegistrationFormDataType) => {
    try {
      const formatedDate = data.appointmentDate.toDate();
      const personalInfo = { ...data, appointmentDate: formatedDate };
      dispatch(submitFormData(personalInfo));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {/* 1. Thông tin người đăng ký tiêm */}
      <Typography variant="body1" fontWeight={600}>
        1. Thông tin người đăng ký tiêm
      </Typography>

      {/* Nhóm ưu tiên,  Số thẻ BHYT */}
      <Stack direction={'row'} spacing={4}>
        <SelectInput
          name="priorityOptions"
          control={control}
          selections={priorityOptions}
          label="Nhóm ưu tiên"
          placeholder="Nhóm ưu tiên"
          errorMessage="Nhóm ưu tiên không được bỏ trống"
          required
        />
        <Stack spacing={1}>
          <FieldLabel htmlFor="healthInsuranceNumber" text="Số thẻ BHYT" />
          <TextField
            sx={{ minWidth: '330px' }}
            {...register('healthInsuranceNumber')}
            id="healthInsuranceNumber"
            placeholder="Số thẻ BHYT"
            variant="outlined"
            error={!!errors.healthInsuranceNumber?.message}
            helperText={errors.healthInsuranceNumber?.message}
          />
        </Stack>
      </Stack>

      <Stack direction={'row'} spacing={4}>
        {/* Nghề nghiệp */}
        <SelectInput
          name="job"
          control={control}
          label="Nghề nghiệp"
          placeholder="Nghề nghiệp"
          selections={jobGroups}
        />
        {/* Đơn vị công tác */}
        <Stack spacing={1}>
          <FieldLabel htmlFor="workplace" text="Đơn vị công tác" />
          <TextField
            sx={{ minWidth: '330px' }}
            {...register('workplace')}
            id="workplace"
            name="workplace"
            placeholder="Đơn vị công tác"
            variant="outlined"
            error={!!errors.workplace?.message}
            helperText={errors.workplace?.message}
          />
        </Stack>
        {/* Địa chỉ hiện tại */}
        <Stack spacing={1}>
          <FieldLabel htmlFor="address" text="Địa chỉ hiện tại" />
          <TextField
            sx={{ minWidth: '330px' }}
            {...register('address')}
            id="address"
            name="address"
            placeholder="Địa chỉ hiện tại"
            variant="outlined"
            error={!!errors.address?.message}
            helperText={errors.address?.message}
          />
        </Stack>
      </Stack>

      {/* 2. Thông tin đăng ký tiêm chủng */}
      <Typography variant="body1" fontWeight={600}>
        2. Thông tin đăng ký tiêm chủng
      </Typography>
      <Stack direction={'row'} spacing={4}>
        <Stack spacing={1}>
          <FieldLabel htmlFor="" text="Ngày mong muốn được tiêm(dự kiến)" />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="appointmentDate"
              control={control}
              render={({ field }) => (
                <>
                  <DatePicker
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    format="DD/MM/YYYY"
                    minDate={appointmentDateRule}
                  />
                  {errors.appointmentDate?.message && (
                    <FormHelperText error>
                      {errors.appointmentDate?.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </LocalizationProvider>
        </Stack>
        {/* Nghề nghiệp */}
        <SelectInput
          name="desireddate"
          control={control}
          label="Buổi tiêm mong muốn"
          placeholder="Buổi tiêm mong muốn"
          selections={desireddateOptions}
        />
      </Stack>

      <Stack direction={'row'} spacing={4}></Stack>
      {/* Lưu ý */}
      <Stack spacing={2} sx={{ color: 'red', pb: 4 }}>
        <Typography>{`Lưu ý:`}</Typography>
        <Stack>
          {notes.map((note, index) => (
            <Typography key={index} component="li">
              {note}
            </Typography>
          ))}
        </Stack>
      </Stack>

      {/* Buttons */}
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button variant="outlined" href="/">
          Hủy bỏ
        </Button>
        <Button type="submit" variant="contained" disabled={!isValid}>
          Tiếp tục
        </Button>
      </Stack>
    </form>
  );
}
