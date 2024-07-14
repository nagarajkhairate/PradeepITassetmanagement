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
 
const base_api_key_url = process.env.REACT_APP_BASE_API_KEY;
const TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchDefaultFields = createAsyncThunk('field-asset/fetchDefaultFields', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/field-asset`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchDefaultFieldsById = createAsyncThunk('field-asset/fetchDefaultFieldsById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/field-asset/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addDefaultFields = createAsyncThunk('custom/addDefaultFields', async (defaultFields: any) => {
 const response = await axios.post(`${base_api_key_url}tenant/${TENANT_ID}/custom`, defaultFields);
 console.log(response)
  return response.data;
});
 
export const updateDefaultFieldsById = createAsyncThunk('custom/updateDefaultFields', async (updatedDefaultFields: any) => {
 
  const response = await axios.put(`${base_api_key_url}tenant/${TENANT_ID}/custom/${updatedDefaultFields.id}`, updatedDefaultFields);
  
  return response.data;
});
 
export const deleteDefaultFields = createAsyncThunk('asset-default-fields/deleteDefaultFields', async (id: number) => {
  await axios.delete(`${base_api_key_url}tenant/${TENANT_ID}/asset-default-fields/${id}`);
  return id;
});

const defaultFieldsSlice = createSlice({
  name: 'asset-default-fields',
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
      .addCase(updateDefaultFieldsById.fulfilled, (state, action) => {
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

