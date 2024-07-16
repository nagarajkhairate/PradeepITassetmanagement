import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface addClient{
  data:any[];
  selectedCustomer: any | null;
  loading:boolean;
  error:string|null;
}

const initialState:addClient={
  data:[],
  selectedCustomer:  null,
  loading:false,
  error:null,
}

export const fetch_client = createAsyncThunk('addClient/fetch_client',async()=>{
  const response = await axios.get("")
  return response.data
})

export const update_client = createAsyncThunk('addClient/update_client',async()=>{
  const response = await axios.put("")
  return response.data
})

export const post_add_client = createAsyncThunk('addClient/post_addClient', async (PostData) => {
  try {
    const response = await axios.post("https://jsonplaceholder.typicode.com/users", PostData);
    console.log('ResponsePost:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
});

export const ClientSlice = createSlice({
  name:"client",
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const user = state.data.find((u) => u.id === action.payload);
      state.selectedCustomer = user || null;
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetch_client.pending,(state)=>{
      state.loading = true;
      state.error = ''
    })
    builder.addCase(fetch_client.fulfilled,(state,action)=>{
      state.loading = false;
      state.error = ''
      state.data = action.payload
    })
    builder.addCase(fetch_client.rejected,(state,action)=>{
      state.loading = false;
      state.error = ''
      state.data = []
    })
    builder.addCase(post_add_client.fulfilled,(state,action)=>{
      //state.data.push(action.payload)
    })
    builder.addCase(update_client.fulfilled,(state,action)=>{
      state.loading = false;
      state.error = ''
      state.data = action.payload
    })
  }
})
export const { setSelectedCustomer } = ClientSlice.actions;
export default ClientSlice.reducer