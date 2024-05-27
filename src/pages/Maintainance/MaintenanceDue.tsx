import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Typography,
} from "@mui/joy";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Image from "../../components/Common/MaintenanceEmpty";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Textarea from "@mui/joy/Textarea";
import Table from "@mui/joy/Table";

// Define a type for the data rows
interface DataRow {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

// Create data function
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): DataRow {
  return { name, calories, fat, carbs, protein };
}

// Data rows
const rows: DataRow[] = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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

export const MaintenanceDue: React.FC = () => {
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
            Maintenance
          </Typography>


        <Box
          sx={{
            display: "flex",
            width:"100%",
            alignItems: "center",
            marginTop: "60px",
            // marginLeft: "5%",
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
              // marginRight: "auto",
              borderRadius: "15px"
              ,width:{md:"200px",xs:"100%"}
            }}
            >
            <SettingsOutlinedIcon />
            Search Criteria
          </Button>
            </Box>

          <Box 
          sx={{
            width:"100%",
              marginRight: "10%" , display:{md:"flex",xs:"flex"} , flexDirection:{md:"row",xs:"column"},gap:"5px" }}>
              <Button
                variant="solid"
                autoFocus
                sx={{
                  background: "#388e3c",
                  color: "white",
                  borderRadius: "15px",
                  width:{md:"200px",xs:"100%"}
                }}
                component="label"
                role={undefined}
                tabIndex={-1}
                color="neutral"
                startDecorator={
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </SvgIcon>
                }
              >
                Export to Excel
                <VisuallyHiddenInput type="file" />
              </Button>
              <Button
                variant="solid"
                autoFocus
                sx={{
                  background: "#2196f3",
                  color: "white",
                  borderRadius: "15px"
                  ,width:{md:"200px",xs:"100%"}
            
                }}
                component="label"
                role={undefined}
                tabIndex={-1}
                color="neutral"
                startDecorator={
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </SvgIcon>
                }
              >
                Import Maintenance
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
                  ,width:{md:"200px",xs:"100%"}
                }}
                >
                <SettingsOutlinedIcon />
                Setup Column
              </Button>
          </Box>
        </Box>




        
        <Box sx={{ gap:{md:"50px",xs:"5px"},
          width:"100%",
          marginRight: { md: '10%', xs: '0' }, display:"flex" , flexDirection:{md:"row",xs:"column"},
             }}
        >
          <Box>
            <Select
              placeholder="Maintenance Due"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: { md: 230, xs: '100%' },
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

          <Box>
            <Select
              placeholder="10"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: { md: 130, xs: '100%' },
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
             
                
        Assets that are more than 7 days overdue for maintenance (as indicated by 'overdue time')
                  
            

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

export default MaintenanceDue;
