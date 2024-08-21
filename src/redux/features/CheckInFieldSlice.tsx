import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface CheckInFieldSliceState {
  data: any[];
  selectedCustomer: any | null;
  loading: boolean;
  error: string | null;
}
 
const initialState: CheckInFieldSliceState = {
  data: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
 
export const fetchCheckInField = createAsyncThunk('CheckInFields/fetchCheckInField', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/checkin-default-fields`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
export const fetchCheckInFieldById = createAsyncThunk('checkInFields/fetchCheckInFieldById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/checkin-default-fields/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addCheckInField = createAsyncThunk('checkInFields/addCheckInField', async (assets: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/checkin-default-fields`, assets);
  return response.data;
});
 
export const updateCheckInField = createAsyncThunk('checkInFields/updateCheckInField', async (updatedCustomer: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/checkin-default-fields/${updatedCustomer.id}`, updatedCustomer);
  return response.data;
});
 
export const deleteCheckInField = createAsyncThunk('checkInFields/deleteCheckInField', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/checkin-default-fields/${id}`);
  return id;
});
 
const CheckInFieldSlice = createSlice({
  name: 'checkInField',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedCustomer = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckInField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCheckInField.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCheckInField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      .addCase(fetchCheckInFieldById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addCheckInField.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCheckInField.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteCheckInField.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = CheckInFieldSlice.actions;
 
export default CheckInFieldSlice.reducer;