import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface addEmployee{
  data:any[];
  loading:boolean;
  error:string|null;
}

const initialState:addEmployee={
  data:[],
  loading:false,
  error:null,
}

export const fetch_employee = createAsyncThunk('addEmployee/fetch_employee',async()=>{
  const response = await axios.get("")
  return response.data
})

export const update_employee = createAsyncThunk('addEmployee/update_employee',async()=>{
  const response = await axios.put("")
  return response.data
})

export const post_add_Employee = createAsyncThunk('addEmployee/post_addEmployee', async (PostData) => {
  try {
    const response = await axios.post("https://jsonplaceholder.typicode.com/users", PostData);
    console.log('ResponsePost:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
});

export const addEmployeeSlice = createSlice({
  name:"addEmployees",
  initialState,
  reducers: {
    
  },
  extraReducers:(builder)=>{
    builder.addCase(fetch_employee.pending,(state)=>{
      state.loading = true;
      state.error = ''
    })
    builder.addCase(fetch_employee.fulfilled,(state,action)=>{
      state.loading = false;
      state.error = ''
      state.data = action.payload
    })
    builder.addCase(fetch_employee.rejected,(state,action)=>{
      state.loading = false;
      state.error = ''
      state.data = []
    })
    builder.addCase(post_add_Employee.fulfilled,(state,action)=>{
      //state.data.push(action.payload)
    })
    builder.addCase(update_employee.fulfilled,(state,action)=>{
      state.loading = false;
      state.error = ''
      state.data = action.payload
    })
  }
})
export default addEmployeeSlice.reducer