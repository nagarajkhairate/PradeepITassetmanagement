import { Box, Button } from "@mui/joy"
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import { useState } from "react";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
            flexDirection: { md: 'row'},
            justifyContent: { xs: 'space-between', md: 'flex-end' },
            gap: '5px',
            mt: 4,
            flexWrap:'wrap'
          }}
        >
          <Link
          to='/dashboard'
          >
          <Button
            variant="solid"
            sx={{
              background: '#388e3c',
              color: 'white',
              '&:hover': { background: '#1b5e20' },
              borderRadius: 'none',
            }}
            component="label"
            onClick={onCancel}
          >
           
            Cancel
          </Button>
          </Link>

          <Button
            variant="solid"
            sx={{
              background: '#fdd835',
              color: 'black',
              '&:hover': { background: '#E1A91B' },
              borderRadius: 'none',
            }}
            component="label"
            
            onClick={onSubmit}
          >
           Submit
           
          </Button>
        </Box>
    )
}
DatabaseButtons.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };
export default DatabaseButtons