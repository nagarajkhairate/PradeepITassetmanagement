import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface AlertsInsuranceExpState {
    data: any[];
    selectedAlertsInsuranceExp: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: AlertsInsuranceExpState = {
    data: [],
    selectedAlertsInsuranceExp: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchAlertsInsuranceExp = createAsyncThunk('alertsInsuranceExp/fetchAlertsInsuranceExp', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset`);
    return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchAlertsInsuranceExpById = createAsyncThunk('alertsInsuranceExp/fetchAlertsInsuranceExpById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAlertsInsuranceExp = createAsyncThunk('alertsInsuranceExp/addAlertsInsuranceExp', async (alertsInsuranceExp: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset`, alertsInsuranceExp);
 console.log(response)
  return response.data;
});
 
export const updateAlertsInsuranceExp = createAsyncThunk('alertsInsuranceExp/updateAlertsInsuranceExp', async (updatedAlertsInsuranceExp: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset/${updatedAlertsInsuranceExp.id}`, updatedAlertsInsuranceExp);
  
  return response.data;
});
 
export const deleteAlertsInsuranceExp = createAsyncThunk('alertsInsuranceExp/deleteAlertsInsuranceExp', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset/${id}`);
  return id;
});

const alertsInsuranceExpSlice = createSlice({
  name: 'alertsInsuranceExp',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const alertsInsuranceExp = state.data.find((u) => u.id === action.payload);
      state.selectedAlertsInsuranceExp = alertsInsuranceExp || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlertsInsuranceExp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlertsInsuranceExp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAlertsInsuranceExp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchAlertsInsuranceExpById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addAlertsInsuranceExp.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAlertsInsuranceExp.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAlertsInsuranceExp.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = alertsInsuranceExpSlice.actions;
 
export default alertsInsuranceExpSlice.reducer;

