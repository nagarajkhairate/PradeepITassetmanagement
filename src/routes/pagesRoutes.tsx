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


export const pagesRoutes: any[] = [
  
    {
      id: 2,
      index: true,
      pageName: 'Dashboard',
      pageType: 'Static',
      entityType: 'Web',
      path: '/dashboard',
      description: 'This is the client of the website.',
      isEnabled: 1,
      isActive: true,
      // icon:'<LiaPuzzlePieceSolid />',
      createdOn: '2024-03-17',
      updatedOn: '2024-03-17',
      createdBy: 'Admin',
      updatedBy: 'Admin',
    },
    {
      id: 3, 
      index: true,
      pageName: 'Alerts',
      pageType: 'Static',
      entityType: 'Web',
      path: '/alerts',
      description: 'This is the client of the website.',
      isEnabled: 1,
      isActive: true,
      createdOn: '2024-03-17',
      updatedOn: '2024-03-17',
      createdBy: 'Admin',
      updatedBy: 'Admin',
      arrow:true,
      children:[
        { name: "Maintenances Due", path:'/alerts/Maintenances-due' },
        { name: "Assets Past Due",  path:'/alerts/assets-past-due' },
        { name: "Leases Expiring", path:'./alerts/leasesExpiring'},
        { name: "Maintenance Due",  path:'/alerts/maintenance-due'},
        { name: "Maintenance Overdue", path:"/alerts/maintenance-over-due"},
        { name: "Warranties Expiring", path:"/alerts/warranty-exp" },
        { name: "Setup/Alerts",path:'/alerts/setup',icon:<AiOutlineTool />},
          ]
    }, 
    {
      id: 4,
      index: true,
      pageName: 'Assets',
      pageType: 'Static',
      entityType: 'Web',
      path: '/assets',
      description: 'This is the client of the website.',
      isEnabled: 1,
      isActive: true,
      createdOn: '2024-03-17',
      updatedOn: '2024-03-17',
      createdBy: 'Admin',
      updatedBy: 'Admin',
      arrow:true,
      children:[
    { name: "List of assets",path:'/assets/list-of-assets',icon: <CiCircleList  /> },
    { name: "Add an Asset",path:'/assets/add-an-asset',  icon: <IoIosAddCircleOutline /> },
    { name: "Check out",path:'/assets/checkout',  icon: <LiaUserCheckSolid /> },
    { name: "Check In",path:'/assets/check-in',  icon: <LiaUserTimesSolid /> },
    { name: "Lease",path:'/assets/lease',  icon: <CiPaperplane /> },
    { name: "Lease Return",path:'/assets/lease-return',  icon: <CiPaperplane /> },
    { name: "Dispose",path:'/assets/dispose',  icon: <PiRecycle /> },
    { name: "Maintenance",path:'/assets/maintenance',  icon: <GrVmMaintenance /> },
    { name: "Move",path:'/assets/move',  icon: <IoMoveSharp /> },
    { name: "Reserve",path:'/assets/reserve',  icon: <MdOutlineCalendarMonth /> }
      ]

    },
    {
      id: 5,
      index: true,
      pageName: 'Lists',
      pageType: 'Static',
      entityType: 'Web',
      path: '/lists',
      description: 'This is the client of the website.',
      isEnabled: 1,
      isActive: true,
      createdOn: '2024-03-17',
      updatedOn: '2024-03-17',
      createdBy: 'Admin',
      updatedBy: 'Admin',
      arrow:true,

    },
    {
      id: 6,
      index: true,
      pageName: 'Reports',
      pageType: 'Static',
      entityType: 'Web',
      path: '/reports',
      description: 'This is the client of the website.',
      isEnabled: 1,
      isActive: true,
      createdOn: '2024-03-17',
      updatedOn: '2024-03-17',
      createdBy: 'Admin',
      updatedBy: 'Admin',
      arrow:true,

    },
    {
      id: 7,
      index: true,
      pageName: 'Tools',
      pageType: 'Static',
      entityType: 'Web',
      path: '/tools',
      description: 'This is the client of the website.',
      isEnabled: 1,
      isActive: true,
      createdOn: '2024-03-17',
      updatedOn: '2024-03-17',
      createdBy: 'Admin',
      updatedBy: 'Admin',
      arrow:true,

    },
    {
      id: 8,
      index: true,
      pageName: 'Advanced',
      pageType: 'Static',
      entityType: 'Web',
      path: '/advanced',
      description: 'This is the client of the website.',
      isEnabled: 1,
      isActive: true,
      createdOn: '2024-03-17',
      updatedOn: '2024-03-17',
      createdBy: 'Admin',
      updatedBy: 'Admin',
      arrow:true,

    },
    {
      id: 9,
      index: true,
      pageName: 'SetUp',
      pageType: 'Static',
      entityType: 'Web',
      path: '/setup',
      description: 'This is the client of the website.',
      isEnabled: 1,
      isActive: true,
      createdOn: '2024-03-17',
      updatedOn: '2024-03-17',
      createdBy: 'Admin',
      updatedBy: 'Admin',
      arrow:true,
      children:[
        { name: "Company Info",path:'/setup/company',icon: <CiCircleList  /> },
        { name: "Sites",path:'/setup/sites',  icon: <IoIosAddCircleOutline /> },
        { name: "Locations",path:'/setup/locations',  icon: <LiaUserCheckSolid /> },
        { name: "Categories",path:'/setup/categories',  icon: <LiaUserTimesSolid /> },
        { name: "Departments",path:'/setup/departments',  icon: <CiPaperplane /> },
        { name: "Databases",path:'/setup/databases',  icon: <CiPaperplane /> },
        { name: "Events",path:'/setup/events',  icon: <PiRecycle /> },
        { name: "Table Options",path:'/setup/table-options',  icon: <GrVmMaintenance /> },
          ]

    },
    {
      id: 2,
      index: true,
      pageName: 'Help/Support',
      pageType: 'Static',
      entityType: 'Web',
      path: '/help',
      description: 'This is the client of the website.',
      isEnabled: 1,
      isActive: true,
      createdOn: '2024-03-17',
      updatedOn: '2024-03-17',
      createdBy: 'Admin',
      updatedBy: 'Admin',
      arrow:true,

    },

    
    
  ]
  