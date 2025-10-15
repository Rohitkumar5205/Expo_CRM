import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "http://localhost:5000/api/crm-messages";
const BASE_URL = import.meta.env.VITE_API_URL;

/* ==========================================
   🟢 1️⃣ Get all messages
========================================== */
export const fetchCrmMessages = createAsyncThunk(
  "crm_messages/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/crm-messages`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch messages"
      );
    }
  }
);

/* ==========================================
   🟢 2️⃣ Add new message (FormData compatible)
========================================== */
export const addCrmMessage = createAsyncThunk(
  "crm_messages/add",
  async (msgData, thunkAPI) => {
    try {
      // msgData should be FormData
      const response = await axios.post(`${BASE_URL}/crm-messages`, msgData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add message"
      );
    }
  }
);

/* ==========================================
   🟢 3️⃣ Update message (FormData compatible)
========================================== */
export const updateCrmMessage = createAsyncThunk(
  "crm_messages/update",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/crm-messages/${id}`,
        updatedData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.data || response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update message"
      );
    }
  }
);

/* ==========================================
   🟢 4️⃣ Delete message
========================================== */
export const deleteCrmMessage = createAsyncThunk(
  "crm_messages/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/crm-messages/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete message"
      );
    }
  }
);

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
      // 🟡 Fetch
      .addCase(fetchCrmMessages.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchCrmMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.crm_messages = action.payload;
      })
      .addCase(fetchCrmMessages.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })

      // 🟢 Add
      .addCase(addCrmMessage.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(addCrmMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.crm_messages.unshift(action.payload);
        state.success = "Message added successfully";
      })
      .addCase(addCrmMessage.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })

      // 🟣 Update
      .addCase(updateCrmMessage.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(updateCrmMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";

        const updatedMsg = action.payload;
        const index = state.crm_messages.findIndex(
          (msg) => msg._id === updatedMsg._id
        );
        if (index !== -1) state.crm_messages[index] = updatedMsg;
        state.success = "Message updated successfully";
      })
      .addCase(updateCrmMessage.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })

      // 🔴 Delete
      .addCase(deleteCrmMessage.pending, (state) => {
        state.loading = true;
        state.status = "loading";
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
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = crmMessageSlice.actions;
export default crmMessageSlice.reducer;
