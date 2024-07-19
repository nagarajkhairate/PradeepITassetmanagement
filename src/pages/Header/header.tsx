import React from 'react';
import { Box, Dropdown, GlobalStyles, IconButton, Menu, MenuButton, MenuItem, Sheet } from '@mui/joy';
import { MoreVert } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const navigate = useNavigate();

  function logoutUser() {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <Sheet
      sx={{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 2,
        p: 2,
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'background.level1',
        boxShadow: 'sm',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '40px',
            },
          },
        })}
      />
      
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end', // Align items to the right
        }}
      >
      
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu
            sx={{
              right: 0, // Align the menu to the right
            }}
          >
            <MenuItem>
              <IconButton>
                <PermIdentityIcon />
              </IconButton>
              My account
            </MenuItem>
            <MenuItem onClick={logoutUser}>
              <IconButton>
                <LogoutIcon />
              </IconButton>
              Logout
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    </Sheet>
  );
};

export default Header;