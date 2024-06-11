import React from 'react';
import SidebarItem from './sidebarMenu'; // Assuming this is your custom component
import { pagesRoutes } from '../../routes/pagesRoutes';

import { Box, GlobalStyles, List, Sheet, listItemButtonClasses } from '@mui/joy'
import { closeSidebar } from '../../utils/utils';



const Sidebar = () => {
  const logoImage =
    'https://pradeepit.com/wp-content/uploads/2021/11/PradeepIT-Transparent-Logo-300x88.png'

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 1000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '250px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={
          {
            position: 'fixed',
            zIndex: 10,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            opacity: 'var(--SideNavigation-slideIn)',
            backgroundColor: 'var(--joy-palette-background-backdrop)',
            transition: 'opacity 0.4s',
            transform: {
              xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
              lg: 'translateX(-100%)',
            },
          }
        }
        onClick={() => closeSidebar()}
      />
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={logoImage}
          alt="Logo"
          style={{ width: '100px' }}
          className="h-8"
        />
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {},
        }}
      >
        <List
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          {pagesRoutes.map((item, index) => (
                    <SidebarItem key={index} item={item}  />
                ))}
        </List>
      </Box>
    </Sheet>
  )
}

export default Sidebar




// import React, { useState } from 'react';
// import SidebarItem from './sidebarMenu'; // Assuming this is your custom component
// import { pagesRoutes } from '../../routes/pagesRoutes';
// import { Container, Drawer, IconButton, List, Box } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useTheme, useMediaQuery } from '@mui/material';

// const Sidebar = () => { 
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Adjust 'md' as needed
//     const [openDrawer, setOpenDrawer] = useState(false);

//     const handleDrawerToggle = () => {
//         setOpenDrawer(!openDrawer);
//     };
 
//     const logoImage = 'https://pradeepit.com/wp-content/uploads/2021/11/PradeepIT-Transparent-Logo-300x88.png';

    

//     const sidebarContent = (
        
//         <Container sx={{ p: 2 }}>
//             <Box
//                 sx={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     padding: '10px',
//                 }}
//             >
//                 <img src={logoImage} alt="Logo" style={{ width: '222px' }} />
//             </Box>
//             <List>
                
//                 {pagesRoutes.map((item, index) => (
//                     <SidebarItem key={index} item={item}  />
//                 ))}
//             </List>
//         </Container>
//     );

//     return (
//         <>
//             {isMobile ? (
//                 <>
//                     <IconButton
//                         onClick={handleDrawerToggle}
//                         sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', top: '0', left: '0', zIndex: '999' }}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Drawer
//                         anchor="left"
//                         open={openDrawer}
//                         onClose={handleDrawerToggle}
//                         variant="temporary"
//                         sx={{ '& .MuiDrawer-paper': { width: '60%', maxWidth: 260 } }} // Adjust width as needed
//                     >
//                         {sidebarContent}
//                     </Drawer>
//                 </>
//             ) : (
//                 <Box
//                     sx={{
//                         height: '100vh',
//                         width: { sm: '200px', md: '250px' },
//                         background: 'white',
//                         flexShrink: 0,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         gap: 2,
//                         borderRight: '1px solid black',
//                         borderColor: 'divider',
//                     }}
//                 >
//                     {sidebarContent}
//                 </Box>
//             )}
//         </>
//     );
// };

// export default Sidebar;