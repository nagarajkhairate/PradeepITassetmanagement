import React, { ElementType, FunctionComponent, useMemo } from 'react';
import { Button, ButtonProps } from '@mui/joy';
import AppLink from '../AppLink';

// import AppIcon from '../AppIcon';


const MUI_BUTTON_COLORS = ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'];

const DEFAULT_SX_VALUES = {
  margin: 1, // By default the AppButton has theme.spacing(1) margin on all sides
};

export interface AppButtonProps extends Omit<ButtonProps, 'color' | 'startIcon' | 'endIcon'> {
  color?: string; // Not only 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
  label?: string; // Alternate to .text
  text?: string; // Alternate to .label
  component?: ElementType; // Could be RouterLink, AppLink, <a>, etc.
  to?: string; 
  href?: string; 
  openInNewTab?: boolean; 
  underline?: 'none' | 'hover' | 'always'; // Link prop
}

const AppButton: FunctionComponent<AppButtonProps> = ({
  children,
  color: propColor = 'inherit',
  component: propComponent,
  label,
  sx: propSx = DEFAULT_SX_VALUES,
  text,
  underline = 'none',
  ...restOfProps
}) => {
  const isMuiColor = useMemo(() => MUI_BUTTON_COLORS.includes(propColor), [propColor]);

  const componentToRender =
    !propComponent && (restOfProps?.href || restOfProps?.to) ? AppLink : propComponent ?? Button;

  const sxToRender = {
    ...propSx,
    ...(isMuiColor ? {} : { color: propColor, backgroundColor: propColor }),
  };

  return (
    <Button
      component={componentToRender}
      style={{backgroundColor: "#000"}}
      sx={sxToRender}
      {...{ ...restOfProps, underline }}
    >
      {children || label || text}
    </Button>
  );
};

export default AppButton;
