import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Assets{
  data:any[];
  loading:boolean;
  error:string|null;
  selectedAsset:any|null;
}

const data={
  "assetInfo":{
  // "discription":"HP Pavillion 14-ek 1074TU Intel core i5 13th gen(14inch, 16GB, 512GB
  //   windows 11 home, MS Office 2021, Intel UHD,FHD IPS Display)",
  "assetTagId": "BBC-BLR-BKS-1029",
  "purchaseDate": "06/02/2024",
  "cost": "₹36,0000.00",
  "brand": "Asus VivoBook",
  "model": "VivoBook Go 14",
  "site": "Banashankari ",
  "location": "Bangalore",
  "category": "Computer Equipment",
  "department": "	RPO",
  "assignedTo": "Mr.X",
  "status": "Available",
}, 
"assetDetails":{
  "assetDetail":  {
    serialNo: "R4N0CV10F66116F",
    purchasedFrom: "M V InfoTech Solution",
    dateCreated: "04/15/2024 01:22 AM",
    createdBy: "Pranjna B",
  },
  "assetEvent":[  
    {
    checkOutDate: "04/15/2024",
    assignedTo: "Prashant Nandaragi",
    dueDate: "No Due Date",
    checkOutNotes: "Initial checkout",
  },
  {
    checkOutDate: "04/15/2024",
    assignedTo: "Prashant Nandaragi",
    dueDate: "No Due Date",
    checkOutNotes: "Initial checkout",
  }],
  "assetDocument":[
    {
    description: "invoice1",
    fileType: "PDF",
    fileName: "invoice1",
    uploadDate: "2023/01/01",
    uploadBy: "User A",
  },
  {
    description: "invoice2",
    fileType: "JPG",
    fileName: "invoice2",
    uploadDate: "2023/01/03",
    uploadBy: "User B",
  }],
  assetWrranty:[],
  assetLinking:[],
  assetMaintainance:[],
  assetReserve:[],
  assetAudit:[],
  assetHistory:[
    {
      date: "2023/02/02",
      event: "Check Out1",
      field: "Statuso",
      changedFrom: "Availablek",
      changedTo: "Checked Out2",
      actionBy: "Prajna B",
    },
    {
      date: "2023/02/03",
      event: "Check Out2",
      field: "Status",
      changedFrom: "Available32",
      changedTo: "Checked Out4",
      actionBy: "Prajna g",
    },
  ]
}};

const initialState:Assets={
  data:[{...data}],
  loading:false,
  error:null,
  selectedAsset:null,
}

export const fetch_listAssets = createAsyncThunk('listAssets/fetch_listAssets',async()=>{
  const response = await axios.get("https://jsonplaceholder.typicode.com/users")
  return response.data
})

export const fetch_Assets = createAsyncThunk('assets/fetch_Assets', async()=>{
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  return response.data
})

// export const loadFunc = (data)=> { axios.post('https://jsonplaceholder.typicode.com/users', data).then((datares)=>{
//   console.log("data", JSON.stringify(datares));
//   return datares;
//  }).catch((err)=>{
//   console.log("err: ", err)
//  })}

 export const assetsSlice = createSlice({
  name:"assets",
  initialState,
  reducers : {
     submitData : (state, action)=>{
      console.log("action-", action.payload);
      //  const resData = loadFunc( action.payload);
      // state = {...state, dataFromApi: action.payload}

      axios.post('https://jsonplaceholder.typicode.com/users', action.payload).then((datares:any)=>{
        console.log("data", JSON.stringify(datares));
        state = {...state, data: datares}
       }).catch((err)=>{
        console.log("err: ", err)});
    },
    updateAsset:(state,action)=>{
      axios.put('https://jsonplaceholder.typicode.com/users', action.payload).then((datares:any)=>{
        console.log("data", JSON.stringify(datares));
        state = {...state, data: [datares]}
       }).catch((err)=>{
        console.log("err: ", err)});
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetch_Assets.pending,(state)=>{
      state.loading = true;
      state.error = ''
    })
    builder.addCase(fetch_Assets.fulfilled,(state,action)=>{
      state.loading = false,
      state.data = action.payload
      state.error = ''
    })
    builder.addCase(fetch_Assets.rejected,(state,action)=>{
      state.loading = false,
      state.data = [],
      state.error = action.error.message || 'Failed to fetch Assets'
    })
    builder.addCase(fetch_listAssets.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
  }
})

export const { submitData, updateAsset } = assetsSlice.actions;
export  default assetsSlice.reducer;