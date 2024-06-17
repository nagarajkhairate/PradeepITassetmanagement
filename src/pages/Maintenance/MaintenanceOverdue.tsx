import React from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/joy";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Image from "../../components/Common/MaintenanceEmpty";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Table from "@mui/joy/Table";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AppView from "../../components/Common/AppView";


export const MaintenanceOverdue: React.FC = () => {
  return (
    <AppView>
          
          <Typography level="h4"> Maintenance OverDue</Typography>


        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { md: "row", xs: "column" },
            // gap:{md:"100px",xs:"5px"}
            justifyContent: { xs: 'center', md: 'space-between' },
          gap: '5px',
          }}
        >
         
          <Button
            type="button"
            variant="solid"
            autoFocus
            sx={{
              background: "#1CCAB8",
              color: "white",
              borderRadius: "15px"
            }}
            >
            <SettingsOutlinedIcon />
            Search Criteria
          </Button>
          

          <Box 
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              gap:"5px" }}>
              <Button
                variant="solid"
                autoFocus
                sx={{
                  background: "#388e3c",
                  color: "white",
                  borderRadius: "15px",
                }}
               
              >
                 <CloudUploadOutlinedIcon />
                Export to Excel
              </Button>
              <Button
                variant="solid"
                autoFocus
                sx={{
                  background: "#2196f3",
                  color: "white",
                  borderRadius: "15px",
                  whiteSpace: "nowrap",
                 
                }}
              >
                <CloudUploadOutlinedIcon />
                Import Maintanence
              </Button>
              <Button
                type="button"
                variant="solid"
                autoFocus
                sx={{
                  background: "black",
                  color: "white",
                  borderRadius: "15px"
                }}
                >
                <SettingsOutlinedIcon />
                Setup Column
              </Button>
          </Box>
        </Box>




        
        <Box 
        sx={{
           gap:{md:"50px",xs:"3px"},
          display:"flex" , 
          alignItems: 'center',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: 'space-between',
          mt:2
             }}
        >
          <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap:2,
         flexDirection: { md: 'row', xs: 'column' },
         justifyContent: 'space-between',
          }}
          >
            <Select
              placeholder="Maintenance Overdue"
              indicator={<KeyboardArrowDown />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
                // marginTop: { md: '20%', xs: '10px' },
                borderRadius: "15px",
                
              }}
            >
              <Option value="term1">Term 1</Option>
              <Option value="term2">Term 2</Option>
              <Option value="term3">Term 3</Option>
              <Option value="term4">Term 4</Option>
            </Select>
          

          
            <Select
              placeholder="10"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: 75,
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
                // marginTop: { md: '34%', xs: '10px' },
                borderRadius: "15px",
              
              }}
            >
              <Option value="10">10</Option>
              <Option value="15">15</Option>
              <Option value="20">20</Option>
            </Select>
          </Box>  
            {/* <Box
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
            > */}
        <Typography
        sx={{
          maxWidth: 450,
          fontFamily: 'Poppins, sans-serif',
          fontStyle: 'italic',
          marginTop: '2px',
        }}
        color="danger"
        >   
        Assets that are more than 7 days overdue for maintenance (as indicated by overdue time)                  
            </Typography>
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
      {/* </Box>
      </Box> */}

    </AppView>
  );
};

export default MaintenanceOverdue;
