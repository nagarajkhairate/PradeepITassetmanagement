import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Sidebar from '../../pages/Sidebar/sidebar'
import Header from '../../pages/Header/header'
import Dashboard from '../../pages/Dashboard/dashboard'
import AddAnAsset from '../../pages/Assets/AddAnAsset'
import ListOfAssets from '../../pages/Assets/ListOfAssets'
import EditAssets from '../../pages/Assets/EditAssets'
import CompanyInformation from '../../pages/Setup/CompanyInformation'
import CreateAccount from '../../pages/Registration/CreateAccount'
import LoginAccount from '../../pages/Registration/LoginAccount'
const MainLayout = () => {
  return (

    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      {/* <Header/> */}
      <Sidebar />
      {/* <EditAssets/> */}
      <AddAnAsset/>
      {/* <ListOfAssets/> */}
      {/* <CompanyInformation/> */}
      {/* <CreateAccount/> */}
      {/* <LoginAccount/> */}
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
