'use client';
import ConfirmStep from '@/components/portal/vaccine-registration/ConfirmStep';
import MuiStepper from '@/components/portal/vaccine-registration/MuiStepper';
import PersonalInfoStep from '@/components/portal/vaccine-registration/PersonalInfoStep';
import ResultStep from '@/components/portal/vaccine-registration/ResultStep';
import {
  Stepper,
  Typography,
  Step,
  StepLabel,
  Stack,
  Button,
  Link
} from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

const steps = [
  'Select campaign settings',
  'Create an ad group',
  'Create an ad'
];

export type AvailableSteps = 0 | 1 | 2;

export type VaccineRegistrationStepProps = {
  step: AvailableSteps;
  setStep: Dispatch<SetStateAction<AvailableSteps>>;
};

export default function VaccineRegistration() {
  const [activeStep, setActiveStep] = useState<AvailableSteps>(0);

  return (
    <Stack component="form" spacing={2}>
      <Typography
        fontSize={'28px'}
        paddingX={'36px'}
        paddingY={'12px'}
        fontWeight={400}>
        Đăng ký tiêm chủng cá nhân
      </Typography>

      <MuiStepper step={activeStep} setStep={setActiveStep} />

      {activeStep === 0 && <PersonalInfoStep />}
      {activeStep === 1 && <ConfirmStep />}
      {activeStep === 2 && <ResultStep />}

      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => setActiveStep((prev) => (prev - 1) as AvailableSteps)}>
          Hủy bỏ
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveStep((prev) => (prev + 1) as AvailableSteps)}
          disabled={false}>
          Tiếp tục
        </Button>
      </Stack>
    </Stack>
  );
}
