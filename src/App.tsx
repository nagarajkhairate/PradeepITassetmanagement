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
import EventOption from './pages/Setup/EventOption'
import TableOption from './pages/Setup/TableOption'
import EditAssets from './pages/Assets/EditAssets'
import EditAssetDetails from './components/AssetSections/EditAsset/EditAssetDetails'
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

        {/* <Routes> */}
        {/* <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard/>}></Route>
          <Route path='addanasset' element={<AddAnAsset/>}></Route>
        </Route>
      </Routes> */}
     <MainLayout/>
      {/* <EditAssets/> */}
    <EventOption/>

    {/* <TableOption/> */}
     {/* <AddAnAsset/> */}
    </Box>

    // <Box sx={{display:"flex",height:"100vh"}}>
    //   <Sidebar/>
    //   <Routes>
    //       <Route path='/' element={<Dashboard/>}/>
    //       <Route path='/dashboard' element={<Dashboard/>}/>
    //       <Route path='/assets/addanasset' element={<AddAnAsset/>}/>
    //       <Route path='/assets/listofassets' element={<ListOfAssets/>}/>
    //   </Routes>
    // </Box>
    
  )
}

export default App
