import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface ContractCustomDatabaseState {
    data: any[];
    selectedContractCustomDatabase: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: ContractCustomDatabaseState = {
    data: [],
    selectedContractCustomDatabase: null,
    loading: false,
    error: null,
  };
 
const base_api_key_url = process.env.BASE_API_KEY;
const TENANT_ID = process.env.TENANT_ID;

 
export const fetchContractCustomDatabase = createAsyncThunk('contractCustomDatabase/fetchContractCustomDatabase', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/custom-employee-persons`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
});

export const fetchContractCustomDatabaseById = createAsyncThunk('contractCustomDatabase/fetchContractCustomDatabaseById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/custom-employee-persons/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addContractCustomDatabase = createAsyncThunk('contractCustomDatabase/addContractCustomDatabase', async (contractCustomDatabase: any) => {
 const response = await axios.post(`${base_api_key_url}tenant/${TENANT_ID}/custom-employee-persons`, contractCustomDatabase);
 console.log(response)
  return response.data;
});
 
export const updateContractCustomDatabase = createAsyncThunk('contractCustomDatabase/updateContractCustomDatabase', async (updatedContractCustomDatabase: any) => {
 
  const response = await axios.put(`${base_api_key_url}tenant/${TENANT_ID}/custom-employee-persons/${updatedContractCustomDatabase.id}`, updatedContractCustomDatabase);
  
  return response.data;
});
 
export const deleteContractCustomDatabase = createAsyncThunk('contractCustomDatabase/deleteContractCustomDatabase', async (id: number) => {
  await axios.delete(`${base_api_key_url}tenant/${TENANT_ID}/custom-employee-persons/${id}`);
  return id;
});

const contractCustomDatabaseSlice = createSlice({
  name: 'contractCustomDatabase',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const contractCustomDatabase = state.data.find((u) => u.id === action.payload);
      state.selectedContractCustomDatabase = contractCustomDatabase || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContractCustomDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContractCustomDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContractCustomDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchContractCustomDatabaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addContractCustomDatabase.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateContractCustomDatabase.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteContractCustomDatabase.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = contractCustomDatabaseSlice.actions;
 
export default contractCustomDatabaseSlice.reducer;
