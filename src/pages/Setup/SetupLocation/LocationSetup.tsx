import Modal from "@mui/joy/Modal";
import * as React from "react";
import { Box,  Divider, Sheet } from "@mui/joy";
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
import AppView from "../../../components/Common/AppView";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

const initialData = {
  locationData: ["Banglore"],
};


console.log(JSON.stringify(initialData));

const LocationSetup: React.FunctionComponent = ({}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [matchedSelected, setMatchedSelected] = useState<number[]>([]);
  const [location, setLocation] = useState<{ locationData: string[] }>(
    initialData
  );
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
    <AppView>
      <Typography level="h4" style={{ display: "flex", alignItems: "center" }}>
        <SignpostOutlinedIcon
          style={{ fontSize: "1.4rem", color: "#d32f2f",  }}
        />
        Locations
      </Typography>

      <Box
        sx={{
          borderRadius: "none",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          background: "#ffffff",
          gap:'5px',
          
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: 'center',
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: 'center', md: 'space-between' },
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
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
                style={{ fontSize: "1.4rem", color: "#d32f2f",  alignItems: "center"  }}
              />
              List of Locations
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { md: 'row', xs: 'column' },
              gap: 2,
              // marginTop: "10px",
            }}
          >
            <Button
              autoFocus
              variant="solid"
              sx={{
                background: "#388e3c",
                borderRadius: '15px',
                color: "white",   
              }}
              component="label"
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
                  // maxWidth: 500,
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
                            marginLeft: "45px", 
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
                            width: "53%",
                            marginBottom: "10px",
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
                background: "black",
                borderRadius: '15px',
                color: "white",
              }}
            >
              <PublishOutlinedIcon />
              Import Locations
            </Button>
          </Box>
        </Box>



        <Divider />

        <Box sx={{ marginTop: "10px", padding: "20px" }}>
          You may also add Locations. Locations are a subset of Sites. For
          example, the Site may be a building or address. The Location may be a
          specific room, office, or floor within the Site. Select a Site and add
          your list of Locations here.
        </Box>

        <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: { xs: 'center', md: 'space-between' },
          marginTop: "1px", 
          marginBottom: "15px", 
          padding: "20px" 
        }}
        >
          <FormControl
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              
            }}
          >
            <FormLabel 
            sx={{ 
              
              marginTop: "6px",
              mb: { xs: 1, md: 1 } }}>
              Select a Site:
            </FormLabel>

            <Select
              placeholder="Nothing Selected"
              sx={{
                marginLeft: { md: "20px" },
              alignItems:'center',
                background: "#ff5252",  
                color: "white",
                borderRadius: '15px',
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

        <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: { xs: 'center', md: 'space-between' },
              
              // marginBottom: "10px",
              padding: '20px',
            }}
          >
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Select
                placeholder="10"
                sx={{
                  alignItems: 'center',
                  background: 'none',
                  color: 'black',
                  borderRadius: '15px',
                }}
                required
                // value={selectedValue}
                // onChange={(event) =>
                //   setSelectedValue(
                //     (event?.target as HTMLSelectElement)?.value ?? ""
                //   )
                // }
              >
                <Option value="10">10</Option>
              </Select>

              <FormLabel
                sx={{
                  marginLeft: '10px',
                  marginTop: '6px',
                  mb: { xs: 1, md: 1 },
                }}
              >
                locations
              </FormLabel>
            </FormControl>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: 1,
              }}
            >
              <Button
                sx={{
                  background: '#FDE8BC',
                  border: '1px solid #C2B083',
                  color: 'black',

                  '&:hover': {
                    background: '#FADFB4',
                  },
                }}
              >
                <NavigateBeforeOutlinedIcon />
              </Button>
              <Button
                sx={{
                  background: '#ffffff',
                  color: 'green',
                  border: '1px solid green ',

                  '&:hover': {
                    color: 'white',
                    background: 'green',
                  },
                }}
              >
                1
              </Button>
              <Button
                sx={{
                  background: '#FDE8BC',
                  border: '1px solid #C2B083',
                  color: 'black',

                  '&:hover': {
                    background: '#FADFB4',
                  },
                }}
              >
                <NavigateNextOutlinedIcon />
              </Button>
            </Box>
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
          display: 'flex',
          alignItems: 'center',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: { xs: 'center', md: 'flex-end' },
          gap: '5px',
        }}
       >
        <Box
          sx={{
            display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
            marginTop: "20px",
          }}
        >
          <Button
             variant="solid"
             autoFocus
             sx={{
               background: '#388e3c',
               color: 'white',
               borderRadius: '10px',
             }}
            onClick={handleSubmit}
          >
            
            Submit
          </Button>
        </Box>
        </Box>
      </Box>
      {/* </div>
      </div> */}
    </AppView>
  );
};

export default LocationSetup;
