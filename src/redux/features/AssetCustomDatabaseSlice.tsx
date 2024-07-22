import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface AssetCustomDatabaseState {
    data: any[];
    selectedAssetCustomDatabase: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: AssetCustomDatabaseState = {
    data: [],
    selectedAssetCustomDatabase: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchAssetCustomDatabase = createAsyncThunk('assetCustomDatabase/fetchAssetCustomDatabase', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchAssetCustomDatabaseById = createAsyncThunk('assetCustomDatabase/fetchAssetCustomDatabaseById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAssetCustomDatabase = createAsyncThunk('assetCustomDatabase/addAssetCustomDatabase', async (assetCustomDatabase: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset`, assetCustomDatabase);
 console.log(response)
  return response.data;
});
 
export const updateAssetCustomDatabase = createAsyncThunk('assetCustomDatabase/updateAssetCustomDatabase', async (updatedAssetCustomDatabase: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset/${updatedAssetCustomDatabase.id}`, updatedAssetCustomDatabase);
  
  return response.data;
});
 
export const deleteAssetCustomDatabase = createAsyncThunk('assetCustomDatabase/deleteAssetCustomDatabase', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-asset/${id}`);
  return id;
});

const assetCustomDatabaseSlice = createSlice({
  name: 'assetCustomDatabase',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const assetCustomDatabase = state.data.find((u) => u.id === action.payload);
      state.selectedAssetCustomDatabase = assetCustomDatabase || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetCustomDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssetCustomDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAssetCustomDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchAssetCustomDatabaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addAssetCustomDatabase.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAssetCustomDatabase.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAssetCustomDatabase.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = assetCustomDatabaseSlice.actions;
 
export default assetCustomDatabaseSlice.reducer;

