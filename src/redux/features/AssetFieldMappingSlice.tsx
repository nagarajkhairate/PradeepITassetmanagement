import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface AssetFieldMappingSliceState {
  data: any[];
  selectedCustomer: any | null;
  loading: boolean;
  error: string | null;
}
 
const initialState: AssetFieldMappingSliceState = {
  data: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
 
export const fetchAssetFieldMapping = createAsyncThunk('assetsFields/fetchAssetFieldMapping', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-mappings`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
export const fetchAssetFieldMappingById = createAsyncThunk('assetsFields/fetchAssetFieldMappingById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-mappings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAssetFieldMapping = createAsyncThunk('assetsFields/addAssetFieldMapping', async (assets: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-mappings`, assets);
  return response.data;
});
 
export const updateAssetFieldMapping = createAsyncThunk('assetsFields/updateAssetFieldMapping', async (updatedCustomer: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-mappings/${updatedCustomer.id}`, updatedCustomer);
  return response.data;
});
 
export const deleteAssetFieldMapping = createAsyncThunk('assetsFields/deleteAssetFieldMapping', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-mappings/${id}`);
  return id;
});
 
const AssetFieldMappingSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedCustomer = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetFieldMapping.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssetFieldMapping.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAssetFieldMapping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      .addCase(fetchAssetFieldMappingById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addAssetFieldMapping.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAssetFieldMapping.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAssetFieldMapping.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = AssetFieldMappingSlice.actions;
 
export default AssetFieldMappingSlice.reducer;