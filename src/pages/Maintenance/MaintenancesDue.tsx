import React from "react";
import { Box, Button, Typography } from "@mui/joy";
import { styled } from "@mui/joy";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Image from "../../components/Common/MaintenanceEmpty";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Table from "@mui/joy/Table";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import AppView from "../../components/Common/AppView";

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

export const MaintenancesDue: React.FC = () => {
  return (
    <AppView>
        <Typography level="h4">Maintenance</Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { md: "row", xs: "column" },
          }}
        >
          <Box >
            <Button
              type="button"
              variant="solid"
              autoFocus
              sx={{
                background: "#1CCAB8",
                color: "white",
                borderRadius: "15px",
                width: { md: "150px", xs: "90%" },
              }}
            >
              <SettingsOutlinedIcon />
              Search Criteria
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              gap: "5px",
            }}
          >
            <Button
              variant="solid"
              autoFocus
              sx={{
                background: "#388e3c",
                color: "white",
                borderRadius: "15px",
                width: { md: "160px", xs: "90%" },
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
                whiteSpace: "nowrap",
                width: { md: "180px", xs: "90%" },
              }}
            >
              <CloudUploadOutlinedIcon />
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
                borderRadius: "15px",
                width: { md: "160px", xs: "90%" },
              }}
            >
              <SettingsOutlinedIcon />
              Setup Column
            </Button>
          </Box>
        </Box>

        <Box>
     
            <Select
              placeholder="Maintenance Due"
              indicator={<KeyboardArrowDown />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
                
                borderRadius: "15px",
              }}
            >
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
              <Option value="fish">Fish</Option>
              <Option value="bird">Bird</Option>
            </Select>
          

          <Box>
            <Select
              placeholder="10"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: { md: 130, xs: "90%" },
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
                borderRadius: "15px",
              }}
            >
              <Option value="10">10</Option>
              <Option value="15">15</Option>
              <Option value="20">20</Option>
            </Select>
          </Box>

          <Typography
            sx={{
              // marginRight: "18%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end ",
              color: "danger",
              fontFamily: "Poppins, sans-serif",
              fontStyle: "italic",
              marginTop: "2px",
            }}
          >
            Assets that are more than 7 days overdue for maintenance (as
            indicated by overdue time)
          </Typography>
        </Box>

        <Box>
          <Table hoverRow>
            <thead style={{ background: "#959595" }}>
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
    
    </AppView>
  );
};

export default MaintenancesDue;
