import React from 'react'
import SidebarItem from './SidebarItem'

import { Box, GlobalStyles, List, Sheet, listItemButtonClasses } from '@mui/joy'

import appRoutes from '../../../routes/appRoutes'
import SidebarItemCollapse from './SidebarItemCollapse'
import { closeSidebar } from '../../../utils/utils'
import useColorSelector from '../../../configs/useColorSelector'

const Sidebar = () => {
  const styleConfigs = useColorSelector()
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
        zIndex: 1,
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
        backgroundColor: styleConfigs.backgroundColorWhite,
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
            zIndex: 2,
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
          {appRoutes.map((route, index) =>
            route.sidebarProps ? (
              route.child ? (
                <SidebarItemCollapse item={route} key={index} />
              ) : (
                <SidebarItem item={route} key={index} />
              )
            ) : null,
          )}
        </List>
      </Box>
    </Sheet>
  )
}

export default Sidebar
