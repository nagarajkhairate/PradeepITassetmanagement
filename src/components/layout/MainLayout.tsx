import { Outlet } from 'react-router-dom'

import { Box } from '@mui/joy'
import { Toolbar } from '@mui/material'
import Header from '../../pages/Header/header'
import Sidebar from '../../pages/Sidebar/sidebar'


const MainLayout = () => {
  return (
    <Box  sx={{ display: 'flex', minHeight: '100dvh', backgroundColor: 'white'}} >
      <Header />
      <Sidebar />
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 1, md: 3 },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          gap: 1,
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
