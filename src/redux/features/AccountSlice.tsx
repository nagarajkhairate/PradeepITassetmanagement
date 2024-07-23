// authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface AccountState {
  isAuthenticated: boolean
  data: any[];
  selectedComponents: any | null;
  loading: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AccountState = {
  isAuthenticated: false,
  data: [],
    selectedComponents: null,
    loading: false,
  status: 'idle',
  error: null,
}

const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY
export const createAccount = createAsyncThunk(
  'tenant/register',
  async (accountData: any) => {
    const response = await axios.post(
      `${REACT_APP_BASE_API_KEY}tenant/register`,
      accountData,
    )
    return response.data
  },
)

const AccountSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to create account'
      })
  },
})

export const { logout } = AccountSlice.actions
export default AccountSlice.reducer
