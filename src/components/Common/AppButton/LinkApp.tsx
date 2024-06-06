import React, { ElementType, FunctionComponent } from 'react';
import { Button, ButtonProps } from '@mui/joy';
import AppLink from '../AppLink';

export interface AppButtonProps extends Omit<ButtonProps, 'startIcon' | 'endIcon'> {
  label?: string; 
  text?: string; 
  component?: ElementType; 
  to?: string; 
  href?: string; 
  openInNewTab?: boolean; 
  underline?: 'none' | 'hover' | 'always'; 
  variant?: "plain";
}

const LinkApp: FunctionComponent<AppButtonProps> = ({
  children,
  component: propComponent,
  label,
  sx: propSx,
  text,
  underline = 'none',
  color = "neutral",
  variant = "plain", // Default variant
  ...restOfProps
}) => {
  const componentToRender =
    !propComponent && (restOfProps?.href || restOfProps?.to) ? AppLink : propComponent ?? Button;

  const sxToRender = {
    ...(propSx || {}), // If propSx exists, spread its values, otherwise, spread an empty object
    fontSize: '12px' 
  };

  return (
    <Button
      component={componentToRender}
      sx={sxToRender}
      {...{ ...restOfProps, underline, color }}
      variant={variant}
    >
      {children || label || text}
    </Button>
  );
};

export default LinkApp;
