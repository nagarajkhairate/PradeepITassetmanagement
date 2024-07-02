import { Box, Button } from "@mui/joy"
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import { useState } from "react";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import PropTypes from "prop-types";

interface DatabaseButtonsProps {
    onCancel: () => void;
    onSubmit: () => void;
  }

 

  export const DatabaseButtons: React.FC<DatabaseButtonsProps> = ({ onCancel, onSubmit }) => {

    return(
        
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { md: 'row', xs: 'column' },
            justifyContent: { xs: 'center', md: 'flex-end' },
            gap: '5px',
            mt: 4,
          }}
        >
          <Button
            variant="solid"
            sx={{
              background: '#388e3c',
              color: 'white',
              borderRadius: '10px',
            }}
            component="label"
            onClick={onCancel}
          >
            <NavigateBeforeOutlinedIcon />
            Cancel
          </Button>
          <Button
            variant="solid"
            sx={{
              background: '#fdd835',
              color: 'black',
              borderRadius: '10px',
            }}
            component="label"
            
            onClick={onSubmit}
          >
           Submit
            <NavigateNextOutlinedIcon />{' '}
          </Button>
        </Box>
    )
}
DatabaseButtons.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };
export default DatabaseButtons