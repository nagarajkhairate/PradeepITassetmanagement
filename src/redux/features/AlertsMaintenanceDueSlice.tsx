import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface AlertsMaintenanceDueState {
    data: any[];
    selectedAlertsMaintenanceDue: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: AlertsMaintenanceDueState = {
    data: [],
    selectedAlertsMaintenanceDue: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchAlertsMaintenanceDue = createAsyncThunk('alertsMaintenanceDue/fetchAlertsMaintenanceDue', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/maintenance-alert`);
    return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchAlertsMaintenancedueById = createAsyncThunk('alertsMaintenanceDue/fetchAlertsMaintenancedueById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/maintenance-alert/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAlertsMaintenanceDue = createAsyncThunk('alertsMaintenanceDue/addAlertsMaintenanceDue', async (alertsMaintenanceDue: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/maintenance-alert`, alertsMaintenanceDue);
 console.log(response)
  return response.data;
});
 
export const updateAlertsMaintenanceDue = createAsyncThunk('alertsMaintenanceDue/updateAlertsMaintenanceDue', async (updatedAlertsMaintenanceDue: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/maintenance-alert/${updatedAlertsMaintenanceDue.id}`, updatedAlertsMaintenanceDue);
  
  return response.data;
});
 
export const deleteAlertsMaintenanceDue = createAsyncThunk('alertsMaintenanceDue/deleteAlertsMaintenanceDue', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/maintenance-alert/${id}`);
  return id;
});

const alertsMaintenanceDueSlice = createSlice({
  name: 'alertsMaintenanceDue',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const alertsMaintenanceDue = state.data.find((u) => u.id === action.payload);
      state.selectedAlertsMaintenanceDue = alertsMaintenanceDue || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlertsMaintenanceDue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlertsMaintenanceDue.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAlertsMaintenanceDue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchAlertsMaintenancedueById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addAlertsMaintenanceDue.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAlertsMaintenanceDue.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAlertsMaintenanceDue.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = alertsMaintenanceDueSlice.actions;
 
export default alertsMaintenanceDueSlice.reducer;

