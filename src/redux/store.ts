import { configureStore } from "@reduxjs/toolkit";
import AssetsReducer from "./features/AssetSlice"
import transactionsReducer from "./features/TransactionSlice"; // Ensure this matches the file name's casing
import addEmployeesReducer from "./features/EmployeeSlice";
import clientReducer from "./features/ClientSlice"; // Ensure this matches the file name's casing
import appStateReducer from "./features/StateSlice";
import darkModeReducer from "./features/DarkModeSlice";
import locationReducer from './features/LocationSlice';
import categoryReducer from './features/CategorySlice'
import subCategoryReducer from './features/CategorySubSlice';
import departmentNameReducer from './features/DepartmentSlice';
import eventsReducer from "./features/EventsSlice";
import companyInfoReducer from './features/CompanyInfoSlice';
import SitesReducer from './features/SitesSlice';
import TableOptionsReducer from './features/TableOptionsSlice';
import AuthReducer from './features/AuthSlice';
import AccountReducer from './features/AccountSlice';
import TabsReducer from './features/TabsSlice';
import componentsReducer from "./features/ComponentsIdSlice";
import AssetFieldMappingReducer from './features/AssetFieldMappingSlice';
import assetDatabaseReducer from './features/AssetDatabaseSlice';
import assetCustomDatabaseReducer from './features/AssetCustomDatabaseSlice';
import empDatabaseReducer from './features/EmpDatabaseSlice';
import empCustomDatabaseReducer from './features/EmpCustomDatabseSlice';
import customerDatabaseReducer from './features/CustomerDatabaseSlice';
import customerCustomDatabaseReducer from './features/CustomerCustomDatabaseSlice';
import maintenanceDatabaseReducer from './features/MaintenanceDatabaseSlice';
import maintenanceCustomDatabaseReducer from './features/MaintenanceCustomDatabaseSlice';
import warrantiesDatabaseReducer from './features/WarrantiesDatabaseSlice';
import warrantiesCustomDatabaseReducer from './features/WarrantiesCustomDatabaseSlice';
import contractDatabaseReducer from './features/ContractDatabaseSlice';
import contractCustomDatabaseReducer from './features/ContractCustomDatabaseSlice';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    assets: AssetsReducer,
    transactions: transactionsReducer,
    employees: addEmployeesReducer,
    client: clientReducer,
    location: locationReducer,
    mode: darkModeReducer,
    category: categoryReducer,
    subCategories: subCategoryReducer,
    departments: departmentNameReducer,
    events: eventsReducer,
    sites: SitesReducer,
    companyInfo: companyInfoReducer,
    tableOptions: TableOptionsReducer,
    login: AuthReducer,
    createAccount: AccountReducer,
    tabs: TabsReducer,
    components: componentsReducer,
    assetFieldMapping:AssetFieldMappingReducer,
    assetDatabase:assetDatabaseReducer,
    assetCustomDatabase:assetCustomDatabaseReducer,
    empDatabase:empDatabaseReducer,
    empCustomDatabase:empCustomDatabaseReducer,
    customerDatabase:customerDatabaseReducer,
    customerCustomDatabase:customerCustomDatabaseReducer,
    maintenanceDatabase:maintenanceDatabaseReducer,
    maintenanceCustomDatabase:maintenanceCustomDatabaseReducer,
    warrantiesDatabase:warrantiesDatabaseReducer,
    warrantiesCustomDatabase:warrantiesCustomDatabaseReducer,
    contractDatabase:contractDatabaseReducer,
    contractCustomDatabase:contractCustomDatabaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
