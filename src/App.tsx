import React from 'react'
import Sidebar from './pages/Sidebar/sidebar'
import Header from './pages/Header/header'
import MainLayout from './components/Main/mainLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/dashboard'
import AddAnAsset from './pages/Assets/AddAnAsset'
import { Box } from '@mui/joy'
import ListOfAssets from './pages/Assets/ListOfAssets'
import EditAssets from './pages/Assets/EditAssets'
import Setup from './pages/Alerts/Setup'
import MaintainenceDue from './pages/Alerts/MaintenanceDue'
import SearchCriteria from './pages/Assets/SearchCriteria'
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
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
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
