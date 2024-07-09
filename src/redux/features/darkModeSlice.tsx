// src/reducers/DarkModeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


interface DarkModeState {
  value: 'light' | 'dark';
}

const initialState: DarkModeState = {
  value: 'light',
};

export const DarkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      console.log(state.value)
      state.value = state.value === 'light' ? 'dark' : 'light';
    },
    setDarkMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.value = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode } = DarkModeSlice.actions;

export const selectDarkMode = (state: RootState) => state.mode.value;

export default DarkModeSlice.reducer; 
