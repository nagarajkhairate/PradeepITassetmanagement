import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 

  interface LocationState {
    data: any[];
    selectedLocation: any | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: LocationState = {
    data: [],
    selectedLocation: null,
    loading: false,
    error: null,
  };
 
const base_api_key_url = process.env.REACT_APP_BASE_API_KEY;
const TENANT_ID = process.env.REACT_APP_TENANT_ID;

 
export const fetchLocation = createAsyncThunk('location/fetchLocation', async () => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/location`);
  return response.data;
   
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
 
});


export const fetchLocationById = createAsyncThunk('location/fetchLocationById', async (id: string ) => {
  try {
    const response = await axios.get(`${base_api_key_url}tenant/${TENANT_ID}/location/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Message'+ error);
    throw error;
  }
 
});
 
export const addLocation = createAsyncThunk('location/addLocation', async (location: any) => {
 const response = await axios.post(`${base_api_key_url}tenant/${TENANT_ID}/location`, location);
 console.log(response)
  return response.data;
});


export const updateLocation = createAsyncThunk('location/updateLocation', async (updatedLocation: any) => {
 
  const response = await axios.put(`${base_api_key_url}tenant/${TENANT_ID}/location/${updatedLocation.id}`, updatedLocation);
  
  return response.data;
});
 
export const deleteLocation = createAsyncThunk('location/deleteLocation', async (id: number) => {
  await axios.delete(`${base_api_key_url}tenant/${TENANT_ID}/location/${id}`);
  return id;
});

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const  location = state.data.find((u) => u.id === action.payload);
      state.selectedLocation = location || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(fetchLocationById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addLocation.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        console.log(index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});
 
export const { setSelectedCustomer } = locationSlice.actions;
 
export default locationSlice.reducer;




// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Location {
//     id: number;
//     location: string;
//   }

//   interface LocationState {
//     locationName: Location[];
//   }


//   const initialState:LocationState = {
//     locationName: [],
//   };

// const locationSlice = createSlice({
//   name: 'locations',
//   initialState,
//   reducers: {
//     addLocation: (state=initialState, action:PayloadAction<Location>) => {
//       state.locationName.push(action.payload);
//     },
//     updateLocation: (state, action: PayloadAction<{ id: number; location: string }>) => {
//       const { id, location } = action.payload;
//       const existingLocation = state.locationName.find((loc) => loc.id === id);
//       if (existingLocation) {
//         existingLocation.location = location;
//       }
//     },
//     deleteLocation: (state, action: PayloadAction<number>) => {
//       state.locationName = state.locationName.filter(
//         (loc) => loc.id !== action.payload
//       );
//     },
//     setLocations: (state, action: PayloadAction<Location[]>) => {
//       state.locationName = action.payload;
//     },
//   },
// });

// export const { addLocation, updateLocation, deleteLocation, setLocations } =
//   locationSlice.actions;

// export default locationSlice.reducer;
