import React from "react";
import { Box, Sheet } from "@mui/joy";
import { Typography, Divider } from "@mui/joy";
import { SlEqualizer } from "react-icons/sl";
import { CiGlobe } from "react-icons/ci";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import { FormControl, FormLabel } from "@mui/joy";
import Grid from "@mui/joy/Grid";
import { LiaListUlSolid } from "react-icons/lia";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import Input from "@mui/joy/Input";


import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Select, Option } from "@mui/joy";
import Modal from "@mui/joy/Modal";
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import { useState } from "react";
import { selectClasses } from "@mui/joy/Select";
import { Link } from "react-router-dom";
import { Category2 } from "./CategoryEditDelete";

interface CategoryProps {}

interface CategoryProps {
  siteFormData: any;
  setSiteFormData: any;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const Category: React.FunctionComponent<CategoryProps > = (
  {
    siteFormData, 
    setSiteFormData,
    activeTab,
    setActiveTab,
  }
) => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [lapCat, setLapCat] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const newCategory: string = (e.target as any).lapCat.value;
    const newCategory: string = lapCat;
    if (categories && Array.isArray(categories)) {
      // Check if categories is iterable
      setCategories([...categories, newCategory]);
    } else {
      setCategories([newCategory]); // Initialize categories if it's not iterable
    }
    handleClose();
  };

  const handleContinue = () => {
    setFormData((prevData) => ({ ...prevData, lapCat }));

    console.log(JSON.stringify(lapCat));
  };

  const handleNextTab = () => {
    setActiveTab(activeTab + 1); 
  };

  const handlePrevTab = () => {
    setActiveTab(activeTab - 1);
};


  return (
    <div style={{ width: "100%", background: "#f9f9f9" }}>
      <Typography level="h3" sx={{ display: "flex", alignItems: "center" }}>
        <SlEqualizer
          style={{ fontSize: 23, color: "red", marginRight: "5px" }}
        />{" "}
        Step4-Categories
      </Typography>
      <div style={{ margin: "20px" }}>
        <Box
          sx={{
            borderRadius: "none",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            background: "#ffffff",
            margin: {
              xs: "4px",
              md: "52px",
            },
          }}
        >
          <Typography>
            <CiGlobe
              style={{ fontSize: 23, color: "red", marginRight: "5px" }}
            />
            Header
          </Typography>
          <Box
            fontSize="h5.fontSize"
            component="div"
            overflow="hidden"
            textOverflow="ellipsis"
            height={70}
          >
            <Divider />

            <Grid
              container
              spacing={1}
              sx={{ flexGrow: 1, paddingTop: "20px", paddingBottom: "10px" }}
            >
              <Box>
                <Typography>
                  <LiaListUlSolid size={22} color="red" />
                  List of Categories
                </Typography>
              </Box>

              <Box>
                <ButtonGroup spacing="1rem" aria-label="spacing button group">
                  <Box sx={{ borderRadius: "50px" }}>
                    <Button
                      sx={{ background: "green", color: "white" }}
                      onClick={handleClickOpen}
                    >
                      <AddIcon /> Add New Category
                    </Button>

                    <Modal
                      aria-labelledby="responsive-dialog-title"
                      aria-describedby="modal-desc"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <Sheet
                        variant="outlined"
                        sx={{
                          maxWidth: 500,
                          borderRadius: "md",
                          p: 3,
                          boxShadow: "lg",
                        }}
                      >
                        <div>
                          <Typography
                            id="responsive-dialog-title"
                            component="h2"
                            level="h4"
                            textColor="inherit"
                            fontWeight="lg"
                            mb={1}
                          >
                            {"Add a Category"}
                          </Typography>
                          <Divider />

                          <Box sx={{ marginBottom: "10px" }}>
                            <form onSubmit={handleAddCategory}>
                              <FormControl
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              ></FormControl>

                              <Box
                                sx={{
                                  marginTop: "1px",
                                  marginBottom: "15px",
                                  padding: "20px",
                                }}
                              >
                                <FormControl
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                  }}
                                >
                                  <FormLabel
                                    sx={{
                                      paddingTop: "20px",
                                      marginLeft: "20px",
                                    }}
                                  >
                                    Category*:
                                  </FormLabel>
                                  <Input
                                    value={lapCat}
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => setLapCat(e.target.value)}
                                    placeholder="Type here"
                                    sx={{ marginLeft: "20px", width: "70%" }}
                                  />
                                </FormControl>
                              </Box>
                              <Divider />

                              <Button
                                autoFocus
                                type="submit"
                                variant="solid"
                                sx={{
                                  background: "#fdd835",
                                  color: "black",
                                  marginTop: "25px",
                                  marginLeft: "40%",
                                }}
                              >
                                Add
                              </Button>

                              <Button
                                type="button"
                                onClick={handleClose}
                                autoFocus
                                variant="solid"
                                sx={{
                                  background: "black",
                                  color: "white",
                                  marginLeft: "50px",
                                }}
                              >
                                Cancel
                              </Button>
                            </form>
                          </Box>
                        </div>
                      </Sheet>
                    </Modal>
                  </Box>
                  <form onSubmit={handleAddCategory}>
                    <Button type="submit">
                      <PublishOutlinedIcon />
                      Import Categories
                    </Button>
                  </form>
                </ButtonGroup>
              </Box>
            </Grid>

            <Divider />
          </Box>

          <Box sx={{ marginTop: "20px", padding: "20px" }}>
            Add your type of groups of assets. To start with, commonly used
            categories have already been created for you. Make them as broad or
            as specific as you want. Categories can be 'laptops and printers',
            'equipments', or 'shairs'. Customize to your paticular need.
          </Box>

          <Box>
            <Select
              placeholder="10"
              value={
                categories && categories.length > 0
                  ? String(categories.length)
                  : ""
              }
              onChange={(e: any) => setCategories(e)}
              sx={{
                width: 70,
                height: 30,
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
                marginLeft: "20px",
                background: "none",
                color: "black",
              }}
              required
            >
              <Option value="10">10</Option>
              <Option value="15">15</Option>
              <Option value="20">20</Option>
            </Select>
            <Typography sx={{marginTop:'-30px', marginLeft:"10%"}}>categories</Typography>

            
            <Box
              sx={{
                marginTop: "1px",
                marginBottom: "15px",
                padding: "20px",
                "@media (max-width: 600px)": {
                  paddingLeft: "5%",
                  paddingRight: "5%",
                },
              }}
            >
              <ButtonGroup
                spacing="1rem"
                aria-label="spacing button group"
                sx={{
                  paddingLeft: { xs: "20%", md: "80%" },
                  "@media (max-width: 600px)": {
                    paddingLeft: "0",
                    justifyContent: "space-between",
                  },
                }}
              >
                <Button>
                  <NavigateBeforeOutlinedIcon />
                </Button>
                <Button sx={{ background: "#fdd835" }}>1</Button>
                <Button>
                  <NavigateNextOutlinedIcon />
                </Button>
              </ButtonGroup>
            </Box>
          </Box>

          <Box>
            <Category2 categories={categories} />
          </Box>
          <Divider />

          
          <Grid xs={12} md={4} >
              <React.Fragment>
              <Box sx={{marginTop: "1px", marginBottom: "15px", padding: "20px" }}>
            <ButtonGroup  
              spacing="1rem"
              aria-label="spacing button group"
              sx={{ paddingLeft: "84%" }}
            >
              <Button sx={{ fontSize: "15px" }}
              onClick={handlePrevTab}
              >
                <NavigateBeforeOutlinedIcon />
                
                  Back
              
              </Button>
              <Button sx={{ background: "#fdd835", fontSize: "15px" }}
              onClick={handleNextTab}
              >
                  Continue
                  <NavigateNextOutlinedIcon />{" "}
              </Button>
            </ButtonGroup>
            </Box>
              </React.Fragment>
            </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Category;
