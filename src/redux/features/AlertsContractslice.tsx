import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Interface for the alerts contract state
interface AlertsContractState {
  data: any[];
  selectedAlertsContract: any | null;
  loading: boolean;
  error: string | null;
}

// Initial state of the slice
const initialState: AlertsContractState = {
  data: [],
  selectedAlertsContract: null,
  loading: false,
  error: null,
};

// Ensure environment variables are loaded
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY || '';
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID || '';

// Async thunks for different actions

// Fetch all alerts contracts
export const fetchAlertsContract = createAsyncThunk(
  'alertsContract/fetchAlertsContract',
  async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-alert`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching alerts contracts:', error);
      throw error;
    }
  }
);

// Fetch alerts contract by ID
export const fetchAlertsContractById = createAsyncThunk(
  'alertsContract/fetchAlertsContractById',
  async (id: string) => {
    try {
      const response = await axios.get(
        `${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-alert/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching alert contract with ID ${id}:`, error);
      throw error;
    }
  }
);

// Add a new alerts contract
export const addAlertsContract = createAsyncThunk(
  'alertsContract/addAlertsContract',
  async (alertsContract: any) => {
    try {
      const response = await axios.post(
        `${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-alert`,
        alertsContract
      );
      return response.data;
    } catch (error) {
      console.error('Error adding new alerts contract:', error);
      throw error;
    }
  }
);

// Update an existing alerts contract
export const updateAlertsContract = createAsyncThunk(
  'alertsContract/updateAlertsContract',
  async (updatedAlertsContract: any) => {
    try {
      const response = await axios.put(
        `${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-alert`,
        updatedAlertsContract
      );
      return response.data;
    } catch (error) {
      console.error('Error updating alerts contract:', error);
      throw error;
    }
  }
);

// Delete an alerts contract
export const deleteAlertsContract = createAsyncThunk(
  'alertsContract/deleteAlertsContract',
  async (id: number) => {
    try {
      await axios.delete(
        `${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-alert/${id}`
      );
      return id;
    } catch (error) {
      console.error('Error deleting alerts contract:', error);
      throw error;
    }
  }
);

// Create the slice for alerts contract
const alertsContractSlice = createSlice({
  name: 'alertsContract',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const alertsContract = state.data.find((u) => u.id === action.payload);
      state.selectedAlertsContract = alertsContract || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlertsContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlertsContract.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAlertsContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch alerts contract';
      })
      .addCase(fetchAlertsContractById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addAlertsContract.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAlertsContract.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAlertsContract.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});

// Export actions
export const { setSelectedCustomer } = alertsContractSlice.actions;

// Export the reducer to be used in store configuration
export default alertsContractSlice.reducer;
