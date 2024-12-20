import React from 'react'
import {
  Box,
  Dropdown,
  GlobalStyles,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Typography,
} from '@mui/joy'
import { MoreVert } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import useColorSelector from '../../configs/useColorSelector'
import { toggleSidebar } from '../../utils/utils'
import { ICONS } from '../../components/Common/AppIcon/AppIcon'
const Header = () => {
  const navigate = useNavigate()
  const styleConfigs = useColorSelector()
  function logoutUser() {
    localStorage.clear()
    navigate('/login')
  }

  const user = localStorage.getItem('user')
  return (
    <Sheet
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: {
          xs: 'space-between',
          sm: 'space-between',
          md: 'flex-end',
        },
        position: 'fixed',
        top: 0,
        minWidth:'100dvw',
        height: 'var(--Header-height)',
        zIndex: 1,
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
        sx={{
          display: {
            xs: 'inline-flex',
            sm: 'inline-flex',
            md: 'none',
            lg: 'none',
            xl: 'none',
          },
        }}
      >
        <ICONS.menu />
      </IconButton>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <Typography sx={{mr:1, fontFamily:"Bold"}}>{user && JSON.parse(user).firstName}</Typography>

        <Dropdown>
          <MenuButton
            sx={{
              mr: 2,
            }}
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
  )
}

export default Header
