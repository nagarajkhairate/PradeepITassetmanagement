import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface TableOptionsState {
  data: any[];
  selectedOption: any | null;
  loading: boolean;
  error: string | null;
}
const initialState: TableOptionsState = {
  data: [],
  selectedOption: null,
  loading: false,
  error: null,
};

const base_api_key_url = process.env.BASE_API_KEY;
const TENANT_ID = process.env.TENANT_ID;

export const fetchOptions = createAsyncThunk('options/fetchOptions', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/table-options`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }

});


export const fetchOptionsById = createAsyncThunk('options/fetchOptionsById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/table-options/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addoptions = createAsyncThunk('options/addoptions', async (options: any) => {
 const response = await axios.post(`${base_api_key_url}tenant/${TENANT_ID}/table-options`, options);
 console.log(response)
  return response.data;
});
 
export const updateoptions = createAsyncThunk('options/updateoptions', async (updatedoptions: any) => {
 
  const response = await axios.put(`${base_api_key_url}tenant/${TENANT_ID}/table-options/${updatedoptions.id}`, updatedoptions);
  return response.data;
});
 
export const deleteoptions = createAsyncThunk('options/deleteoptions', async (id: number) => {
  await axios.delete(`${base_api_key_url}tenant/${TENANT_ID}/table-options/${id}`);
  return id;
});
 
const TableOptionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedOption = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchOptionsById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addoptions.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateoptions.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteoptions.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = TableOptionsSlice.actions;
 
export default TableOptionsSlice.reducer;