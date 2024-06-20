import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface DataBaseState {
    data: any[];
    selectedDataBase: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: DataBaseState = {
    data: [],
    selectedDataBase: null,
    loading: false,
    error: null,
  };
 
const base_api_key_url = process.env.BASE_API_KEY;
const TENANT_ID = process.env.TENANT_ID;

 
export const fetchDataBase = createAsyncThunk('data-base/fetchDataBase', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/data-base`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchDataBaseById = createAsyncThunk('data-base/fetchDataBaseById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/data-base/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addDataBase = createAsyncThunk('data-base/addDataBase', async (dataBase: any) => {
 const response = await axios.post(`${base_api_key_url}tenant/${TENANT_ID}/data-base`, dataBase);
 console.log(response)
  return response.data;
});
 
export const updateDataBase = createAsyncThunk('data-base/updateDataBase', async (updatedDataBase: any) => {
 
  const response = await axios.put(`${base_api_key_url}tenant/${TENANT_ID}/data-base/${updatedDataBase.id}`, updatedDataBase);
  
  return response.data;
});
 
export const deleteDataBase = createAsyncThunk('data-base/deleteDataBase', async (id: number) => {
  await axios.delete(`${base_api_key_url}tenant/${TENANT_ID}/data-base/${id}`);
  return id;
});

const dataBaseSlice = createSlice({
  name: 'dataBase',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const dataBase = state.data.find((u) => u.id === action.payload);
      state.selectedDataBase = dataBase || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataBase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataBase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDataBase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchDataBaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addDataBase.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateDataBase.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteDataBase.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = dataBaseSlice.actions;
 
export default dataBaseSlice.reducer;

