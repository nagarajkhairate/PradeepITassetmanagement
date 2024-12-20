import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface EmpDatabaseState {
    data: any[];
    selectedEmpDatabase: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: EmpDatabaseState = {
    data: [],
    selectedEmpDatabase: null,
    loading: false,
    error: null,
  };
 
  const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
  const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;  

 
export const fetchEmpDatabase = createAsyncThunk('empDatabase/fetchEmpDatabase', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/employee-persons-default-fields`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
});

export const fetchEmpDatabaseById = createAsyncThunk('empDatabase/fetchEmpDatabaseById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/employee-persons-default-fields/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addEmpDatabase = createAsyncThunk('empDatabase/addEmpDatabase', async (empDatabase: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/employee-persons-default-fields`, empDatabase);
 console.log(response)
  return response.data;
});
 
export const updateEmpDatabase = createAsyncThunk('empDatabase/updateEmpDatabase', async (updatedEmpDatabase: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/employee-persons-default-fields`, updatedEmpDatabase);
  
  return response.data;
});
 
export const deleteEmpDatabase = createAsyncThunk('empDatabase/deleteEmpDatabase', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/employee-persons-default-fields/${id}`);
  return id;
});

const empDatabaseSlice = createSlice({
  name: 'empDatabase',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const empDatabase = state.data.find((u) => u.id === action.payload);
      state.selectedEmpDatabase = empDatabase || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmpDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmpDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmpDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchEmpDatabaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addEmpDatabase.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateEmpDatabase.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteEmpDatabase.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = empDatabaseSlice.actions;
 
export default empDatabaseSlice.reducer;

