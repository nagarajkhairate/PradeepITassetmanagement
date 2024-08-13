import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface LeaseReturnFieldsSliceState {
  data: any[];
  selectedCustomer: any | null;
  loading: boolean;
  error: string | null;
}
 
const initialState: LeaseReturnFieldsSliceState = {
  data: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
 
export const fetchLeaseReturnFields = createAsyncThunk('leaseReturnFieldss/fetchLeaseReturnFields', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-return-default-fields`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
export const fetchLeaseReturnFieldsById = createAsyncThunk('leaseReturnFieldss/fetchLeaseReturnFieldsById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-return-default-fields/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addLeaseReturnFields = createAsyncThunk('leaseReturnFieldss/addLeaseReturnFields', async (assets: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-return-default-fields`, assets);
  return response.data;
});
 
export const updateLeaseReturnFields = createAsyncThunk('leaseReturnFieldss/updateLeaseReturnFields', async (updatedCustomer: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-return-default-fields/${updatedCustomer.id}`, updatedCustomer);
  return response.data;
});
 
export const deleteLeaseReturnFields = createAsyncThunk('leaseReturnFieldss/deleteLeaseReturnFields', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-return-default-fields/${id}`);
  return id;
});
 
const LeaseReturnFieldsSlice = createSlice({
  name: 'leaseReturnField',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedCustomer = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaseReturnFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaseReturnFields.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLeaseReturnFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      .addCase(fetchLeaseReturnFieldsById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addLeaseReturnFields.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateLeaseReturnFields.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteLeaseReturnFields.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = LeaseReturnFieldsSlice.actions;
 
export default LeaseReturnFieldsSlice.reducer;