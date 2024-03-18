import { VaccineRegistrationStepProps } from '@/app/(mainPage)/portal/vaccine-registration/page';
import { Stepper, Step, StepLabel } from '@mui/material';

const STEPS = [
  {
    key: 0,
    label: 'Thông tin cá nhân'
  },
  {
    key: 1,
    label: 'Phiếu đồng ý tiêm'
  },
  {
    key: 2,
    label: 'Hoàn thành'
  }
];
export default function MuiStepper({
  step,
  setStep
}: VaccineRegistrationStepProps) {
  return (
    <Stepper activeStep={step} alternativeLabel sx={{ pb: 4 }}>
      {STEPS.map((step, index) => (
        <Step key={step.key}>
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
