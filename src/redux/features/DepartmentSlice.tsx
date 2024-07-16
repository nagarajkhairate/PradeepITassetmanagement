import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface DepartmentState {
    data: any[];
    selectedDepartment: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: DepartmentState = {
    data: [],
    selectedDepartment: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchDepartment = createAsyncThunk('department/fetchDepartment', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/department`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchDepartmentById = createAsyncThunk('department/fetchDepartmentById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/department/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addDepartment = createAsyncThunk('department/addDepartment', async (department: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/department`, department);
 console.log(response)
  return response.data;
});
 
export const updateDepartment = createAsyncThunk('department/updateDepartment', async (updatedDepartment: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/department/${updatedDepartment.id}`, updatedDepartment);
  
  return response.data;
});
 
export const deleteDepartment = createAsyncThunk('department/deleteDepartment', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/departments/${id}`);
  return id;
});

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const department = state.data.find((u) => u.id === action.payload);
      state.selectedDepartment = department || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchDepartmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = departmentSlice.actions;
 
export default departmentSlice.reducer;

