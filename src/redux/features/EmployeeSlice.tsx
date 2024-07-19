import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface addEmployee{
  data:any[];
  selectedEmployee: any | null;
  loading:boolean;
  error:string|null;
}

const initialState:addEmployee={
  data:[],
  selectedEmployee: null,
  loading:false,
  error:null,
}

const REACT_APP_BASE_API_KEY = process.env.REACT_APP_BASE_API_KEY;
const REACT_APP_TENANT_ID = process.env.REACT_APP_TENANT_ID;  

export const fetchEmployee = createAsyncThunk('addEmployee/fetchEmployee',async()=>{
  const response = await axios.get(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/employee`)
  return response.data
})

export const updateEmployee = createAsyncThunk('addEmployee/updateEmployee',async()=>{
  const response = await axios.put(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/employee`)
  return response.data
})

export const addEmployee = createAsyncThunk('addEmployee/addEmployee', async (addemp:any) => {
  try {
    const response = await axios.post(`${REACT_APP_BASE_API_KEY}tenant/${REACT_APP_TENANT_ID}/employee`, addemp);
    console.log('ResponsePost:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
});

export const addEmployeeSlice = createSlice({
  name:"addEmployee",
  initialState,
  reducers:  {
    setSelectedCustomer: (state, action: PayloadAction<number>) => {
      const  addEmployee = state.data.find((u) => u.id === action.payload);
      state.selectedEmployee = addEmployee || null;
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchEmployee.pending,(state)=>{
      state.loading = true;
      state.error = ''
    })
    builder.addCase(fetchEmployee.fulfilled,(state,action)=>{
      state.loading = false;
      state.error = ''
      state.data = action.payload
    })
    builder.addCase(fetchEmployee.rejected,(state, action)=>{
      state.loading = false;
      state.error = ''
      state.data = []
    })
    builder.addCase(addEmployee.fulfilled,(state,action)=>{
      state.data.push(action.payload)
    })
    builder.addCase(updateEmployee.fulfilled,(state,action)=>{
      state.loading = false;
      state.error = ''
      state.data = action.payload
    })
  }
})

export const { setSelectedCustomer } = addEmployeeSlice.actions;
export default addEmployeeSlice.reducer