import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type UserInfoType = {
  citizenID: string;
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  city: string;
  district: string;
  ward: string;
};

export type UserInfoTypeWithoutPassword = Omit<UserInfoType, 'password'>;

// Define a type for the slice state
interface UserState {
  isLoggedIn: boolean;
  userInfo: UserInfoType;
}

// Define the initial state using that type
const initialState: UserState = {
  isLoggedIn: false,
  userInfo: {
    email: '',
    citizenID: '',
    city: '',
    dateOfBirth: '',
    gender: '',
    district: '',
    fullName: '',
    password: '',
    ward: ''
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerSubmit: (state, action: PayloadAction<UserInfoType>) => {
      state.userInfo = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    }
  }
});

export const { registerSubmit, setIsLoggedIn } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;
