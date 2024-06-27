import { Collapse } from '@mui/material'
import { useEffect, useState } from 'react'
import { RouteType } from '../../../routes/config'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import SidebarItem from './SidebarItem'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Typography,
} from '@mui/joy'

type Props = {
  item: RouteType
}

const SidebarItemCollapse = ({ item }: Props) => {
  const [open, setOpen] = useState(false)
  const { appState } = useSelector((state: RootState) => state.appState)

  useEffect(() => {
    if (appState.includes(item.state)) {
      setOpen(true)
    }
  }, [appState, item])

  return item.sidebarProps ? (
    <ListItem nested>
      <ListItemButton onClick={() => setOpen(!open)}>
        <IconButton size="sm">
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </IconButton>
        <ListItemContent>
          <Typography level="title-sm">
            {item.sidebarProps.displayText}
          </Typography>
        </ListItemContent>

        <Typography level="title-sm"></Typography>
        {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List>
          {item.child?.map((route, index) =>
            route.sidebarProps ? (
              route.child ? (
                <SidebarItemCollapse item={route} key={index} />
              ) : (
                <SidebarItem item={route} key={index} />
              )
            ) : null,
          )}
        </List>
      </Collapse>
    </ListItem>
  ) : null
}

export default SidebarItemCollapse
