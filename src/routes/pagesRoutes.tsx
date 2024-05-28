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
        { name: "Assets Past Due", },
        { name: "Leases Expiring",},
        { name: "Maintenance Due",  path:'/alerts/maintenancedue'},
        { name: "Maintenance Overdue", path:"/alerts/maintenanceoverdue"  },
        { name: "Warranties Expiring", path:"/alerts/warrantieExp" },
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
    { name: "List of assets",path:'/assets/listofassets',icon: <CiCircleList  /> },
    { name: "Add an Asset",path:'/assets/addanasset',  icon: <IoIosAddCircleOutline /> },
    { name: "Check out", icon: <LiaUserCheckSolid /> },
    { name: "Check In", icon: <LiaUserTimesSolid /> },
    { name: "Lease", icon: <CiPaperplane /> },
    { name: "Lease Return", icon: <CiPaperplane /> },
    { name: "Dispose", icon: <PiRecycle /> },
    { name: "Maintenance", icon: <GrVmMaintenance /> },
    { name: "Move", icon: <IoMoveSharp /> },
    { name: "Reserve", icon: <MdOutlineCalendarMonth /> }
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
  