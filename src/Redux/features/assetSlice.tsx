import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Assets{
  data:any[];
  loading:boolean;
  error:string|null;
  selectedAsset:any|null;
}

// const data={
//   "id": "1",
//   "assetTagId": "BBC-BLR-BKS-1029",
//   "purchaseDate": "06/02/2024",
//   "cost": "₹36,0000.00",
//   "brand": "Asus VivoBook",
//   "model": "VivoBook Go 14",
//   "site": "Banashankari",
//   "location": "Bangalore",
//   "category": "Computer Equipment",
//   "department": "RPO",
//   "assignedTo": "Mr.X",
//   "status": "Available",
//   "assetDetail": {
//     "serialNo": "R4N0CV10F66116F",
//     "purchasedFrom": "M V InfoTech Solution",
//     "dateCreated": "04/15/2024 01:22 AM",
//     "createdBy": "Pranjna B"
//   },
//   "assetEvent": [
//     {
//       "checkOutDate": "04/15/2024",
//       "assignedTo": "Prashant Nandaragi",
//       "dueDate": "No Due Date",
//       "checkOutNotes": "Initial checkout"
//     },
//     {
//       "checkOutDate": "04/15/2024",
//       "assignedTo": "Prashant Nandaragi",
//       "dueDate": "No Due Date",
//       "checkOutNotes": "Initial checkout"
//     }
//   ],
//   "assetDocument": [
//     {
//       "description": "invoice1",
//       "fileType": "PDF",
//       "fileName": "invoice1",
//       "uploadDate": "2023/01/01",
//       "uploadBy": "User A"
//     },
//     {
//       "description": "invoice2",
//       "fileType": "JPG",
//       "fileName": "invoice2",
//       "uploadDate": "2023/01/03",
//       "uploadBy": "User B"
//     }
//   ],
//   "assetWarranty": [
    
//   ],
//   "assetLinking": [
    
//   ],
//   "assetMaintenance": [
    
//   ],
//   "assetReserve": [
    
//   ],
//   "assetAudit": [
    
//   ],
//   "assetHistory": [
//     {
//       "date": "2023/02/02",
//       "event": "Check Out1",
//       "field": "Status",
//       "changedFrom": "Available",
//       "changedTo": "Checked Out2",
//       "actionBy": "Pranjna B"
//     },
//     {
//       "date": "2023/02/03",
//       "event": "Check Out2",
//       "field": "Status",
//       "changedFrom": "Available32",
//       "changedTo": "Checked Out4",
//       "actionBy": "Pranjna g"
//     }
//   ]
// }

const initialState:Assets={
  // data:[{...data, keyId: 1}], 
  data:[],
  loading:false,
  error:null,
  selectedAsset:null,
}

export const fetch_listAssets = createAsyncThunk('listAssets/fetch_listAssets',async()=>{
  // const response = await axios.get("https://jsonplaceholder.typicode.com/users")
  const response = await axios.get("")
  return response.data
})

// export const fetch_Assets = createAsyncThunk('assets/fetch_Assets', async()=>{
//   // const response = await axios.get('https://jsonplaceholder.typicode.com/users')
//   const response = await axios.get('')
//   return response.data
// })

export const updateAsset = createAsyncThunk('assets/fetch_Assets', async(editAssetData)=>{
  const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editAssetData.id}`, editAssetData)
  return response.data
})

// export const loadFunc = (data)=> { axios.post('https://jsonplaceholder.typicode.com/users', data).then((datares)=>{
//   console.log("data", JSON.stringify(datares));
//   return datares;
//  }).catch((err)=>{
//   console.log("err: ", err)
//  })}
 export const reducerone = createAsyncThunk('asset/post_Assets',async(PostData)=>{
  console.log("submitData called----");
  try {
    // const postdata = 
    // {
    //   "id": 1,
    //   "name": "Leanne Graham",
    //   "username": "Bret",
    //   "email": "Sincere@april.biz",
    //   "address": {
    //     "street": "Kulas Light",
    //     "suite": "Apt. 556",
    //     "city": "Gwenborough",
    //     "zipcode": "92998-3874",
    //     "geo": {
    //       "lat": "-37.3159",
    //       "lng": "81.1496"
    //     }
    //   },
    //   "phone": "1-770-736-8031 x56442",
    //   "website": "hildegard.org",
    //   "company": {
    //     "name": "Romaguera-Crona",
    //     "catchPhrase": "Multi-layered client-server neural-net",
    //     "bs": "harness real-time e-markets"
    //   }
    // }
    // const response = await axios.post("https://jsonplaceholder.typicode.com/users",PostData)
    // console.log("res--- ", JSON.stringify(response));
    // return response.data;
    return PostData
    console.log("addanasset",JSON.stringify(PostData))
  } catch (error) {
   console.log("Error: ", error);
  }

})

 export const assetsSlice = createSlice({
  name:"assets",
  initialState,
  reducers : {
    //  submitData : (state, action)=>{
    //   console.log("action-", action.payload);
    //   //  const resData = loadFunc( action.payload);
    //   // state = {...state, dataFromApi: action.payload}

    //   axios.post('https://jsonplaceholder.typicode.com/users', action.payload).then((datares:any)=>{
    //     console.log("data", JSON.stringify(datares));
    //     state = {...state, data: [...state.data, {...datares, keyId: state.data.length+1}]}
    //    }).catch((err)=>{
    //     console.log("err: ", err)});
    // },
    // updateAsset:(state,action)=>{
    //   axios.put('https://jsonplaceholder.typicode.com/users', action.payload).then((datares:any)=>{
    //     console.log("data", JSON.stringify(datares));
    //     state = {...state, data: [datares]}
    //    }).catch((err)=>{
    //     console.log("err: ", err)});
    // }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetch_listAssets.pending,(state)=>{
      state.loading = true;
      state.error = ''
    })
    builder.addCase(fetch_listAssets.fulfilled,(state,action)=>{
      state.loading = false,
      // state.data = action.payload
      state.data = action.payload;
      state.error = '';
      // console.log("action", JSON.stringify(action.payload));
      // state = {...state, data: [...state.data, {...action.payload, keyIdFrontEnd: state.data.length+1}]} 
    });
    builder.addCase(fetch_listAssets.rejected,(state,action)=>{
      state.loading = false,
      state.data = [],
      state.error = action.error.message || 'Failed to fetch Assets'
    })
    // builder.addCase(reducerone.fulfilled,(state,action:any)=>{
    //   console.log("fullfilled---");
    //   state.loading = false,
    //   // state.data = action.payload
    //   state.error = '',
    //   // console.log("action", JSON.stringify(action.payload));
    //   state = {...state, data: [...state.data, {...action.payload, keyIdFrontEnd: state.data.length+1}]} 
    //   // console.log("state---", JSON.stringify(state.data));
    // })

    builder.addCase(reducerone.fulfilled, (state, action) => {
        // state.data.push(action.payload);
      })

    // builder.addCase(updateAsset.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.data = action.payload;
    //   state.error = "";
    // });
  }
})

// export const {  } = assetsSlice.actions;
export  default assetsSlice.reducer;