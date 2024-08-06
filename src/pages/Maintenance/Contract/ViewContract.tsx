import { Box } from "@mui/joy"
import React from "react"



const ViewContract: React.FC = () => {
    return (
        <Box
        sx={{
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#FFF',
          flexGrow: 1,
          marginTop: { xs: '10px', sm: '22px' },
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        </Box>
    )
}
export default React.memo(ViewContract)