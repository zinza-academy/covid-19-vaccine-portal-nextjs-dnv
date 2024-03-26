import { TableDataType } from '@/app/lib/features/vaccinationPoint/vaccinationPointSlice';
import FieldLabel from '@/components/auth/FieldLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface EditModalProps {
  editModalOpen: boolean;
  handleCloseEditModal: () => void;
  vaccinationPoint: TableDataType | null;
}

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Tên điểm tiêm không được bỏ trống'),
    address: yup.string().required('Địa chỉ không được bỏ trống'),
    manager: yup
      .string()
      .required('Người đứng đầu cơ sở tiêm chủng không được bỏ trống'),
    tableNumber: yup
      .number()
      .default(0)
      .required('Số bàn tiêm là số và không được bỏ trống'),
    ward: yup.string().required('Xã/Phường không được bỏ trống'),
    city: yup.string().required('Thành phố không được để trống.'),
    district: yup.string().required('Quân/Huyệnkhông được để trống.')
  })
  .required();

type EditVaccinePointFormType = yup.InferType<typeof schema>;

const cities = ['Hà Nội', 'Hưng Yên', 'Lào Cai'];
const districts = ['Cầu Giấy', 'Nam Từ Liêm'];
const wards = ['Mai Dịch', 'Dịch Vọng Hậu'];

export default function EditModal({
  editModalOpen,
  handleCloseEditModal,
  vaccinationPoint
}: EditModalProps) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isDirty, isValid, errors }
  } = useForm<EditVaccinePointFormType>({
    mode: 'onChange',
    defaultValues: {
      name: vaccinationPoint?.name,
      address: vaccinationPoint?.address,
      ward: vaccinationPoint?.ward || '',
      manager: vaccinationPoint?.manager,
      tableNumber: vaccinationPoint?.tableNumber,
      city: vaccinationPoint?.city,
      district: vaccinationPoint?.district
    },
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<EditVaccinePointFormType> = (data) => {};

  useEffect(() => {
    if (vaccinationPoint !== null) {
      reset({
        name: vaccinationPoint.name,
        address: vaccinationPoint.address,
        ward: vaccinationPoint.ward,
        manager: vaccinationPoint.manager,
        tableNumber: vaccinationPoint.tableNumber,
        city: vaccinationPoint.city,
        district: vaccinationPoint.district
      });
    }
  }, [vaccinationPoint, reset]);

  return (
    <Modal hideBackdrop open={editModalOpen} onClose={handleCloseEditModal}>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '4px',
          width: '900px'
        }}
        p={2}>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Typography variant="h6">Cập nhật điểm tiêm</Typography>
          <IconButton color="default" onClick={handleCloseEditModal}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ marginY: '12px' }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* vaccine point name */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FieldLabel htmlFor="name" text="Tên điểm tiêm" required />
                <TextField
                  {...register('name')}
                  id="name"
                  placeholder="Tên điểm tiêm"
                  variant="outlined"
                  error={!!errors.name?.message}
                  helperText={errors.name?.message}
                />
              </FormControl>
            </Grid>
            {/* address */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FieldLabel htmlFor="address" text="Địa chỉ" required />
                <TextField
                  {...register('address')}
                  id="address"
                  variant="outlined"
                  placeholder="Số nhà, tên đường"
                  error={!!errors.address?.message}
                  helperText={errors.address?.message}
                />
              </FormControl>
            </Grid>
            {/* city*/}
            <Grid item xs={4}>
              <FormControl fullWidth>
                <FieldLabel htmlFor="city" text="Tỉnh/Thành phố" required />
                <Controller
                  control={control}
                  name="city"
                  render={({ field: { onChange, value } }) => (
                    <FormControl>
                      <InputLabel id="city">Tỉnh/Thành phố</InputLabel>
                      <Select
                        labelId="city"
                        id="city"
                        value={value || ''}
                        onChange={onChange}
                        error={!!errors.city?.message}>
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
                  render={({ field: { onChange, value } }) => (
                    <FormControl>
                      <InputLabel id="district">Tỉnh/Thành phố</InputLabel>
                      <Select
                        label="Quận/Huyện"
                        id="district"
                        value={value || ''}
                        onChange={onChange}
                        error={!!errors.district?.message}>
                        {districts.map((district) => (
                          <MenuItem key={district} value={district}>
                            {district}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <FormHelperText error>{errors.city?.message}</FormHelperText>
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
            {/* manager */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FieldLabel
                  htmlFor="manager"
                  text="Người đứng đầu cơ sở tiêm chủng"
                  required
                />
                <TextField
                  {...register('manager')}
                  name="manager"
                  placeholder="Người đứng đầu cơ sở tiêm chủng"
                  error={!!errors.manager?.message}
                  helperText={errors.manager?.message}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FieldLabel
                  htmlFor="manager"
                  text="Người đứng đầu cơ sở tiêm chủng"
                  required
                />
                <TextField
                  {...register('tableNumber')}
                  type="number"
                  placeholder="Số bàn tiêm"
                  error={!!errors.tableNumber?.message}
                  helperText={errors.tableNumber?.message}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="end" spacing={2} p={2}>
            <Button variant="outlined" onClick={handleCloseEditModal}>
              Hủy bỏ
            </Button>
            <Button type="submit" variant="contained" disabled={false}>
              Xác nhận
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
