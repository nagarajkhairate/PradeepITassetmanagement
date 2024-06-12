import Modal from "@mui/joy/Modal";
import * as React from "react";
import { Box, Divider, Sheet } from "@mui/joy";
import Typography from "@mui/joy/Typography";
// import { SlEqualizer } from "react-icons/sl";
import Grid from "@mui/joy/Grid";
// import { LiaListUlSolid } from "react-icons/lia";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Input from "@mui/joy/Input";
import { FormControl, FormLabel } from "@mui/joy";
import { Select, Option } from "@mui/joy";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/joy/styles";
import AddIcon from "@mui/icons-material/Add";
import Popup from "./Popup";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import Buttons from "../../Common/Buttons";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";

const initialData = {
  locationData: [
    "transfer"],
};

interface LocationProps {
  companyFormData: any;
  setCompanyFormData: any;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const Location: React.FunctionComponent<LocationProps> = ({
  companyFormData,
  setCompanyFormData,
  activeTab,
  setActiveTab,
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [matchedSelected, setMatchedSelected] = useState<number[]>([]);
  const [location, setLocation] = useState<{ locationData: string[] }>(initialData);
  const [selectedValue, setSelectedValue] = useState<string | "">("");

  const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const skillElement = (e.target as HTMLFormElement).elements.namedItem(
      "skill"
    );
    const custom =
      skillElement instanceof HTMLInputElement ? skillElement.value : "";
    addSkill(custom);
  };

  const addSkill = (custom: string) => {
    setLocation({ ...location, locationData: [...location.locationData, custom] });
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedCell(null);
  };

  const handleNextTab = () => {
    setCompanyFormData((prevData: any) => ({ ...prevData, ...location }));
    setActiveTab(activeTab + 1);
  };

  const handlePrevTab = () => {
    setActiveTab(activeTab - 1);
  };

  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Custom = (e.target as HTMLFormElement).Custom.value;
    if (selectedCell !== null) {
      const updatedData = location.locationData.map((item, index) =>
        index === selectedCell ? Custom : item
      );
      setLocation({ ...location, locationData: updatedData });
      handleEditClose();
    }
    // console.log(Custom);
  };

  const handleCheckboxChange = (index: number) => {
    setMatchedSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
    setSelectedCell(index);
  };

  const handleDeleteButton = () => {
    if (selectedCell !== null) {
      handleDeleteOpen();
    }
  };

  const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData = location.locationData.filter(
      (_, index) => index !== selectedCell
    );
    setLocation({ ...location, locationData: updatedData });
    setMatchedSelected([]);
    setDeleteOpen(false);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setMatchedSelected([]);
  };

  useEffect(() => {
    setLocation(initialData);
  }, []);

  const handleEdit = () => {
    if (selectedCell !== null) {
      handleClickEditOpen();
    }
  };

  // const handleContinue = () => {

  //   console.log(JSON.stringify(location));
  // };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(event.target.value as string);
  };

  console.log(JSON.stringify(companyFormData))

  return (
    <div style={{ width: "100%", background: "#f9f9f9" }}>
      <Typography level="h4" style={{ display: "flex", alignItems: "center" }}>
        {/* <SlEqualizer
          style={{ fontSize: "0.8rem", color: "red", marginRight: "1rem" }}
        /> */}
        Step3-Locations
      </Typography>
      <div style={{ margin: "10px" }}>
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
              spacing={2}
              sx={{ flexGrow: 1, paddingTop: "20px", paddingBottom: "10px" }}
            >
              <Box>
                <Typography level="h4">
                  {/* <LiaListUlSolid style={{ fontSize: 18, color: "red" }} /> */}
                  List of Locations
                </Typography>
              </Box>

              <Box sx={{ paddingLeft: { xs: "10%", md: "30%", marginLeft:"25%" } }}>
                <ButtonGroup
                  spacing={{ xs: "0.5rem", md: "2rem"}}
                  aria-label="spacing button group"
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-start" },
                    flexDirection: { xs: "column", md: "row" },
                    
                  }}
                >
                  <Button
                    autoFocus
                    type="submit"
                    // variant="solid"
                    sx={{
                      background: "1px solid green",
                      color: "green",
                      // border: "1px solid green ",
                      borderRadius: "15px",
                      "&:hover": {
                        color: "white",
                        background: "green",
                      },
                    }}
                    onClick={handleClickOpen}
                  >
                    <AddIcon /> Add New Location
                  </Button>
                  <Modal
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    aria-labelledby="responsive-dialog-title"
                    aria-describedby="modal-desc"
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
                          {"Add an Location"}
                        </Typography>
                        <Divider />
                        <Box sx={{ marginBottom: "10px" }}>
                          <form onSubmit={handleAddSkill}>
                            <FormControl
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <FormLabel
                                sx={{
                                  paddingTop: "30px",
                                  marginLeft: "20px",
                                }}
                              >
                                Site*
                              </FormLabel>
                              <Select
                                placeholder="Select Location"
                                sx={{
                                  // width: 240,
                                  marginLeft: "45px",
                                  width: "50%",
                                  marginBottom: "30px",
                                  marginTop: "25px",
                                }}
                                // required
                              >
                                {/* <Option value=""></Option>
                              <Option value=""></Option>
                              <Option value=""></Option>
                              <Option value=""></Option> */}
                              </Select>
                            </FormControl>
                            <FormControl
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <FormLabel
                                sx={{
                                  paddingTop: "5px",
                                  marginLeft: "20px",
                                }}
                              >
                                Location*
                              </FormLabel>
                              <Input
                                variant="outlined"
                                type="text"
                                id="skill"
                                name="skill"
                                required
                                sx={{
                                  marginLeft: "15px",
                                  width: "50%",
                                  marginBottom: "10px",
                                  // marginTop: '20px'
                                }}
                              />
                            </FormControl>
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
                              variant="solid"
                              autoFocus
                              sx={{
                                background: "black",
                                color: "white",
                                marginTop: "20px",
                                marginLeft: "30px",
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
                    variant="solid"
                    sx={{
                      mr: "10px",
                      background: "#FDE8BC",
                      border: "1px solid #C2B083",
                      color: "black",
                      borderRadius: "15px",
                      "&:hover": {
                        background: "#FADFB4",
                      },
                    }}
                  >
                    <PublishOutlinedIcon />
                    Import Locations
                  </Button>
                </ButtonGroup>
              </Box>
            </Grid>

            <Divider />
          </Box>
          <Box sx={{ marginTop: "20px", padding: "20px" }}>
            You may also add Locations. Locations are a subset of Sites. For
            example, the Site may be a building or address. The Location may be
            a specific room, office, or floor within the Site. Select a Site and
            add your list of Locations here.
          </Box>
          <Box sx={{ marginTop: "1px", marginBottom: "15px", padding: "20px" }}>
            <FormControl
              sx={{
                display: "flex",
                // flexDirection: "row",
                flexDirection:{ xs: "column", md: "row" }
              }}
            >
              <FormLabel sx={{ paddingTop: "1px", mb: { xs: 1, md: 0 } }}>Select a Site:</FormLabel>
              <Select
                placeholder="Nothing Selected"
                // sx={{
                //   width: 240,
                //   marginLeft: "20px",
                //   background: "#c62828",
                //   color: "white",
                // }}
                sx={{
                  width: { xs: "100%", md: 240 },
                  marginLeft: { md: "20px" },
                  background: "#c62828",
                  color: "white",
                }}
                required
                value={selectedValue}
                onChange={(event) =>
                  setSelectedValue(
                    (event?.target as HTMLSelectElement)?.value ?? ""
                  )
                }
              >
                <Option value="Location1">Location1</Option>
              </Select>
            </FormControl>
          </Box>
          <Divider />
          <Popup
            location={location}
            matchedSelected={matchedSelected}
            handleCheckboxChange={handleCheckboxChange}
            handleEdit={handleEdit}
            handleDeleteButton={handleDeleteButton}
            handleEditClose={handleEditClose}
            handleEditButton={handleEditButton}
            editOpen={editOpen}
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
            handleDeleteSubmit={handleDeleteSubmit}
            selectedCell={selectedCell}
            handleDeleteClose={handleDeleteClose}
            setMatchedSelected={setMatchedSelected}
          />

          
          <Grid xs={12} md={4}>
            <React.Fragment>
              <Box
                sx={{ marginTop: "1px", marginBottom: "15px", padding: "20px", marginRight:"8%" }}
              >
                <ButtonGroup
                  spacing="1rem"
                  aria-label="spacing button group"
                  // sx={{ paddingLeft: "84%" }}
                  sx={{ paddingLeft: { xs: "0", md: "84%" }, justifyContent: { xs: "center", md: "flex-start" } }}
                >
                  <Button sx={{ fontSize: "15px" }} onClick={handlePrevTab}>
                    <NavigateBeforeOutlinedIcon />
                    Back
                  </Button>
                  <Button
                    sx={{ background: "#fdd835", fontSize: "15px" }}
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

export default Location;
