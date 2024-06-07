import { configureStore } from "@reduxjs/toolkit";

import assetsReducer  from "./features/assetSlice";
import transactionsReducer from "./features/transactionSlice"
import addEmployeesReducer from "./features/addEmployeeSlice"
import clientReducer from "./features/clientSlice"
import appStateReducer from "./features/appStateSlice"


export const store = configureStore({
  reducer:{
    appState: appStateReducer,
    assets:assetsReducer,
    transactions:transactionsReducer,
    employees:addEmployeesReducer,
    client:clientReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>