import { Link } from "react-router-dom";
import * as React from "react";
import { Box, Divider, Typography, styled } from "@mui/joy";
import { SlEqualizer } from "react-icons/sl";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import { CiBoxList } from "react-icons/ci";
import ButtonGroup from "@mui/joy/ButtonGroup";
import { TiPlus } from "react-icons/ti";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Input from "@mui/joy/Input";
import { FormLabel } from "@mui/joy";
import { FaLessThan, FaGreaterThan } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Dialog,
  MenuItem,
  Select,
  FormControl,
  IconButton,
} from "@mui/material/";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Table, Checkbox } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialSites = [
  {
    id: "1",
    name: "swde",
    description: "wsedf",
    address: "234frd",
    aptSuite: "swed",
    city: "sedr",
    state: "sw3",
    zip: "341234",
    country: "Bahrain",
  },
  {
    id: "2",
    name: "swdefcrv",
    description: "2we34r5grt",
    address: "jkujhybgvfc",
    aptSuite: "234rfc",
    city: "sdfg",
    state: "hgfds",
    zip: "123456",
    country: "Bahrain",
  },
];

interface Data {
  name: string;
  description: string;
  address: string;
  aptSuite: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface SiteProps {
  siteFormData: any;
  setSiteFormData: any;
}

const Sites: React.FC<SiteProps> = ({
  siteFormData, 
  setSiteFormData,
}) => {
  const [siteData, setSiteData] = useState<Data>({
    name: "",
    description: "",
    address: "",
    aptSuite: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  // const [sites, setSites] = useState<[]>(initialSites);
  const [open, setOpen] = useState(false);
  const [matchedSelected, setMatchedSelected] = useState<number[]>([]);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [siteChange, setSiteChange] = useState(initialSites);
  const [sites, setSites] = useState(initialSites);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (index: number) => {
    setMatchedSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
    setSelectedCell(index);
  };


  const handleEditOpen = (siteId: string) => {
    const index = sites.findIndex((site) => site.id === siteId);
    if (index !== -1) {
      setSelectedCell(index);
      setSiteFormData({
        ...sites[index], // Populate the form data with the current site details
      });
      setEditOpen(true);
    } else {
      // Handle error: Site not found
    }
  };

  const handleAddSite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSite = { id: String(sites.length + 1), ...siteFormData };
    setSites([...sites, newSite]); // Update sites state with new site data
    setSiteChange([...siteChange, newSite]); // Update siteChange state with new site data
    setSiteFormData({
      // Reset siteFormData to empty values after adding the site
      name: "",
      description: "",
      address: "",
      aptSuite: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });
    handleClose();
  };


  const handleEditSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCell !== null) {
      const updatedData = siteChange.map((item, index) =>
        index === selectedCell ? siteFormData : item
      );
      // setSiteChange(updatedData);
      handleEditClose();
    }
  }

  const handleDeleteOpen = (siteId: string) => {
    setSelectedCell(sites.findIndex((site) => site.id === siteId));
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setSelectedCell(null);
    setDeleteOpen(false);
  };

  const handleDelete = () => {
    if (selectedCell !== null) {
      const updatedSites = sites.filter((_, index) => index !== selectedCell);
      setSites(updatedSites);
      handleDeleteClose();
    }
  };


  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedCell(null);
    setSiteFormData({
      // Reset siteFormData to empty values after closing the edit dialog
      name: "",
      description: "",
      address: "",
      aptSuite: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });
  };

  console.log("data:", initialSites);



  const FlexBox = styled(Box)({
    display: "flex",
    alignItems: "center",
  });

  return (
    <div style={{ width: "100%", background: "#f9f9f9" }}>
      <FlexBox>
        <Typography
          level="h3"
          sx={{
            marginLeft: "70px",
            fontSize: "32px",
            color: "#444", // Light color
            marginTop: "35px",
            display: "flex",
            alignItems: "center",
            marginBottom: "-42px",
          }}
        >
          <SlEqualizer size={35} color="red" /> Step 2- Sites
        </Typography>
      </FlexBox>
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
              <Grid xs={4}>
                <Box>
                  <Typography
                    level="h4"
                    sx={{
                      display: "flex",
                      fontSize: "25px",
                      alignItems: "center",
                      marginBottom: "0px",
                      marginLeft: "15px",
                    }}
                  >
                    <CiBoxList size={30} color="red" />
                    List of Sites
                  </Typography>
                </Box>
              </Grid>

              <Grid xs={8} paddingLeft="45%">
                <React.Fragment>
                  <ButtonGroup spacing="1rem" aria-label="spacing button group">
                    <Button
                      sx={{
                        background: "green",
                        color: "white",
                        fontSize: "15px",
                      }}
                      onClick={handleClickOpen}
                    >
                      <TiPlus /> Add New site
                    </Button>

                    <Dialog
                      fullScreen={fullScreen}
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogTitle
                        sx={{ fontSize: "25px", fontWeight: "bold" }}
                        id="responsive-dialog-title"
                      >
                        Add a Site
                      </DialogTitle>
                      <Divider />
                      <Box sx={{ padding: "20px" }}>
                        <Typography
                          level="body-sm"
                          sx={{ fontSize: "15px", marginBottom: "30px" }}
                        >
                          Enter the data about your new site in the fields below
                          and we will add it to your list.
                        </Typography>

                        <form onSubmit={handleAddSite}>
                          <Grid container spacing={2}>
                            <Grid xs={12} md={6}>
                              <FormControl fullWidth>
                                <FormLabel>Sites</FormLabel>  

                                <Select
                                  placeholder="Select Site"
                                  required
                                  sx={{ height: "36px" }}
                                  value={siteFormData.name}
                                  onChange={(e) =>
                                    setSiteFormData({
                                      ...siteFormData,
                                      name: e.target.value as string,
                                    })
                                  }
                                >
                                  <MenuItem value="bengaluru">
                                    Bengaluru
                                  </MenuItem>
                                  <MenuItem value="mandya">Mandya</MenuItem>
                                  <MenuItem value="hyderabad">
                                    Hyderabad
                                  </MenuItem>
                                  <MenuItem value="goa">Goa</MenuItem>
                                  <MenuItem value="chennai">Chennai</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid xs={12} md={6}>
                              <FormControl fullWidth>
                                <FormLabel>Description</FormLabel>
                                <Input
                                  type="text"
                                  value={siteFormData.description}
                                  onChange={(e) =>
                                    setSiteFormData({
                                      ...siteFormData,
                                      description: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </FormControl>
                            </Grid>
                            <Grid xs={12} md={6}>
                              <FormControl fullWidth>
                                <FormLabel>Address</FormLabel>
                                <Input
                                  type="text"
                                  value={siteFormData.address}
                                  onChange={(e) =>
                                    setSiteFormData({
                                      ...siteFormData,
                                      address: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </FormControl>
                            </Grid>
                            <Grid xs={12} md={6}>
                              <FormControl fullWidth>
                                <FormLabel>Apt./ Suite</FormLabel>
                                <Input
                                  type="text"
                                  value={siteFormData.aptSuite}
                                  onChange={(e) =>
                                    setSiteFormData({
                                      ...siteFormData,
                                      aptSuite: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </FormControl>
                            </Grid>
                            <Grid xs={12} md={6}>
                              <FormControl fullWidth>
                                <FormLabel>City</FormLabel>
                                <Input
                                  type="text"
                                  value={siteFormData.city}
                                  onChange={(e) =>
                                    setSiteFormData({
                                      ...siteFormData,
                                      city: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </FormControl>
                            </Grid>
                            <Grid xs={12} md={6}>
                              <FormControl fullWidth>
                                <FormLabel>State</FormLabel>
                                <Input
                                  type="text"
                                  value={siteFormData.state}
                                  onChange={(e) =>
                                    setSiteFormData({
                                      ...siteFormData,
                                      state: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </FormControl>
                            </Grid>
                            <Grid xs={12} md={6}>
                              <FormControl fullWidth>
                                <FormLabel>Postal Code</FormLabel>
                                <Input
                                  type="text"
                                  value={siteFormData.zip}
                                  onChange={(e) =>
                                    setSiteFormData({
                                      ...siteFormData,
                                      zip: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </FormControl>
                            </Grid>
                            <Grid xs={12} md={6}>
                              <FormControl fullWidth>
                                <FormLabel>Country</FormLabel>
                                <Select
                                  placeholder="Select Country"
                                  required
                                  sx={{ height: "36px" }}
                                  value={siteFormData.country}
                                  onChange={(e) =>
                                    setSiteFormData({
                                      ...siteFormData,
                                      country: e.target.value as string,
                                    })
                                  }
                                >
                                  <MenuItem value="india">India</MenuItem>
                                  <MenuItem value="usa">USA</MenuItem>
                                  <MenuItem value="uk">UK</MenuItem>
                                  <MenuItem value="australia">
                                    Australia
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                          <Box sx={{ width: "100%", marginTop: "40px" }}>
                            <Divider />
                          </Box>
                          <Grid xs={12} sx={{ textAlign: "right" }}>
                            <Button
                              type="submit"
                              variant="solid"
                              sx={{
                                background: "#fdd835",
                                color: "black",
                                marginRight: "10px",
                              }}
                            >
                              Add
                            </Button>
                            <Button type="button" onClick={handleClose}>
                              Cancel
                            </Button>
                          </Grid>
                        </form>
                      </Box>
                    </Dialog>

                    <Button sx={{ fontSize: "15px" }}>
                      <AiOutlineCloudUpload />
                      Import Sites
                    </Button>
                  </ButtonGroup>
                </React.Fragment>
              </Grid>
            </Grid>
            <Divider />
          </Box>
          <Box sx={{ marginTop: "20px", padding: "20px", fontSize: "18px" }}>
            <b>AssetTiger</b> allows you to enter multiple <b>Sites</b>. For
            example, the <b>Site</b> may be a building or address. This means
            that you can better track each asset that is assigned to a given{" "}
            <b>Site</b>. A detailed <b>Site</b> makes it easy to find and count
            each asset.
          </Box>
          <Divider />

          <Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "40px",
                marginTop: "60px",
              }}
            >
              <Table
                borderAxis="both"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th style={{ width: 30 }}>
                      <Checkbox
                        size="sm"
                        indeterminate={
                          matchedSelected.length > 0 &&
                          matchedSelected.length < siteChange.length
                        }
                        checked={
                          matchedSelected.length > 0 &&
                          matchedSelected.length === siteChange.length
                        }
                        onChange={() => {
                          if (
                            matchedSelected.length > 0 &&
                            matchedSelected.length === siteChange.length
                          ) {
                            setMatchedSelected([]);
                          } else {
                            const newSelecteds = siteChange.map(
                              (_, index) => index
                            );
                            setMatchedSelected(newSelecteds);
                          }
                        }}
                      />
                    </th>
                    <th>Site</th>
                    <th>Description</th>
                    <th>Address</th>
                    <th>Apt. / Suite</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Country</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                {siteChange.map((site, index) => (
                    <tr key={site.id}>
                      <td>
                        <Checkbox
                        size="sm"
                          checked={matchedSelected.includes(index)}
                          onChange={() => handleCheckboxChange(index)}
                          color="primary"
                        />
                      </td>
                      <td>{site.name}</td>
                      <td>{site.description}</td>
                      <td>{site.address}</td>
                      <td>{site.aptSuite}</td>
                      <td>{site.city}</td>
                      <td>{site.state}</td>
                      <td>{site.zip}</td>
                      <td>{site.country}</td>

                      <td>
                      <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={() => handleEditOpen(site.id)}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                      </td>
                      <td>
                      <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => handleDeleteOpen(site.id)}
                        >
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Stack>
          </Box>

          <Divider />

          <Box sx={{ marginTop: "1px", marginBottom: "15px", padding: "20px" }}>
            <ButtonGroup
              spacing="1rem"
              aria-label="spacing button group"
              sx={{ paddingLeft: "84%" }}
            >
              <Button sx={{ fontSize: "15px" }}>
                <FaLessThan />
                <Link to="/" style={{ textDecoration: "none" }}>
                  Back
                </Link>
              </Button>
              <Button sx={{ background: "#fdd835", fontSize: "15px" }}>
                <Link
                  to="../TableOptions"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Continue
                </Link>
                <FaGreaterThan />{" "}
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Site</DialogTitle>
        <Divider />
        <Box sx={{ padding: "20px" }}>
          <form onSubmit={handleEditSave}>
            <Grid container spacing={2}>
              <Grid  xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={siteFormData.name}
                    onChange={(e) =>
                      setSiteFormData({
                        ...siteFormData,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </FormControl>
              </Grid>
              <Grid  xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    name="description"
                    value={siteFormData.description}
                    onChange={(e) =>
                      setSiteFormData({
                        ...siteFormData,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </FormControl>
              </Grid>
              <Grid  xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    name="address"
                    value={siteFormData.address}
                    onChange={(e) =>
                      setSiteFormData({
                        ...siteFormData,
                        address: e.target.value,
                      })
                    }
                    required
                  />
                </FormControl>
              </Grid>
              <Grid  xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Apt./ Suite</FormLabel>
                  <Input
                    type="text"
                    name="aptSuite"
                    value={siteFormData.aptSuite}
                    onChange={(e) =>
                      setSiteFormData({
                        ...siteFormData,
                        aptSuite: e.target.value,
                      })
                    }
                    required
                  />
                </FormControl>
              </Grid>
              <Grid  xs={12}>
                <FormControl fullWidth>
                  <FormLabel>City</FormLabel>
                  <Input
                    type="text"
                    name="aptSuite"
                    value={siteFormData.city}
                    onChange={(e) =>
                      setSiteFormData({
                        ...siteFormData,
                        city: e.target.value,
                      })
                    }
                    required
                  />
                </FormControl>
              </Grid>
              <Grid  xs={12}>
                <FormControl fullWidth>
                  <FormLabel>State</FormLabel>
                  <Input
                    type="text"
                    name="aptSuite"
                    value={siteFormData.state}
                    onChange={(e) =>
                      setSiteFormData({
                        ...siteFormData,
                        state: e.target.value,
                      })
                    }
                    required
                  />
                </FormControl>
              </Grid>
              <Grid  xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Zip</FormLabel>
                  <Input
                    type="text"
                    name="aptSuite"
                    value={siteFormData.zip}
                    onChange={(e) =>
                      setSiteFormData({
                        ...siteFormData,
                        zip: e.target.value,
                      })
                    }
                    required
                  />
                </FormControl>
              </Grid>
              <Grid  xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Country</FormLabel>
                  <Input
                    type="text"
                    name="aptSuite"
                    value={siteFormData.country}
                    onChange={(e) =>
                      setSiteFormData({
                        ...siteFormData,
                        country: e.target.value,
                      })
                    }
                    required
                  />
                </FormControl>
              </Grid>
              {/* Add other form fields like city, state, zip, country similarly */}
            </Grid>
            <Box sx={{ width: "100%", marginTop: "40px" }}>
              <Divider />
            </Box>
            <Grid container justifyContent="flex-end">
              <Button
                type="submit"
                variant="solid"
                sx={{
                  background: "#fdd835",
                  color: "black",
                  marginRight: "10px",
                }}
              >
                Update
              </Button>
              <Button onClick={handleEditClose}>Cancel</Button>
            </Grid>
          </form>
        </Box>
      </Dialog>



      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <Divider />
        <Box sx={{ padding: "20px" }}>
          <Typography>Are you sure you want to delete this site?</Typography>
          <Grid container justifyContent="flex-end" sx={{ marginTop: "20px" }}>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleDeleteClose}>Cancel</Button>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
};

export default Sites;
