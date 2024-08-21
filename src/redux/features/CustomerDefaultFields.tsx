import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface CustomerDefaultFieldsSliceState {
  data: any[];
  selectedCustomer: any | null;
  loading: boolean;
  error: string | null;
}
 
const initialState: CustomerDefaultFieldsSliceState = {
  data: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
 
export const fetchCustomerDefaultFields = createAsyncThunk('customerDefaultFieldss/fetchCustomerDefaultFields', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/leasing-customer-default-field`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
export const fetchCustomerDefaultFieldsById = createAsyncThunk('customerDefaultFieldss/fetchCustomerDefaultFieldsById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/leasing-customer-default-field/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addCustomerDefaultFields = createAsyncThunk('customerDefaultFieldss/addCustomerDefaultFields', async (assets: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/leasing-customer-default-field`, assets);
  return response.data;
});
 
export const updateCustomerDefaultFields = createAsyncThunk('customerDefaultFieldss/updateCustomerDefaultFields', async (updatedCustomer: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/leasing-customer-default-field/${updatedCustomer.id}`, updatedCustomer);
  return response.data;
});
 
export const deleteCustomerDefaultFields = createAsyncThunk('customerDefaultFieldss/deleteCustomerDefaultFields', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/leasing-customer-default-field/${id}`);
  return id;
});
 
const CustomerDefaultFieldsSlice = createSlice({
  name: 'customerDefaultField',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedCustomer = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerDefaultFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerDefaultFields.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCustomerDefaultFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      .addCase(fetchCustomerDefaultFieldsById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addCustomerDefaultFields.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCustomerDefaultFields.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteCustomerDefaultFields.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = CustomerDefaultFieldsSlice.actions;
 
export default CustomerDefaultFieldsSlice.reducer;