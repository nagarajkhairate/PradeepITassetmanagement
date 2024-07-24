import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface CheckOutFieldSliceState {
  data: any[];
  selectedCustomer: any | null;
  loading: boolean;
  error: string | null;
}
 
const initialState: CheckOutFieldSliceState = {
  data: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
 
export const fetchCheckOutField = createAsyncThunk('checkOutFields/fetchCheckOutField', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction-defaults`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
export const fetchCheckOutFieldById = createAsyncThunk('checkOutFields/fetchCheckOutFieldById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction-defaults/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addCheckOutField = createAsyncThunk('checkOutFields/addCheckOutField', async (assets: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction-defaults`, assets);
  return response.data;
});
 
export const updateCheckOutField = createAsyncThunk('checkOutFields/updateCheckOutField', async (updatedCustomer: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction-defaults/${updatedCustomer.id}`, updatedCustomer);
  return response.data;
});
 
export const deleteCheckOutField = createAsyncThunk('checkOutFields/deleteCheckOutField', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction-defaults/${id}`);
  return id;
});
 
const CheckOutFieldSlice = createSlice({
  name: 'checkOutField',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedCustomer = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckOutField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCheckOutField.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCheckOutField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      .addCase(fetchCheckOutFieldById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addCheckOutField.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCheckOutField.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteCheckOutField.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = CheckOutFieldSlice.actions;
 
export default CheckOutFieldSlice.reducer;