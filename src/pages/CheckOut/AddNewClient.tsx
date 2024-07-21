import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Select, Option, Button, Typography, Box, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { fetchClient } from "../../redux/features/ClientSlice";
import AddClient from "./AddClient";

interface AddClientProps {
  field: any;
  formData: any;
  handleSelectChange: (value: string | null, name: string) => void;
}

const AddNewClient: React.FC<AddClientProps> = ({
  field, 
  formData, 
  handleSelectChange,
}) => {
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const addClient = useSelector((state: RootState) => state.addClient.data);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  useEffect(() => {
    dispatch(fetchClient());
  }, [dispatch]);

  const selectChange = (e: any, newValue: string | null) => {
    handleSelectChange(newValue, field.name);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleClientAdd = (newEmployeeName: string) => {
    setOpen(false);
    dispatch(fetchClient());
  };
 
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: 2 }}>
      <FormControl sx={{ width: '300px' }}>
        <FormLabel>{field.fieldName}</FormLabel>
        <Select
          placeholder="Select Client"
          name={field.name}
          value={formData[field.name] as string}
          onChange={selectChange}
        >
          {addClient.map((client) => (
            <Option key={client.id} value={client.id}>
              {client.personName}
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
          mt:3,
          borderRadius: '15px',
          background: '#E4E4E4',
          '&:hover': {
            background: '#d9d9d9',
          },
          color: '#767676',
        }}
      >
        <Typography sx={{ mr: '10px', color: '#767676' }}>
          <AddIcon />
        </Typography>
        <Typography sx={{ mr: '10px', color: '#767676' }}>
          New
        </Typography>
      </Button>

      {open && 
        <AddClient
        open={open}
        onClose={handleModalClose}
        onAddClient={handleClientAdd}
        />
     
      }
    </Box>
  );
};

export default AddNewClient;
