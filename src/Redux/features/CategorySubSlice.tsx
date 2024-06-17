import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface SubCategory {
    id: number;
    subCategory: string;
  }
  interface SubCategoryState {
    data: any[];
    selectedSubCategory: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: SubCategoryState = {
    data: [],
    selectedSubCategory: null,
    loading: false,
    error: null,
  };
 
const base_api_key_url = process.env.BASE_API_KEY;


 
export const fetchSubCategory = createAsyncThunk('subCategory/fetchSubCategory', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}subCategory/subCategory}/subCategory`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchSubCategoryById = createAsyncThunk('subCategory/fetchSubCategoryById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}subCategory/subCategory/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addSubCategory = createAsyncThunk('subCategory/addSubCategory', async (subCategory: any) => {
  console.log('asfes')
 const response = await axios.post(`${base_api_key_url}subCategory`, subCategory);
 console.log(response)
  return response.data;
});
 
export const updateSubCategory = createAsyncThunk('subCategory/updateSubCategory', async (updatedSubCategory: any) => {
 
  const response = await axios.put(`${base_api_key_url}/subCategory/${updatedSubCategory.id}`, updatedSubCategory);
  
  return response.data;
});
 
export const deleteSubCategory = createAsyncThunk('subCategory/deleteSubCategory', async (id: number) => {
  await axios.delete(`${base_api_key_url}/subCategory/${id}`);
  return id;
});

const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const category = state.data.find((u) => u.id === action.payload);
      state.selectedSubCategory = category || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchSubCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = subCategorySlice.actions;
 
export default subCategorySlice.reducer;

