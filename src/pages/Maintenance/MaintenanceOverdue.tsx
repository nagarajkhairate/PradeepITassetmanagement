import React from "react";
import {
  Box,
  Button,

  Typography,
} from "@mui/joy";

import { styled } from "@mui/joy";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Image from "../../components/Common/MaintenanceEmpty";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Table from "@mui/joy/Table";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';





// Styled component for visually hidden input
const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export const MaintenanceOverdue: React.FC = () => {
  return (
    <>

<div style={{ width: "100%", background: "#f9f9f9" }}>
        <div style={{ margin: "52px" }}>
          <Box
            sx={{
              mt: "40px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
          
        <Box>
          <Typography
            level="h4"
          >
            Maintenance Due
          </Typography>


        <Box
          sx={{
            display: "flex",
            width:"100%",
            alignItems: "center",
            marginTop: "40px",
            flexDirection: { md: "row", xs: "column" },
            gap:{md:"100px",xs:"5px"}
          }}
        >
          <Box sx={{width:"100%"}}>
          <Button
            type="button"
            variant="solid"
            autoFocus
            sx={{
              background: "#1CCAB8",
              color: "white",
              borderRadius: "15px"
              ,width:{md:"150px",xs:"90%"}
            }}
            >
            <SettingsOutlinedIcon />
            Search Criteria
          </Button>
            </Box>

          <Box 
          sx={{
            width:"100%",
              // marginRight: "10%" , 
              display:{md:"flex",xs:"flex"} , flexDirection:{md:"row",xs:"column"},gap:"5px" }}>
              <Button
                variant="solid"
                autoFocus
                sx={{
                  background: "#388e3c",
                  color: "white",
                  borderRadius: "15px",
                  width:{md:"160px",xs:"90%"}
                }}
               
              >
                 <CloudUploadOutlinedIcon />
                Export to Excel
                <VisuallyHiddenInput type="file" />
              </Button>
              <Button
                variant="solid"
                autoFocus
                sx={{
                  background: "#2196f3",
                  color: "white",
                  borderRadius: "15px",
                  width:{md:"180px",xs:"90%"},
                  whiteSpace: "nowrap",
                 
                }}
              >
                <CloudUploadOutlinedIcon />
                Import Maintanence
                <VisuallyHiddenInput type="file" />
              </Button>
              <Button
                type="button"
                variant="solid"
                autoFocus
                sx={{
                  background: "black",
                  color: "white",
                  borderRadius: "15px"
                  ,width:{md:"160px",xs:"90%"}
                }}
                >
                <SettingsOutlinedIcon />
                Setup Column
              </Button>
          </Box>
        </Box>




        
        <Box sx={{ gap:{md:"50px",xs:"3px"},
          width:"100%",
          marginRight: { md: '10%', xs: '0' }, display:"flex" , flexDirection:{md:"row",xs:"column"},
             }}
        >
          <Box>
            <Select
              placeholder="Maintenance Overdue"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: { md: 200, xs: '90%' },
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
                marginTop: { md: '20%', xs: '10px' },
                borderRadius: "15px",
                
              }}
            >
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
              <Option value="fish">Fish</Option>
              <Option value="bird">Bird</Option>
            </Select>
          </Box>

          <Box sx={{ mt: 1 }}>
            <Select
              placeholder="10"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: { md: 100, xs: '90%' },
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
                marginTop: { md: '34%', xs: '10px' },
                borderRadius: "15px",
              
              }}
            >
              <Option value="10">10</Option>
              <Option value="15">15</Option>
              <Option value="20">20</Option>
            </Select>
          </Box>

         
            <Box
              sx={{
                // marginRight: "18%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end ",
                color: "danger",
                fontFamily: "Poppins, sans-serif",
                fontStyle: "italic",
                marginTop:'2px'
              }}
            >
             
                
        Assets that are more than 7 days overdue for maintenance (as indicated by overdue time)                  
            

          </Box>
        </Box>

        <Box>
          <Table hoverRow>
            <thead style={{background:"#959595"}}>
              <tr>
                <th style={{ width: "10%" }}>Status</th>
                <th>Expires</th>
                <th>Asset Tag Id</th>
                <th>Description</th>
                <th>Title</th>
                <th>Maintenance Details</th>
                <th>Action</th>
              </tr>
            </thead>
          </Table>
        </Box>

        <Box>
          <Image />
        </Box>
      </Box>
      </Box>
            </div>
            </div>

    </>
  );
};

export default MaintenanceOverdue;
