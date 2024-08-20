import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface LeaseDefaultFieldsSliceState {
  data: any[];
  selectedCustomer: any | null;
  loading: boolean;
  error: string | null;
}
 
const initialState: LeaseDefaultFieldsSliceState = {
  data: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
 
export const fetchLeaseDefaultFields = createAsyncThunk('leaseDefaultFields/fetchLeaseDefaultFields', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-default-fields`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
export const fetchLeaseDefaultFieldsById = createAsyncThunk('leaseDefaultFields/fetchLeaseDefaultFieldsById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-default-fields/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addLeaseDefaultFields = createAsyncThunk('leaseDefaultFields/addLeaseDefaultFields', async (assets: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-default-fields`, assets);
  return response.data;
});
 
export const updateLeaseDefaultFields = createAsyncThunk('leaseDefaultFields/updateLeaseDefaultFields', async (updatedCustomer: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-default-fields/${updatedCustomer.id}`, updatedCustomer);
  return response.data;
});
 
export const deleteLeaseDefaultFields = createAsyncThunk('leaseDefaultFields/deleteLeaseDefaultFields', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-default-fields/${id}`);
  return id;
});
 
const LeaseDefaultFieldsSlice = createSlice({
  name: 'leaseDefaultField',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedCustomer = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaseDefaultFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaseDefaultFields.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLeaseDefaultFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      .addCase(fetchLeaseDefaultFieldsById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addLeaseDefaultFields.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateLeaseDefaultFields.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteLeaseDefaultFields.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = LeaseDefaultFieldsSlice.actions;
 
export default LeaseDefaultFieldsSlice.reducer;