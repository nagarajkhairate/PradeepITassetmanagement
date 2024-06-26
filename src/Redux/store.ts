import { configureStore } from "@reduxjs/toolkit";
import assetsReducer  from "./features/AssetSlice";
import transactionsReducer from "./features/TransactionSlice";
import addEmployeesReducer from "./features/EmployeeSlice";
import clientReducer from "./features/clientSlice";
import appStateReducer from "./features/StateSlice";
import darkModeReducer from "./features/darkModeSlice";
import locationReducer from './features/LocationSlice';
import categoryReducer from './features/CategorySlice'
import subCategoryReducer from './features/CategorySubSlice'
import departmentNameReducer from './features/DepartmentSlice'
import dataBaseReducer from "./features/DataBaseSlice"
import eventsReducer from "./features/EventsSlice"
import companyInfoReducer from './features/CompanyInfoSlice';
import SitesReducer from './features/SitesSlice';
import TableOptionsReducer from './features/TableOptionsSlice';
import AuthReducer from './features/AuthSlice';
import AccountReducer from './features/AccountSlice';
import TabsReducer from './features/TabsSlice';
import componentsReducer from "./features/ComponentsIdSlice"

export const store = configureStore({
  reducer:{
    appState: appStateReducer,
    assets:assetsReducer,
    transactions:transactionsReducer,
    employees:addEmployeesReducer,
    client:clientReducer,
    location: locationReducer,
    mode: darkModeReducer,
    category:categoryReducer,
    subCategories:subCategoryReducer,
    departments:departmentNameReducer,
    dataBase:dataBaseReducer,
    events:eventsReducer,
    sites: SitesReducer,
    companyInfo: companyInfoReducer,
    tableOptions: TableOptionsReducer,
    login:AuthReducer,
    createAccount:AccountReducer,
    tabs:TabsReducer,
    components:componentsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch