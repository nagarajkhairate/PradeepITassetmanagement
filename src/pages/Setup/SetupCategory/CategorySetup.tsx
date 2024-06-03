import React from "react";
import { Box, Sheet } from "@mui/joy";
import { Typography, Divider } from "@mui/joy";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import { FormControl, FormLabel } from "@mui/joy";
import Grid from "@mui/joy/Grid";

import AddIcon from "@mui/icons-material/Add";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import Input from "@mui/joy/Input";
import SignpostOutlinedIcon from "@mui/icons-material/SignpostOutlined";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Select, Option } from "@mui/joy";
import Modal from "@mui/joy/Modal";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import { useState } from "react";
import { selectClasses } from "@mui/joy/Select";
import CategorySetupEdit from "./CategorySetupEdit";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";


const CategorySetup: React.FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  // const handleSubmit = () => {
  //   console.log("Categories: ", JSON.stringify(categories));
  // };

  const handleCategoryChange = (updatedCategories: string[]) => {
    setCategories(updatedCategories);
    console.log("category: ", JSON.stringify(updatedCategories));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const newCategory: string = (e.target as any).category.value;
    const newCategory: string = category;
    if (categories && Array.isArray(categories)) {
      // Check if categories is iterable
      setCategories([...categories, newCategory]);
    } else {
      setCategories([newCategory]); // Initialize categories if it's not iterable
    }
    // console.log("After Adding Category: ", JSON.stringify(''));
    handleClose();
  };

  // const handleContinue = () => {
  //   setFormData((prevData) => ({ ...prevData, category }));

  //   console.log(JSON.stringify(category));
  // };

  //   const handleNextTab = () => {
  //     setCompanyFormData((prevData: any) => ({ ...prevData, category: category }));
  //     setActiveTab(activeTab + 1);
  //   };

  //   const handlePrevTab = () => {
  //     setActiveTab(activeTab - 1);
  // };

  return (
    <div style={{ width: "100%", background: "#f9f9f9" }}>
      <Typography level="h4" sx={{ display: "flex", alignItems: "center" }}>
        <SignpostOutlinedIcon
          style={{ fontSize: "1.4rem", color: "#d32f2f", marginLeft: "3rem" }}
        />
        Categories
      </Typography>

      <div style={{ width: "100%", background: "#f9f9f9" }}>
        <div style={{ margin: "20px" }}>
          <Box
            sx={{
              borderRadius: "15px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              background: "#ffffff",
              margin: {
                xs: "4px",
                md: "52px",
              },
            }}
          >
            <Box
              fontSize="h5.fontSize"
              component="div"
              overflow="hidden"
              textOverflow="ellipsis"
            ></Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                  alignItems: "center",
                  // mb:2
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
                    <PlaylistAddCheckOutlinedIcon
                      style={{ fontSize: "1.4rem", color: "#d32f2f" }}
                    />
                    List of Categories
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: { xs: "center", md: "flex-end" },
                    gap: 2,
                    marginTop: "20px",
                  }}
                >
                  <Button
                    sx={{
                      background: "#388e3c",
                      color: "white",
                      width: { xs: "100%", md: "auto" },
                    }}
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
                                padding: "10px",
                              }}
                            >
                              <Typography
                              sx={{ padding: "none", width:'100%'}}
                              >
                              If you want to add a new category of assets, you’re in the right spot. Add a category for computer equipment, wireless keyboards, or any assets you’re working with.
                              </Typography>
                              <FormControl
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-evenly",
                                  marginTop:'10px'
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
                                  value={category}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => setCategory(e.target.value)}
                                  placeholder="Type here"
                                  sx={{ marginLeft: "20px", width: "70%", marginTop:'10px', }}
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

                  <Button
                    autoFocus
                    type="submit"
                    sx={{
                      background: "#2196f3",
                      color: "white",
                      width: { xs: "100%", md: "auto" },
                    }}
                  >
                    <PublishOutlinedIcon />
                    Import Categories
                  </Button>
                </Box>
              </Box>
            </Box>

            <Divider />

            <Box>
              <Box sx={{ padding: "20px", marginTop: "10px" }}>
                Add the type of groups of assets. To start with, commonly used
                categories have already been created for you. Make them as broad
                or as specific as you want. Categories can be 'laptops and
                printers', 'equipment', or 'chairs'. Customize to your
                particular need.
              </Box>

              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "20px",
                  }}
                >
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
                      // marginLeft: "20px",
                      background: "none",
                      color: "black",
                    }}
                    required
                  >
                    <Option value="10">10</Option>
                    <Option value="15">15</Option>
                    <Option value="20">20</Option>
                  </Select>

                  <Typography sx={{ marginLeft: "10px", minWidth: "70px" }}>
                    categories
                  </Typography>

                  <Box
                    sx={{
                      // width: "100%",
                      display: "flex",
                      // flexDirection: { xs: "column", md: "row" },
                      // justifyContent: { xs: "center", md: "flex-end" },
                      gap: 1,
                      width: { xs: "100%", md: "auto" },
                      paddingLeft: { xs: "20%", md: "60%" },
                      
                    }}
                  >
                    <Button
                      sx={{
                        
                        background: "#FDE8BC",
                        border: "1px solid #C2B083",
                        color: "black",

                        "&:hover": {
                          background: "#FADFB4",
                        },
                      }}
                    >
                      <NavigateBeforeOutlinedIcon />
                    </Button>
                    <Button
                      sx={{
                        background: "#ffffff",
                        color: "green",
                        border: "1px solid green ",

                        "&:hover": {
                          color: "white",
                          background: "green",
                        },
                      }}
                    >
                      1
                    </Button>
                    <Button
                      sx={{
                        
                        background: "#FDE8BC",
                        border: "1px solid #C2B083",
                        color: "black",

                        "&:hover": {
                          background: "#FADFB4",
                        },
                      }}
                    >
                      <NavigateNextOutlinedIcon />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box>
              <CategorySetupEdit categories={categories}  onCategoryChange={handleCategoryChange}/>
            </Box>
            <Divider />

            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                autoFocus
                variant="solid"
                sx={{
                  background: "#FABC1E",
                  color: "black",
                  width: { xs: "100%", md: "auto" },
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box> */}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CategorySetup;
