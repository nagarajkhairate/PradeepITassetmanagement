import { RouteType } from './config'
import CompanyInfo from '../pages/Companyinfo/CompanyInfo'
import { AddAnAsset, AssetForm, AssetsPastDue, CategorySetup, CategorySub, CheckIn, CheckOut, ContractForm, CustomerForm, Dashboard, DataBasesEmp, Dispose, EditAssets, Event, Lease, LeaseReturn, LeasesExpiring, ListOfAssets, LocationSetup, Maintenance, MaintenanceForm, MaintenanceOverdue, MaintenancesDue, Move, PersonsEmployeesForm, Reserve, SetupCompInfo, SetupDept, SetupSites, SetupTableOptions, WarrantyExpiring, WarrantyForm } from './AllComponents'
import { ICONS } from '../components/Common/AppIcon/AppIcon'

const appRoutes: RouteType[] = [
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
    path: '/company-info',
    element: <CompanyInfo />,
    state: 'company-info',
    sidebarProps: {
      displayText: 'Company info',
      icon: <ICONS.dashboard />,
    },
  },
  {
    path: '/alerts',
    element: <MaintenancesDue />,
    state: 'alerts',
    sidebarProps: {
      displayText: 'Alerts',
      icon: <ICONS.resource />,
    },
    child: [
      {
        path: '/alerts/maintenances-due',
        element: <MaintenancesDue />,
        state: 'maintenancesDue',
        sidebarProps: {
          displayText: 'Maintenances Due',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/alerts/maintenances-over-due',
        element: <MaintenanceOverdue />,
        state: 'maintenanceOverdue',
        sidebarProps: {
          displayText: 'Maintenances Over Due',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/alerts/leases-expiring',
        element: <LeasesExpiring />,
        state: 'leasesExpiring',
        sidebarProps: {
          displayText: 'Leases Expiring',
          icon: <ICONS.person />,
        },
      },
      {
        path: '/alerts/warranty-expiring',
        element: <WarrantyExpiring />,
        state: 'warrantyExpiring',
        sidebarProps: {
          displayText: 'Warranty Expiring',
          icon: <ICONS.person />,
        },
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
      
    ]
  },
  {
    path: '/assets',
    element: <ListOfAssets />,
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
          displayText: 'Employees',
          icon: <ICONS.person />,
        },
      },
      {
        index: true,
        path: 'Add an Asset',
        element: <AddAnAsset />,
        state: 'assets',
      },
      {
        index: true,
        path: '/assets/view-an-asset',
        element: <EditAssets />,
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
    element: <MaintenancesDue />,
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
        path: '/setup/data-bases-employee',
        element: <DataBasesEmp />,
        state: 'DataBasesEmp',
        sidebarProps: {
          displayText: 'DataBases Employee',
          icon: <ICONS.person />,
        },
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
            path: '/setup/customize/warranty',
            element: <WarrantyForm />,
            state: 'customizeCustomer',
            sidebarProps: {
              displayText: 'Customize warranty',
              icon: <ICONS.person />,
            },
          },
          
        ]
      },
    ]
  },
  
]

export default appRoutes
