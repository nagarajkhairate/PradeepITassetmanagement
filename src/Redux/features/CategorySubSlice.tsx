import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

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
const TENANT_ID = process.env.TENANT_ID;

 
export const fetchSubCategories = createAsyncThunk('subCategories/fetchSubCategories', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/subCategories`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchSubCategoryById = createAsyncThunk('subCategories/fetchSubCategoryById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/subCategoriess/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addSubCategories = createAsyncThunk('subCategories/addSubCategories', async (subCategories: any) => {
 const response = await axios.post(`${base_api_key_url}tenant/${TENANT_ID}/subCategories`, subCategories);
 console.log(response)
  return response.data;
});
 
export const updateSubCategories = createAsyncThunk('subCategories/updateSubCategories', async (updatedSubCategory: any) => {
 
  const response = await axios.put(`${base_api_key_url}tenant/${TENANT_ID}/subCategories/${updatedSubCategory.id}`, updatedSubCategory);
  
  return response.data;
});
 
export const deleteSubCategories = createAsyncThunk('subCategories/deleteSubCategories', async (id: number) => {
  await axios.delete(`${base_api_key_url}tenant/${TENANT_ID}/subCategories/${id}`);
  return id;
});

const subCategorySlice = createSlice({
  name: 'subCategories',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const subCategories = state.data.find((u) => u.id === action.payload);
      state.selectedSubCategory = subCategories || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchSubCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addSubCategories.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateSubCategories.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteSubCategories.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = subCategorySlice.actions;
 
export default subCategorySlice.reducer;

