import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Select, Option, Button, Typography, Box, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import AddSite from "../../../../pages/Setup/SetupSites/AddSite";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { fetchSites } from "../../../../redux/features/SitesSlice";
import { ThunkDispatch } from "redux-thunk";

interface SiteProps {
  field: { fieldName: string; name: string; options: { value: string; label: string; }[] };
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setValidationMessages: React.Dispatch<React.SetStateAction<any>>;
  mode: string;
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

const SiteComponent: React.FC<SiteProps> = ({
  field, 
  formData, 
  setFormData, 
  setValidationMessages, 
  mode
}) => {
  const [error, setError] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const sites = useSelector((state: RootState) => state.sites.data);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  useEffect(() => {
    dispatch(fetchSites());
  }, [dispatch]);

  const handleSelectChange = (
    event: React.SyntheticEvent<Element, Event> | null,
    newValue: any,
    fieldName: string,
  ) => {
    if (!event) return;
    setFormData((prevData:any) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
    setValidationMessages((prevState:any) => ({ ...prevState, [fieldName]: '' }));
  };

  const handleOpenDialog = (modalName: string) => {
    setOpenDialog(modalName);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: 2 }}>
      <FormControl sx={{ width: '200px' }}>
        <FormLabel>{field.fieldName}</FormLabel>
        <Select
          placeholder="Select Site"
          value={formData[field.name] || ''}
          onChange={(e, newValue) => handleSelectChange(e, newValue, field.name)}
        >
          {sites.map((site) => (
            <Option key={site.id} value={site.id}>
              {site.siteName}
            </Option>
          ))}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>

      <Button
        onClick={() => handleOpenDialog(field.fieldName)}
        variant="outlined"
        size="sm"
        sx={{
          width: '187px',
          fontSize: '20px',
          borderRadius: '15px',
          background: '#E4E4E4',
          '&:hover': {
            background: '#d9d9d9',
          },
          color: '#767676',
        }}
      >
        <Typography sx={{ mr: '25px', color: '#767676' }}>
          <AddIcon />
        </Typography>
        <Typography sx={{ mr: '25px', color: '#767676' }}>
          New
        </Typography>
      </Button>

      {openDialog === field.fieldName && (
        <AddSite
          open={openDialog === field.fieldName}
          onClose={handleCloseDialog}
          onSave={(newSite: Site) => {
            dispatch(fetchSites()); 
            handleCloseDialog();
          }}
        />
      )}
    </Box>
  );
};

export default SiteComponent;
