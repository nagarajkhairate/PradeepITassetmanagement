import { configureStore } from "@reduxjs/toolkit";

import assetsReducer  from "./assetSlice";
import transactionsReducer from "./transactionSlice"
import addEmployeesReducer from "./addEmployeeSlice"
import clientReducer from "./clientSlice"


export const store = configureStore({
  reducer:{
    assets:assetsReducer,
    transactions:transactionsReducer,
    addEmployeesReducer:addEmployeesReducer,
    client:clientReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>