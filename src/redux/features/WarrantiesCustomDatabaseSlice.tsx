import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface WarrantiesCustomDatabaseState {
    data: any[];
    selectedWarrantiesCustomDatabase: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: WarrantiesCustomDatabaseState = {
    data: [],
    selectedWarrantiesCustomDatabase: null,
    loading: false,
    error: null,
  };
 
  const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
  const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;  

 
export const fetchWarrantiesCustomDatabase = createAsyncThunk('warrantiesCustomDatabase/fetchWarrantiesCustomDatabase', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/warrenties`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
});

export const fetchWarrantiesCustomDatabaseById = createAsyncThunk('warrantiesCustomDatabase/fetchWarrantiesCustomDatabaseById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/warrenties/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addWarrantiesCustomDatabase = createAsyncThunk('warrantiesCustomDatabase/addWarrantiesCustomDatabase', async (warrantiesCustomDatabase: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/warrenties`, warrantiesCustomDatabase);
 console.log(response)
  return response.data;
});
 
export const updateWarrantiesCustomDatabase = createAsyncThunk('warrantiesCustomDatabase/updateWarrantiesCustomDatabase', async (updatedWarrantiesCustomDatabase: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/warrenties/${updatedWarrantiesCustomDatabase.id}`, updatedWarrantiesCustomDatabase);
  
  return response.data;
});
 
export const deleteWarrantiesCustomDatabase = createAsyncThunk('warrantiesCustomDatabase/deleteWarrantiesCustomDatabase', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/warrenties/${id}`);
  return id;
});

const warrantiesCustomDatabaseSlice = createSlice({
  name: 'warrantiesCustomDatabase',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const warrantiesCustomDatabase = state.data.find((u) => u.id === action.payload);
      state.selectedWarrantiesCustomDatabase = warrantiesCustomDatabase || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWarrantiesCustomDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWarrantiesCustomDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWarrantiesCustomDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchWarrantiesCustomDatabaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addWarrantiesCustomDatabase.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateWarrantiesCustomDatabase.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteWarrantiesCustomDatabase.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = warrantiesCustomDatabaseSlice.actions;
 
export default warrantiesCustomDatabaseSlice.reducer;

