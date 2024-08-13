import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface AlertsAddContractState {
    data: any[];
    selectedAlertsAddContract: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: AlertsAddContractState = {
    data: [],
    selectedAlertsAddContract: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchAlertsAddContract = createAsyncThunk('alertsAddContract/fetchAlertsAddContract', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-data`);
    return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchAlertsAddContractById = createAsyncThunk('alertsAddContract/fetchAlertsAddContractById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-data/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAlertsAddContract = createAsyncThunk('alertsAddContract/addAlertsAddContract', async (alertsAddContract: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-data`, alertsAddContract);
 console.log(response)
  return response.data;
});
 
export const updateAlertsAddContract = createAsyncThunk('alertsAddContract/updateAlertsAddContract', async (updatedAlertsAddContract: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-data/${updatedAlertsAddContract.id}`, updatedAlertsAddContract);
  
  return response.data;
});
 
export const deleteAlertsAddContract = createAsyncThunk('alertsAddContract/deleteAlertsAddContract', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-data/${id}`);
  return id;
});

const alertsAddContractSlice = createSlice({
  name: 'alertsAddContract',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const alertsAddContract = state.data.find((u) => u.id === action.payload);
      state.selectedAlertsAddContract = alertsAddContract || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlertsAddContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlertsAddContract.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAlertsAddContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchAlertsAddContractById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addAlertsAddContract.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAlertsAddContract.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAlertsAddContract.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = alertsAddContractSlice.actions;
 
export default alertsAddContractSlice.reducer;

