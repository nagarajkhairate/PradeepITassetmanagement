import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface DisposeFieldsSliceState {
  data: any[];
  selectedCustomer: any | null;
  loading: boolean;
  error: string | null;
}
 
const initialState: DisposeFieldsSliceState = {
  data: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
 
export const fetchDisposeFields = createAsyncThunk('disposeFields/fetchDisposeFields', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/dispose-default-fields`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
export const fetchDisposeFieldsById = createAsyncThunk('disposeFields/fetchDisposeFieldsById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/dispose-default-fields/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addDisposeFields = createAsyncThunk('disposeFields/addDisposeFields', async (assets: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/dispose-default-fields`, assets);
  return response.data;
});
 
export const updateDisposeFields = createAsyncThunk('disposeFields/updateDisposeFields', async (updatedCustomer: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/dispose-default-fields/${updatedCustomer.id}`, updatedCustomer);
  return response.data;
});
 
export const deleteDisposeFields = createAsyncThunk('disposeFields/deleteDisposeFields', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/dispose-default-fields/${id}`);
  return id;
});
 
const DisposeFieldSlice = createSlice({
  name: 'disposeField',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedCustomer = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDisposeFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDisposeFields.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDisposeFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      .addCase(fetchDisposeFieldsById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addDisposeFields.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateDisposeFields.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteDisposeFields.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = DisposeFieldSlice.actions;
 
export default DisposeFieldSlice.reducer;