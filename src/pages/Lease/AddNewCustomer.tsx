import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Select, Option, Button, Typography, Box, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { fetchEmployee } from "../../redux/features/EmployeeSlice";
import Customer from "./Customer";
import { fetchCustomer } from "../../redux/features/CustomerSlice";

interface AddCustomerProps {
  field: any;
  formData: any;
  handleSelectChange: (value: string | null, name: string) => void;
}

const AddNewCustomer: React.FC<AddCustomerProps> = ({
  field, 
  formData, 
  handleSelectChange,
}) => {
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const customers = useSelector((state: RootState) => state.customer.data);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomer());
  }, [dispatch]);

  const selectChange = (e: any, newValue: string | null) => {
    handleSelectChange(newValue, field.name);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleCustomerAdd = (newCustomerName: string) => {
    setOpen(false);
    dispatch(fetchCustomer());
  };

   const isRequiredField = field.isRequired=== 'yes'
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: 2 }}>
      <FormControl sx={{ width: '300px' }}>
        <FormLabel>{field.fieldName} {isRequiredField && <span style={{ color: 'red' }}>*</span>}</FormLabel>
        <Select
         sx={{padding: '10px',}}
          placeholder="Select Customer"
          name={field.name}
          value={formData && formData[field.name] as string}
          onChange={selectChange}
        >
          {customers.map((customer) => (
            <Option key={customer.id} value={customer.id}>
              {customer.fullName}
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

{open &&
  <Customer
        open={open}
          onClose={handleModalClose}
          onCustomer={handleCustomerAdd}
        />
      
}
    </Box>
  );
};

export default AddNewCustomer;
