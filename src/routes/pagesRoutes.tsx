import { CiCircleList } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LiaUserCheckSolid } from "react-icons/lia";
import { LiaUserTimesSolid } from "react-icons/lia";
import { CiPaperplane } from "react-icons/ci";
import { PiRecycle } from "react-icons/pi";
import { GrVmMaintenance } from "react-icons/gr";
import { IoMoveSharp } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { AiOutlineTool } from "react-icons/ai";
import SetupCompInfo from "../pages/Setup/SetupCompInfo/SetupCompInfo";
import Reserve from "../pages/Reserve/Reserve";
import Dispose from "../pages/Dispose/Dispose";
import LeaseReturn from "../pages/LeaseReturn/LeaseReturn";
import CheckIn from "../pages/CheckIn/CheckIn";
import CheckOut from "../pages/CheckOut/CheckOut";
import AddAnAsset from "../pages/Assets/AddAnAsset";
import ListOfAssets from "../pages/Assets/ListOfAssets";
import Dashboard from "../pages/Dashboard/dashboard";
import MaintenancesDue from "../pages/Maintenance/MaintenancesDue";

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
        icon: <CiCircleList />,
      },
      {
        index: true,
        name: "Add an Asset",
        path: "/assets/add-an-asset",
        element: <AddAnAsset />,
        state: 'assets',
        icon: <IoIosAddCircleOutline />,
      },
      {
        index: true,
        name: "Check out",
        path: "/assets/checkout",
        element: <CheckOut />,
        state: 'assets',
        icon: <LiaUserCheckSolid />,
      },
      {
        index: true,
        name: "Check In",
        path: "/assets/check-in",
        element: <CheckIn />,
        state: 'assets',
        icon: <LiaUserTimesSolid />,
      },
      { index: true, name: "Lease", path: "/assets/lease", icon: <CiPaperplane /> },
      {
        index: true,
        name: "Lease Return",
        path: "/assets/lease-return",
        element: <LeaseReturn />,
        state: 'assets',
        icon: <CiPaperplane />,
      },
      { index: true, name: "Dispose", path: "/assets/dispose",  element: <Dispose />,icon: <PiRecycle /> },
      {
        index: true,
        name: "Maintenance",
        path: "/assets/maintenance",
        element: <Dispose />,
        state: 'assets',
        icon: <GrVmMaintenance />,
      },
      { index: true, name: "Move", path: "/assets/move",  state: 'assets', icon: <IoMoveSharp /> },
      {
        index: true,
        name: "Reserve",
        path: "/assets/reserve",
        element: <Reserve />,
        state: 'assets',
        icon: <MdOutlineCalendarMonth />,
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
        icon: <CiCircleList />,
      },
      // { name: "Sites", path: "/setup/sites", icon: <IoIosAddCircleOutline /> },
      // {
      //   name: "SetupLocation",
      //   path: "/setup/location-setup",
      //   element: <PurchaseOrders />,
      //   icon: <LiaUserCheckSolid />,
      // },
      // {
      //   name: "Categories",
      //   path: "/setup/categories",
      //   element: <PurchaseOrders />,
      //   icon: <LiaUserTimesSolid />,
      // },
      // {
      //   name: "Departments",
      //   path: "/setup/departments",
      //   element: <PurchaseOrders />,
      //   icon: <CiPaperplane />,
      // },
      // { name: "Databases", path: "/setup/databases", element: <PurchaseOrders />, icon: <CiPaperplane /> },
      // { name: "Events", path: "/setup/events",  element: <PurchaseOrders />,icon: <PiRecycle /> },
      // {
      //   name: "Table Options",
      //   path: "/setup/table-options",
      //   element: <PurchaseOrders />,
      //   icon: <GrVmMaintenance />,
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
