import { VaccineRegistrationStatus } from '@/app/(mainPage)/portal/(accountPages)/injection-registration-results/page';
import { Chip } from '@mui/material';

interface StatusBadgeProps {
  status: VaccineRegistrationStatus;
}

const getBadgeColor = (status: VaccineRegistrationStatus) => {
  switch (status) {
    case VaccineRegistrationStatus.Requested:
      return 'default';
    case VaccineRegistrationStatus.Accepted:
      return 'primary';
    case VaccineRegistrationStatus.Rejected:
      return 'warning';
    case VaccineRegistrationStatus.Completed:
      return 'success';
  }
};

export const getBadgeLabel = (status: VaccineRegistrationStatus) => {
  switch (status) {
    case VaccineRegistrationStatus.Requested:
      return 'Đăng ký thành công';
    case VaccineRegistrationStatus.Accepted:
      return 'Đã được chấp nhận';
    case VaccineRegistrationStatus.Rejected:
      return 'Đã bị từ chối';
    case VaccineRegistrationStatus.Completed:
      return 'Đã hoàn thành tiêm';
  }
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return <Chip color={getBadgeColor(status)} label={getBadgeLabel(status)} />;
}
