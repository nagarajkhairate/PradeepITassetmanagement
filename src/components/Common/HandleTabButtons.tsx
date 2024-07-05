import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface HandleTabButtonsProps extends ButtonProps {
  backgroundColor: string;
  hoverColor: string;
}

const HandleTabButtons: React.FC<HandleTabButtonsProps> = ({ backgroundColor, hoverColor, children, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        background: backgroundColor,
        color: props.color || 'white',
        borderRadius: '10px',
        '&:hover': { background: hoverColor },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default HandleTabButtons;
