import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Select, Option, Button, Typography, Box, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import AddEmployee from "./AddEmployee";
import { fetchEmployee } from "../../redux/features/EmployeeSlice";

interface AddEmpProps {
  field: any;
  formData: any;
  handleSelectChange: (value: string | null, name: string) => void;
}

const AddNewEmpployee: React.FC<AddEmpProps> = ({
  field, 
  formData, 
  handleSelectChange,
}) => {
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const addEmployee = useSelector((state: RootState) => state.addEmployee.data);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);

  const selectChange = (e: any, newValue: string | null) => {
    handleSelectChange(newValue, field.name);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleEmployeeAdd = (newEmployeeName: string) => {
    setOpen(false);
    dispatch(fetchEmployee());
  };

   const isRequiredField = field.isRequired=== 'yes'
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: 2 }}>
      <FormControl sx={{ width: '300px' }}>
        <FormLabel>{field.fieldName} {isRequiredField && <span style={{ color: 'red' }}>*</span>}</FormLabel>
        <Select
         sx={{padding: '10px',}}
          placeholder="Select Employee"
          name={field.name}
          value={formData[field.name] as string}
          onChange={selectChange}
        >
          {addEmployee.map((employee) => (
            <Option key={employee.id} value={employee.id}>
              {employee.empName}
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
  <AddEmployee
        open={open}
          onClose={handleModalClose}
          onAddEmployee={handleEmployeeAdd}
        />
      
}
    </Box>
  );
};

export default AddNewEmpployee;
