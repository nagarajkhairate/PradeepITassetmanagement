import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface MaintenanceFieldSliceState {
  data: any[];
  selectedCustomer: any | null;
  loading: boolean;
  error: string | null;
}
 
const initialState: MaintenanceFieldSliceState = {
  data: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
 
export const fetchMaintenanceFields = createAsyncThunk('maintenanceFields/fetchMaintenanceFields', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/maintenance-default-fields`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
export const fetchMaintenanceFieldsById = createAsyncThunk('maintenanceFields/fetchMaintenanceFieldsById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/maintenance-default-fields/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addMaintenanceFields = createAsyncThunk('maintenanceFields/addMaintenanceFields', async (assets: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/maintenance-default-fields`, assets);
  return response.data;
});
 
export const updateMaintenanceFields = createAsyncThunk('maintenanceFields/updateMaintenanceFields', async (updatedCustomer: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/maintenance-default-fields/${updatedCustomer.id}`, updatedCustomer);
  return response.data;
});
 
export const deleteMaintenanceFields = createAsyncThunk('maintenanceFields/deleteMaintenanceFields', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/maintenance-default-fields/${id}`);
  return id;
});
 
const MaintenanceFieldSlice = createSlice({
  name: 'maintenanceField',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedCustomer = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaintenanceFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaintenanceFields.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMaintenanceFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      .addCase(fetchMaintenanceFieldsById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addMaintenanceFields.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateMaintenanceFields.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteMaintenanceFields.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = MaintenanceFieldSlice.actions;
 
export default MaintenanceFieldSlice.reducer;