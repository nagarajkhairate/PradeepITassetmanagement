import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface DatabaseAssetState {
    data: any[];
    selectedDatabaseAsset: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: DatabaseAssetState = {
    data: [],
    selectedDatabaseAsset: null,
    loading: false,
    error: null,
  };
 
const base_api_key_url = process.env.BASE_API_KEY;
const TENANT_ID = process.env.TENANT_ID;

 
export const fetchDatabaseAsset = createAsyncThunk('databaseAsset/fetchDatabaseAsset', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/asset-default-fields`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchDatabaseAssetById = createAsyncThunk('database/fetchDatabaseAssetById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/asset-default-fields/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addDatabaseAsset = createAsyncThunk('databaseAsset/addDatabaseAsset', async (databaseAsset: any) => {
 const response = await axios.post(`${base_api_key_url}tenant/${TENANT_ID}/asset-default-fields`, databaseAsset);
 console.log(response)
  return response.data;
});
 
export const updateDatabaseAsset = createAsyncThunk('databaseAsset/updateDatabaseAsset', async (updatedDatabaseAsset: any) => {
 
  const response = await axios.put(`${base_api_key_url}tenant/${TENANT_ID}/asset-default-fields/${updatedDatabaseAsset.id}`, updatedDatabaseAsset);
  
  return response.data;
});
 
export const deleteDatabaseAsset = createAsyncThunk('databaseAsset/deleteDatabaseAsset', async (id: number) => {
  await axios.delete(`${base_api_key_url}tenant/${TENANT_ID}/asset-default-fields/${id}`);
  return id;
});

const databaseAssetSlice = createSlice({
  name: 'databaseAsset',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const databaseAsset = state.data.find((u) => u.id === action.payload);
      state.selectedDatabaseAsset = databaseAsset || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatabaseAsset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDatabaseAsset.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDatabaseAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchDatabaseAssetById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addDatabaseAsset.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateDatabaseAsset.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteDatabaseAsset.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = databaseAssetSlice.actions;
 
export default databaseAssetSlice.reducer;

