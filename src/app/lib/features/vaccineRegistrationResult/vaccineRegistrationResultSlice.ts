import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type vaccineRegistrationResultType = {
  healthInsuranceNumber: string;
  job: string;
  appointmentDate: string;
  desireddate: string;
  status: boolean;
};

export type vaccineRegistrationResultState = {
  vaccineRegistrationData: vaccineRegistrationResultType[];
};

const initialState: vaccineRegistrationResultState = {
  vaccineRegistrationData: []
};
export const vaccineRegistrationResultSlice = createSlice({
  name: 'vaccineRegistrationResult',
  initialState,
  reducers: {}
});

// To able to use reducers we need to export them.
export const {} = vaccineRegistrationResultSlice.actions;

export default vaccineRegistrationResultSlice.reducer;
