import Modal from "@mui/joy/Modal";
import * as React from "react";
import { Box, ButtonGroup, Divider, Grid, Sheet } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { FormControl, FormLabel } from "@mui/joy";
import { Select, Option } from "@mui/joy";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/joy/styles";
import AddIcon from "@mui/icons-material/Add";
import SetupPopup from "./SetupPopup";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import Buttons from "../../../components/Common/Buttons";
import SignpostOutlinedIcon from "@mui/icons-material/SignpostOutlined";


const initialData={
  locationData: ["Banglore"],
} 


console.log(JSON.stringify(initialData));

const LocationSetup: React.FunctionComponent = ({}) => {
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
    setLocation({
      ...location,
      locationData: [...location.locationData, custom],
    });
    // console.log("After Adding Location: ", JSON.stringify(location));
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

  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Custom = (e.target as HTMLFormElement).Custom.value;
    if (selectedCell !== null) {
      const updatedData = location.locationData.map((item, index) =>
        index === selectedCell ? Custom : item
      );
      setLocation({ ...location, locationData: updatedData });
      // console.log("After Editing Location: ", JSON.stringify(location));
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
    // console.log("After Deleting Location: ", JSON.stringify(location));
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


  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(event.target.value as string);
  };

  const handleSubmit = () => {
    console.log("location: ", JSON.stringify(location));
  };

  // console.log(JSON.stringify(companyFormData))

  return (
    <div style={{ width: "100%", background: "#f9f9f9" }}>
      <Typography level="h4" style={{ display: "flex", alignItems: "center" }}>
        <SignpostOutlinedIcon
          style={{ fontSize: "1.4rem", color: "#d32f2f", marginLeft: "3rem" }}
        />
        Locations
      </Typography>

      <div style={{ width: "100%", background: "#f9f9f9" }}>
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
              // height={70}
            >
              </Box>

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
                      List of Locations
                    </Typography>
                  </Box>

                  <Box
                    // sx={{ paddingLeft: { xs: "10%", md: "30%", marginLeft:"25%" } }}
                    sx={{
                      width: "100%",
                      display: "flex",

                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: { xs: "center", md: "flex-end" },
                      gap: 2,
                      marginTop: "20px",
                    }}
                  >
                    {/* <Box> */}
                      <Button
                        autoFocus
                        variant="solid"
                        sx={{
                          background: "#388e3c",
                          color: "white",
                          width: { xs: "100%", md: "auto" },
                        }}
                        component="label"
                        onClick={handleClickOpen}
                      >
                        <AddIcon /> Add New Location
                      </Button>
                    {/* </Box> */}
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
                                ></Select>
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

                    {/* <Box> */}
                      <Button
                        autoFocus
                        type="submit"
                        variant="solid"
                        sx={{
                          background: "black",
                          color: "white",
                          width: { xs: "100%", md: "auto" },
                        }}
                      >
                        <PublishOutlinedIcon />
                        Import Locations
                      </Button>
                    {/* </Box> */}
                  </Box>
                </Box>
              </Box>


            <Divider />

            <Box sx={{ marginTop: "10px", padding: "20px" }}>
              You may also add Locations. Locations are a subset of Sites. For
              example, the Site may be a building or address. The Location may
              be a specific room, office, or floor within the Site. Select a
              Site and add your list of Locations here.
            </Box>
            <Box
              sx={{ marginTop: "1px", marginBottom: "15px", padding: "20px" }}
            >
              <FormControl
                sx={{
                  display: "flex",
                  // flexDirection: "row",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <FormLabel sx={{ paddingTop: "1px", mb: { xs: 1, md: 0 } }}>
                  Select a Site:
                </FormLabel>
                <Select
                  placeholder="Nothing Selected"
                  // sx={{
                  //   width: 240,
                  //   marginLeft: "20px",
                  //   background: "#c62828",
                  //   color: "white",
                  // }}
                  sx={{
                    width: { md: 140, xs: '100%' },
                    marginLeft: { md: "20px" },
                    background: '#ff5252',
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
            {/* <Divider /> */}
            <SetupPopup
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
            <Box
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
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default LocationSetup;
