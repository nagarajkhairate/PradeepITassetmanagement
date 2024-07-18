import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/joy';
import Header from '../../pages/Header/header';
import Sidebar from '../Common/Sidebar/Sidebar';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh', backgroundColor: 'white',  }}>
      <Box sx={{ flexShrink: 0 }}>
        <Sidebar />
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100dvh',overflow: 'auto', minWidth: 0 }}>
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            mt:5,
            p: 3,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            gap: 1,
            overflow: 'auto',
            
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
