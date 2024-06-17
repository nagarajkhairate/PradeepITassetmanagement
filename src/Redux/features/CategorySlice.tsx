import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface Category {
    id: number;
    category: string;
  }
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


 
export const fetchCategory = createAsyncThunk('category/fetchCategory', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}category/category}/category`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchCategoryById = createAsyncThunk('category/fetchCategoryById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}category/category/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addCategory = createAsyncThunk('category/addCategory', async (category: any) => {
  console.log('asfes')
 const response = await axios.post(`${base_api_key_url}category`, category);
 console.log(response)
  return response.data;
});
 
export const updateCategory = createAsyncThunk('category/updateCategory', async (updatedCategory: any) => {
 
  const response = await axios.put(`${base_api_key_url}/category/${updatedCategory.id}`, updatedCategory);
  
  return response.data;
});
 
export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id: number) => {
  await axios.delete(`${base_api_key_url}/category/${id}`);
  return id;
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const category = state.data.find((u) => u.id === action.payload);
      state.selectedCategory = category || null;
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
