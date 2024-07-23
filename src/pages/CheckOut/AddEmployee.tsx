import React, { useState } from "react";
import { Box, Typography, Button, Divider, Input, Textarea, Modal, IconButton, Option, ButtonGroup, Select, FormControl, FormLabel, Checkbox, RadioGroup, Grid } from "@mui/joy";
import CloseIcon from '@mui/icons-material/Close';
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { addEmployee} from "../../redux/features/EmployeeSlice";
import AppForm from "../../components/Common/AppForm";
import SiteComponent from "../../components/AssetSections/SiteComponent";
import LocationComponent from "../../components/AssetSections/LocationComponent";
import DepartmentComponent from "../../components/AssetSections/DepartmentComponent";
import SelectOption from "../../components/AssetSections/SelectOption";
import { EmpConfig } from "./EmpConfig";

// interface EmployeeErrors {
//   fullName?: string;
//   title?: string;
//   employeeID? :string;
//   phone?: string;
//   email?: string;
//   empSite?: string;
//   empLocation?: string;
//   empDepartment?: string;
//   notes?: string;
// }

interface AddEmployeeProps {
  open: boolean;
  onClose: () => void;
  onAddEmployee: (name: string) => void;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ open, onClose, onAddEmployee }) =>
   {
  const [employee, setEmployee] = useState<any>({});
  const [formData, setFormData] = useState<any>({})
  // const [errors, setErrors] = useState<EmployeeErrors>({});
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }
 
  const handleSelectChange = (
    newValue: any,
    title: string,
  ) => {
   
    setFormData((prevData:any) => ({
      ...prevData,
      [title]: newValue,
    }))
  }
  const handleInputValue = (
    field: any,
    formData: any,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSelectChange: (value: string | null, name: string) => void,
    mode?: string
  ) => {
    const commonProps = {
      field,
      formData,
      handleChange,
      handleSelectChange,
      mode,
    };

    switch (field.components.type) {
      case "text":
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              type={field.components.type}
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleChange}
              sx={field.stylings}
            />
          </FormControl>
        );
      case "date":
      case "number":
      case "email":
        return (
          <FormControl key={field.name}>
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              type={field.components.type}
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleChange}
            />
          </FormControl>
        );
      case "radio":
      case "textarea":
        return (
          <FormControl key={field.name}>
            <FormLabel>{field.fieldName}</FormLabel>
            <Textarea
            type={field.components.type}
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleChange}
            />
          </FormControl>
        );
      case "checkbox":

      case "select":
          if (field.name === "empSite") {
            return <SiteComponent {...commonProps} />;
          } else if (field.name === "empLocation") {
            return <LocationComponent {...commonProps} />;
          } else if (field.name === "empDepartment") {
            return <DepartmentComponent {...commonProps} />;
          } 
          else {
            return <SelectOption {...commonProps} />
          }
    }
  };
  // const validateForm = (): boolean => {
  //   let tempErrors: EmployeeErrors = {};
  //   let isValid = true;

  //   EmpConfig.forEach((field) => {
  //     if (field.isRequired === "true" && !employee[field.name]) {
  //       tempErrors[field.name] = `${field.fieldName} is required`;
  //       isValid = false;
  //     }
  //   });
  //   setErrors(tempErrors);
  //   return isValid;  
  // };

  const handleAdd = () => {
    //  onAddEmployee(employee.empName);
    console.log(formData)
      dispatch(addEmployee(formData));
      setEmployee({});
      // setErrors({});
  };

  return (
     <Modal open={open} onClose={onClose}>
      <Box 
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        maxHeight: '80vh',
        borderRadius: 1,
        bgcolor:'#fff',
        p: 4,
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll"
      }}
      >
    <AppForm onSubmit={handleAdd}>
     
        <Typography level="h4">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Add an Person/Employee</Typography>
            <IconButton 
            onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Typography>
        <Divider></Divider>

          <Grid container spacing={1}>
          {EmpConfig && EmpConfig.map((field , index) => (
       <Grid key={index} xs={12} sm={12} md={12} lg={12}>
        {handleInputValue(
          field,
          formData,
          handleChange,
          handleSelectChange,
        )}
        </Grid>
    ))}
  </Grid>

        <ButtonGroup sx={{border:"1px solid #E0E1E3"}}>
          <Button
       onClick={handleAdd}
            sx={{
              background: "rgb(245,193,67)",
              "&:hover": {
                backgroundColor: "rgb(255,199,79)",
              },
              borderRadius:"15px"
            }}
          >
            Add
          </Button>
          <Button
            onClick={onClose}
            sx={{
              background: "white",
              color: "black",
              border: "1px solid black",
              "&:hover": {
                backgroundColor: "#f9f9f9",
              },
              borderRadius:"15px"
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      
      </AppForm>
      </Box>
      </Modal>
  );
};

export default AddEmployee;
