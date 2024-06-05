import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Person4Icon from '@mui/icons-material/Person4';
import SendIcon from '@mui/icons-material/Send';
import RecyclingIcon from '@mui/icons-material/Recycling';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Reserve from "../pages/Reserve/Reserve";
import Dispose from "../pages/Dispose/Dispose";
import LeaseReturn from "../pages/LeaseReturn/LeaseReturn";
import CheckIn from "../pages/CheckIn/CheckIn";
import CheckOut from "../pages/CheckOut/CheckOut";
import AddAnAsset from "../pages/Assets/AddAnAsset";
import ListOfAssets from "../pages/Assets/ListOfAssets";
import Dashboard from "../pages/Dashboard/dashboard";
import MaintenancesDue from "../pages/Maintenance/MaintenancesDue";
import LocationSetup from '../pages/Setup/SetupLocation/LocationSetup';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CategorySetup from '../pages/Setup/SetupCategory/CategorySetup';
import CategorySub from '../pages/Setup/SubCategory/CategorySub';
import SetupDept from '../pages/Setup/Departments/SetupDept';
import CategoryIcon from '@mui/icons-material/Category';
import GridViewIcon from '@mui/icons-material/GridView';
import SetupTableOptions from '../pages/Setup/SetupTableOptions/SetupTableOptions';
import SetupSites from '../pages/Setup/SetupSites/SetupSites';
import SetupCompInfo from '../pages/Setup/CompInformation/SetupCompInfo';

export const pagesRoutes: any[] = [
  {
    id: 1,
    index: true,
    pageName: "Dashboard",
    element: <Dashboard />,
    state: 'dashboard',
    path: "/dashboard",
  },
  {
    id: 2,
    pageName: "Alerts",
    path: "/alerts",
    state: 'alerts',
    children: [
      { name: "Maintenances Due", index: true, path: "/alerts/maintenances-due", state: 'alerts', element: <MaintenancesDue /> },
      // { name: "Assets Past Due", path: "/alerts/assets-past-due",  element: <PurchaseOrders />, },
      // { name: "Leases Expiring", path: "./alerts/leasesExpiring",  element: <PurchaseOrders />, },
      // { name: "Maintenance Due", path: "/alerts/maintenance-due",  element: <PurchaseOrders />, },
      // { name: "Maintenance Overdue", path: "/alerts/maintenance-over-due",  element: <PurchaseOrders />, },
      // { name: "Warranties Expiring", path: "/alerts/warranty-exp" ,  element: <PurchaseOrders />,},
      // { name: "Setup/Alerts", path: "/alerts/setup", element: <PurchaseOrders />, icon: <AiOutlineTool /> },
    ],
  },
  {
    id: 3,
    pageName: "Assets",
    path: "/assets",
    state: 'assets',
    children: [
      {
        index: true,
        name: "List of assets",
        path: "/assets/list-of-assets",
        element: <ListOfAssets />,
        state: 'assets',
        icon: <FormatListBulletedIcon />,
      },
      {
        index: true,
        name: "Add an Asset",
        path: "/assets/add-an-asset",
        element: <AddAnAsset />,
        state: 'assets',
        icon: <AddCircleOutlineIcon />,
      },
      {
        index: true,
        name: "Check out",
        path: "/assets/checkout",
        element: <CheckOut />,
        state: 'assets',
        icon: <VerifiedUserIcon />,
      },
      {
        index: true,
        name: "Check In",
        path: "/assets/check-in",
        element: <CheckIn />,
        state: 'assets',
        icon: <Person4Icon />,
      },
      { index: true, name: "Lease", path: "/assets/lease", icon: <SendIcon /> },
      {
        index: true,
        name: "Lease Return",
        path: "/assets/lease-return",
        element: <LeaseReturn />,
        state: 'assets',
        icon: <SendIcon />,
      },
      { index: true, name: "Dispose", path: "/assets/dispose",  element: <Dispose />,icon: <RecyclingIcon /> },
      {
        index: true,
        name: "Maintenance",
        path: "/assets/maintenance",
        element: <Dispose />,
        state: 'assets',
        icon: <EngineeringIcon />,
      },
      { index: true, name: "Move", path: "/assets/move",  state: 'assets', icon: <ZoomOutMapIcon /> },
      {
        index: true,
        name: "Reserve",
        path: "/assets/reserve",
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
    id: 8,

    pageName: "SetUp",
    path: "/setup",
    state: 'assets',
    children: [
      {
        index: true,
        name: "Company Info",
        path: "/setup/setup-comp-info",
        state: 'assets',
        element: <SetupCompInfo />,
        icon: <FormatListBulletedIcon />,
      },
      {
        index: true,
        name: "Sites",
        path: "/setup/sites",
        state: 'assets',
        element: <SetupSites />,
        icon: <LocationOnOutlinedIcon />,
      },
      {
        index: true,
        name: "Location",
        path: "/setup/locationsetup",
        state: 'assets',
        element: <LocationSetup />,
        icon: <LocationOnOutlinedIcon />,
      },
      {
        index: true,
        name: "Category",
        path: "/setup/categorysetup",
        state: 'assets',
        element: <CategorySetup />,
        icon: <CategoryIcon />,
      },
      {
        index: true,
        name: "Sub Category",
        path: "/setup/categorysub",
        state: 'assets',
        element: <CategorySub />,
        icon: <CategoryIcon />,
      },
      {
        index: true,
        name: "Department",
        path: "/setup/departments",
        state: 'assets',
        element: <SetupDept />,
        icon: <GridViewIcon />,
      },
      {
        index: true,
        name: "Table Options",
        path: "/setup/table-options",
        state: 'assets',
        element: <SetupTableOptions />,
        icon: <LocationOnOutlinedIcon />,
      },
     
      // { name: "Sites", path: "/setup/sites", icon: <AddCircleOutlineIcon /> },
      // {
      //   name: "SetupLocation",
      //   path: "/setup/location-setup",
      //   element: <PurchaseOrders />,
      //   icon: <VerifiedUserIcon />,
      // },
      // { name: "Databases", path: "/setup/databases", element: <PurchaseOrders />, icon: <SendIcon /> },
      // { name: "Events", path: "/setup/events",  element: <PurchaseOrders />,icon: <RecyclingIcon /> },
      // {
      //   name: "Table Options",
      //   path: "/setup/table-options",
      //   element: <PurchaseOrders />,
      //   icon: <EngineeringIcon />,
      // },
    ],
  },
  // {
  //   id: 9,
  //   index: true,
  //   pageName: "Help/Support",
  //   element: <PurchaseOrders />,
  //   path: "/help",
  // },
];
