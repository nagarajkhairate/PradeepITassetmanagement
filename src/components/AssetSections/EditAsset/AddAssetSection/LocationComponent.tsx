import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Select, Option, Button, Typography, Box, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import AddLocation from "../../../Companyinfo/Location/AddLocation";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocation } from "../../../../redux/features/LocationSlice";
import { ThunkDispatch } from "redux-thunk";
interface LocationProps {
  field: { fieldName: string; name: string; options: { value: string; label: string; }[] };
  formData: any;
  handleSelectChange: (value: string | null, name: string) => void;
}

const LocationComponent: React.FC<LocationProps> = ({
  field, 
  formData, 
  handleSelectChange
}) => {
  const [error, setError] = useState<string>("");
  const locations = useSelector((state: RootState) => state.location.data);
  const [open, setOpen] = useState<boolean>(false)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const selectChange = (e: any, newValue: string | null) => {
    handleSelectChange(newValue, field.name);
  };

  useEffect(()=>{
    dispatch(fetchLocation())
  },[dispatch])
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: 2 }}>
      <FormControl sx={{ width: '200px' }}>
        <FormLabel>{field.fieldName}</FormLabel>
        <Select
          placeholder="Select Location"
          name={field.name}
          value={formData[field.name] as string}
          onChange={selectChange}
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
        onClick={() => setOpen(true)}
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

      {open && (
        <AddLocation
          open={open}
          setOpen={setOpen}
        />
      )}
    </Box>
  );
};

export default LocationComponent;
