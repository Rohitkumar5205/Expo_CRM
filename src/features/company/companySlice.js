// src/features/company/companySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/companies`;

// 🟩 Fetch all companies
export const fetchCompanies = createAsyncThunk(
  "company/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🟩 Add new company
export const addCompany = createAsyncThunk(
  "company/add",
  async (companyData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, companyData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🟩 Update company
export const updateCompany = createAsyncThunk(
  "company/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("updated data....", data);
      const res = await axios.put(`${API_URL}/${id}`, data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🟩 Delete company
export const deleteCompany = createAsyncThunk(
  "company/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Company
      .addCase(addCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies.push(action.payload);
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Company
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new attempt
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.companies.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) state.companies[index] = action.payload;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Company
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new attempt
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = state.companies.filter(
          (c) => c._id !== action.payload
        );
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
