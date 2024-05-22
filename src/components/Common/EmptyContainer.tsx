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
        padding: "20px",
        flexGrow: 1,
        marginLeft: "52px",
        marginTop: "22px",
        width: "1100px",
        height: "auto",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ marginTop: "100px" }}>
        <img src={FrameImage} alt="character holding notes" width="300px" height="300px" />
      </Box>
    </Box>
  );
};

export default EmptyContainer;
