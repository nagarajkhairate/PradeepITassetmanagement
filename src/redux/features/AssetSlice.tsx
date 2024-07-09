import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface AssetSliceState {
  data: any[];
  selectedCustomer: any | null;
  loading: boolean;
  error: string | null;
}
 
const initialState: AssetSliceState = {
  data: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};
const TENANT_ID = process.env.TENANT_ID;
const base_api_key_url = process.env.BASE_API_KEY;
 
export const fetchAssets = createAsyncThunk('assets/fetchAssets', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/add-asset`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});
export const fetchAssetsById = createAsyncThunk('assets/fetchAssetsById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/add-asset/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAssets = createAsyncThunk('assets/addAssets', async (assets: any) => {
 const response = await axios.post(`${base_api_key_url}tenant/${TENANT_ID}/add-asset`, assets);
  return response.data;
});
 
export const updateAssets = createAsyncThunk('assets/updateAssets', async (updatedCustomer: any) => {
 
  const response = await axios.put(`${base_api_key_url}tenant/${TENANT_ID}/add-asset/${updatedCustomer.id}`, updatedCustomer);
  return response.data;
});
 
export const deleteAssets = createAsyncThunk('assets/deleteAssets', async (id: number) => {
  await axios.delete(`${base_api_key_url}tenant/${TENANT_ID}/add-asset/${id}`);
  return id;
});
 
const AssetSlice = createSlice({
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
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      .addCase(fetchAssetsById.fulfilled, (state, action) => {
        state.loading = false;
        const existingClient = state.data.find((asset) => asset.id === action.payload.id);
        if (!existingClient) {
          state.data.push(action.payload);
        }
      })
      .addCase(addAssets.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAssets.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAssets.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = AssetSlice.actions;
 
export default AssetSlice.reducer;