import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface AlertsLeasesExpState {
    data: any[];
    selectedAlertsLeasesExp: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: AlertsLeasesExpState = {
    data: [],
    selectedAlertsLeasesExp: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchAlertsLeasesExp = createAsyncThunk('alertsLeasesExp/fetchAlertsLeasesExp', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-alert`);
    return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchAlertsLeasesExpById = createAsyncThunk('alertsLeasesExp/fetchAlertsLeasesExpById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-alert/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAlertsLeasesExp = createAsyncThunk('alertsLeasesExp/addAlertsLeasesExp', async (alertsLeasesExp: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-alert`, alertsLeasesExp);
 console.log(response)
  return response.data;
});
 
export const updateAlertsLeasesExp = createAsyncThunk('alertsLeasesExp/updateAlertsLeasesExp', async (updatedAlertsLeasesExp: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-alert/${updatedAlertsLeasesExp.id}`, updatedAlertsLeasesExp);
  
  return response.data;
});

export const deleteAlertsLeasesExp = createAsyncThunk('alertsLeasesExp/deleteAlertsLeasesExp', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-alert/${id}`);
  return id;
});

const alertsLeasesExpSlice = createSlice({
  name: 'alertsLeasesExp',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const alertsLeasesExp = state.data.find((u) => u.id === action.payload);
      state.selectedAlertsLeasesExp = alertsLeasesExp || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlertsLeasesExp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlertsLeasesExp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAlertsLeasesExp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchAlertsLeasesExpById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addAlertsLeasesExp.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAlertsLeasesExp.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAlertsLeasesExp.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});

export const { setSelectedCustomer } = alertsLeasesExpSlice.actions;
 
export default alertsLeasesExpSlice.reducer;

