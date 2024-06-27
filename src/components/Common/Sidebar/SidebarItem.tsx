import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useColorSelector from '../../../configs/useColorSelector'
import { IconButton, ListItem, ListItemButton, ListItemContent, Typography } from '@mui/joy'
import { RootState } from '../../../redux/store'

const SidebarItem = ({ item }: any) => {
  const styleConfigs = useColorSelector()
  const { appState } = useSelector((state: RootState) => state.appState)
  return item.sidebarProps && item.path ? (
    <ListItem sx={{borderLeft: appState === item.state ? "5px solid #FABC1E" : 'unset',}}>
      <ListItemButton
        component={Link}
        to={item.path}
        sx={{
          backgroundColor: appState === item.state ? styleConfigs.activeBg : 'unset',
          color: appState === item.state ? '#ffff' : 'unset',
          '&:hover': {
            color: '#ffff', 
          },
         
        }}
      >
        {item.sidebarProps.icon && (
          <IconButton size="sm" sx={{ color: appState === item.state ? "#FABC1E" : 'unset',
          
           }}>
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </IconButton>
        )}
        <ListItemContent>
          <Typography level="title-sm"> {item.sidebarProps.displayText}</Typography>
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  ) : null
}

export default SidebarItem