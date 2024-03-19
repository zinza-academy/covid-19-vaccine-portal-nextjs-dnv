import { data } from '@/components/home/DailyStatistics';
import convertDateFormat from '@/utils/convertDateFormat';
import { Stack, Typography, Grid, Button } from '@mui/material';
import Link from 'next/link';
import InjectionHistoryTable from './InjectionHistoryTable';

export const fakeUserInfo = {
  fullName: 'Nguyen Van A',
  dateOfBirth: new Date().toISOString(),
  citizenID: '123456789',
  city: 'Hà Nội',
  healthInsuranceNumber: '1234567890122',
  ward: 'Tự Do',
  district: 'Hoàn Kiếm'
};

// demo vaccine registration Result
const injectionResult = [
  {
    order: 1,
    injectionTime: new Date().toISOString(),
    vaccineName: 'COVID-19 Vaccine AstraZeneca',
    batchNumber: 'NJ0342',
    address: 'TYT Dịch Vọng Hậu'
  },
  {
    order: 2,
    injectionTime: new Date().toISOString(),
    vaccineName: 'COVID-19 Vaccine AstraZeneca',
    batchNumber: 'NJ0342',
    address: 'TYT Dịch Vọng Hậu'
  }
];

export type InjectionResultType = typeof injectionResult;

export default function CertificateInfo() {
  return (
    <Stack spacing={2}>
      <Stack alignItems="center">
        <Typography variant="body1" textTransform="uppercase">
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          Độc lập - Tự do - Hạnh phúc
        </Typography>
      </Stack>
      <Typography
        variant="h5"
        textTransform="uppercase"
        textAlign="center"
        fontWeight={600}>
        CHỨNG NHẬN TIÊM CHỦNG COVID-19
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="body1">Họ và tên</Typography>
          <Typography variant="body1" fontWeight={600}>
            {fakeUserInfo.fullName}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">Ngày sinh</Typography>
          <Typography variant="body1" fontWeight={600}>
            {convertDateFormat(fakeUserInfo.dateOfBirth)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">Số CMND/CCCD</Typography>
          <Typography variant="body1" fontWeight={600}>
            {fakeUserInfo.citizenID}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">Số thẻ BHYT</Typography>
          <Typography variant="body1" fontWeight={600}>
            {fakeUserInfo.healthInsuranceNumber}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Địa chỉ</Typography>
          <Typography variant="body1" fontWeight={600}>
            {fakeUserInfo.ward
              ? `${fakeUserInfo?.ward} - ${fakeUserInfo.district} -
            ${fakeUserInfo.city}`
              : ' '}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Kết luận</Typography>
          <Typography variant="body1" fontWeight={600}>
            {injectionResult.length > 0
              ? 'Đã được tiêm phòng vắc xin phòng bệnh Covid-19'
              : 'Chưa được tiêm phòng vắc xin phòng bệnh Covid-19'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <InjectionHistoryTable injectionResult={injectionResult} />
        </Grid>
      </Grid>

      <Stack alignItems="center">
        <Link href="/portal/vaccine-registration">
          <Button
            variant="contained"
            href="/portal/vaccine-registration"
            sx={{ textTransform: 'uppercase' }}>
            Đăng ký mũi tiêm tiếp theo
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
}
