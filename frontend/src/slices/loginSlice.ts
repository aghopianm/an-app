import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoginState = {
  user: null | { email: string; name: string };
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  user: null,
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ email: string; name: string }>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logout } = loginSlice.actions;
export default loginSlice.reducer;