import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
type User = {
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'), // Initialize from localStorage
  isLoggedIn: !!localStorage.getItem('token'), // Check if token exists
  status: 'idle',
  error: null,
};

// Configure axios defaults
// This will help with CORS credentials
axios.defaults.withCredentials = false;

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Keep the exact same URL that was working before
      const response = await axios.post('http://127.0.0.1:5000/api/login', credentials);
      const { user, token } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      return { user, token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      // Keep the exact same URL that was working before
      const response = await axios.post('http://127.0.0.1:5000/api/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Registration failed');
    }
  }
);

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
        // After registration, user should login separately
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;