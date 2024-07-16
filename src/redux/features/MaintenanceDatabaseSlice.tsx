import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface MaintenanceDatabaseState {
    data: any[];
    selectedMaintenanceDatabase: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: MaintenanceDatabaseState = {
    data: [],
    selectedMaintenanceDatabase: null,
    loading: false,
    error: null,
  };
 
  const base_api_key_url = process.env.REACT_APP_BASE_API_KEY;
  const TENANT_ID = process.env.REACT_APP_TENANT_ID;  

 
export const fetchMaintenanceDatabase = createAsyncThunk('maintenanceDatabase/fetchMaintenanceDatabase', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/employee-persons`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
});

export const fetchMaintenanceDatabaseById = createAsyncThunk('maintenanceDatabase/fetchMaintenanceDatabaseById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/employee-persons/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addMaintenanceDatabase = createAsyncThunk('maintenanceDatabase/addMaintenanceDatabase', async (maintenanceDatabase: any) => {
 const response = await axios.post(`${base_api_key_url}tenant/${TENANT_ID}/employee-persons`, maintenanceDatabase);
 console.log(response)
  return response.data;
});
 
export const updateMaintenanceDatabase = createAsyncThunk('maintenanceDatabase/updateMaintenanceDatabase', async (updatedMaintenanceDatabase: any) => {
 
  const response = await axios.put(`${base_api_key_url}tenant/${TENANT_ID}/employee-persons/${updatedMaintenanceDatabase.id}`, updatedMaintenanceDatabase);
  
  return response.data;
});
 
export const deleteMaintenanceDatabase = createAsyncThunk('maintenanceDatabase/deleteMaintenanceDatabase', async (id: number) => {
  await axios.delete(`${base_api_key_url}tenant/${TENANT_ID}/employee-persons/${id}`);
  return id;
});

const maintenanceDatabaseSlice = createSlice({
  name: 'maintenanceDatabase',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const maintenanceDatabase = state.data.find((u) => u.id === action.payload);
      state.selectedMaintenanceDatabase = maintenanceDatabase || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaintenanceDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaintenanceDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMaintenanceDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchMaintenanceDatabaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addMaintenanceDatabase.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateMaintenanceDatabase.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteMaintenanceDatabase.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = maintenanceDatabaseSlice.actions;
 
export default maintenanceDatabaseSlice.reducer;

