import * as React from "react";
import { Box, Divider, Typography, styled } from "@mui/joy";
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import { CiBoxList } from "react-icons/ci";
import ButtonGroup from "@mui/joy/ButtonGroup";
import { FaLessThan, FaGreaterThan } from "react-icons/fa6";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useTheme } from "@mui/material/styles";
import { Stack, Table, Checkbox } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddSiteDialog from "./AddSiteDialog";
import EditSiteDialog from "./EditSiteDialog";
import DeleteSiteDialog from "./DeleteSiteDialog";


const initialSites = [
  {
    id: 1,
    name: "swde",
    description: "wsedf",
    address: "234frd",
    aptSuite: "swed",
    city: "sedr",
    state: "sw3",
    zip: "341234",
    country: "Bahrain",
  },
];

interface Site {
  id: number;
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
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const Sites: React.FC<SiteProps> = ({
  siteFormData, 
  setSiteFormData,
  activeTab,
  setActiveTab,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [matchedSelected, setMatchedSelected] = useState<number[]>([]);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  // const [siteChange, setSiteChange] = useState(initialSites);
  const [sites, setSites] = useState(initialSites);

  const handleDeleteClick = (site: any) => {
    setSelectedSite(site);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    const updatedSites = sites.filter((site) => site.id !== selectedSite.id);
    setSites(updatedSites);
    setDeleteOpen(false);
    setSelectedSite(null);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setSelectedSite(null);
  };


  const handleCheckboxChange = (index: number) => {
    setMatchedSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
    setSelectedCell(index);
  };

  const handleEditOpen = (siteId: number) => {
    // const index = sites.findIndex((site) => site.id === siteId);
    // if (index !== -1) {
    //   setSelectedCell(index);
    //   setSiteFormData({
    //     ...sites[index], 
    //   });
    //   setEditOpen(true);
    // }
  };

  const handleDeleteOpen = (siteId: number) => {
    // setSelectedCell(sites.findIndex((site) => site.id === siteId));
    // setDeleteOpen(true);
  };
 
  const handleEditClick = (site : Site) => {
    setSelectedSite(site);
    setEditDialogOpen(true);
  };

  const handleNextTab = () => {
    setActiveTab(activeTab + 1); 
  };

  const handlePrevTab = () => {
    setActiveTab(activeTab - 1);
};

  const FlexBox = styled(Box)({
    display: "flex",
    alignItems: "center",
  });

  console.log(JSON.stringify(sites))

  return (
    <div style={{ width: "100%", background: "#f9f9f9" }}>
      <FlexBox>
        <Typography
          level="h3"
          sx={{
            marginLeft: "70px",
            fontSize: "32px",
            color: "#444",
            marginTop: "35px",
            display: "flex",
            alignItems: "center",
            marginBottom: "-42px",
          }}
        >
          <TuneOutlinedIcon fontSize="large" /> Step 2- Sites
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
                      onClick={() => setOpen(true)}
                    >
                      <AddIcon /> Add New site
                    </Button>

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
                          matchedSelected.length < sites.length
                        }
                        checked={
                          matchedSelected.length > 0 &&
                          matchedSelected.length === sites.length
                        }
                        onChange={() => {
                          if (
                            matchedSelected.length > 0 &&
                            matchedSelected.length === sites.length
                          ) {
                            setMatchedSelected([]);
                          } else {
                            const newSelecteds = sites.map(
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
                  {sites && sites.map((site, index) => (
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
                      
                      
                        <div >
                        <Button
                          aria-label="edit"
                          key={site.id}
                          onClick={() => handleEditClick(site)}
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                        </div>
                      </td>
                      <td>
                        <Button
                          aria-label="delete"
                          key={site.id}
                          onClick={() => handleDeleteClick(site)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Stack>
          </Box>

          <Divider sx={{ marginTop: "30px" }} />
          

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
                <FaLessThan />
                
                  Back
              
              </Button>
              <Button sx={{ background: "#fdd835", fontSize: "15px" }}
              onClick={handleNextTab}
              >
                  Continue
                <FaGreaterThan />{" "}
              </Button>
            </ButtonGroup>
            </Box>
              </React.Fragment>
            </Grid>
          {/* </Grid> */}
        </Box>
      </div>

      <AddSiteDialog open={open} onClose={() => setOpen(false)} setSites={setSites} sites={sites}/>

     
       {selectedSite && (
      <EditSiteDialog
        fullScreen={fullScreen}
        open={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        // siteFormData={siteFormData}
        // setSiteFormData={setSiteFormData}
        site={selectedSite}
        sites={sites}
        setSites={setSites}
      />
       )}

      <DeleteSiteDialog
        deleteOpen={deleteOpen} 
        handleDelete={handleDelete} 
        handleDeleteClose={handleDeleteClose}
      />
    </div>
  );
};

export default Sites;
