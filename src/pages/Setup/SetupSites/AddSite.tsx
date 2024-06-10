import React, { ChangeEvent, useState } from "react";
import { Box, Button, Input, Modal, Option, Select, Typography , FormLabel, FormControl, Grid, Divider } from "@mui/joy";


interface AddSiteProps {
  open: boolean;
  onClose: () => void;
  setSites: React.Dispatch<React.SetStateAction<any[]>>;
  sites: any[];
}

const initialSitesData = {
  sitename: "", 
  description: "",
  address: "",
  aptSuite: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
};

const AddSite: React.FC<AddSiteProps> = ({ open, onClose, setSites, sites }) => {
  const [newSite, setNewSite] = useState(initialSitesData);
  const [newCountry, setNewCountry] = useState(initialSitesData);

  const handleSelectChange = (
    event: React.SyntheticEvent<Element, Event> | null,
    newValue: string | null,
    field: string
  ) => {
    if (newValue !== null) {
      setNewSite((prevState) => ({ ...prevState, [field]: newValue }));
    }
  };


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewSite((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddSite = () => {
    const newSiteWithId = { ...newSite};
    setSites([...sites, newSiteWithId]);
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
        <Input placeholder="Select Site" name="sitename" value={newSite.sitename} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
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
        <Input placeholder="ZipCode" name="zipCode" value={newSite.zipCode} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
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
      
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
      
          <Button onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
          <Button onClick={handleAddSite}>Add Site</Button>
       
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
