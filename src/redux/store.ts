import { configureStore } from "@reduxjs/toolkit";
import AssetsReducer from "./features/AssetSlice";
import transactionsReducer from "./features/TransactionSlice";
import addEmployeeReducer from "./features/EmployeeSlice";
import addClientReducer from "./features/ClientSlice";
import appStateReducer from "./features/StateSlice";
import darkModeReducer from "./features/DarkModeSlice";
import locationReducer from './features/LocationSlice';
import categoryReducer from './features/CategorySlice';
import subCategoryReducer from './features/CategorySubSlice';
import departmentNameReducer from './features/DepartmentSlice';
import eventsReducer from "./features/EventsSlice";
import companyInfoReducer from './features/CompanyInfoSlice';
import SitesReducer from './features/SitesSlice';
import TableOptionsReducer from './features/TableOptionsSlice';
import AuthReducer from './features/AuthSlice';
import TabsReducer from './features/TabsSlice';
import componentsReducer from "./features/ComponentsIdSlice";
import AssetFieldMappingReducer from './features/AssetFieldMappingSlice';
import assetDatabaseReducer from './features/AssetDatabaseSlice';
import assetCustomDatabaseReducer from './features/AssetCustomDatabaseSlice';
import CheckOutSliceReducer from "./features/CheckOutSlice";
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
import StepsReducer from './features/StepsSlice';
import EmpFieldReducer from './features/EmpFieldSlice';
import CheckOutFieldReducer from './features/CheckOutFieldSlice';
import CheckInFieldReducer from './features/CheckInFieldSlice';
import ClientFieldReducer from './features/ClientFieldSlice';
import AssetDefaultFieldsReducer from './features/AssetsDefaultFieldsSlice';
import CustomerDefaultFieldsReducer from './features/CustomerDefaultFields';
import LeaseDefaultFieldsreducer from './features/LeaseDefaultFields';
import LeaseReducer from './features/LeaseSlice';
import CustomerReducer from './features/CustomerSlice';
import LeaseReturnFieldsReducer from './features/LeaseReturnFields';
import alertsAssetPastDueReducer from './features/AlertsAssetPastDueSlice';
import alertsInsuranceExpReducer from './features/AlertsInsuranceExpSlice';
import alertsLeasesExpReducer from './features/AlertsLeasesExpSlice';
import alertsMaintenanceDueReducer from './features/AlertsMaintenanceDueSlice';
import alertsMaintenanceOverDueReducer from './features/AlertsMaintenanceOverDueSlice';
import alertsWarrantiesExpReducer from './features/AlertsWarrantiesExpSlice';
import alertsAddContractReducer from './features/AlertsAddContractSlice';
import alertsSetupReducer from './features/AlertsSetupSlice';
import AuthSlice from "./features/AuthSlice";
import alertsContractReducer from './features/AlertsContractslice';  // Corrected import here
import DisposeFieldReducer from './features/DisposeFieldSlice';
import DisposeReducer from './features/DisposeSlice';
import MaintenanceFieldReducer from './features/MaintenanceFieldSlice';
import MaintenanceReducer from './features/MaintenanceSlice';
import MoveFieldReducer from './features/MoveFieldSlice';
import ReserveFieldReducer from './features/ReserveFieldSlice';
import ReserveReducer from './features/ReserveSlice';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    assets: AssetsReducer,
    steps: StepsReducer,
    transactions: transactionsReducer,
    addEmployee: addEmployeeReducer,
    addClient: addClientReducer,
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
    auth: AuthSlice,
    tabs: TabsReducer,
    components: componentsReducer,
    assetMapping: AssetFieldMappingReducer,
    assetDatabase: assetDatabaseReducer,
    assetCustomDatabase: assetCustomDatabaseReducer,
    checkOut: CheckOutSliceReducer,
    empDatabase: empDatabaseReducer,
    empCustomDatabase: empCustomDatabaseReducer,
    customerDatabase: customerDatabaseReducer,
    customerCustomDatabase: customerCustomDatabaseReducer,
    maintenanceDatabase: maintenanceDatabaseReducer,
    maintenanceCustomDatabase: maintenanceCustomDatabaseReducer,
    warrantiesDatabase: warrantiesDatabaseReducer,
    warrantiesCustomDatabase: warrantiesCustomDatabaseReducer,
    contractDatabase: contractDatabaseReducer,
    contractCustomDatabase: contractCustomDatabaseReducer,
    empField: EmpFieldReducer,
    checkOutField: CheckOutFieldReducer,
    checkInField: CheckInFieldReducer,
    clientField: ClientFieldReducer,
    assetsDefaultField: AssetDefaultFieldsReducer,
    customerDefaultField: CustomerDefaultFieldsReducer,
    leaseDefaultField: LeaseDefaultFieldsreducer,
    lease: LeaseReducer,
    customer: CustomerReducer,
    leaseReturnField: LeaseReturnFieldsReducer,
    alertsAssetPastDue: alertsAssetPastDueReducer,
    alertsInsuranceExp: alertsInsuranceExpReducer,
    alertsLeasesExp: alertsLeasesExpReducer,
    alertsMaintenanceDue: alertsMaintenanceDueReducer,
    alertsMaintenanceOverDue: alertsMaintenanceOverDueReducer,
    alertsWarrantiesExp: alertsWarrantiesExpReducer,
    alertsAddContract: alertsAddContractReducer,
    alertsSetup: alertsSetupReducer,
    alertsContract: alertsContractReducer,
    disposeField: DisposeFieldReducer,
    dispose: DisposeReducer,
    maintenanceField: MaintenanceFieldReducer,
    maintenance: MaintenanceReducer,
    moveField: MoveFieldReducer,
    reserveField: ReserveFieldReducer,
    reserve: ReserveReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
