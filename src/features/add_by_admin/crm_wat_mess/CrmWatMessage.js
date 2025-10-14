import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/crm-messages";

// 🔹 Async thunks (No changes needed)
export const fetchCrmMessages = createAsyncThunk(
  // ... (fetchCrmMessages logic)
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
      // ✅ FIX 1: Explicitly check for nested 'data' property common in API wrappers
      return response.data.data || response.data; 
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
      // ✅ FIX 2: Explicitly check for nested 'data' property common in API wrappers
      return response.data.data || response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update message"
      );
    }
  }
);

export const deleteCrmMessage = createAsyncThunk(
  // ... (deleteCrmMessage logic)
  "crm_messages/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id; // Return the ID of the deleted item
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
    status: "idle",
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
      // ... (fetchCrmMessages cases)
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

      // ... (addCrmMessage cases)
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
      // 🟢 FIX FOR UPDATE MESSAGE
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

        // Ensure action.payload is the fully updated message object
        const updatedItem = action.payload;

        // Find the index of the old item
        const index = state.crm_messages.findIndex(
          (msg) => msg._id === updatedItem._id
        );

        // Replace the old item with the fully updated item
        if (index !== -1) {
          // Simply replace the old object with the new one
          state.crm_messages[index] = updatedItem;
        }
        state.success = "Message updated successfully";
      })
      .addCase(updateCrmMessage.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || "Failed to update message";
      })

      // ... (deleteCrmMessage cases)
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
