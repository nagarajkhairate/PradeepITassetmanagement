import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Transaction{
  data:any[];
  loading:boolean;
  error:string|null;
}

const initialState:Transaction={
  data:[],
  loading:false,
  error:null,
}

export const fetch_check_out = createAsyncThunk('transaction/fetch_data',async()=>{
  const response = await axios.get("")
  return response.data
})
export const update_check_out = createAsyncThunk('transaction/update_data',async()=>{
  const response = await axios.put("")
  return response.data
})

export const post_check_out = createAsyncThunk('transaction/post_Transaction', async (PostData) => {
  try {
    const response = await axios.post("https://jsonplaceholder.typicode.com/users", PostData);
    console.log('ResponsePost:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
});


export const transactionSlice = createSlice({
  name:"transactions",
  initialState,
  reducers: {
    
  },
  extraReducers:(builder)=>{
    builder.addCase(fetch_check_out.pending,(state)=>{
      state.loading = true;
      state.error = ''
    })
    builder.addCase(fetch_check_out.fulfilled,(state,action)=>{
      state.loading = false;
      state.error = ''
      state.data = action.payload
    })
    builder.addCase(fetch_check_out.rejected,(state,action)=>{
      state.loading = false;
      state.error = ''
      state.data = []
    })
    builder.addCase(post_check_out.fulfilled,(state,action)=>{
      //state.data.push(action.payload)
    })
    builder.addCase(update_check_out.fulfilled,(state,action)=>{
      state.loading = false;
      state.error = ''
      state.data = action.payload
    })
    
  }
})
export default transactionSlice.reducer