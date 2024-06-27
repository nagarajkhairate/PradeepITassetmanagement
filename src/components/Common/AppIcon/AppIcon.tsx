import { ComponentType, FunctionComponent, SVGAttributes } from 'react'

import DashboardIcon from '@mui/icons-material/Dashboard'
import ListIcon from '@mui/icons-material/List'
import DefaultIcon from '@mui/icons-material/MoreHoriz'
import SettingsIcon from '@mui/icons-material/Settings'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import DayNightIcon from '@mui/icons-material/Brightness4'
import NightIcon from '@mui/icons-material/Brightness3'
import DayIcon from '@mui/icons-material/Brightness5'
import SearchIcon from '@mui/icons-material/Search'
import InfoIcon from '@mui/icons-material/Info'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircle from '@mui/icons-material/AccountCircle'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonIcon from '@mui/icons-material/Person'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined'
import DomainIcon from '@mui/icons-material/Domain'
import QueueIcon from '@mui/icons-material/Queue'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import PeopleIcon from '@mui/icons-material/People'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { APP_ICON_SIZE } from '../config'



export const ICONS: Record<string, ComponentType> = {
  dashboard: DashboardIcon,
  po: InsertDriveFileIcon,
  projects: VerticalSplitIcon,
  clients: HowToRegIcon,
  list: ListIcon,
  industry: DomainIcon,
  projectType: QueueIcon,
  vendor: SupervisorAccountIcon,
  resource: PeopleIcon,
  person: PersonIcon,
  close: CloseIcon,
  menu: MenuIcon,
  settings: SettingsIcon,
  visibilityIcon: VisibilityIcon,
  visibilityOffIcon: VisibilityOffIcon,
  dayNightIcon: DayNightIcon,
  night: NightIcon,
  day: DayIcon,
  arrowRight: ArrowForwardIosIcon,
  search: SearchIcon,
  info: InfoIcon,
  home: HomeIcon,
  account: AccountCircle,
  signUp: PersonAddIcon,
  login: PersonIcon,
  logout: ExitToAppIcon,
  notifications: NotificationsIcon,
}

export interface AppIconProps extends SVGAttributes<SVGElement> {
  color?: string
  icon?: string
  size?: string | number
  title?: string
}

const AppIcon: FunctionComponent<AppIconProps> = ({
  color,
  icon = 'default',
  size = APP_ICON_SIZE,
  style,
  ...restOfProps
}) => {
  const iconName = (icon || 'default').trim().toLowerCase()

  let ComponentToRender = ICONS[iconName]
  if (!ComponentToRender) {
    console.warn(`AppIcon: icon "${iconName}" is not found!`)
    ComponentToRender = DefaultIcon
  }

  const propsToRender = {
    height: size,
    color,
    fill: color && 'currentColor',
    size,
    style: { ...style, color },
    width: size,
    ...restOfProps,
  }

  return <ComponentToRender data-icon={iconName} {...propsToRender} />
}

export default AppIcon
