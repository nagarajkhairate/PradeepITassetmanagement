import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface AlertsWarrantiesExpState {
    data: any[];
    selectedAlertsWarrantiesExp: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: AlertsWarrantiesExpState = {
    data: [],
    selectedAlertsWarrantiesExp: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchAlertsWarrantiesExp = createAsyncThunk('alertsWarrantiesExp/fetchAlertsWarrantiesExp', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/warranty-alert`);
    return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchAlertsWarrantiesExpById = createAsyncThunk('alertsWarrantiesExp/fetchAlertsWarrantiesExpById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/warranty-alert/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAlertsWarrantiessExp = createAsyncThunk('alertsWarrantiesExp/addAlertsWarrantiessExp', async (alertsWarrantiesExp: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/warranty-alert`, alertsWarrantiesExp);
 console.log(response)
  return response.data;
});
 
export const updateAlertsWarrantiesExp = createAsyncThunk('alertsWarrantiesExp/updateAlertsWarrantiesExp', async (updatedAlertsWarrantiesExp: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/warranty-alert/${updatedAlertsWarrantiesExp.id}`, updatedAlertsWarrantiesExp);
  
  return response.data;
});
 
export const deleteAlertsWarrantiesExp = createAsyncThunk('alertsWarrantiesExp/deleteAlertsWarrantiesExp', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/warranty-alert/${id}`);
  return id;
});

const alertsWarrantiesExpSlice = createSlice({
  name: 'alertsWarrantiesExp',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const alertsWarrantiesExp = state.data.find((u) => u.id === action.payload);
      state.selectedAlertsWarrantiesExp = alertsWarrantiesExp || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlertsWarrantiesExp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlertsWarrantiesExp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAlertsWarrantiesExp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchAlertsWarrantiesExpById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addAlertsWarrantiessExp.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAlertsWarrantiesExp.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAlertsWarrantiesExp.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = alertsWarrantiesExpSlice.actions;
 
export default alertsWarrantiesExpSlice.reducer;

