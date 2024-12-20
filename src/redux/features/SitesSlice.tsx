import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface SitesState {
  data: any[];
  selectedSites: any | null;
  loading: boolean;
  error: string | null;
}
const initialState: SitesState = {
  data: [],
  selectedSites: null,
  loading: false,
  error: null,
};

const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;

export const fetchSites = createAsyncThunk('sites/fetchSites', async () => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/site`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }

});


export const fetchSitesById = createAsyncThunk('sites/fetchSitesById', async (id: string ) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/site/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addSites = createAsyncThunk('sites/addSites', async (sites: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/site`, sites);
  return response.data;
});
 
export const updateSites = createAsyncThunk('sites/updateSites', async (updatedSites: any) => {
 
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/site/${updatedSites.id}`, updatedSites);
  return response.data;
});
 
export const deleteSites = createAsyncThunk('sites/deleteSites', async (id: number) => {
  await axios.delete(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/site/${id}`);
  return id;
});
 
const SitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedSites = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSites.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchSitesById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addSites.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateSites.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteSites.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = SitesSlice.actions;
 
export default SitesSlice.reducer;