import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Paper, Stack, Typography } from '@mui/material';
import { green, orange, red } from '@mui/material/colors';
import Image from 'next/image';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import { fakeUserInfo } from './CertificateInfo';
import convertDateFormat from '@/utils/convertDateFormat';

export default function CertificateCard() {
  const injectedVaccineTime = 2;
  const bgColor = injectedVaccineTime >= 2 ? green[500] : orange[600];

  return (
    <Paper
      style={{ backgroundColor: bgColor }}
      className="min-w-[340px] p-6 shadow-2xl">
      <Stack alignItems={'center'} spacing={6}>
        <Image
          src={'/images/vaccine-certificate/certificate-logo.png'}
          alt="certificate-logo"
          width={100}
          height={100}
        />
        <Typography variant="h5" textAlign="center">
          ĐÃ TIÊM {injectedVaccineTime} MŨI VẮC XIN
        </Typography>
        <Image
          src={'/images/vaccine-certificate/certificate-qr.png'}
          alt="certificate-logo"
          width={196}
          height={196}
        />
        {/* user info */}
        <Stack
          spacing={2}
          padding={2}
          width={'100%'}
          sx={{ backgroundColor: '#fff', color: 'black', borderRadius: '8px' }}>
          <Stack direction="row" spacing={1}>
            <PersonIcon width={24} height={24} />
            <Stack>
              <Typography variant="body1">Họ và tên</Typography>
              <Typography variant="body1" fontWeight={600}>
                {fakeUserInfo.fullName}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1}>
            <DateRangeIcon width={24} height={24} />

            <Stack>
              <Typography variant="body1">Ngày sinh</Typography>
              <Typography variant="body1" fontWeight={600}>
                {convertDateFormat(fakeUserInfo.dateOfBirth)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1}>
            <FeaturedVideoIcon width={24} height={24} />
            <Stack>
              <Typography variant="body1">Số CMND/CCCD</Typography>
              <Typography variant="body1" fontWeight={600}>
                {fakeUserInfo.citizenID}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
