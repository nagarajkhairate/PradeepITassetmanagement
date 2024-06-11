import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Assets{
  data:any[];
  loading:boolean;
  error:string|null;
  selectedAsset:any|null;
}


const initialState:Assets={
  // data:[{...data, keyId: 1}], 
  data:[],
  loading:false,
  error:null,
  selectedAsset:null,
}

export const fetch_listAssets = createAsyncThunk('listAssets/fetch_listAssets',async()=>{
  // const response = await axios.get("https://jsonplaceholder.typicode.com/users")
  const response = await axios.get("http://127.0.0.1:8000/api/asset")
  return response.data
})

// export const fetch_Assets = createAsyncThunk('assets/fetch_Assets', async()=>{
//   // const response = await axios.get('https://jsonplaceholder.typicode.com/users')
//   const response = await axios.get('')
//   return response.data
// })


// export const updateAsset = createAsyncThunk('assets/fetch_Assets', async(id)=>{
//   const response = await axios.put(`http://127.0.0.1:8000/api/asset/${id}`)
//   console.log("respone update___--",response)
//   return response.data
// })

export const updateAsset = createAsyncThunk('assets/updateAsset', async(editAssetData)=>{
  console.log("editasetdata----",editAssetData)
  const response = await axios.put(`http://127.0.0.1:8000/api/asset/${editAssetData.id}`, editAssetData)
  console.log("respone update___--",JSON.stringify(response));

  return response.data
})


export const fetchAssetById = createAsyncThunk('assets/fetchAssetById', async (id: string) => {
  const response = await axios.get(`http://127.0.0.1:8000/api/asset/${id}`);
  return response.data;
}); 

// export const loadFunc = (data)=> { axios.post('https://jsonplaceholder.typicode.com/users', data).then((datares)=>{
//   console.log("data", JSON.stringify(datares));
//   return datares;
//  }).catch((err)=>{
//   console.log("err: ", err)
//  })}
 export const reducerone = createAsyncThunk('asset/post_Assets',async(PostData)=>{
  console.log("submitData called----");
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/asset",PostData)
    console.log("Asset res--- ", JSON.stringify(response));
    return response.data;
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
        state.data.push(action.payload);
      })
      builder.addCase(fetchAssetById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAsset = action.payload;
        state.error = '';
      });

      
    builder.addCase(updateAsset.fulfilled, (state, action) => {
      state.loading = false;
      let data = action.payload;
      const ind = state.data.findIndex((item)=>item.id === data.id);
      console.log("data=", JSON.stringify(state.data));
      if(ind>0){
        state.data[ind] = data; 
      }
      console.log("ff = ", JSON.stringify(state.data));
      state.error = "";
    });
  }
})

// export const {  } = assetsSlice.actions;
export  default assetsSlice.reducer;