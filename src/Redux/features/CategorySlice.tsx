import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface CategoryState {
    data: any[];
    selectedCategory: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: CategoryState = {
    data: [],
    selectedCategory: null,
    loading: false,
    error: null,
  };
 
const base_api_key_url = process.env.BASE_API_KEY;
const TENANT_ID = process.env.TENANT_ID;

 
export const fetchCategory = createAsyncThunk('categories/fetchCategory', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/categories`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchCategoryById = createAsyncThunk('categories/fetchCategoryById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addCategory = createAsyncThunk('categories/addCategory', async (category: any) => {
 const response = await axios.post(`${base_api_key_url}tenant/${TENANT_ID}/categories`, category);
 console.log(response)
  return response.data;
});
 
export const updateCategory = createAsyncThunk('categories/updateCategory', async (updatedCategory: any) => {
 
  const response = await axios.put(`${base_api_key_url}tenant/${TENANT_ID}/categories/${updatedCategory.id}`, updatedCategory);
  
  return response.data;
});
 
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id: number) => {
  await axios.delete(`${base_api_key_url}tenant/${TENANT_ID}/categories/${id}`);
  return id;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const categories = state.data.find((u) => u.id === action.payload);
      state.selectedCategory = categories || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = categorySlice.actions;
 
export default categorySlice.reducer;

