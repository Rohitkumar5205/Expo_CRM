import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/messages";

// 🔹 Async thunks
export const fetchCrmMessages = createAsyncThunk(
  "crm_messages/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch messages"
      );
    }
  }
);

export const addCrmMessage = createAsyncThunk(
  "crm_messages/add",
  async (msgData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, msgData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add message"
      );
    }
  }
);

export const updateCrmMessage = createAsyncThunk(
  "crm_messages/update",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update message"
      );
    }
  }
);

export const deleteCrmMessage = createAsyncThunk(
  "crm_messages/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete message"
      );
    }
  }
);

// 🔹 Slice
const crmMessageSlice = createSlice({
  name: "crm_messages",
  initialState: {
    crm_messages: [],
    item: null,
    loading: false,
    error: null,
    success: null,
    status: "idle", // idle | loading | succeeded | failed
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // =============================
      // 🔹 FETCH ALL
      // =============================
      .addCase(fetchCrmMessages.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.success = null;
      })
      .addCase(fetchCrmMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.crm_messages = action.payload;
        state.success = "Messages fetched successfully";
      })
      .addCase(fetchCrmMessages.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || "Failed to fetch messages";
      })

      // =============================
      // 🔹 ADD MESSAGE
      // =============================
      .addCase(addCrmMessage.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.success = null;
      })
      .addCase(addCrmMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.crm_messages.push(action.payload);
        state.success = "Message added successfully";
      })
      .addCase(addCrmMessage.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || "Failed to add message";
      })

      // =============================
      // 🔹 UPDATE MESSAGE
      // =============================
      .addCase(updateCrmMessage.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.success = null;
      })
      .addCase(updateCrmMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        const index = state.crm_messages.findIndex(
          (msg) => msg._id === action.payload._id
        );
        if (index !== -1) state.crm_messages[index] = action.payload;
        state.success = "Message updated successfully";
      })
      .addCase(updateCrmMessage.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || "Failed to update message";
      })

      // =============================
      // 🔹 DELETE MESSAGE
      // =============================
      .addCase(deleteCrmMessage.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.success = null;
      })
      .addCase(deleteCrmMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.crm_messages = state.crm_messages.filter(
          (msg) => msg._id !== action.payload
        );
        state.success = "Message deleted successfully";
      })
      .addCase(deleteCrmMessage.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || "Failed to delete message";
      });
  },
});

export const { clearMessages } = crmMessageSlice.actions;
export default crmMessageSlice.reducer;
