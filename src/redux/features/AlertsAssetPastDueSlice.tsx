import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface AlertsAssetPastDueState {
    data: any[];
    selectedAlertsAssetPastDue: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: AlertsAssetPastDueState = {
    data: [],
    selectedAlertsAssetPastDue: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchAlertsAssetPastDue = createAsyncThunk('alertsAssetPastDue/fetchAlertsAssetPastDue', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction/assetspastdue`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchAlertsAssetPastDueById = createAsyncThunk('alertsAssetPastDue/fetchAlertsAssetPastDueById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction/assetspastdue/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAlertsAssetPastDue = createAsyncThunk('alertsAssetPastDue/addAlertsAssetPastDue', async (alertsAssetPastDue: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction/assetspastdue`, alertsAssetPastDue);
 console.log(response)
  return response.data;
});
 
export const updateAlertsAssetPastDue = createAsyncThunk('alertsAssetPastDue/updateAlertsAssetPastDue', async (updatedAlertsAssetPastDue: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction/assetspastdue/${updatedAlertsAssetPastDue.id}`, updatedAlertsAssetPastDue);
  
  return response.data;
});
 
export const deleteAlertsAssetPastDue = createAsyncThunk('alertsAssetPastDue/deleteAlertsAssetPastDue', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction/assetspastdue/${id}`);
  return id;
});

const alertsAssetPastDueSlice = createSlice({
  name: 'alertsAssetPastDue',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const alertsAssetPastDue = state.data.find((u) => u.id === action.payload);
      state.selectedAlertsAssetPastDue = alertsAssetPastDue || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlertsAssetPastDue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlertsAssetPastDue.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAlertsAssetPastDue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchAlertsAssetPastDueById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addAlertsAssetPastDue.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAlertsAssetPastDue.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAlertsAssetPastDue.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = alertsAssetPastDueSlice.actions;
 
export default alertsAssetPastDueSlice.reducer;

