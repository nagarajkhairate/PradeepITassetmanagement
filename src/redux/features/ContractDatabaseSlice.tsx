import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface ContractDatabaseState {
    data: any[];
    selectedContractDatabase: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: ContractDatabaseState = {
    data: [],
    selectedContractDatabase: null,
    loading: false,
    error: null,
  };
 
  const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
  const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;  

 
export const fetchContractDatabase = createAsyncThunk('contractDatabase/fetchContractDatabase', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contranct`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
});

export const fetchContractDatabaseById = createAsyncThunk('contractDatabase/fetchContractDatabaseById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contranct/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addContractDatabase = createAsyncThunk('contractDatabase/addContractDatabase', async (contractDatabase: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contranct`, contractDatabase);
 console.log(response)
  return response.data;
});
 
export const updateContractDatabase = createAsyncThunk('contractDatabase/updateContractDatabase', async (updatedContractDatabase: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contranct/${updatedContractDatabase.id}`, updatedContractDatabase);
  
  return response.data;
});
 
export const deleteContractDatabase = createAsyncThunk('contractDatabase/deleteContractDatabase', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/contranct/${id}`);
  return id;
});

const contractDatabaseSlice = createSlice({
  name: 'contractDatabase',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const contractDatabase = state.data.find((u) => u.id === action.payload);
      state.selectedContractDatabase = contractDatabase || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContractDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContractDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContractDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchContractDatabaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addContractDatabase.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateContractDatabase.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteContractDatabase.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = contractDatabaseSlice.actions;
 
export default contractDatabaseSlice.reducer;

