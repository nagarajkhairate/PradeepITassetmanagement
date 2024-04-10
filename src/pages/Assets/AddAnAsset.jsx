import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Input as MuiInput,
  Button,
  selectClasses,
  Select as MuiSelect,
  Option,
  FormControl,
} from "@mui/joy";

import { IoIosArrowDown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { IoCloudUploadSharp } from "react-icons/io5";

const TypographyLabel = ({ title }) => (
  <Typography level="body-xs" sx={{ mt: 1, color: "#767676", mb: "5px" }}>
    {title}
  </Typography>
);

const Input = ({ placeholder, ...props }) => (
  <MuiInput
    placeholder={placeholder}
    sx={{
      borderRadius: "15px",
      padding: "10px",
      width: {
        xs: "100%",
        sm: "100%",
        md: 350,
      },
      ...props.sx,
    }}
    {...props}
  />
);

//  value, onChange

const Select = ({ placeholder,value,onChange, ...props }) => {
  console.log("props slected - ", props);

  return (
    <MuiSelect
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      indicator={<IoIosArrowDown />}
      sx={{
        borderRadius: "15px",
        padding: "12.25px",
        width: {
          xs: "100%",
          sm: "100%",
          md: 350,
        },
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
        ...props.sx, // Spread any additional styles
      }}
      {...props}
    />
  );
};

const AddAnAsset = () => {
  const [siteSelected, setSite] = useState([]);

  const handleSiteChange = (event) => {
    setSite(event?.target?.value);
  };

  useEffect(() => {
    console.log("rendered");
  });
  return (
    <>
      <div style={{ width: "100%", background: "#f9f9f9" }}>
        <div style={{ margin: "52px" }}>
          <Typography level="h3" color="initial">
            Add An Asset
          </Typography>
        </div>
        <Box
          sx={{
            borderRadius: "16px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            background: "#ffffff",
            margin: {
              xs: "4px",
              md: "52px",
            },
          }}
        >
          <Box sx={{ paddingBottom: "30px" }}>
            <Box sx={{}}>
              <Grid
                container
                spacing={1}
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-evenly",
                  padding: "20px",
                  gap: "10px",
                }}
              >
                <Grid item xs={12}>
                  <Typography
                    sx={{ fontWeight: "bold", mb: 0, paddingLeft: "32px" }}
                  >
                    Assets Details
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    level="body-xs"
                    sx={{ color: "#767676", mt: "8px", mb: "5px" }}
                  >
                    Description
                  </Typography>
                  <Input
                    placeholder=""
                    sx={{
                      borderRadius: "15px",
                      padding: "10px",
                      width: {
                        xs: "100%",
                        sm: "100%",
                        md: 750,
                      },
                    }}
                  />
                </Grid>

                <Grid>
                  <TypographyLabel title="Asset Tag ID"></TypographyLabel>

                  <Input placeholder="" />
                </Grid>
                <Grid>
                  <TypographyLabel title="Purchased From"></TypographyLabel>
                  <Input placeholder="All Location" />
                </Grid>
                <Grid>
                  <TypographyLabel title="Category"></TypographyLabel>
                  <Input placeholder="dd/mm/yyyy-dd/mm/yyyy" type="Date" />
                </Grid>
                <Grid>
                  <TypographyLabel title="Brand"></TypographyLabel>
                  <Input placeholder="" />
                </Grid>
                <Grid>
                  <Typography
                    level="body-xs"
                    sx={{ mt: 1, color: "#767676", mb: "5px" }}
                  >
                    Cost
                  </Typography>
                  <Input placeholder="Indian Rupee" />
                </Grid>
                <Grid>
                  <TypographyLabel title="Model"></TypographyLabel>
                  <Input placeholder="" />
                </Grid>
                <Grid>
                  <TypographyLabel title="Serial No."></TypographyLabel>
                  <Input placeholder="Nothing Selected" />
                </Grid>
              </Grid>
              <Typography
                sx={{
                  fontWeight: "bold",
                  mb: 0,
                  paddingLeft: "48px",
                  paddingTop: "15px",
                }}
              >
                Site,Location,Category and Department
              </Typography>
            </Box>
            <Box>
              <Grid
                container
                spacing={3}
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-evenly",
                  gap: "10px",
                  padding: "20px",
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <Typography
                    level="body-xs"
                    sx={{ mt: 1, color: "#767676", ml: "10px" }}
                  >
                    Site
                  </Typography>
                  <Grid
                    sx={{
                      display: "flex",
                      gap: "30px",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <FormControl>
                      <Select
                        value={siteSelected}
                        onChange={handleSiteChange}
                        placeholder="OneSite(Indore,India)"
                      >
                        <Option value="Indore">Indore</Option>
                        <Option value="Mumbai">Mumbai</Option>
                        <Option value="Delhi">Delhi</Option>
                      </Select>
                    </FormControl>
                    <Button
                      sx={{
                        width: "150px",
                        fontSize: "20px",
                        borderRadius: "15px",
                        background: "#E4E4E4",
                        "&:hover": {
                          background: "#E4E4E4",
                        },
                        color: "#767676",
                      }}
                    >
                      <Typography sx={{ mr: "25px" }}>
                        <FaPlus />
                      </Typography>
                      <Typography sx={{ mr: "25px" }}>New</Typography>
                    </Button>
                  </Grid>
                </Box>

                <Box>
                  <Typography
                    level="body-xs"
                    sx={{ mt: 1, color: "#767676", ml: "10px" }}
                  >
                    Category
                  </Typography>
                  <Grid
                    sx={{
                      display: "flex",
                      gap: "30px",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <Select placeholder="Computer Equipment"></Select>
                    <Button
                      sx={{
                        width: "150px",
                        fontSize: "20px",
                        borderRadius: "15px",
                        background: "#E4E4E4",
                        "&:hover": {
                          background: "#E4E4E4",
                        },
                        color: "#767676",
                      }}
                    >
                      <Typography sx={{ mr: "25px" }}>
                        <FaPlus />
                      </Typography>
                      <Typography sx={{ mr: "25px" }}>New</Typography>
                    </Button>
                  </Grid>
                </Box>

                <Box>
                  <Typography
                    level="body-xs"
                    sx={{ mt: 1, color: "#767676", ml: "10px" }}
                  >
                    Location
                  </Typography>
                  <Grid
                    sx={{
                      display: "flex",
                      gap: "30px",
                      flexDirection: { xs: "column", md: "row" }, // Align items to the end
                    }}
                  >
                    <Select placeholder="Indore" />
                    <Button
                      sx={{
                        width: "150px",
                        fontSize: "20px",
                        borderRadius: "15px",
                        background: "#E4E4E4",
                        "&:hover": {
                          background: "#E4E4E4",
                        },
                        color: "#767676",
                      }}
                    >
                      <Typography sx={{ mr: "25px" }}>
                        <FaPlus />
                      </Typography>
                      <Typography sx={{ mr: "25px" }}>New</Typography>
                    </Button>
                  </Grid>
                </Box>

                <Box>
                  <Typography
                    level="body-xs"
                    sx={{ mt: 1, color: "#767676", ml: "10px" }}
                  >
                    Department
                  </Typography>
                  <Grid
                    sx={{
                      display: "flex",
                      gap: "30px",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <Select placeholder="Supplier eco system" />
                    <Button
                      sx={{
                        width: "150px",
                        fontSize: "20px",
                        borderRadius: "15px",
                        background: "#E4E4E4",
                        "&:hover": {
                          background: "#E4E4E4",
                        },
                        color: "#767676",
                      }}
                    >
                      <Typography sx={{ mr: "25px" }}>
                        <FaPlus />
                      </Typography>
                      <Typography sx={{ mr: "25px" }}>New</Typography>
                    </Button>
                  </Grid>
                </Box>
              </Grid>
              <Box sx={{ paddingLeft: "48px", mb: "30px", mt: "20px" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Assets Photo
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "170px",
                  borderRadius: "10px ",
                  border: "2px dashed #D3D3D3",
                  lineHeight: "1.5px",
                  mx: "48px",
                  background: "#FBFBFB",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      height: "44px",
                      width: "44px",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#13B457",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    <IoCloudUploadSharp size={23} />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                justifyContent: "flex-end",
                gap: "15px",
                mx: "35px",
                mt: "40px",
              }}
            >
              <Button
                size="lg"
                sx={{
                  color: "#000000",
                  borderRadius: "15px",
                  padding: "18px 70px",
                  background: "#FABC1E",
                  "&:hover": {
                    background: "#FABC1E",
                  },
                }}
              >
                Save
              </Button>
              <Button
                size="lg"
                sx={{
                  borderRadius: "15px",
                  padding: "18px 70px",
                  background: "#000000",
                  "&:hover": {
                    background: "#000000",
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AddAnAsset;
