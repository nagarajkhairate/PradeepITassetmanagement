import React, { useState, ChangeEvent } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Select, Option, Button, Typography, Box, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import SetupAddDept from "../../../../pages/Setup/Departments/SetupAddDept";
import { addDepartment } from "../../../../redux/features/DepartmentSlice";


interface DepartmentProps {
  field: { fieldName: string; name: string; options: { value: string; label: string; }[] };
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setValidationMessages: React.Dispatch<React.SetStateAction<any>>;
  mode: string;
}

type Department = {
  id: number
  departmentName: string
}

const DepartmentComponent: React.FC<DepartmentProps> = (
  {   field, 
    formData, 
    setFormData, 
    setValidationMessages, 
    mode
    }) => {
  const [error, setError] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const departments = useSelector((state: RootState) => state.departments.data)
  const [open, setOpen] = useState<boolean>(false)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const [departmentName, setDepartmentName] = useState<string>('')


  const validateForm = () => {
    if (!formData.site) {
      setError("Department is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddDepartment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newdepartment: Department = {
      id: departments.length ? departments[departments.length - 1].id + 1 : 1,
      departmentName: capitalizeWords(departmentName),
    }
    // setDepartment([...department, newdepartment])
    dispatch(addDepartment(newdepartment))
    setDepartmentName('') // Clear the input field after adding
  }
  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }

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

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: 2 }}>
      <FormControl sx={{ width: '200px' }}>
      <FormLabel>{field.fieldName}</FormLabel>

        <Select
          placeholder="Select Department"
          value={formData[field.name] || ''}
          onChange={(e, newValue) => handleSelectChange(e, newValue, field.name)}
        >
          {departments.map((department) => (
            <Option key={department.id} value={department.id}>
              {department.departmentName}
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
{openDialog ===  field.fieldName && (
          <SetupAddDept
            open={openDialog === field.fieldName}
            handleClose={handleCloseDialog}
            departmentName={departmentName}
            setDepartmentName={setDepartmentName}
            handleAddDepartment={handleAddDepartment}
          />
        )}
    </Box>
  );
};

export default DepartmentComponent;
