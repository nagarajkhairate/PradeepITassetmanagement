import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/joy';
import Header from '../../pages/Header/header';
import Sidebar from '../Common/Sidebar/Sidebar';
import useColorSelector from '../../configs/useColorSelector';

const MainLayout = () => {
  const styleConfigs = useColorSelector()
  return (
    <Box  sx={{ display: 'flex', minHeight: '100dvh', backgroundColor: styleConfigs.backgroundColor}} >
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
        height: '100dvh',
        gap: 1,
        overflow: 'auto',
      }}
    >
      {/* <Toolbar /> */}
      <Outlet />
    </Box>
  </Box>
  );
};

export default MainLayout;
