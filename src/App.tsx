import React from 'react'
import Sidebar from './pages/Sidebar/sidebar'
import Header from './pages/Header/header'
import MainLayout from './components/Main/mainLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { pagesRoutes } from './routes/pagesRoutes'
import Dashboard from './pages/Dashboard/dashboard'
import AddAnAsset from './pages/Assets/AddAnAsset'


const App = () => {
  const name = "hari"
  return (

    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<MainLayout />}>
    //       {pagesRoutes}
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <MainLayout/>
    // <AddAnAsset/>
  )
}

export default App
