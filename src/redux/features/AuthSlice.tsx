import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 
interface AuthState {
  data: any[];
  selectedSites: any | null;
  loading: boolean;
  error: string | null;
}
const initialState: AuthState = {
  data: [],
  selectedSites: null,
  loading: false,
  error: null,
};

const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
 
export const loginAccount = createAsyncThunk('tenant/login', async (account: any) => {
 const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/login`, account);
  return response.data;
});
 

const AuthSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedSites = user || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      


  },
});
 
export const { setSelectedCustomer } = AuthSlice.actions;
 
export default AuthSlice.reducer;