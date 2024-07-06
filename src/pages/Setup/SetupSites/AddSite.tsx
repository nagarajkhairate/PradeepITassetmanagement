import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Input, Modal, Option, Select, Typography , FormLabel, FormControl, Grid, Divider } from "@mui/joy";
import { addSites } from '../../../redux/features/SitesSlice'
import {  useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";

interface AddSiteProps {
  open: boolean;
  onClose: () => void;
  onSave: (site: Site) => void
}

interface Site {
  siteName: string;
  description: string;
  address: string;
  aptSuite: string;
  city: string;
  state: string;
  zipCode: number;
  country: string;
}

// interface SitesState {
//   data: Site[];
//   selectedSites: any; 
//   loading: boolean;
//   error: any; 
// }

const initialSiteData: Site = {
  siteName: "",
  description: "",
  address: "",
  aptSuite: "",
  city: "",
  state: "",
  zipCode: 0,
  country: "",
};

const AddSite: React.FC<AddSiteProps> = ({ open, onClose, onSave }) => {
  const [newSite, setNewSite] = useState<Site>(initialSiteData);
  const [zipCodeError, setZipCodeError] = useState<string | null>(null)

  // const users=useSelector((state: { users: SitesState }) =>state.users);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const handleSelectChange = (
    event: React.SyntheticEvent<Element, Event> | null,
    newValue: string | null,
    field: string
  ) => {
    if (newValue !== null) {
      setNewSite((prevState) => ({ ...prevState, [field]: newValue }));
    }
  };

  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'zipCode') {
      const zipCodeRegex = /^\d*$/
      if (!zipCodeRegex.test(value)) {
        setZipCodeError('Zip Code must be numeric')
        return
      } else {
        setZipCodeError(null)
      }
    }
    setNewSite((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddSite = async () => {
    const capitalizedSite = {
      ...newSite,
      siteName: capitalizeWords(newSite.siteName),
      description: capitalizeWords(newSite.description),
      address: capitalizeWords(newSite.address),
      aptSuite: capitalizeWords(newSite.aptSuite),
      city: capitalizeWords(newSite.city),
      state: capitalizeWords(newSite.state),
      country: capitalizeWords(newSite.country),
    };
    onSave(capitalizedSite);
    console.log(JSON.stringify(capitalizedSite))
    await dispatch(addSites(capitalizedSite)); 
    setNewSite(initialSiteData);
    onClose();
  };

  return (  
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography level="h4" sx={{ mb: 2 }}>Add New Site</Typography>
        <Divider/>
       
        <Typography sx={{mb: 2}}>Enter the data about your new site in the fields below and we will add it to your list.</Typography>
        <Grid container spacing={2}>
        <Grid  xs={12} md={6}>
        <FormLabel>Site</FormLabel>
        <Input placeholder="Select Site" name="siteName" value={newSite.siteName} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <FormLabel>Description</FormLabel>
        <Input placeholder="Description" name="description" value={newSite.description} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <FormLabel>Address</FormLabel>
        <Input placeholder="Address" name="address" value={newSite.address} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <FormLabel>Apt. / Suite</FormLabel>
        <Input placeholder="Apt./ Suite" name="aptSuite" value={newSite.aptSuite} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        </Grid>
        <Grid  xs={12} md={6}>
        <FormLabel>City</FormLabel>
        <Input placeholder="city" name="city" value={newSite.city} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <FormLabel>Zip Code</FormLabel>
        <Input placeholder="ZipCode" name="zipCode" value={newSite.zipCode} onChange={handleChange} fullWidth sx={{ mb: 2 }}  error={!!zipCodeError}
                    helperText={zipCodeError} />
        <FormLabel>State</FormLabel>
        <Input placeholder="State" name="state" value={newSite.state} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <FormLabel>Country</FormLabel>
        <Select
          placeholder="Select Country"
          name="country"
          required
          sx={{ height: "36px", mb: 2 }}
          value={newSite.country}
          onChange={(event, newValue) => handleSelectChange(event, newValue, "country")}
        >
          <Option value="india">India</Option>
          <Option value="usa">USA</Option>
          <Option value="canada">Canada</Option>
          <Option value="shrilankha">Shrilankha</Option>
        </Select>
        </Grid>
        </Grid>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
      
        <Button
  onClick={onClose}
  sx={{
    mr: 1,
    background: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: '#333', // Darker shade of black
    },
  }}
>
  Cancel
</Button>
<Button
  onClick={handleAddSite}
  sx={{
    background: '#fdd835',
    color: 'black',
    '&:hover': {
      backgroundColor: '#c6a700', // Darker shade of #fdd835
    },
  }}
>
  Add Site
</Button>

        </Box>
      </Box>
    </Modal>
  );
};

export default AddSite;

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  p: 4,
  borderRadius: 10,
  maxWidth:"600px",
  maxHeight: '90vh', 
  overflowY: 'auto'
};
