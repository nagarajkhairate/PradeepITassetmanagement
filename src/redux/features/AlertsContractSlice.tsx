import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface AlertsContractState {
    data: any[];
    selectedAlertsContract: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: AlertsContractState = {
    data: [],
    selectedAlertsContract: null,
    loading: false,
    error: null,
  };
 
  const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
  const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;  

 
export const fetchAlertsContract = createAsyncThunk('alertsContract/fetchAlertsContract', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-alert`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
});

export const fetchAlertsContractById = createAsyncThunk('alertsContract/fetchAlertsContractById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-alert/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAlertsContract = createAsyncThunk('alertsContract/addAlertsContract', async (alertsContract: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-alert`, alertsContract);
 console.log(response)
  return response.data;
});
 
export const updateAlertsContract = createAsyncThunk('alertsContract/updateAlertsContract', async (updatedAlertsContract: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-alert
`, updatedAlertsContract);
  
  return response.data;
});
 
export const deleteAlertsContract = createAsyncThunk('alertsContract/deleteAlertsContract', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contract-alert
/${id}`);
  return id;
});

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
        state.error = action.error.message || 'Failed to fetch client';
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
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAlertsContract.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = alertsContractSlice.actions;
 
export default alertsContractSlice.reducer;

