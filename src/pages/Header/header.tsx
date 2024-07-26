import React from 'react';
import { Box, Dropdown, GlobalStyles, IconButton, Menu, MenuButton, MenuItem, Sheet } from '@mui/joy';
import { MoreVert } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useColorSelector from '../../configs/useColorSelector';
import { toggleSidebar } from '../../utils/utils';
import { ICONS } from '../../components/Common/AppIcon/AppIcon';

const Header = () => {
  const navigate = useNavigate();
  const styleConfigs = useColorSelector()
  function logoutUser() {
    sessionStorage.clear();
    navigate('/login');
  }

  return (
    <Sheet
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'fixed',
      top: 0,
      width: '100vw',
      height: 'var(--Header-height)',
      zIndex: 10,
      p: 2,
      borderBottom: '1px solid',
      borderColor: 'background.level1',
      boxShadow: 'sm',
      backgroundColor: styleConfigs.backgroundColorWhite,
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
    <IconButton
      onClick={toggleSidebar}
      variant="outlined"
      color="neutral"
      size="sm"
    >
      <ICONS.menu />
    </IconButton>
    <Box
      sx={{
        width: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
    

      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
        >
          <MoreVert />
        </MenuButton>
        <Menu>
          <MenuItem>
            <IconButton>
              <ICONS.account />
            </IconButton>
            My account
          </MenuItem>
          <MenuItem onClick={logoutUser}>
            {' '}
            <IconButton>
              <ICONS.logout />
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
