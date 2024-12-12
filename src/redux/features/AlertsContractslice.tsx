// src/redux/features/AlertsContractslice.tsx
import { createSlice } from '@reduxjs/toolkit';

export const alertsContractSlice = createSlice({
  name: 'alertsContract',
  initialState: {},
  reducers: {
    setAlerts: (state, action) => {
      // your logic here
    },
  },
});

export const { setAlerts } = alertsContractSlice.actions;
export default alertsContractSlice.reducer;
