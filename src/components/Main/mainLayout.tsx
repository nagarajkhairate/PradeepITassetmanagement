import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Sidebar from '../../pages/Sidebar/sidebar'
import Header from '../../pages/Header/header'
import Dashboard from '../../pages/Dashboard/dashboard'

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      {/* <Header/> */}
      <Sidebar />
      <Dashboard/>
      <Box
        component="main"
        className="MainContent"
        
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
