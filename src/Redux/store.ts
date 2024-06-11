import { configureStore } from "@reduxjs/toolkit";
import assetsReducer  from "./features/assetSlice";
import transactionsReducer from "./features/transactionSlice"
import addEmployeesReducer from "./features/addEmployeeSlice"
import clientReducer from "./features/clientSlice"
import appStateReducer from "./features/appStateSlice"
import locationReducer from './features/LocationSlice';


export const store = configureStore({
  reducer:{
    appState: appStateReducer,
    assets:assetsReducer,
    transactions:transactionsReducer,
    employees:addEmployeesReducer,
    client:clientReducer,
    locations: locationReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch