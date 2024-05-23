import {
  Box,
  Button,
  ButtonGroup,
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

export function LeasesExp() {
  return (
    <>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: { xs: 'column', md: 'row' }}}>
          <Typography>
            <span
              style={{
                width: "106px",
                height: "48px",
                top: "13px",
                left: "340px",
                gap: "0px",
                opacity: "0px",
                position: "absolute",
              }}
            >
              <span
                style={{
                  fontFamily: "Poppins",
                  fontSize: "32px",
                  fontWeight: 500,
                  lineHeight: "48px",
                  letterSpacing: "-0.11428570002317429px",
                  textAlign: "left",
                }}
              >
                Report
              </span>
            </span>
            <span
              style={{
                fontFamily: "Poppins",
                fontSize: "18px",
                fontWeight: 400,
                lineHeight: "27px",
                letterSpacing: "-0.11428570002317429px",
                textAlign: "left",
                width: "199px",
                height: "27px",
                top: "28px",
                left: "440px",
                gap: "0px",
                opacity: "0px",
                position: "absolute",
              }}
            >
              Checkout by Past Due
            </span>
          </Typography>

          <Box sx={{ marginLeft: { xs: 0, md: "auto" }, mt: { xs: 2, md: 0 } }}>
            <ButtonGroup
              spacing="0.5rem"
              aria-label="spacing button group"
              sx={{
                width: "Hug (468px)px",
                height: "Hug (70px)px",
                top: "13px",
                left: "1280px",
                gap: "30px",
                opacity: "0px",
                position: "absolute",
              }}
            >
              <Button
                variant="solid"
                autoFocus
                sx={{
                  background: "#388e3c",
                  color: "white",
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
                Automated Report
                <VisuallyHiddenInput type="file" />
              </Button>

              <Button
                type="button"
                variant="solid"
                autoFocus
                sx={{
                  background: "black",
                  color: "white",
                }}
              >
                <SettingsOutlinedIcon />
                SetUp
              </Button>
            </ButtonGroup>
          </Box>
        </Box>


        
        <Grid sx={{ display: "flex", gap: "30px", marginLeft: "13%", marginTop:'90px' }}>
        <Grid>
       <Typography
       sx={{
        fontFamily: "Poppins",
        fontSize: "20px",
        fontWeight: 500,
        lineHeight: "30px",
        textAlign: "left",
        width: "124px",
        height: "30px",
        top: "20%",
        left: "340px",
        gap: "0px",
        opacity: "0px",
        position: "absolute",
      }}
       >Report Type:</Typography>
       </Grid>
          <Grid>
            <Select
              placeholder="Current Status"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: 240,
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
                // marginLeft:'5%',
                marginTop: "20%",
                borderRadius: "16px",
              }}
            >
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
              <Option value="fish">Fish</Option>
              <Option value="bird">Bird</Option>
            </Select>
          </Grid>

          <Grid>
            <Select
              placeholder="100"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: 240,
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
                marginLeft: "5%",
                marginTop: "20%",
                borderRadius: "16px",
              }}
            >
              <Option value="10">10</Option>
              <Option value="15">15</Option>
              <Option value="20">20</Option>
            </Select>

              <Grid>
            <Box sx={{ marginLeft: "auto" }}>
              <ButtonGroup
                spacing="0.5rem"
                aria-label="spacing button group"
                sx={{
                  width: "Hug (468px)px",
                  height: "Hug (70px)px",
                  top: "145px",
                  left: "1365px",
                  gap: "30px",
                  opacity: "0px",
                  position: "absolute",
                }}
              >
                <Button
                  variant="solid"
                  autoFocus
                  sx={{
                    background: "#388e3c",
                    color: "white",
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
                  Export
                  <VisuallyHiddenInput type="file" />
                </Button>

                <Button
                  type="button"
                  variant="solid"
                  autoFocus
                  sx={{
                    background: "black",
                    color: "white",
                  }}
                >
                  <SettingsOutlinedIcon />
                  Print
                </Button>
              </ButtonGroup>
            </Box>
            </Grid>
          </Grid>
        </Grid>

        <Box>
          <Image />
        </Box>
      </Box>
    </>
  );
}

export default LeasesExp;
