import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface AlertsSetupState {
    data: any[];
    selectedAlertsSetup: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: AlertsSetupState = {
    data: [],
    selectedAlertsSetup: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchAlertsSetup = createAsyncThunk('alertsSetup/fetchAlertsSetup', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/set-alert`);
    return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchAlertsSetupById = createAsyncThunk('alertsSetup/fetchAlertsSetupById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/set-alert/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAlertSetup = createAsyncThunk('alertsSetup/addAlertSetup', async (alertsSetup: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/set-alert`, alertsSetup);
 console.log(response)
  return response.data;
});
 
export const updateAlertsSetup = createAsyncThunk('alertsSetup/updateAlertsSetup', async (updatedAlertsSetup: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/set-alert`, updatedAlertsSetup);
  
  return response.data;
});
 
export const deleteAlertsSetup = createAsyncThunk('alertsSetup/deleteAlertsSetup', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/set-alert/${id}`);
  return id;
});

const alertsSetupSlice = createSlice({
  name: 'alertsSetup',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const alertsSetup = state.data.find((u) => u.id === action.payload);
      state.selectedAlertsSetup = alertsSetup || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlertsSetup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlertsSetup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAlertsSetup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchAlertsSetupById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addAlertSetup.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAlertsSetup.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAlertsSetup.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = alertsSetupSlice.actions;
 
export default alertsSetupSlice.reducer;

