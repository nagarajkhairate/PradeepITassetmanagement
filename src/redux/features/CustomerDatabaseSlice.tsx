import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface CustomerDatabaseState {
    data: any[];
    selectedCustomerDatabase: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: CustomerDatabaseState = {
    data: [],
    selectedCustomerDatabase: null,
    loading: false,
    error: null,
  };
 
  const base_api_key_url = process.env.REACT_APP_BASE_API_KEY;
  const TENANT_ID = process.env.REACT_APP_TENANT_ID;  

 
export const fetchCustomerDatabase = createAsyncThunk('customerDatabase/fetchCustomerDatabase', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/employee-persons`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
});

export const fetchCustomerDatabaseById = createAsyncThunk('customerDatabase/fetchCustomerDatabaseById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/employee-persons/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addCustomerDatabase = createAsyncThunk('customerDatabase/addCustomerDatabase', async (customerDatabase: any) => {
 const response = await axios.post(`${base_api_key_url}tenant/${TENANT_ID}/employee-persons`, customerDatabase);
 console.log(response)
  return response.data;
});
 
export const updateCustomerDatabase = createAsyncThunk('customerDatabase/updateCustomerDatabase', async (updatedCustomerDatabase: any) => {
 
  const response = await axios.put(`${base_api_key_url}tenant/${TENANT_ID}/employee-persons/${updatedCustomerDatabase.id}`, updatedCustomerDatabase);
  
  return response.data;
});
 
export const deleteCustomerDatabase = createAsyncThunk('customerDatabase/deleteCustomerDatabase', async (id: number) => {
  await axios.delete(`${base_api_key_url}tenant/${TENANT_ID}/employee-persons/${id}`);
  return id;
});

const customerDatabaseSlice = createSlice({
  name: 'customerDatabase',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const customerDatabase = state.data.find((u) => u.id === action.payload);
      state.selectedCustomerDatabase = customerDatabase || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCustomerDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchCustomerDatabaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addCustomerDatabase.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCustomerDatabase.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteCustomerDatabase.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = customerDatabaseSlice.actions;
 
export default customerDatabaseSlice.reducer;
