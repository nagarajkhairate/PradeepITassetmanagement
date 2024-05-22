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
import CheckOut from './pages/CheckOut/CheckOut'
import CheckIn from './pages/CheckIn/CheckIn'
import Lease from './pages/Lease/Lease'
import LeaseReturn from './pages/LeaseReturn/LeaseReturn'
import Dispose from './pages/Dispose/Dispose'
import Maintenance from './pages/Maintenance/Maintenance'
import Reserve from './components/AssetSections/EditAsset/Tabs/Reserve'
import Move from './pages/Move/Move'

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
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/lease" element={<Lease/>} />
          <Route path="/leasereturn" element={<LeaseReturn />} />
          <Route path="/dispose" element={<Dispose />} />
          <Route path="/maintenance" element={<Maintenance/>} />
          <Route path='/move' element={<Move/>} />
           <Route path='/reserve' element={<Reserve/>} />

      </Routes>
    </Box>
    
  )
}

export default App
