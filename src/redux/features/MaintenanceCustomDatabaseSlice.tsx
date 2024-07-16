import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface MaintenanceCustomDatabaseState {
    data: any[];
    selectedMaintenanceCustomDatabase: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: MaintenanceCustomDatabaseState = {
    data: [],
    selectedMaintenanceCustomDatabase: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchMaintenanceCustomDatabase = createAsyncThunk('maintenanceCustomDatabase/fetchMaintenanceCustomDatabase', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-employee-persons`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
});

export const fetchMaintenanceCustomDatabaseById = createAsyncThunk('MaintenanceCustomDatabase/fetchMaintenanceCustomDatabaseById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-employee-persons/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addMaintenanceCustomDatabase = createAsyncThunk('maintenanceCustomDatabase/addMaintenanceCustomDatabase', async (maintenanceCustomDatabase: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-employee-persons`, maintenanceCustomDatabase);
 console.log(response)
  return response.data;
});
 
export const updateMaintenanceCustomDatabase = createAsyncThunk('maintenanceCustomDatabase/updateMaintenanceCustomDatabase', async (updatedMaintenanceCustomDatabase: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-employee-persons/${updatedMaintenanceCustomDatabase.id}`, updatedMaintenanceCustomDatabase);
  
  return response.data;
});
 
export const deleteMaintenanceCustomDatabase = createAsyncThunk('maintenanceCustomDatabase/deleteMaintenanceCustomDatabase', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-employee-persons/${id}`);
  return id;
});

const maintenanceCustomDatabaseSlice = createSlice({
  name: 'maintenanceCustomDatabase',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const categories = state.data.find((u) => u.id === action.payload);
      state.selectedMaintenanceCustomDatabase = categories || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaintenanceCustomDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaintenanceCustomDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMaintenanceCustomDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchMaintenanceCustomDatabaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addMaintenanceCustomDatabase.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateMaintenanceCustomDatabase.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteMaintenanceCustomDatabase.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = maintenanceCustomDatabaseSlice.actions;
 
export default maintenanceCustomDatabaseSlice.reducer;

