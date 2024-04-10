import SidebarItem from './sidebarMenu'
import SidebarItemCollapse from './sidebarMenuCollapse'

import { pagesRoutes } from '../../routes/pagesRoutes';

import { Container, Drawer, GlobalStyles, IconButton, List, ListItemContent, Sheet, Typography, listItemButtonClasses } from '@mui/joy'

const Sidebar = () => {

    const logoImage =
        'https://pradeepit.com/wp-content/uploads/2021/11/PradeepIT-Transparent-Logo-300x88.png';

    return (
        <Sheet
            // component="div" // Add component prop here
            sx={{
                // position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 10000,
                height: '100vh',
                width: '250px',
                top: 0,
                // p: 2,
                background:'white',
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
                        '--Sidebar-width': '331px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '240px',
                        },
                    },
                })}
            />
            <Container
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    // width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'white',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
            // onClick={() => closeSidebar()}
            />

            <Container
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
                    style={{ width: '222px', padding: '10px' }}
                    className="h-8"

                />
            </Container>
            <Container
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
                        // '--List-nestedInsetStart': '0px',
                        // '--ListItem-radius': (theme) => theme.vars.radius.sm,
                    // width: '250px',

                        





                    }}

                >

                    {pagesRoutes.map((item, index) => {
                        return <SidebarItem key={index} item={item} />;

                    })}

                </List>
            </Container>
        </Sheet>

    );
};

export default Sidebar;


