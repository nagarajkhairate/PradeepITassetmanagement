import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface DefaultFieldsState {
    data: any[];
    selectedDefaultFields: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: DefaultFieldsState = {
    data: [],
    selectedDefaultFields: null,
    loading: false,
    error: null,
  };
 
const base_api_key_url = process.env.BASE_API_KEY;
const TENANT_ID = process.env.TENANT_ID;

 
export const fetchDefaultFields = createAsyncThunk('defaultFields/fetchDefaultFields', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/asset-default-fields`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchDefaultFieldsById = createAsyncThunk('defaultFields/fetchDefaultFieldsById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/asset-default-fields/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addDefaultFields = createAsyncThunk('defaultFields/addDefaultFields', async (defaultFields: any) => {
 const response = await axios.post(`${base_api_key_url}tenant/${TENANT_ID}/asset-default-fields`, defaultFields);
 console.log(response)
  return response.data;
});
 
export const updateDefaultFields = createAsyncThunk('defaultFields/updateDefaultFields', async (updatedDefaultFields: any) => {
 
  const response = await axios.put(`${base_api_key_url}tenant/${TENANT_ID}/asset-default-fields/${updatedDefaultFields.id}`, updatedDefaultFields);
  
  return response.data;
});
 
export const deleteDefaultFields = createAsyncThunk('defaultFields/deleteDefaultFields', async (id: number) => {
  await axios.delete(`${base_api_key_url}tenant/${TENANT_ID}/asset-default-fields/${id}`);
  return id;
});

const defaultFieldsSlice = createSlice({
  name: 'defaultFields',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const databaseAsset = state.data.find((u) => u.id === action.payload);
      state.selectedDefaultFields = databaseAsset || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefaultFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDefaultFields.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDefaultFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchDefaultFieldsById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addDefaultFields.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateDefaultFields.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteDefaultFields.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = defaultFieldsSlice.actions;
 
export default defaultFieldsSlice.reducer;

