import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface CheckInState {
  data: any[];
  selectedSites: any | null;
  loading: boolean;
  error: string | null;
}
const initialState: CheckInState = {
  data: [],
  selectedSites: null,
  loading: false,
  error: null,
};

const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

export const fetchCheckOut = createAsyncThunk('transaction/fetchCheckOut', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }

});


export const fetchCheckOutById = createAsyncThunk('transaction/fetchCheckOutById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addCheckOut = createAsyncThunk('transaction/addCheckOut', async (transaction: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction`, transaction);
  return response.data;
});
 
export const updateCheckOut = createAsyncThunk('transaction/updateCheckOut', async (transaction: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction/${transaction.id}`, transaction);
  return response.data;
});
 
export const deleteCheckOut = createAsyncThunk('transaction/deleteCheckOut', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/transaction/${id}`);
  return id;
});
 
const CheckOutSlice = createSlice({
  name: 'CheckOut',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedSites = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCheckOut.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCheckOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchCheckOutById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addCheckOut.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCheckOut.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteCheckOut.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = CheckOutSlice.actions;
 
export default CheckOutSlice.reducer;