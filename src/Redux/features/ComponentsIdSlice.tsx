import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface ComponentsState {
    data: any[];
    selectedComponents: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: ComponentsState = {
    data: [],
    selectedComponents: null,
    loading: false,
    error: null,
  };
 
const base_api_key_url = process.env.BASE_API_KEY;
const TENANT_ID = process.env.TENANT_ID;

 
export const fetchComponents = createAsyncThunk('components/fetchComponents', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/components`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchComponentsById = createAsyncThunk('components/fetchComponentsById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/components/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addComponents = createAsyncThunk('components/addComponents', async (components: any) => {
 const response = await axios.post(`${base_api_key_url}tenant/${TENANT_ID}/components`, components);
 console.log(response)
  return response.data;
});
 
export const updateComponents = createAsyncThunk('components/updateComponents', async (updatedComponents: any) => {
 
  const response = await axios.put(`${base_api_key_url}tenant/${TENANT_ID}/components/${updatedComponents.id}`, updatedComponents);
  
  return response.data;
});
 
export const deleteComponents = createAsyncThunk('components/deleteComponents', async (id: number) => {
  await axios.delete(`${base_api_key_url}tenant/${TENANT_ID}/components/${id}`);
  return id;
});

const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const components = state.data.find((u) => u.id === action.payload);
      state.selectedComponents = components || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComponents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComponents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchComponents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchComponentsById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addComponents.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateComponents.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteComponents.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = componentsSlice.actions;
 
export default componentsSlice.reducer;

