import React from 'react'
import { Outlet } from 'react-router-dom'

import { Box } from '@mui/joy'

import Header from '../../pages/Header/header'
import Sidebar from '../Common/Sidebar/Sidebar'



const MainLayout = () => {
  return (
    <Box  sx={{ display: 'flex', minHeight: '100dvh', backgroundColor: 'white'}} >
   
      <Sidebar /> 
        <Header />
      <Box
        component="main"
        className="MainContent"
        sx={{
          pt:10,
          px: { xs: 1, md: 3 },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
          overflow: 'auto',
        }}
      >
        
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
