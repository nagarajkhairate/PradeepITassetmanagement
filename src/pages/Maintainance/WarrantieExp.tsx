import {
  Box,
  Button,
  Typography,
} from "@mui/joy";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Image from "../../components/Common/MaintenanceEmpty";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Table from "@mui/joy/Table";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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

export function Warranty() {
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
              <Typography level="h4">Warranty</Typography>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  marginTop: "60px",
                  // marginLeft: "5%",
                  flexDirection: { md: "row", xs: "column" },
                  gap: { md: "100px", xs: "5px" },
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
                    width: "100%",
                    display: { md: "flex", xs: "flex" },
                    flexDirection: { md: "row", xs: "column" },
                    gap: "5px",
                  }}
                >
                  <Button
                    variant="solid"
                    autoFocus
                    size="sm"
                    sx={{
                      background: "#388e3c",
                      color: "white",
                      borderRadius: "15px",
                      width: { md: "150px", xs: "90%" },
          
                    }}
                  >
                     <CloudUploadOutlinedIcon />
                    Export
                    <VisuallyHiddenInput type="file" />
                  </Button>
                  <Button
                    variant="solid"
                    autoFocus
                    sx={{
                      background: "#2196f3",
                      color: "white",
                      borderRadius: "15px",
                      width: { md: "180px", xs: "90%" },
                      whiteSpace:'nowrap'
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
                      width: { md: "150px", xs: "90%" },
                    }}
                  >
                    <SettingsOutlinedIcon />
                    Setup Column
                  </Button>
                </Box>
              </Box>

              <Box
                sx={{
                  gap: { md: "50px", xs: "5px" },
                  width: "100%",
                  marginRight: { md: "10%", xs: "0" },
                  display: "flex",
                  
                  flexDirection: { md: "row", xs: "column" },
                }}
              >
                <Box>
                  <Select
                    placeholder="Warranties Expiring"
                    indicator={<KeyboardArrowDown />}
                    sx={{
                      width: { md: 200, xs: "90%" },
                      [`& .${selectClasses.indicator}`]: {
                        transition: "0.2s",
                        [`&.${selectClasses.expanded}`]: {
                          transform: "rotate(-180deg)",
                        },
                      },
                      mt:4,
                      // marginTop: { md: "10%", xs: "5px" },
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
                      width: { md: 100, xs: "90%" },
                      [`& .${selectClasses.indicator}`]: {
                        transition: "0.2s",
                        [`&.${selectClasses.expanded}`]: {
                          transform: "rotate(-180deg)",
                        },
                      },
                      marginTop: { md: "34%", xs: "10px" },
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
                    
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end ",
                    color: "danger",
                    fontFamily: "Poppins, sans-serif",
                    fontStyle: "italic",
                    marginTop: "2px",
                  }}
                >
                  Link warranties to specific assets by choosing view next to
                  the warranty you wish to edit. then, add the required
                  information.
                </Box>
              </Box>

              <Box>
                <Table hoverRow>
                  <thead>
                    <tr style={{ width: "104px" }}>
                      <th style={{ width: "10%" }}>Active</th>
                      <th>Asset Tag Id</th>
                      <th>Description</th>
                      <th>Length(month)</th>
                      <th>Expires</th>
                      <th>Notes</th>
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
}

export default Warranty;
