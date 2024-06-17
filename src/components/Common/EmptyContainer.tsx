import React from 'react';
import { Box } from '@mui/joy';
import FrameImage from "../../Assets/Frame.png";

interface EmptyContainerProps {
  title: string;
}

const EmptyContainer: React.FC<EmptyContainerProps> = ({ title }) => {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        background: "#ffffff",
        padding: { xs: "10px", sm: "20px" }, // Adjust padding for small screens
        flexGrow: 1,
        marginLeft: { xs: "0px", sm: "52px" },
        marginTop: { xs: "10px", sm: "22px" },
        width: { xs: "100%", sm: "90%", md: "1160px" },
        height: "auto",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
     <Box 
        sx={{ 
          marginTop: { xs: "50px", sm: "100px" },
          width: { xs: '80%', sm: '60%', md: '40%' },
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <img
          src={FrameImage}
          alt="character holding notes"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Box>
    </Box>
  );
};

export default EmptyContainer;
