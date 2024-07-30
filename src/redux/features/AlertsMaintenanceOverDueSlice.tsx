import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface AlertsMaintenanceOverDueState {
    data: any[];
    selectedAlertsMaintenanceOverDue: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: AlertsMaintenanceOverDueState = {
    data: [],
    selectedAlertsMaintenanceOverDue: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchAlertsMaintenanceOverDue = createAsyncThunk('alertsMaintenanceOverDue/fetchAlertsMaintenanceOverDue', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset`);
    return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchAlertsMaintenanceOverDueById = createAsyncThunk('alertsMaintenanceOverDue/fetchAlertsMaintenanceOverDueById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAlertsMaintenanceOverDue = createAsyncThunk('alertsMaintenanceOverDue/addAlertsMaintenanceOverDue', async (alertsMaintenanceOverDue: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset`, alertsMaintenanceOverDue);
 console.log(response)
  return response.data;
});
 
export const updateAlertsMaintenanceOverDue = createAsyncThunk('alertsMaintenanceOverDue/updateAlertsMaintenanceOverDue', async (updatedAlertsMaintenanceOverDue: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset/${updatedAlertsMaintenanceOverDue.id}`, updatedAlertsMaintenanceOverDue);
  
  return response.data;
});
 
export const deleteAlertsMaintenanceOverDue = createAsyncThunk('alertsMaintenanceOverDue/deleteAlertsMaintenanceOverDue', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset/${id}`);
  return id;
});

const alertsMaintenanceOverDueSlice = createSlice({
  name: 'alertsMaintenanceOverDue',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const alertsMaintenanceOverDue = state.data.find((u) => u.id === action.payload);
      state.selectedAlertsMaintenanceOverDue = alertsMaintenanceOverDue || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlertsMaintenanceOverDue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlertsMaintenanceOverDue.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAlertsMaintenanceOverDue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchAlertsMaintenanceOverDueById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addAlertsMaintenanceOverDue.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAlertsMaintenanceOverDue.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAlertsMaintenanceOverDue.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = alertsMaintenanceOverDueSlice.actions;
 
export default alertsMaintenanceOverDueSlice.reducer;

