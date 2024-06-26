import { ComponentType, FunctionComponent, SVGAttributes } from 'react'


import DefaultIcon from '@mui/icons-material/MoreHoriz'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export const COMP_ICONS: Record<string, ComponentType> = {

  arrowRight: ArrowForwardIosIcon
}

export interface AppIconProps extends SVGAttributes<SVGElement> {
  color?: string
  icon?: string
  size?: string | number
  title?: string
}

const ComIcon: FunctionComponent<AppIconProps> = ({
  color,
  icon = 'default',
  size = 8,
  style,
  ...restOfProps
}) => {
  const iconName = (icon || 'default').trim().toLowerCase()

  let ComponentToRender = COMP_ICONS[iconName]
  if (!ComponentToRender) {
    console.warn(`ComIcon: icon "${iconName}" is not found!`)
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

export default ComIcon
