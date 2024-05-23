import React from 'react'
import Sidebar from './pages/Sidebar/sidebar'
import Header from './pages/Header/header'
import MainLayout from './components/Main/mainLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { pagesRoutes } from './routes/pagesRoutes'
import Dashboard from './pages/Dashboard/dashboard'
import AddAnAsset from './pages/Assets/AddAnAsset'
import { Box } from '@mui/joy'
import ListOfAssets from './pages/Assets/ListOfAssets'
import TableOption from './pages/Setup/TableOption'
import EditAssets from './pages/Assets/EditAssets'
import EditAssetDetails from './components/AssetSections/EditAsset/EditAssetDetails'
import CompanyInfo from './pages/Companyinfo/CompanyInfo'
import MaintenanceDue from './pages/Maintainance/MaintenanceDue'
import MaintenanceOverdue from './pages/Maintainance/MaintenanceOverdue'
import Warranty from './pages/Maintainance/WarrantieExp'
import LeasesExp from './pages/Maintainance/LeasesExpiring'

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
  

    <Box sx={{display:"flex",height:"100vh"}}>
      <Sidebar/>
      <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/assets/addanasset' element={<AddAnAsset/>}/>
          <Route path='/assets/listofassets' element={<ListOfAssets/>}/>
          <Route path='/assets/EditAsset' element={<EditAssets/>}/>
          <Route path="/company-info" element={<CompanyInfo />} />
          <Route path='/maintenance' element={<MaintenanceDue />} />
          <Route path='/maintenanceoverdue' element={<MaintenanceOverdue />} />
          <Route path='/warranty' element={<Warranty />} />
          <Route path='/lease' element={<LeasesExp />} />
      </Routes>
    </Box>
    
  )
}

export default App
