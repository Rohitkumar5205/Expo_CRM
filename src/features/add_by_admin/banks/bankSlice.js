import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "http://localhost:5000/api/banks"; // 🔹 Update if backend URL differs
const BASE_URL = import.meta.env.VITE_API_URL;

// 🟢 1️⃣ Fetch all banks
export const fetchBanks = createAsyncThunk(
  "banks/fetchBanks",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/banks`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch banks"
      );
    }
  }
);

// 🟢 2️⃣ Add a new bank
export const addBank = createAsyncThunk(
  "banks/addBank",
  async (bankData, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/banks`, bankData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add bank"
      );
    }
  }
);

// 🟢 3️⃣ Update existing bank
export const updateBank = createAsyncThunk(
  "banks/updateBank",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URL}/banks/${id}`, updatedData);
      return response.data.data; // Controller returns data inside `data`
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update bank"
      );
    }
  }
);

// 🟢 4️⃣ Delete bank
export const deleteBank = createAsyncThunk(
  "banks/deleteBank",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id; // return deleted ID
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete bank"
      );
    }
  }
);

// ============================
// 📦 Slice
// ============================
const bankSlice = createSlice({
  name: "banks",
  initialState: {
    banks: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch
      .addCase(fetchBanks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanks.fulfilled, (state, action) => {
        state.loading = false;
        state.banks = action.payload;
      })
      .addCase(fetchBanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Add
      .addCase(addBank.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBank.fulfilled, (state, action) => {
        state.loading = false;
        state.banks.push(action.payload);
        state.success = "Bank added successfully";
      })
      .addCase(addBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Update
      .addCase(updateBank.fulfilled, (state, action) => {
        const index = state.banks.findIndex(
          (bank) => bank._id === action.payload._id
        );
        if (index !== -1) {
          state.banks[index] = action.payload;
        }
        state.success = "Bank updated successfully";
      })
      .addCase(updateBank.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔹 Delete
      .addCase(deleteBank.fulfilled, (state, action) => {
        state.banks = state.banks.filter((bank) => bank._id !== action.payload);
        state.success = "Bank deleted successfully";
      })
      .addCase(deleteBank.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = bankSlice.actions;
export default bankSlice.reducer;
