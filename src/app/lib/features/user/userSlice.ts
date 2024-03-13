import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type UserInfoType = {
  email: string;
};

// Define a type for the slice state
interface UserState {
  isLoggedIn: boolean;
  userInfo: UserInfoType;
}

// Define the initial state using that type
const initialState: UserState = {
  isLoggedIn: false,
  userInfo: {
    email: ''
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      state.userInfo = action.payload.userInfo;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    }
  }
});

export const { setUserInfo, setIsLoggedIn } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;
