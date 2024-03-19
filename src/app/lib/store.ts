import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/app/lib/features/user/userSlice';
import vaccinationPointReducer from '@/app/lib/features/vaccinationPoint/vaccinationPointSlice';
import vaccineRegistrationReducer from '@/app/lib/features/vaccineRegistration/vaccineRegistrationSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      vaccinationPoint: vaccinationPointReducer,
      vaccineRegistration: vaccineRegistrationReducer
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
