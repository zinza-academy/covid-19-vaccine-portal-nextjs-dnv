'use client';
import ConfirmStep from '@/components/portal/vaccine-registration/ConfirmStep';
import MuiStepper from '@/components/portal/vaccine-registration/MuiStepper';
import PersonalInfoStep from '@/components/portal/vaccine-registration/PersonalInfoStep';
import ResultStep from '@/components/portal/vaccine-registration/ResultStep';
import * as yup from 'yup';
import {
  Stepper,
  Typography,
  Step,
  StepLabel,
  Stack,
  Button,
  Link,
  Box
} from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs, { Dayjs } from 'dayjs';
import { selectVaccineRegistrationFormData } from '@/app/lib/features/vaccineRegistration/vaccineRegistrationSlice';
import { useAppSelector } from '@/app/lib/hooks';

export type AvailableSteps = 0 | 1 | 2;

export type VaccineRegistrationStepProps = {
  step: AvailableSteps;
  setStep: Dispatch<SetStateAction<AvailableSteps>>;
};

const schema = yup
  .object()
  .shape({
    priorityOptions: yup.string().required(),
    job: yup.string(),
    workplace: yup.string(),
    address: yup.string().trim(),

    appointmentDate: yup.mixed<Dayjs>().required(),
    desireddate: yup.string().required(),
    healthInsuranceNumber: yup.string().required()
  })
  .required();

export type VaccineRegistrationFormDataType = yup.InferType<typeof schema>;

// props của các step
export interface VaccineRegistrationFormStepProps
  extends VaccineRegistrationStepProps {
  vaccineRegistrationForm: UseFormReturn<VaccineRegistrationFormDataType, any>;
}
export default function VaccineRegistration() {
  const [activeStep, setActiveStep] = useState<AvailableSteps>(2);

  const vaccineRegistrationForm = useForm<VaccineRegistrationFormDataType>({
    mode: 'onChange',
    defaultValues: {
      priorityOptions: '',
      job: '',
      workplace: '',
      address: '',
      appointmentDate: dayjs(new Date()),
      desireddate: '',
      healthInsuranceNumber: ''
    },
    resolver: yupResolver(schema)
  });
  return (
    <Stack spacing={2} paddingTop={'32px'} paddingBottom={'48px'}>
      <Typography
        fontSize={'28px'}
        paddingX={'36px'}
        paddingY={'12px'}
        fontWeight={400}>
        Đăng ký tiêm chủng cá nhân
      </Typography>

      <MuiStepper step={activeStep} setStep={setActiveStep} />

      <Box paddingX={5}>
        {activeStep === 0 && (
          <PersonalInfoStep
            vaccineRegistrationForm={vaccineRegistrationForm}
            setStep={setActiveStep}
            step={activeStep}
          />
        )}
        {activeStep === 1 && (
          <ConfirmStep setStep={setActiveStep} step={activeStep} />
        )}
        {activeStep === 2 && <ResultStep />}
      </Box>
    </Stack>
  );
}
