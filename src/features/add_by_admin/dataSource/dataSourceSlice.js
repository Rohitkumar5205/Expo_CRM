import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "http://localhost:5000/api/data-source";
const BASE_URL = import.meta.env.VITE_API_URL;
// 🔹 Fetch All Data Sources
export const fetchDataSources = createAsyncThunk(
  "dataSources/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/data-source`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔹 Fetch Single Data Source by ID
export const fetchDataSourceById = createAsyncThunk(
  "dataSources/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/data-source/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔹 Create New Data Source
export const createDataSource = createAsyncThunk(
  "dataSources/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/data-source`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔹 Update Existing Data Source
export const updateDataSource = createAsyncThunk(
  "dataSources/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/data-source/${id}`, updates);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔹 Delete Data Source
export const deleteDataSource = createAsyncThunk(
  "dataSources/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/data-source/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// -----------------------------------------------------
// Initial State
// -----------------------------------------------------
const initialState = {
  dataSources: [],
  loading: false,
  error: null,
};

// -----------------------------------------------------
// Slice Definition
// -----------------------------------------------------
const dataSourceSlice = createSlice({
  name: "dataSources",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔸 FETCH ALL
      .addCase(fetchDataSources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataSources.fulfilled, (state, action) => {
        state.loading = false;
        state.dataSources = action.payload;
      })
      .addCase(fetchDataSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔸 CREATE
      .addCase(createDataSource.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDataSource.fulfilled, (state, action) => {
        state.loading = false;
        state.dataSources.push(action.payload);
      })
      .addCase(createDataSource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔸 UPDATE
      .addCase(updateDataSource.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDataSource.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.dataSources.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.dataSources[index] = action.payload;
        }
      })
      .addCase(updateDataSource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔸 DELETE
      .addCase(deleteDataSource.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDataSource.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId =
          action.payload?._id || action.payload?.deletedId || action.payload;
        state.dataSources = state.dataSources.filter(
          (c) => c._id !== deletedId
        );
      })
      .addCase(deleteDataSource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = dataSourceSlice.actions;
export default dataSourceSlice.reducer;
