import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface Department {
    id: number;
    departmentName: string;
  }
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
 
const base_api_key_url = process.env.BASE_API_KEY;
const TENANT_ID = process.env.TENANT_ID;

 
export const fetchDepartment = createAsyncThunk('departments/fetchDepartment', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/departments`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchDepartmentById = createAsyncThunk('departmentName/fetchDepartmentById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addDepartment = createAsyncThunk('departments/addDepartment', async (departments: any) => {
  console.log('asfes')
 const response = await axios.post(`${base_api_key_url}tenant/${TENANT_ID}/departments/`, departments);
 console.log(response)
  return response.data;
});
 
export const updateDepartment = createAsyncThunk('departments/updateDepartment', async (updatedDepartment: any) => {
 
  const response = await axios.put(`${base_api_key_url}tenant/${TENANT_ID}/departments/${updatedDepartment.id}`, updatedDepartment);
  
  return response.data;
});
 
export const deleteDepartment = createAsyncThunk('departments/deleteDepartment', async (id: number) => {
  await axios.delete(`${base_api_key_url}tenant/${TENANT_ID}/departments/${id}`);
  return id;
});

const departmentNameSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const departments = state.data.find((u) => u.id === action.payload);
      state.selectedDepartment = departments || null;
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
 
export const { setSelectedCustomer } = departmentNameSlice.actions;
 
export default departmentNameSlice.reducer;

