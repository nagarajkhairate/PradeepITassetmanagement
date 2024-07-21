import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface StepsState {
    data: any[];
    selectedCategory: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: StepsState = {
    data: [],
    selectedCategory: null,
    loading: false,
    error: null,
  };
 
const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchSteps = createAsyncThunk('steps/fetchSteps', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/steps`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
});

export const fetchStepById = createAsyncThunk('steps/fetchStepById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/steps/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const AddStep = createAsyncThunk('steps/AddStep', async (category: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/steps`, category);
 console.log(response)
  return response.data;
});
 
export const updateStep = createAsyncThunk('steps/updateStep', async (updatedCategory: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/steps/${updatedCategory.id}`, updatedCategory);
  
  return response.data;
});
 
export const deleteStep = createAsyncThunk('steps/deleteStep', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/steps/${id}`);
  return id;
});

const StepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const steps = state.data.find((u) => u.id === action.payload);
      state.selectedCategory = steps || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSteps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSteps.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSteps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Step';
      })
      .addCase(fetchStepById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(AddStep.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateStep.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteStep.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = StepsSlice.actions;
 
export default StepsSlice.reducer;

