import React from 'react'
import { Typography, Box, Button, Select, Checkbox } from "@mui/joy";
import { VscSettings } from "react-icons/vsc";

const CompanyInformation = () => {
  return (
    <>
      <div style={{ width: "100%", background: "#f9f9f9" }}>
        <div style={{ margin: "52px" }}>
          <Typography level='h3'> <VscSettings size={23}/> Step 1 - Company Information</Typography>
          <Box sx={{
            borderRadius: "16px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            background: "#ffffff",
            margin: {
              xs: "4px",
              md: "52px",
            },
          }}>
            <Box>
              
            </Box>
          </Box>
        </div>
      </div>
    </>
  )
}

export default CompanyInformation
