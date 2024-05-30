import { Box, Button, Typography } from "@mui/joy";
import { styled } from "@mui/joy";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Image from "../../components/Common/MaintenanceEmpty";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';





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

export const LeasesExp: React.FC = () => {
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: "column", md: "row" },
                  mb: 2,
                }}
              >
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
                    whiteSpace: "nowrap",
                  }}
                >
                  Checkout by Past Due
                </Typography>
                <Box
                  sx={{
                    width: "100%",

                    display: { md: "flex", xs: "flex" },
                    justifyContent: "flex-end",
                    flexDirection: { md: "row", xs: "column" },

                    gap: 2,
                    mt: 2,
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
                    <EmailOutlinedIcon />
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

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 4,
                  
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    alignItems: "center",
                    mt:2
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", md: "auto" },
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "20px",
                        fontWeight: 500,
                        lineHeight: "30px",
                        textAlign: { xs: "center", md: "left" },
                        whiteSpace: "nowrap",
                      }}
                    >
                      Report Type:
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: { xs: "100%", md: "auto" },
                      flexGrow: { xs: 1, md: 0 },
                    }}
                  >
                    <Select
                      placeholder="Current Status"
                      indicator={<KeyboardArrowDown />}
                      sx={{
                        width: "100%",
                        [`& .${selectClasses.indicator}`]: {
                          transition: "0.2s",
                          [`&.${selectClasses.expanded}`]: {
                            transform: "rotate(-180deg)",
                          },
                        },
                        borderRadius: "16px",
                      }}
                    >
                      <Option value="dog">Dog</Option>
                      <Option value="cat">Cat</Option>
                      <Option value="fish">Fish</Option>
                      <Option value="bird">Bird</Option>
                    </Select>
                  </Box>
                  <Box
                    sx={{
                      width: { xs: "100%", md: "auto" },
                      flexGrow: { xs: 1, md: 0 },
                    }}
                  >
                    <Select
                      placeholder="100"
                      indicator={<KeyboardArrowDown />}
                      sx={{
                        width: "100%",
                        [`& .${selectClasses.indicator}`]: {
                          transition: "0.2s",
                          [`&.${selectClasses.expanded}`]: {
                            transform: "rotate(-180deg)",
                          },
                        },
                        borderRadius: "16px",
                      }}
                    >
                      <Option value="10">10</Option>
                      <Option value="15">15</Option>
                      <Option value="20">20</Option>
                    </Select>
                  </Box>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: { xs: "center", md: "flex-end" },
                    gap: 2,
                  }}
                >
                  <Button
                    variant="solid"
                    sx={{
                      background: "#388e3c",
                      color: "white",
                      width: { xs: "100%", md: "auto" },
                    }}
                    component="label"
                  >
                    <FileUploadOutlinedIcon />
                    Export
                    <VisuallyHiddenInput type="file" />
                  </Button>
                  <Button
                    type="button"
                    variant="solid"
                    sx={{
                      background: '#2196f3',
                      color: "white",
                      width: { xs: "100%", md: "auto" },
                    }}
                  >
                    <LocalPrintshopOutlinedIcon/>
                    Print
                  </Button>
                </Box>
              </Box>
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
};

export default LeasesExp;
