// authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AccountState {
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AccountState = {
  isAuthenticated: false,
  status: 'idle',
  error: null,
};


const base_api_key_url = process.env.BASE_API_KEY;
export const createAccount = createAsyncThunk(
  'tenant/register',

  async (accountData: any) => {
    const response = await axios.post(`${base_api_key_url}tenant/register`, accountData);
     return response.data;
   }
 
);

const AccountSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAccount.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.status = 'succeeded';
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create account';
      });
  },
});

export const { logout } = AccountSlice.actions;
export default AccountSlice.reducer;