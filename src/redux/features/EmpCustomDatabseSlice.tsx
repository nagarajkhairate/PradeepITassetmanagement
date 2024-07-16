import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface EmpCustomDatabaseState {
    data: any[];
    selectedEmpCustomDatabase: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: EmpCustomDatabaseState = {
    data: [],
    selectedEmpCustomDatabase: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchEmpCustomDatabase = createAsyncThunk('empCustomDatabase/fetchEmpCustomDatabase', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-employee-persons`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
});

export const fetchEmpCustomDatabaseById = createAsyncThunk('empCustomDatabase/fetchEmpCustomDatabaseById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-employee-persons/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addEmpCustomDatabase = createAsyncThunk('empCustomDatabase/addEmpCustomDatabase', async (empCustomDatabase: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-employee-persons`, empCustomDatabase);
 console.log(response)
  return response.data;
});
 
export const updateEmpCustomDatabase = createAsyncThunk('empCustomDatabase/updateEmpCustomDatabase', async (updatedEmpCustomDatabase: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-employee-persons/${updatedEmpCustomDatabase.id}`, updatedEmpCustomDatabase);
  
  return response.data;
});
 
export const deleteEmpCustomDatabase = createAsyncThunk('empCustomDatabase/deleteEmpCustomDatabase', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/custom-employee-persons/${id}`);
  return id;
});

const empCustomDatabaseSlice = createSlice({
  name: 'empCustomDatabase',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const empCustomDatabase = state.data.find((u) => u.id === action.payload);
      state.selectedEmpCustomDatabase = empCustomDatabase || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmpCustomDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmpCustomDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmpCustomDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchEmpCustomDatabaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addEmpCustomDatabase.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateEmpCustomDatabase.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteEmpCustomDatabase.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = empCustomDatabaseSlice.actions;
 
export default empCustomDatabaseSlice.reducer;

