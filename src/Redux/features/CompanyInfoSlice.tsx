import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface CompanyInfoState {
  data: any[];
  selectedCustomer: any | null;
  loading: boolean;
  error: string | null;
}
 
const initialState: CompanyInfoState = {
  data: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};
const TENANT_ID = process.env.TENANT_ID;
const base_api_key_url = process.env.BASE_API_KEY;
 
export const fetchCompanyInfo = createAsyncThunk('companyInfo/fetchCompanyInfo', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}customers/${TENANT_ID}/clients`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});
export const fetchCompanyInfoById = createAsyncThunk('companyInfo/fetchCompanyInfoById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}customers/${TENANT_ID}/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addCompanyInfo = createAsyncThunk('companyInfo/addCompanyInfo', async (companyInfo: any) => {
 const response = await axios.post(`${base_api_key_url}customers/${TENANT_ID}/clients`, companyInfo);
  return response.data;
});
 
export const updateCompanyInfo = createAsyncThunk('companyInfo/updateCompanyInfo', async (updatedCustomer: any) => {
 
  const response = await axios.put(`${base_api_key_url}customers/${TENANT_ID}/clients/${updatedCustomer.id}`, updatedCustomer);
  return response.data;
});
 
export const deleteCompanyInfo = createAsyncThunk('companyInfo/deleteCompanyInfo', async (id: number) => {
  await axios.delete(`${base_api_key_url}customers/${TENANT_ID}/clients/${id}`);
  return id;
});
 
const CompanyInfoSlice = createSlice({
  name: 'companyInfo',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedCustomer = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompanyInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch companyInfo';
      })
      .addCase(fetchCompanyInfoById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addCompanyInfo.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCompanyInfo.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteCompanyInfo.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = CompanyInfoSlice.actions;
 
export default CompanyInfoSlice.reducer;