import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface AssetDatabaseState {
    data: any[];
    selectedAssetDatabase: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: AssetDatabaseState = {
    data: [],
    selectedAssetDatabase: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchAssetDatabase = createAsyncThunk('assetDatabase/fetchAssetDatabase', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-default-fields`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchAssetDatabaseById = createAsyncThunk('assetDatabase/fetchAssetDatabaseById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-default-fields/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAssetDatabase = createAsyncThunk('assetDatabase/addAssetDatabase', async (assetDatabase: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-default-fields`, assetDatabase);
 console.log(response)
  return response.data;
});
 
export const updateAssetDatabase = createAsyncThunk('assetDatabase/updateAssetDatabase', async (updatedAssetDatabase: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-default-fields`, updatedAssetDatabase);
  
  return response.data;
});
 
export const deleteAssetDatabase = createAsyncThunk('assetDatabase/deleteAssetDatabase', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-default-fields/${id}`);
  return id;
});

const AssetDatabaseSlice = createSlice({
  name: 'assetDatabase',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const assetDatabase = state.data.find((u) => u.id === action.payload);
      state.selectedAssetDatabase = assetDatabase || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssetDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAssetDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchAssetDatabaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addAssetDatabase.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAssetDatabase.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAssetDatabase.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = AssetDatabaseSlice.actions;
 
export default AssetDatabaseSlice.reducer;

