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
import Location from './components/Companyinfo/Location/Location'
import Category from './components/Companyinfo/Category/CategoryAdd'
import DataBase from './components/Companyinfo/Data/DataBase'
import EventOption1 from './components/Companyinfo/EventOption/EventOption1'
import CompanyInfo from './pages/Companyinfo/CompanyInfo'

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
          <Route path="/location" element={<Location />} />
          <Route path="/category" element={<Category />} />
      <Route path="/database" element={<DataBase />} />
      <Route path='/event' element={<EventOption1 />} />
      </Routes>
    </Box>
    
  )
}

export default App
