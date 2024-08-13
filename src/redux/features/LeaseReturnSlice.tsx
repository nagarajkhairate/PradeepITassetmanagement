import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface LeaseReturnSliceState {
  data: any[];
  selectedCustomer: any | null;
  loading: boolean;
  error: string | null;
}
 
const initialState: LeaseReturnSliceState = {
  data: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
 
export const fetchLeaseReturn = createAsyncThunk('leaseReturn/fetchLeaseReturn', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-return`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
export const fetchLeaseReturnById = createAsyncThunk('leaseReturn/fetchLeaseReturnById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-return/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addLeaseReturn = createAsyncThunk('leaseReturn/addLeaseReturn', async (assets: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-return`, assets);
  return response.data;
});
 
export const updateLeaseReturn = createAsyncThunk('leaseReturn/updateLeaseReturn', async (updatedCustomer: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-return/${updatedCustomer.id}`, updatedCustomer);
  return response.data;
});
 
export const deleteLeaseReturn = createAsyncThunk('leaseReturn/deleteLeaseReturn', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/lease-return/${id}`);
  return id;
});
 
const LeaseReturnSlice = createSlice({
  name: 'leaseReturn',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedCustomer = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaseReturn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaseReturn.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLeaseReturn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      .addCase(fetchLeaseReturnById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addLeaseReturn.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateLeaseReturn.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteLeaseReturn.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = LeaseReturnSlice.actions;
 
export default LeaseReturnSlice.reducer;