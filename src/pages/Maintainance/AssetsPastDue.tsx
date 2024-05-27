import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/joy";
import { styled } from "@mui/joy";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Image from "../../components/Common/MaintenanceEmpty";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
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

export const AssetsPastDue: React.FC =()=> {
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

      <Box sx={{ padding: { xs: 2, md: 4 } }}>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: { xs: "column", md: "row" }, mb: 2 }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: { xs: "24px", md: "32px" },
              fontWeight: 500,
              lineHeight: { xs: "36px", md: "48px" },
              textAlign: { xs: "center", md: "left" },
              width: { xs: "100%", md: "auto" },
            }}
          >
            Report
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: { xs: "14px", md: "18px" },
              fontWeight: 400,
              lineHeight: { xs: "21px", md: "27px" },
              textAlign: { xs: "center", md: "left" },
              width: { xs: "100%", md: "auto" },
              mt: { xs: 1, md: 0 },
              ml: { md: 2 },
            }}
          >
            Checkout by Past Due
          </Typography>

          <Box sx={{ marginLeft: { xs: 0, md: "auto" }, mt: { xs: 2, md: 0 } }}>
              <Button
                variant="solid"
                sx={{
                  background: "#388e3c",
                  color: "white",
                  marginRight: { xs: 1, md: 2 },
                  width: { xs: "100%", md: "auto" },
                }}
                component="label"
              >
                Automated Report
                <VisuallyHiddenInput type="file" />
              </Button>
              <Button
                type="button"
                variant="solid"
                sx={{
                  background: "black",
                  color: "white",
                  width: { xs: "100%", md: "auto" },
                }}
              >
                <SettingsOutlinedIcon />
                SetUp
              </Button>
          </Box>
        </Box>
        

        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <ButtonGroup
            spacing="0.5rem"
            aria-label="spacing button group"
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button
              variant="solid"
              sx={{
                background: "#388e3c",
                color: "white",
                marginRight: { xs: 1, md: 2 },
                width: { xs: "100%", md: "auto" },
              }}
              component="label"
            >
              Export
              <VisuallyHiddenInput type="file" />
            </Button>
            <Button
              type="button"
              variant="solid"
              sx={{
                background: "black",
                color: "white",
                width: { xs: "100%", md: "auto" },
              }}
            >
              <SettingsOutlinedIcon />
              Print
            </Button>
          </ButtonGroup>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Image />
        </Box>
      </Box>
      </Box>
      </div>
      </div>
      </>
  );
}

export default AssetsPastDue;
