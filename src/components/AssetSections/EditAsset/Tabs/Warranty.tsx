import React from 'react'
import {
  Box,
  Typography,
  Button,
  Divider,

} from "@mui/joy";
import { AiOutlinePlus } from "react-icons/ai";
const Warranty = () => {
  return (
    <>
       <Box
                sx={{
                  paddingBottom: "20px",
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  flexDirection:{md:"row",xs:"column"}
                }}
              >
                <Typography level="h4">Warranty</Typography>
                <Box>
                  <Button
                    sx={{
                      paddingY: "10px",
                      background: "#13b457",
                      borderRadius: "15px",
                      "&:hover": {
                        backgroundColor: "#0d903f", // Slightly darker color on hover
                      },
                    }}
                  >
                    <AiOutlinePlus size={23} />
                    Add New
                  </Button>
                </Box>
              </Box>
              <Divider></Divider>
              <Box>
                <Typography
                  sx={{
                    mt: "20px",
                    color: "green",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  No Warranty has been added
                </Typography>
              </Box>
    </>
  )
}

export default Warranty
