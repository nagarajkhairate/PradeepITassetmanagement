import { configureStore } from "@reduxjs/toolkit";

import assetsReducer  from "./assetSlice";
import transactionsReducer from "./transactionSlice"
import addEmployeesReducer from "./addEmployeeSlice"


export const store = configureStore({
  reducer:{
    assets:assetsReducer,
    transactions:transactionsReducer,
    addEmployeesReducer:addEmployeesReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>