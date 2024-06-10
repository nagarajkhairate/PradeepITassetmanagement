import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
    id: number;
    location: string;
  }

  interface LocationState {
    locationName: Location[];
  }


  const initialState:LocationState = {
    locationName: [],
  };

const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state=initialState, action:PayloadAction<Location>) => {
      state.locationName.push(action.payload);
    },
    updateLocation: (state, action: PayloadAction<{ id: number; location: string }>) => {
      const { id, location } = action.payload;
      const existingLocation = state.locationName.find((loc) => loc.id === id);
      if (existingLocation) {
        existingLocation.location = location;
      }
    },
    deleteLocation: (state, action: PayloadAction<number>) => {
      state.locationName = state.locationName.filter(
        (loc) => loc.id !== action.payload
      );
    },
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.locationName = action.payload;
    },
  },
});

export const { addLocation, updateLocation, deleteLocation, setLocations } =
  locationSlice.actions;

export default locationSlice.reducer;
