import { configureStore } from "@reduxjs/toolkit";
import assetsReducer  from "./features/AssetSlice";
import transactionsReducer from "./features/TransactionSlice"
import addEmployeesReducer from "./features/EmployeeSlice"
import clientReducer from "./features/clientSlice"
import appStateReducer from "./features/StateSlice"
import locationReducer from './features/LocationSlice';
import companyInfoReducer from './features/CompanyInfoSlice';
import SitesReducer from './features/SitesSlice';


export const store = configureStore({
  reducer:{
    appState: appStateReducer,
    assets:assetsReducer,
    transactions:transactionsReducer,
    employees:addEmployeesReducer,
    client:clientReducer,
    locations: locationReducer,
    sites: SitesReducer,
    companyInfo: companyInfoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch