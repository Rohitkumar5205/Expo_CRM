import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
// const API_URL = "http://localhost:5000/api/nature-of-business";
const BASE_URL = import.meta.env.VITE_API_URL;
// **Async Thunks**

// FETCH all natures
export const fetchNatures = createAsyncThunk(
  "natures/fetchNatures",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/nature-of-business`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// FETCH by ID
export const fetchNatureById = createAsyncThunk(
  "natures/fetchNatureById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/nature-of-business/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// CREATE
export const createNature = createAsyncThunk(
  "natures/createNature",
  async (natureData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/nature-of-business`,
        natureData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// UPDATE
export const updateNature = createAsyncThunk(
  "natures/updateNature",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/nature-of-business/${id}`,
        updates
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// DELETE
export const deleteNature = createAsyncThunk(
  "natures/deleteNature",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/nature-of-business/${id}`
      );
      return response.data; // backend might return an object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// **Initial State**
const initialState = {
  natures: [],
  loading: false,
  error: null,
};

// **Slice**
const natureSlice = createSlice({
  name: "natures",
  initialState,
  reducers: {
    clearNatureError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchNatures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNatures.fulfilled, (state, action) => {
        state.loading = false;
        state.natures = action.payload;
      })
      .addCase(fetchNatures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createNature.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNature.fulfilled, (state, action) => {
        state.loading = false;
        state.natures.push(action.payload);
      })
      .addCase(createNature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateNature.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNature.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.natures.findIndex(
          (n) => n._id === action.payload._id
        );
        if (index !== -1) state.natures[index] = action.payload;
      })
      .addCase(updateNature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteNature.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNature.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId =
          action.payload?._id || action.payload?.deletedId || action.payload;
        state.natures = state.natures.filter((c) => c._id !== deletedId);
      })
      .addCase(deleteNature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNatureError } = natureSlice.actions;

export default natureSlice.reducer;
