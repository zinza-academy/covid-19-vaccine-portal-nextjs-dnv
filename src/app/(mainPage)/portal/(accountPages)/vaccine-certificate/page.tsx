import CertificateCard from '@/components/portal/vaccine-certificate/CertificateCard';
import CertificateInfo from '@/components/portal/vaccine-certificate/CertificateInfo';
import { Button, Stack } from '@mui/material';

export default function VaccineCertificate() {
  return (
    <Stack spacing={4} direction={'row'}>
      <CertificateInfo />
      <CertificateCard />
    </Stack>
  );
}
