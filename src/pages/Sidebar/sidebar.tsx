
import React, { useState } from 'react';
import SidebarItem from './sidebarMenu'; // Assuming this is your custom component
import { pagesRoutes } from '../../routes/pagesRoutes';
import { Container, Drawer, IconButton, List, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, useMediaQuery } from '@mui/material';

const Sidebar = () => { 
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Adjust 'md' as needed
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    const logoImage = 'https://pradeepit.com/wp-content/uploads/2021/11/PradeepIT-Transparent-Logo-300x88.png';

    

    const sidebarContent = (
        
        <Container sx={{ p: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                }}
            >
                <img src={logoImage} alt="Logo" style={{ width: '222px' }} />
            </Box>
            <List>
                
                {pagesRoutes.map((item, index) => (
                    <SidebarItem key={index} item={item}  />
                ))}
            </List>
        </Container>
    );

    return (
        <>
            {isMobile ? (
                <>
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', top: '0', left: '0', zIndex: '999' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor="left"
                        open={openDrawer}
                        onClose={handleDrawerToggle}
                        variant="temporary"
                        sx={{ '& .MuiDrawer-paper': { width: '60%', maxWidth: 260 } }} // Adjust width as needed
                    >
                        {sidebarContent}
                    </Drawer>
                </>
            ) : (
                <Box
                    sx={{
                        height: '100vh',
                        width: { sm: '200px', md: '250px' },
                        background: 'white',
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRight: '1px solid black',
                        borderColor: 'divider',
                    }}
                >
                    {sidebarContent}
                </Box>
            )}
        </>
    );
};

export default Sidebar;