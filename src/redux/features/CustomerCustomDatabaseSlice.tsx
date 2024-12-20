import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface customerCustomDatabaseState {
    data: any[];
    selectedCustomerCustomDatabase: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: customerCustomDatabaseState = {
    data: [],
    selectedCustomerCustomDatabase: null,
    loading: false,
    error: null,
  };
 
  const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
  const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchCustomerCustomDatabase = createAsyncThunk('customerCustomDatabase/fetchCustomerCustomDatabase', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-customer`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
});

export const fetchCustomerCustomDatabaseById = createAsyncThunk('customerCustomDatabase/fetchCustomerCustomDatabaseById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-customer/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addCustomerCustomDatabase = createAsyncThunk('customerCustomDatabase/addCustomerCustomDatabase', async (customerCustomDatabase: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-customer`, customerCustomDatabase);
 console.log(response)
  return response.data;
});
 
export const updateCustomerCustomDatabase = createAsyncThunk('customerCustomDatabase/updatecustomerCustomDatabase', async (updatedCustomerCustomDatabase: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-customer/${updatedCustomerCustomDatabase.id}`, updatedCustomerCustomDatabase);
  
  return response.data;
});
 
export const deleteCustomerCustomDatabase = createAsyncThunk('customerCustomDatabase/deleteCustomerCustomDatabase', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-customer/${id}`);
  return id;
});

const customerCustomDatabaseSlice = createSlice({
  name: 'customerCustomDatabase',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const customerCustomDatabase = state.data.find((u) => u.id === action.payload);
      state.selectedCustomerCustomDatabase = customerCustomDatabase || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerCustomDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerCustomDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCustomerCustomDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchCustomerCustomDatabaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addCustomerCustomDatabase.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCustomerCustomDatabase.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteCustomerCustomDatabase.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = customerCustomDatabaseSlice.actions;
 
export default customerCustomDatabaseSlice.reducer;

