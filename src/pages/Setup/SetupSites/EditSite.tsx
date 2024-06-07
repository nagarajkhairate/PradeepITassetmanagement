import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Input, Button, FormControl, FormLabel, Grid, Divider } from "@mui/joy";

interface EditSiteProps {
  fullScreen: boolean;
  open: boolean;
  onClose: () => void;

  site: {
    id: number;
    sitename: string;
    description: string;
    address: string;
    aptSuite: string;
    city: string;
    state: string;
    zipCode: number;
    country: string;
  };
  sites: {
    id: number;
    sitename: string;
    description: string;
    address: string;
    aptSuite: string;
    city: string;
    state: string;
    zipCode: number;
    country: string;
  }[];
  setSites: React.Dispatch<React.SetStateAction<any[]>>;
}
const initialSitesData = {
  id: "",
  sitename: "", 
  description: "",
  address: "",
  aptSuite: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
};

const EditSite: React.FC<EditSiteProps> = ({
    open,
    onClose,
    site,
    sites,
    setSites,
}) => {
    const [updatedSite, setUpdatedSite] = useState(site);
    const [newSite, setNewSite] = useState(initialSitesData);

    useEffect(() => {
        if (site) {
          setUpdatedSite(site);
        }
      }, [site]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedSite((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleEditSite = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const updatedSites = sites.map((s) =>
  //     s.id === updatedSite.id ? updatedSite : s
  //   );
  //   setSites(updatedSites);
  //   onClose();
  // };

  // if (!updatedSite) {
  //   return null; 
  // }

  const handleEditSite = () => {
    const updatedSites = { ...updatedSite};
    setSites([updatedSites]);
    onClose();
  };

  // const handleEditSite = (site : any) => {
  //   setSites(site);
  //   onClose();
  // };

 
  return (
    <Modal open={open} onClose={onClose}>

      <Box sx={modalStyle}>
        <Typography level="h4" sx={{ mb: 2 }}>
          Edit Site
        </Typography>
        <Divider/>
        <form onSubmit={handleEditSite}>
        <Grid container spacing={2}>
          <Grid  xs={12} md={6}>
          <FormControl sx={{ mb: 2 }}>
          <FormLabel>Site</FormLabel>
        <Input
          placeholder="Site Name"
          name="sitename"
          value={updatedSite.sitename}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
         </FormControl>
<FormControl sx={{ mb: 2 }}>
<FormLabel>Description</FormLabel>
        <Input
          placeholder="Description"
          name="description"
          value={updatedSite.description}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
         </FormControl>
         <FormControl sx={{ mb: 2 }}>
         <FormLabel>Description</FormLabel>
        <Input
          placeholder="Address"
          name="address"
          value={updatedSite.address}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
         </FormControl>
         <FormControl sx={{ mb: 2 }}>
         <FormLabel>Description</FormLabel>
        <Input
          placeholder="Apt. / Suite"
          name="aptSuite"
          value={updatedSite.aptSuite}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
         </FormControl>
         </Grid>
         <Grid  xs={12} md={6}>
         <FormControl sx={{ mb: 2 }}>
         <FormLabel>Description</FormLabel>
        <Input
          placeholder="City"
          name="city"
          value={updatedSite.city}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
         </FormControl>
         <FormControl sx={{ mb: 2 }}>
         <FormLabel>Description</FormLabel>
        <Input
          placeholder="State"
          name="state"
          value={updatedSite.state}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        </FormControl>
        <FormControl sx={{ mb: 2 }}>
        <FormLabel>Description</FormLabel>
        <Input
          placeholder="ZipCode"
          name="zipCode"
          value={updatedSite.zipCode}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        </FormControl>
        <FormControl sx={{ mb: 2 }}>
        <FormLabel>Description</FormLabel>
        <Input
          placeholder="Country"
          name="country"
          value={updatedSite.country}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        </FormControl>
        </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button 
          type="Submit"
           >
            Update
            </Button>
        </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditSite;

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "White",
  p: 4,
  borderRadius: 10,
  maxWidth:"600px",
  maxHeight: '90vh', 
  overflowY: 'auto'
};
