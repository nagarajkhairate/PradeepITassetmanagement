import React, { ChangeEvent, useState } from "react";
import { Box, Button, Input, Modal, Option, Select, Typography } from "@mui/joy";


interface AddSiteDialogProps {
  open: boolean;
  onClose: () => void;
  setSites: React.Dispatch<React.SetStateAction<any[]>>;
  sites: any[];
}

const initialSitesData = {
  id: "",
  name: "", 
  description: "",
  address: "",
  aptSuite: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

const AddSiteDialog: React.FC<AddSiteDialogProps> = ({ open, onClose, setSites, sites }) => {
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
        <Input placeholder="Select Site" name="name" value={newSite.name} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <Input placeholder="Description" name="description" value={newSite.description} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <Input placeholder="Address" name="address" value={newSite.address} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <Input placeholder="Apt./ Suite" name="aptSuite" value={newSite.aptSuite} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <Input placeholder="city" name="city" value={newSite.city} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <Input placeholder="Zip" name="zip" value={newSite.zip} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <Input placeholder="State" name="state" value={newSite.state} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
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

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
          <Button onClick={handleAddSite}>Add Site</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSiteDialog;

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#f9f9f9',
  p: 4,
  borderRadius: 10,
};
