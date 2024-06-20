import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import Person4Icon from '@mui/icons-material/Person4'
import SendIcon from '@mui/icons-material/Send'
import RecyclingIcon from '@mui/icons-material/Recycling'
import EngineeringIcon from '@mui/icons-material/Engineering'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Reserve from '../pages/Reserve/Reserve'
import Dispose from '../pages/Dispose/Dispose'
import LeaseReturn from '../pages/LeaseReturn/LeaseReturn'
import CheckIn from '../pages/CheckIn/CheckIn'
import CheckOut from '../pages/CheckOut/CheckOut'
import AddAnAsset from '../pages/Assets/AddAnAsset'
import ListOfAssets from '../pages/Assets/ListOfAssets'
import Dashboard from '../pages/Dashboard/dashboard'
import MaintenancesDue from '../pages/Maintenance/MaintenancesDue'
import LeasesExpiring from '../pages/Maintenance/LeasesExpiring'
import LocationSetup from '../pages/Setup/SetupLocation/LocationSetup'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CategorySetup from '../pages/Setup/SetupCategory/CategorySetup'
import CategorySub from '../pages/Setup/SubCategory/CategorySub'
import SetupDept from '../pages/Setup/Departments/SetupDept'
import CategoryIcon from '@mui/icons-material/Category'
import GridViewIcon from '@mui/icons-material/GridView'
import SetupTableOptions from '../pages/Setup/SetupTableOptions/SetupTableOptions'
import SetupSites from '../pages/Setup/SetupSites/SetupSites'
import SetupCompInfo from '../pages/Setup/CompInformation/SetupCompInfo'
import MaintenanceOverdue from '../pages/Maintenance/MaintenanceOverdue'
import WarrantyExpiring from '../pages/Maintenance/WarrantyExpiring'
import AssetsPastDue from '../pages/Maintenance/AssetsPastDue'
import AssetForm from '../pages/Setup/CustomizeForm/AssetForm'
import Maintenance from '../pages/Maintenance/Maintenance'
import Lease from '../pages/Lease/Lease'
import Move from '../pages/Move/Move'
import EditAssets from '../pages/Assets/EditAssets'
import EditAssetPage from '../pages/Assets/EditAssetPage'
import PersonsEmployeesForm from '../pages/Setup/CustomizeForm/PersonsEmployeesForm'
import CompanyInfo from '../pages/CompanyInfo/CompanyInfo'
import ContractForm from '../pages/Setup/CustomizeForm/ContractForm'
import MaintenanceForm from '../pages/Setup/CustomizeForm/MaintenanceForm'
import CustomerForm from '../pages/Setup/CustomizeForm/CustomerForm'
import WarrantyForm from '../pages/Setup/CustomizeForm/WarrantyForm'
import LoginAccount from '../components/Registration/LoginAccount'
import CreateAccount from '../components/Registration/CreateAccount'
import DataBases from '../pages/Setup/DataBase/DataBases'
import DataBasesEmp from '../pages/Setup/DataBase/DataBaseEmployee/DataBaseEmp'

export const pagesRoutes: any[] = [
  {
    id: 1,
    index: true,
    pageName: 'Login',
    element: <LoginAccount />,
    state: 'login',
    path: '/login',
  },
    {
      id: 2,
      index: true,
      pageName: 'createAccount',
      element: <CreateAccount />,
      state: 'createAccount',
      path: '/createAccount',
    },{
    id: 3,
    index: true,
    pageName: 'Dashboard',
    element: <Dashboard />,
    state: 'dashboard',
    path: '/dashboard',
  },
  {
    id: 4,
    pageName: 'Alerts',
    path: '/alerts',
    state: 'alerts',
    children: [
      {
        pageName: 'Maintenances Due',
        index: true,
        path: '/alerts/maintenances-due',
        state: 'alerts',
        element: <MaintenancesDue />,
      },
      {
        pageName: 'Maintenances Over Due',
        index: true,
        path: '/alerts/maintenances-over-due',
        state: 'alerts',
        element: <MaintenanceOverdue />,
      },
      {
        pageName: 'Leases Expiring',
        index: true,
        path: '/alerts/leases-expiring',
        state: 'alerts',
        element: <LeasesExpiring />,
      },
      {
        pageName: 'Warranty Expiring',
        index: true,
        path: '/alerts/warranty-expiring',
        state: 'alerts',
        element: <WarrantyExpiring />,
      },
      {
        pageName: 'Assets Past Due',
        index: true,
        path: '/alerts/assets-past-due',
        state: 'alerts',
        element: <AssetsPastDue />,
      },
    ],
  },
  {
    id: 5,
    pageName: 'Assets',
    path: '/assets',
    state: 'assets',
    children: [
      {
        index: true,
        pageName: 'List of assets',
        path: '/assets/list-of-assets',
        element: <ListOfAssets />,
        state: 'assets',
        icon: <FormatListBulletedIcon />,
      },
      {
        index: true,
        pageName: 'Add an Asset',
        path: '/assets/add-an-asset',
        element: <AddAnAsset />,
        state: 'assets',
        icon: <AddCircleOutlineIcon />,
      },
      {
        index: true,
        pageName: 'view an Asset',
        path: '/assets/view-an-asset',
        element: <EditAssets />,
        state: 'assets',
        icon: <AddCircleOutlineIcon />,
      },{
        index: true,
        pageName: 'Edit an Asset',
        path: '/assets/edit-an-asset',
        element: <EditAssetPage />,
        state: 'assets',
        icon: <AddCircleOutlineIcon />,
      },
      {
        index: true,
        pageName: 'Check out',
        path: '/assets/checkout',
        element: <CheckOut />,
        state: 'assets',
        icon: <VerifiedUserIcon />,
      },
      {
        index: true,
        pageName: 'Check In',
        path: '/assets/check-in',
        element: <CheckIn />,
        state: 'assets',
        icon: <Person4Icon />,
      },
      {
        index: true,
        pageName: 'Lease',
        path: '/assets/lease',
        element: <Lease />,
        state: 'assets',
        icon: <SendIcon />,
      },
      {
        index: true,
        pageName: 'Lease Return',
        path: '/assets/lease-return',
        element: <LeaseReturn />,
        state: 'assets',
        icon: <SendIcon />,
      },
      {
        index: true,
        pageName: 'Dispose',
        path: '/assets/dispose',
        element: <Dispose />,
        icon: <RecyclingIcon />,
      },
      {
        index: true,
        pageName: 'Maintenance',
        path: '/assets/maintenance',
        element: <Maintenance />,
        state: 'assets',
        icon: <EngineeringIcon />,
      },
      {
        index: true,
        pageName: 'Move',
        path: '/assets/move',
        element: <Move />,
        state: 'assets',
        icon: <ZoomOutMapIcon />,
      },
      {
        index: true,
        pageName: 'Reserve',
        path: '/assets/reserve',
        element: <Reserve />,
        state: 'assets',
        icon: <CalendarMonthIcon />,
      },
    ],
  },
  // {
  //   id: 4,
  //   index: true,
  //   pageName: "Lists",
  //   element: <PurchaseOrders />,
  //   path: "/lists",
  // },
  // {
  //   id: 5,
  //   index: true,
  //   pageName: "Reports",
  //   element: <PurchaseOrders />,
  //   path: "/reports",
  // },
  // {
  //   id: 6,
  //   index: true,
  //   pageName: "Tools",
  //   element: <PurchaseOrders />,
  //   path: "/tools",
  // },
  // {
  //   id: 7,
  //   index: true,
  //   pageName: "Advanced",
  //   element: <PurchaseOrders />,
  //   path: "/advanced",
  // },
  {
    id: 6,
    pageName: 'SetUp',
    path: '/setup',
    state: 'assets',
    children: [
      {
        index: true,
        pageName: 'Company Info',
        path: '/setup/setup-comp-info',
        state: 'assets',
        element: <SetupCompInfo />,
        icon: <FormatListBulletedIcon />,
      },
      {
        index: true,
        pageName: 'Sites',
        path: '/setup/sites',
        state: 'assets',
        element: <SetupSites />,
        icon: <LocationOnOutlinedIcon />,
      },
      {
        index: true,
        pageName: 'Location',
        path: '/setup/location-setup',
        state: 'assets',
        element: <LocationSetup />,
        icon: <LocationOnOutlinedIcon />,
      },
      {
        index: true,
        pageName: 'Category',
        path: '/setup/category-setup',
        state: 'assets',
        element: <CategorySetup />,
        icon: <CategoryIcon />,
      },
      {
        index: true,
        pageName: 'Sub Category',
        path: '/setup/category-sub',
        state: 'assets',
        element: <CategorySub />,
        icon: <CategoryIcon />,
      },
      {
        index: true,
        pageName: 'Department',
        path: '/setup/departments',
        state: 'assets',
        element: <SetupDept />,
        icon: <GridViewIcon />,
      },

      {
        index: true,
        pageName: 'DataBases',
        path: '/setup/data-bases',
        state: 'assets',
        element: <DataBases />,
        icon: <GridViewIcon />,
      },

      {
        index: true,
        pageName: 'DataBasesEmployee',
        path: '/setup/data-bases-employee',
        state: 'assets',
        element: <DataBasesEmp />,
        icon: <GridViewIcon />,
      },

      {
        index: true,
        pageName: 'Table Options',
        path: '/setup/table-options',
        state: 'assets',
        element: <SetupTableOptions />,
        icon: <LocationOnOutlinedIcon />,
      },
      {
        index: true,
        pageName: 'Customize Asset',
        path: '/setup/customize-asset',
        state: 'assets',
        element: <AssetForm />,
        icon: <FormatListBulletedIcon />,
      },
      {
        index: true,
        pageName: 'Customize employee',
        path: '/setup/customize-employee',
        state: 'assets',
        element: <PersonsEmployeesForm />,
        icon: <FormatListBulletedIcon />,
      },
      {
        index: true,
        pageName: 'Customize Contract',
        path: '/setup/customize-contract',
        state: 'assets',
        element: <ContractForm />,
        icon: <FormatListBulletedIcon />,
      },
      {
        index: true,
        pageName: 'Customize Maintenance',
        path: '/setup/customize-maintenance',
        state: 'assets',
        element: <MaintenanceForm />,
        icon: <FormatListBulletedIcon />,
      },
      {
        index: true,
        pageName: 'Customize customer',
        path: '/setup/customize-customer',
        state: 'assets',
        element: <CustomerForm />,
        icon: <FormatListBulletedIcon />,
      },
      {
        index: true,
        pageName: 'Customize warranty',
        path: '/setup/customize-warranty',
        state: 'assets',
        element: <WarrantyForm />,
        icon: <FormatListBulletedIcon />,
      }
    ],
  },
  {
    id: 9,
    index: true,
    pageName: 'Company Info',
    element: <CompanyInfo />,
    state: 'companyInfo',
    path: '/company-info',
  },
  // {
  //   id: 9,
  //   index: true,
  //   pageName: "Help/Support",
  //   element: <PurchaseOrders />,
  //   path: "/help",
  // },
]
