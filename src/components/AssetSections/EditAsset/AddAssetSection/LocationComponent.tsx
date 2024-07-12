import React, { useState, ChangeEvent } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Select, Option, Button, Typography, Box, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import AddLocation from "../../../Companyinfo/Location/AddLocation";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addLocation, fetchLocation } from "../../../../redux/features/LocationSlice";
import { ThunkDispatch } from "redux-thunk";

interface LocationProps {
  field: { fieldName: string; name: string; options: { value: string; label: string; }[] };
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setValidationMessages: React.Dispatch<React.SetStateAction<any>>;
  mode: string;
}

const LocationComponent: React.FC<LocationProps> = ({
  field, 
  formData, 
  setFormData, 
  setValidationMessages, 
  mode
}) => {
  const [error, setError] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const locations = useSelector((state: RootState) => state.location.data);
  const [open, setOpen] = useState<boolean>(false)
  const [locationForm, setLocationForm] = useState<{ [key: string]: any }>({});
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const handleSelectChange = (
    event: React.SyntheticEvent<Element, Event> | null,
    newValue: any,
    fieldName: string
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

  const handleAddLocation = (newLocation: Location) => {
    dispatch(addLocation(newLocation))
      .unwrap()
      .then(() => {
        dispatch(fetchLocation);
      })
      .catch((error) => {
        console.error('Failed to add location:', error);
      });
    handleCloseDialog();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: 2 }}>
      <FormControl sx={{ width: '200px' }}>
        <FormLabel>{field.fieldName}</FormLabel>
        <Select
          placeholder="Select Location"
          value={formData[field.name] || ''}
          onChange={(e, newValue) => handleSelectChange(e, newValue, field.name)}
        >
          {locations.map((location) => (
            <Option key={location.id} value={location.id}>
              {location.location}
            </Option>
          ))}
        </Select>
        {error && <FormHelperText >{error}</FormHelperText>}
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
        <AddLocation
          open={openDialog === field.fieldName}
          handleClose={handleCloseDialog}
          setOpen={setOpen}
        />
      )}
    </Box>
  );
};

export default LocationComponent;
