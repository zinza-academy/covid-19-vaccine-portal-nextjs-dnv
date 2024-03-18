import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { VaccineRegistrationFormDataType } from '@/app/(mainPage)/portal/vaccine-registration/page';

const initialState: PersonalInfoType = {
  priorityOptions: '',
  job: '',
  workplace: '',
  address: '',
  desireddate: '',
  healthInsuranceNumber: '',
  appointmentDate: ''
};

export type PersonalInfoType = {
  priorityOptions: string;
  job: string;
  workplace: string;
  address: string;

  appointmentDate: string;
  desireddate: string;
  healthInsuranceNumber: string;
};

export const vaccineRegistrationSlice = createSlice({
  name: 'vaccineRegistration',
  initialState,
  reducers: {
    submitFormData: (state, action) => {
      const data = action.payload as PersonalInfoType;
      return { ...state, ...data };
    }
  }
});

// To able to use reducers we need to export them.
export const { submitFormData } = vaccineRegistrationSlice.actions;

//Selector to access bookList state.
export const selectVaccineRegistrationFormData = (state: RootState) =>
  state.vaccineRegistration;

export default vaccineRegistrationSlice.reducer;
