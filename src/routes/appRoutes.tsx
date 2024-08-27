import { RouteType } from './config'
import {
  AddAnAsset,
  Alerts,
  AssetForm,
  Assets,
  AssetsPastDue,
  CategorySetup,
  CategorySub,
  CheckIn,
  CheckOut,
  ContractForm,
  CustomerForm,
  Dashboard,
  DataBasesEmp,
  Dispose,
  EditAssets,
  EditAnAsset,
  Event,
  Lease,
  LeaseReturn,
  LeasesExpiring,
  ListOfAssets,
  LocationSetup,
  Maintenance,
  MaintenanceForm,
  MaintenanceOverdue,
  MaintenancesDue,
  Move,
  PersonsEmployeesForm,
  Reserve,
  Setup,
  SetupCompInfo,
  SetupDept,
  SetupSites,
  SetupTableOptions,
   WarrantyForm,
} from './AllComponents'
import { ICONS } from '../components/Common/AppIcon/AppIcon'
import DataBases from '../pages/Setup/DataBase/DatabseAssets/DataBaseAsset'
import DatabaseCustomersTable from '../pages/Setup/DataBase/DatabaseCustomerTable/DatabaseCustomersTable'
import DatabaseSetup from '../pages/Setup/DataBase/DataBaseSetup'
import DatabaseMaintenance from '../pages/Setup/DataBase/DatabaseMaintenance/DataBaseMaintenance'
import DatabaseWarranties from '../pages/Setup/DataBase/DatabaseWarranties.tsx/DataBaseWarranties'
import SetupColumns from '../pages/Assets/SetupColumns'
import SearchCriteria from '../pages/Assets/SearchCriteria'
import DatabaseContractTable from '../pages/Setup/DataBase/DatabaseContract/DatabaseContractTable'
import EditModalDatabaseCustomer from '../pages/Setup/DataBase/DatabaseCustomerTable/EditModelDatabaseCustomer'
import AlertSetupColumn from '../pages/Alerts/Contract/AlertContractSetupColumn'
import AlertsSetup from '../pages/Alerts/SetupAlerts/AlertsSetup'
import ImportMaintenanceDue from '../pages/Alerts/Maintenances/ImportMaintenanceDue'
import ContractsExpiring from '../pages/Alerts/Contract/ContractsExpiring'
import AddContractExp from '../pages/Alerts/Contract/AddContractExp'
import AlertContractSetupColumn from '../pages/Alerts/Contract/AlertContractSetupColumn'
import WarrantyExpiring from '../pages/Alerts/Warranties/WarrantyExpiring'
import MaintenancesSetupColumn from '../pages/Alerts/Maintenances/MaintenancesSetupColumn'
import WarrantySetupColumn from '../pages/Alerts/Warranties/WarrantySetupColumn'
import ViewContract from '../pages/Alerts/Contract/ViewContract'
import EditContract from '../pages/Alerts/Contract/EditContract'
import MaintenancesOverdueSetupColumn from '../pages/Alerts/MaintenanceOverDue/MaintenancesOverdueSetupColumn'
import ViewMaintenance from '../pages/Alerts/Maintenances/ViewMaintenance'
import ViewMainttInfo from '../components/AssetSections/EditAsset/Tabs/ViewMainttInfo'




const appRoutes: RouteType[] = [
  // {
  //   index: true,
  //   element: <Dashboard />,
  //   state: 'dashboard',
  // },
  {
    path: '/dashboard',
    element: <Dashboard />,
    state: 'dashboard',
    sidebarProps: {
      displayText: 'Dashboard',
      icon: <ICONS.dashboard />,
    },
  },

  {
    path: '/alerts',
    element: <Alerts />,
    state: 'alerts',
    sidebarProps: {
      displayText: 'Alerts',
      icon: <ICONS.resource />,
    },
    child: [
      {
        path: '/alerts/contracts-expiring',
        element: <ContractsExpiring />,
        state: 'alerts.contractsExpiring',
        sidebarProps: {
          displayText: 'Contracts Expiring',
          icon: <ICONS.person />,
        },
      },
      {
        index: true,
        path: '/alerts/contracts-expiring/contract-set-up-column',
        element: <AlertContractSetupColumn />,
        state: 'assets',
      },
      {
        index: true,
        path: '/alerts/contracts-expiring/add-contract',
        element: <AddContractExp />,
        state: 'assets',
      },
      {
        index: true,
        path: '/alerts/contracts-expiring/view-contract/:id',
        element: <ViewContract />,
        state: 'assets',
      },
      {
        index: true,
        path: '/alerts/contracts-expiring/view-contract/edit-contract/:id',
        element: <EditContract />,
        state: 'assets',
      },
      {
        path: '/alerts/maintenances-due',
        element: <MaintenancesDue />,
        state: 'alerts',
        sidebarProps: {
          displayText: 'Maintenances Due',
          icon: <ICONS.person />,
        },
      },
      {
        index: true,
        path: '/alerts/maintenances-due/import-maintenance',
        element: <ImportMaintenanceDue />,
        state: 'assets',
      },
      {
        index: true,
        path: '/alerts/maintenances-due/maintenance-set-up-column',
        element: <MaintenancesSetupColumn />,
        state: 'assets',
      },
      {
        index: true,
        path: '/alerts/maintenance-due/view-maintenance/:id',
        element: <ViewMaintenance />,
        state: 'assets',
      },
      {
        path: '/alerts/maintenances-over-due',
        element: <MaintenanceOverdue />,
        state: 'alerts.maintenanceOverdue',
        sidebarProps: {
          displayText: 'Maintenances Over Due',
          icon: <ICONS.person />,
        },
      },
      {
        index: true,
        path: '/alerts/maintenances-over-due/maintenance-over-due-set-up-column',
        element: <MaintenancesOverdueSetupColumn />,
        state: 'assets',
      },
      {
        index: true,
        path: '/alerts/maintenances-due/import-maintenance',
        element: <ImportMaintenanceDue />,
        state: 'assets',
      },
      {
        index: true,
        path: '/alerts/maintenances-due/set-up-column',
        element: <AlertSetupColumn />,
        state: 'assets',
      },
      {
        path: '/alerts/leases-expiring',
        element: <LeasesExpiring />,
        state: 'alerts.leasesExpiring',
        sidebarProps: {
          displayText: 'Leases Expiring',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/alerts/warranty-expiring',
        element: <WarrantyExpiring />,
        state: 'alerts.warrantyExpiring',
        sidebarProps: {
          displayText: 'Warranty Expiring',
          icon: <ICONS.person />,
        },
      },
      {
        index: true,
        path: '/alerts/warranty-expiring/warranty-set-up-column',
        element: <WarrantySetupColumn />,
        state: 'assets',
      },
      {
        path: '/alerts/assets-past-due',
        element: <AssetsPastDue />,
        state: 'assetsPastDue',
        sidebarProps: {
          displayText: 'Assets Past Due',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/alerts/setup-alerts',
        element: <AlertsSetup />,
        state: 'setupAlerts',
        sidebarProps: {
          displayText: 'Setup Alerts',
          icon: <ICONS.person />,
        },
      }
    ],
  },
  {
    path: '/assets',
    element: <Assets />,
    state: 'assets',
    sidebarProps: {
      displayText: 'Assets',
      icon: <ICONS.resource />,
    },
    child: [
      {
        path: '/assets/list-of-assets',
        element: <ListOfAssets />,
        state: 'assets',
        sidebarProps: {
          displayText: 'List of Assets',
          icon: <ICONS.person />,
        },
      },{
        index: true,
        path: '/assets/list-of-assets/set-up-columns',
        element: <SetupColumns />,
        state: 'assets',
      },
      {
        index: true,
        path: '/assets/list-of-assets/search-criteria',
        element: <SearchCriteria />,
        state: 'assets',
      },
      {
        path: '/assets/add',
        element: <AddAnAsset />,
        state: 'addAnAsset',
        sidebarProps: {
          displayText: 'Add an Assets',
          icon: <ICONS.person />,
        },
      },
      {
        index: true,
        path: '/assets/view-an-asset/:id',
        element: <EditAssets />,
        state: 'assets',
      },
      {
        index: true,
        path: '/assets/edit-an-asset/:id',
        element: <EditAnAsset />,
        state: 'assets',
      },
      {
        path: '/assets/checkout',
        element: <CheckOut />,
        state: 'checkout',
        sidebarProps: {
          displayText: 'Check Out',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/assets/check-in',
        element: <CheckIn />,
        state: 'check-in',
        sidebarProps: {
          displayText: 'Check In',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/assets/lease',
        element: <Lease />,
        state: 'lease',
        sidebarProps: {
          displayText: 'Lease',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/assets/lease-return',
        element: <LeaseReturn />,
        state: 'lease-return',
        sidebarProps: {
          displayText: 'Lease Return',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/assets/dispose',
        element: <Dispose />,
        state: 'resources.consultants',
        sidebarProps: {
          displayText: 'Dispose',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/assets/maintenance',
        element: <Maintenance />,
        state: 'maintenance',
        sidebarProps: {
          displayText: 'Maintenance',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/assets/move',
        element: <Move />,
        state: 'resources.suppliers',
        sidebarProps: {
          displayText: 'Move',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/assets/reserve',
        element: <Reserve />,
        state: 'reserve',
        sidebarProps: {
          displayText: 'Reserve',
          icon: <ICONS.person />,
        },
      },
    ],
  },
  {
    path: '/setup',
    element: <Setup />,
    state: 'setup',
    sidebarProps: {
      displayText: 'Set Up',
      icon: <ICONS.resource />,
    },
    child: [
      {
        path: '/setup/setup-comp-info',
        element: <SetupCompInfo />,
        state: 'setupCompInfo',
        sidebarProps: {
          displayText: 'Company Info',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/setup/sites',
        element: <SetupSites />,
        state: 'sites',
        sidebarProps: {
          displayText: 'Sites',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/setup/location-setup',
        element: <LocationSetup />,
        state: 'location',
        sidebarProps: {
          displayText: 'Location',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/setup/category-setup',
        element: <CategorySetup />,
        state: 'category',
        sidebarProps: {
          displayText: 'Category',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/setup/sub-category',
        element: <CategorySub />,
        state: 'assetsPastDue',
        sidebarProps: {
          displayText: 'Sub Category',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/setup/departments',
        element: <SetupDept />,
        state: 'department',
        sidebarProps: {
          displayText: 'Department',
          icon: <ICONS.person />,
        },
      },

      {
        path: '/setup/database',
        element: <DatabaseSetup />,
        state: 'database',
        sidebarProps: {
          displayText: 'DataBase',
          icon: <ICONS.resource />,
        },

        child: [
          {
            path: '/setup/database/data-bases-assets',
            element: <DataBases />,
            state: 'DataBases',
            sidebarProps: {
              displayText: 'DataBases Assets',
              icon: <ICONS.person />,
            },
          },
          {
            path: '/setup/database/data-bases-employee',
            element: <DataBasesEmp />,
            state: 'DataBasesEmp',
            sidebarProps: {
              displayText: 'DataBases Employee',
              icon: <ICONS.person />,
            },
          },
          {
            path: '/setup/database/databases-customer-table',
            element: <DatabaseCustomersTable />,
            state: 'DataBasescustomerstable',
            sidebarProps: {
              displayText: 'DataBases Customers Table',
              icon: <ICONS.person />,
            },
          },
       
          {
            path: '/setup/database/databases-maintenance',
            element: <DatabaseMaintenance />,
            state: 'DataBasemaintenance',
            sidebarProps: {
              displayText: 'DataBases Maintenance Table',
              icon: <ICONS.person />,
            },
          },
          {
            path: '/setup/database/databases-warranties',
            element: <DatabaseWarranties />,
            state: 'DataBaseWarranties',
            sidebarProps: {
              displayText: 'DataBases Warranties Table',
              icon: <ICONS.person />,
            },
          },
          {
            path: '/setup/database/databases-contract',
            element: <DatabaseContractTable />,
            state: 'DataBaseContract',
            sidebarProps: {
              displayText: 'DataBases Contract Table',
              icon: <ICONS.person />,
            },
          },
        ],
      },


      {
        path: '/setup/events',
        element: <Event />,
        state: 'event',
        sidebarProps: {
          displayText: 'Events',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/setup/table-options',
        element: <SetupTableOptions />,
        state: 'setupTableOptions',
        sidebarProps: {
          displayText: 'Table Options',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/setup/customize',
        element: <AssetForm />,
        state: 'assetForm',
        sidebarProps: {
          displayText: 'Customize Form',
          icon: <ICONS.resource />,
        },
        child: [
          {
            path: '/setup/customize/asset',
            element: <AssetForm />,
            state: 'assetForm',
            sidebarProps: {
              displayText: 'Asset Form',
              icon: <ICONS.person />,
            },
          },
          {
            path: '/setup/customize/employee',
            element: <PersonsEmployeesForm />,
            state: 'customize-employee',
            sidebarProps: {
              displayText: 'Customize employee',
              icon: <ICONS.person />,
            },
          },
          {
            path: '/setup/customize/contract',
            element: <ContractForm />,
            state: 'contractForm',
            sidebarProps: {
              displayText: 'Customize Contract',
              icon: <ICONS.person />,
            },
          },
          {
            path: '/setup/customize/maintenance',
            element: <MaintenanceForm />,
            state: 'customizeMaintenance',
            sidebarProps: {
              displayText: 'Customize Maintenance',
              icon: <ICONS.person />,
            },
          },
          {
            path: '/setup/customize/customer',
            element: <CustomerForm />,
            state: 'customizeCustomer',
            sidebarProps: {
              displayText: 'Customize customer',
              icon: <ICONS.person />,
            },
          },
          {
            path: '/setup/customize-warranty',
            element: <WarrantyForm />,
            state: 'customizeCustomer',
            sidebarProps: {
              displayText: 'Customize warranty',
              icon: <ICONS.person />,
            },
          },
        ],
      },
    ],
  },
]

export default appRoutes
