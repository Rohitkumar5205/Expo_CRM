import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/perinvoice"; // backend base URL

// 🟢 CREATE (Add new Performa Invoice)
export const createPerformaInvoice = createAsyncThunk(
  "perinvoice/create",
  async (invoiceData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, invoiceData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error creating invoice"
      );
    }
  }
);

// 🟡 READ (Fetch all invoices)
export const fetchPerformaInvoices = createAsyncThunk(
  "perinvoice/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching invoices"
      );
    }
  }
);

// 🟣 READ (Fetch one invoice)
export const fetchPerformaInvoiceById = createAsyncThunk(
  "perinvoice/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching invoice"
      );
    }
  }
);

// 🟠 UPDATE
export const updatePerformaInvoice = createAsyncThunk(
  "perinvoice/update",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error updating invoice"
      );
    }
  }
);

// 🔴 DELETE
export const deletePerformaInvoice = createAsyncThunk(
  "perinvoice/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error deleting invoice"
      );
    }
  }
);

// 🧠 Slice
const performaInvoiceSlice = createSlice({
  name: "perinvoice",
  initialState: {
    invoices: [],
    singleInvoice: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearPerInvoiceState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔵 CREATE
      .addCase(createPerformaInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPerformaInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.invoices.unshift(action.payload);
      })
      .addCase(createPerformaInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🟢 FETCH ALL
      .addCase(fetchPerformaInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPerformaInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchPerformaInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🟣 FETCH ONE
      .addCase(fetchPerformaInvoiceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPerformaInvoiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleInvoice = action.payload;
      })
      .addCase(fetchPerformaInvoiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🟠 UPDATE
      .addCase(updatePerformaInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePerformaInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.invoices.findIndex(
          (inv) => inv._id === action.payload._id
        );
        if (index !== -1) state.invoices[index] = action.payload;
      })
      .addCase(updatePerformaInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔴 DELETE
      .addCase(deletePerformaInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePerformaInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = state.invoices.filter(
          (inv) => inv._id !== action.payload
        );
      })
      .addCase(deletePerformaInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPerInvoiceState } = performaInvoiceSlice.actions;

export default performaInvoiceSlice.reducer;
