import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// -------------------------
// Async Thunks
// -------------------------

// 1️⃣ Login → generates OTP (saved in cookies by backend)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ user_name, user_password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { user_name, user_password },
        { withCredentials: true } // cookie auto handled
      );

      // OTP will be stored in cookies by backend
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 2️⃣ Verify OTP
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/verify-otp`,
        { otp },
        { withCredentials: true } // send cookies automatically
      );

      return response.data; // token will be set as cookie by backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// -------------------------
// Slice
// -------------------------

const initialState = {
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
