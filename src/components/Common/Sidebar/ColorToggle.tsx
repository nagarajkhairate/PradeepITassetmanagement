import * as React from 'react';
import { useDispatch } from 'react-redux'; // Importing useDispatch from react-redux
import { useColorScheme } from '@mui/joy/styles';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import { toggleDarkMode } from '../../../redux/features/darkModeSlice';

const  ColorToggle: React.FunctionComponent = (props: IconButtonProps) => {
  const dispatch = useDispatch(); // Getting the dispatch function
  const { onClick: externalOnClick, sx, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);


  React.useEffect(() => {
    setMounted(true);
  }, []);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(toggleDarkMode());
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
    externalOnClick?.(event);
    
  };

  if (!mounted) {
    return (
      <IconButton
        size="sm"
        variant="outlined"
        color="neutral"
        {...other}
        sx={sx}
        disabled
      />
    );
  }

  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      {...other}
      onClick={onClick}
      sx={[
        {
          '& > *:first-of-type': {
            display: mode === 'dark' ? 'none' : 'initial',
          },
          '& > *:last-child': {
            display: mode === 'light' ? 'none' : 'initial',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <DarkModeRoundedIcon />
      <LightModeIcon />
    </IconButton>
  );
}

export default ColorToggle;
