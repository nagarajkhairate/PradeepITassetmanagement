import React from 'react'
import Sidebar from './pages/Sidebar/sidebar'
import Header from './pages/Header/header'
import MainLayout from './components/Main/mainLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/dashboard'
import AddAnAsset from './pages/Assets/AddAnAsset'
import { Box } from '@mui/joy'
import ListOfAssets from './pages/Assets/ListOfAssets'
import TableOption from './pages/Setup/TableOption'

import EditAssetDetails from './components/AssetSections/EditAsset/EditAssetDetails'
import CompanyInfo from './pages/Companyinfo/CompanyInfo'
import CheckOut from './pages/CheckOut/CheckOut'
import CheckIn from './pages/CheckIn/CheckIn'
import Lease from './pages/Lease/Lease'
import LeaseReturn from './pages/LeaseReturn/LeaseReturn'
import Dispose from './pages/Dispose/Dispose'
import Maintenance from './pages/Maintenance/Maintenance'
import Reserve from './components/AssetSections/EditAsset/Tabs/Reserve'
import Move from './pages/Move/Move'
import EditAssets from './pages/Assets/EditAssets'
import Setup from './pages/Alerts/Setup'
import MaintainenceDue from './pages/Alerts/MaintenanceDue'
import SearchCriteria from './pages/Assets/SearchCriteria'
 import MaintenanceOverdue from './pages/Maintainance/MaintenanceOverdue'
import Warranty from './pages/Maintainance/WarrantieExp'
import LeasesExp from './pages/Maintainance/LeasesExpiring'
import AssetsPastDue from './pages/Maintainance/AssetsPastDue'

import MaintenancesDue from "./pages/Maintainance/MaintenancesDue"

import MaintenanceDue from './pages/Maintainance/MaintenanceDue'


const App = () => {
   
  return (

    //   <Routes>
    //     <Route path="/" element={<MainLayout />}>
    //       {pagesRoutes}
    //     </Route>
    //   </Routes>
    // <MainLayout/>
    // <AddAnAsset/>


    // -----
  


    // <Box sx={{display:"flex",height:"100vh"}}>
    //   <Sidebar/>
    //   <Header/>
    //   <Routes>
    //       <Route path='/' element={<Dashboard/>}/>
    //       <Route path='/dashboard' element={<Dashboard/>}/>
    //       <Route path='/assets/addanasset' element={<AddAnAsset/>}/>
    //       <Route path='/assets/listofassets' element={<ListOfAssets/>}/>
    //       <Route path='/assets/EditAsset' element={<EditAssets/>}/>
    //       <Route path='/alerts/setup' element={<Setup/>}/>
    //   </Routes>
    // </Box>
    <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ }}>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/assets/addanasset' element={<AddAnAsset/>}/>
          <Route path='/assets/listofassets' element={<ListOfAssets/>}/>
          <Route path='/assets/EditAsset' element={<EditAssets/>}/>

          <Route path="setup/companyinfo" element={<CompanyInfo />} />
          <Route path="/assets/checkout" element={<CheckOut />} />
         <Route path='/alerts/maintenancesdue' element={<MaintenancesDue />} />
          <Route path="/assets/checkin" element={<CheckIn />} />
          <Route path="/assets/lease" element={<Lease/>} />
          <Route path="/assets/leasereturn" element={<LeaseReturn />} />
          <Route path="/assets/dispose" element={<Dispose />} />
          <Route path="/assets/maintenance" element={<Maintenance/>} />
          <Route path='/assets/move' element={<Move/>} />
           <Route path='/assets/reserve' element={<Reserve/>} />
        <Route path='/maintenancedue' element={<MaintenanceDue />} />
          <Route path='/maintenanceoverdue' element={<MaintenanceOverdue />} />
          <Route path='/warranty' element={<Warranty />} />
          <Route path='/leases' element={<LeasesExp />} />
          <Route path='/assetspast' element={<AssetsPastDue />} />
        <Route path='/alerts/maintenanceoverdue' element={<MaintenanceOverdue />} />
          <Route path='/alerts/warrantieExp' element={<Warranty />} />
          <Route path='/alerts/leasesExpiring' element={<LeasesExp />} />
          <Route path='/alerts/assetspastdue' element={<AssetsPastDue />} />
            <Route path='/assets/addanasset' element={<AddAnAsset />} />
            <Route path='/assets/listofassets' element={<ListOfAssets />} />
            <Route path='/assets/editasset' element={<EditAssets />} />
            <Route path='/alerts/setup' element={<Setup />} />
            <Route path='/alerts/maintenancedue' element={<MaintainenceDue/>}/>
            <Route path='/assetsearchcriteria' element={<SearchCriteria/>}/>
          </Routes>
        </Box>
      </Box>
  )
}

export default App
