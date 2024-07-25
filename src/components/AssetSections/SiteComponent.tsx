import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Select, Option, Button, Typography, Box, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import AddSite from "../../pages/Setup/SetupSites/AddSite";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchSites } from "../../redux/features/SitesSlice";
import { ThunkDispatch } from "redux-thunk";

interface SiteProps {
  field: any;
  formData: any;
  handleSelectChange: (value: string | null, name: string) => void;
}

const SiteComponent: React.FC<SiteProps> = ({
  field, 
  formData, 
  handleSelectChange,
}) => {
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const sites = useSelector((state: RootState) => state.sites.data);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  useEffect(() => {
    dispatch(fetchSites());
  }, [dispatch]);

  const selectChange = (e: any, newValue: string | null) => {
    handleSelectChange(newValue, field.name);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: 2 }}>
      <FormControl sx={{ width: '300px' }}>
        <FormLabel>{field.fieldName} <span style={{ color: 'red' }}>*</span></FormLabel>
        <Select
        sx={{padding: '10px',}}
          placeholder="Select Site"
          name={field.name}
          value={formData && formData['site']?.id as string}
          onChange={selectChange}
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
  onClick={() => setOpen(true)}
  variant="outlined"
  size="sm"
  sx={{
    mt: 3,
    borderRadius: '15px',
    background: '#E4E4E4',
    padding: '5px 10px', // Reduce the padding to make the button smaller
    '&:hover': {
      background: '#d9d9d9',
    },
    color: '#767676',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <AddIcon sx={{ color: '#767676', mr: '5px' }} /> {/* Reduce the margin */}
  <Typography sx={{ color: '#767676', fontSize: '0.875rem' }}> {/* Adjust the font size */}
    New
  </Typography>
</Button>

      {open && (
        <AddSite
          open={open}
          setOpen={setOpen}

        />
      )}
    </Box>
  );
};

export default SiteComponent;
