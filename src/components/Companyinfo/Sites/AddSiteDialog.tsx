import React, { ChangeEvent, useState } from "react";
import { Box, Button, Input, Modal, Option, Select, Typography } from "@mui/joy";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { addSites } from "../../../Redux/features/SitesSlice";
import { RootState } from "../../../redux/store";


interface AddSiteDialogProps {
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

const initialSitesData: Site= {
  siteName: "", 
  description: "",
  address: "",
  aptSuite: "",
  city: "",
  state: "",
  zipCode: 0,
  country: "",
};

const AddSiteDialog: React.FC<AddSiteDialogProps> = ({ open, onClose, onSave}) => {
  const [newSite, setNewSite] = useState<Site>(initialSitesData);
  const [newCountry, setNewCountry] = useState(initialSitesData);

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


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewSite((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddSite =async () => {
    onSave(newSite);

    console.log(JSON.stringify(newSite))
    await dispatch(addSites(newSite)); 
    setNewSite(initialSitesData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography level="h4" sx={{ mb: 2 }}>Add New Site</Typography>
        <Input placeholder="Select Site" name="siteName" value={newSite.siteName} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <Input placeholder="Description" name="description" value={newSite.description} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <Input placeholder="Address" name="address" value={newSite.address} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <Input placeholder="Apt./ Suite" name="aptSuite" value={newSite.aptSuite} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <Input placeholder="city" name="city" value={newSite.city} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <Input placeholder="Zip" name="zipCode" value={newSite.zipCode} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
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
