import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface AssetsDefaultFieldsliceState {
  data: any[];
  selectedCustomer: any | null;
  loading: boolean;
  error: string | null;
}
 
const initialState: AssetsDefaultFieldsliceState = {
  data: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
 

export const fetchAssetsDefaultFields = createAsyncThunk('assetsDefaultFields/fetchAssetsDefaultFieldsDefaultFields', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-default-fields`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
});

export const fetchAssetsDefaultFieldsById = createAsyncThunk('assetsDefaultFields/fetchAssetsDefaultFieldsById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-default-fields/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addAssetsDefaultFields = createAsyncThunk('assetsDefaultFields/addAssetsDefaultFields', async (AssetsDefaultFields: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-default-fields`, AssetsDefaultFields);
  return response.data;
});
 
export const updateAssetsDefaultFields = createAsyncThunk('assetsDefaultFields/updateAssetsDefaultFields', async (updatedCustomer: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-default-fields/${updatedCustomer.get('id')}`, updatedCustomer);
  return response.data;
});
 
export const deleteAssetsDefaultFields = createAsyncThunk('assetsDefaultFields/deleteAssetsDefaultFields', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/asset-default-fields/${id}`);
  return id;
});
 
const AssetsDefaultFieldslice = createSlice({
  name: 'assetsDefaultField',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedCustomer = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetsDefaultFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssetsDefaultFields.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAssetsDefaultFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch AssetsDefaultFields';
      })
      .addCase(fetchAssetsDefaultFieldsById.fulfilled, (state, action) => {
        state.loading = false;
        const existingClient = state.data.find((asset) => asset.id === action.payload.id);
        if (!existingClient) {
          state.data.push(action.payload);
        }
      })
      .addCase(addAssetsDefaultFields.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAssetsDefaultFields.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAssetsDefaultFields.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = AssetsDefaultFieldslice.actions;
 
export default AssetsDefaultFieldslice.reducer;