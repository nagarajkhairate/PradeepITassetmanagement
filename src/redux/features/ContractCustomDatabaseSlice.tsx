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
 
  const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
  const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;  

 
export const fetchContractCustomDatabase = createAsyncThunk('contractCustomDatabase/fetchContractCustomDatabase', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-contracts`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
});

export const fetchContractCustomDatabaseById = createAsyncThunk('contractCustomDatabase/fetchContractCustomDatabaseById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-contracts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addContractCustomDatabase = createAsyncThunk('contractCustomDatabase/addContractCustomDatabase', async (contractCustomDatabase: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-contracts`, contractCustomDatabase);
 console.log(response)
  return response.data;
});
 
export const updateContractCustomDatabase = createAsyncThunk('contractCustomDatabase/updateContractCustomDatabase', async (updatedContractCustomDatabase: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-contracts/${updatedContractCustomDatabase.id}`, updatedContractCustomDatabase);
  
  return response.data;
});
 
export const deleteContractCustomDatabase = createAsyncThunk('contractCustomDatabase/deleteContractCustomDatabase', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-contracts/${id}`);
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

