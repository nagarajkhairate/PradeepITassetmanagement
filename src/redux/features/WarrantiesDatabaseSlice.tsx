import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface WarrantiesDatabaseState {
    data: any[];
    selectedWarrantiesDatabase: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: WarrantiesDatabaseState = {
    data: [],
    selectedWarrantiesDatabase: null,
    loading: false,
    error: null,
  };
 
  const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
  const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;  

 
export const fetchWarrantiesDatabase = createAsyncThunk('warrantiesDatabase/fetchWarrantiesDatabase', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/employee-persons`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
});

export const fetchWarrantiesDatabaseById = createAsyncThunk('warrantiesDatabase/fetchWarrantiesDatabaseById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/employee-persons/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addWarrantiesDatabase = createAsyncThunk('warrantiesDatabase/addWarrantiesDatabase', async (warrantiesDatabase: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/employee-persons`, warrantiesDatabase);
 console.log(response)
  return response.data;
});
 
export const updateWarrantiesDatabase = createAsyncThunk('warrantiesDatabase/updateWarrantiesDatabase', async (updatedWarrantiesDatabase: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/employee-persons/${updatedWarrantiesDatabase.id}`, updatedWarrantiesDatabase);
  
  return response.data;
});
 
export const deleteWarrantiesDatabase = createAsyncThunk('warrantiesDatabase/deleteWarrantiesDatabase', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/employee-persons/${id}`);
  return id;
});

const warrantiesDatabaseSlice = createSlice({
  name: 'warrantiesDatabase',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const warrantiesDatabase = state.data.find((u) => u.id === action.payload);
      state.selectedWarrantiesDatabase = warrantiesDatabase || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWarrantiesDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWarrantiesDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWarrantiesDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchWarrantiesDatabaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addWarrantiesDatabase.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateWarrantiesDatabase.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteWarrantiesDatabase.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = warrantiesDatabaseSlice.actions;
 
export default warrantiesDatabaseSlice.reducer;

