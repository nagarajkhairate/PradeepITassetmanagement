import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface addClient{
  data:any[];
  selectedEmployee: any | null;
  loading:boolean;
  error:string|null;
}

const initialState:addClient={
  data:[],
  selectedEmployee: null,
  loading:false,
  error:null,
}

const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;  

export const fetchClient = createAsyncThunk('addClient/fetchClient',async()=>{
  const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/client-data`)
  return response.data
})

export const updateClient = createAsyncThunk('addClient/updateClient',async()=>{
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/client-data`)
  return response.data
})

export const addClient = createAsyncThunk('addClient/addClient', async (addclient:any) => {
  try {
    const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/client-data`, addclient);
    console.log('ResponsePost:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
});

export const addClientSlice = createSlice({
  name:"addClient",
  initialState,
  reducers:  {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const  addClient = state.data.find((u) => u.id === action.payload);
      state.selectedEmployee = addClient || null;
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchClient.pending,(state)=>{
      state.loading = true;
      state.error = ''
    })
    builder.addCase(fetchClient.fulfilled,(state,action)=>{
      state.loading = false;
      state.error = ''
      state.data = action.payload
    })
    builder.addCase(fetchClient.rejected,(state, action)=>{
      state.loading = false;
      state.error = ''
      state.data = []
    })
    builder.addCase(addClient.fulfilled,(state,action)=>{
      state.data.push(action.payload)
    })
    builder.addCase(updateClient.fulfilled,(state,action)=>{
      state.loading = false;
      state.error = ''
      state.data = action.payload
    })
  }
})

export const { setSelectedCustomer } = addClientSlice.actions;
export default addClientSlice.reducer