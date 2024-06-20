import { configureStore } from "@reduxjs/toolkit";
import assetsReducer  from "./features/AssetSlice";
import transactionsReducer from "./features/TransactionSlice"
import addEmployeesReducer from "./features/EmployeeSlice"
import clientReducer from "./features/clientSlice"
import appStateReducer from "./features/StateSlice"
import locationReducer from './features/LocationSlice';
import categoryReducer from './features/CategorySlice'
import subCategoryReducer from './features/CategorySubSlice'
import departmentNameReducer from './features/DepartmentSlice'
import dataBaseReducer from "./features/DataBaseSlice"
import companyInfoReducer from './features/CompanyInfoSlice';
import SitesReducer from './features/SitesSlice';
import TableOptionsReducer from './features/TableOptionsSlice';

export const store = configureStore({
  reducer:{
    appState: appStateReducer,
    assets:assetsReducer,
    transactions:transactionsReducer,
    employees:addEmployeesReducer,
    client:clientReducer,
    locations: locationReducer,
    category:categoryReducer,
    subCategories:subCategoryReducer,
    departments:departmentNameReducer,
    dataBase:dataBaseReducer,
    sites: SitesReducer,
    companyInfo: companyInfoReducer,
    tableOptions: TableOptionsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch