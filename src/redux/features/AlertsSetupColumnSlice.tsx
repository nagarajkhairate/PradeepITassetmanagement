import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface AlertsSetupColumnState {
    data: any[];
    selectedAlertsSetupColumn: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: AlertsSetupColumnState = {
    data: [],
    selectedAlertsSetupColumn: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchAlertsSetupColumn = createAsyncThunk('alertsSetupColumn/fetchAlertsSetupColumn', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset`);
    return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchAlertsSetupColumnById = createAsyncThunk('alertsSetupColumn/fetchAlertsSetupColumnById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAlertSetupColumn = createAsyncThunk('alertsSetupColumn/addAlertSetupColumn', async (alertsSetupColumn: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset`, alertsSetupColumn);
 console.log(response)
  return response.data;
});
 
export const updateAlertsSetupColumn = createAsyncThunk('alertsSetupColumn/updateAlertsSetupColumn', async (updatedAlertsSetupColumn: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset/${updatedAlertsSetupColumn.id}`, updatedAlertsSetupColumn);
  
  return response.data;
});
 
export const deleteAlertsSetupColumn = createAsyncThunk('alertsSetupColumn/deleteAlertsSetupColumn', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset/${id}`);
  return id;
});

const alertsSetupColumnSlice = createSlice({
  name: 'alertsSetupColumn',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const alertsSetupColumn = state.data.find((u) => u.id === action.payload);
      state.selectedAlertsSetupColumn = alertsSetupColumn || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlertsSetupColumn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlertsSetupColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAlertsSetupColumn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchAlertsSetupColumnById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addAlertSetupColumn.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAlertsSetupColumn.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAlertsSetupColumn.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = alertsSetupColumnSlice.actions;
 
export default alertsSetupColumnSlice.reducer;

