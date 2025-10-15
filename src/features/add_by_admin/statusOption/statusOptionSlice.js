import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "http://localhost:5000/api/status-option";
const BASE_URL = import.meta.env.VITE_API_URL;

// 🔹 CREATE Status Option
export const createStatusOption = createAsyncThunk(
  "statusOptions/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/status-option`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔹 GET ALL Status Options
export const fetchStatusOptions = createAsyncThunk(
  "statusOptions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/status-option`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔹 UPDATE Status Option
export const updateStatusOption = createAsyncThunk(
  "statusOptions/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/status-option/${id}`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔹 DELETE Status Option
export const deleteStatusOption = createAsyncThunk(
  "statusOptions/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/status-option/${id}`);
      return id; // return ID only to simplify filtering
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= SLICE =================
const statusOptionSlice = createSlice({
  name: "statusOptions",
  initialState: {
    statusOptions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createStatusOption.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStatusOption.fulfilled, (state, action) => {
        state.loading = false;
        state.statusOptions.push(action.payload);
      })
      .addCase(createStatusOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ALL
      .addCase(fetchStatusOptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatusOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.statusOptions = action.payload;
      })
      .addCase(fetchStatusOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateStatusOption.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatusOption.fulfilled, (state, action) => {
        state.loading = false;
        state.statusOptions = state.statusOptions.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateStatusOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteStatusOption.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStatusOption.fulfilled, (state, action) => {
        state.loading = false;
        state.statusOptions = state.statusOptions.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteStatusOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default statusOptionSlice.reducer;
