import React, { FunctionComponent, useState } from "react";
import { Box, Typography, Button, Divider, Input, Textarea, Modal, IconButton, Option, ButtonGroup, Select, FormControl, FormLabel, Checkbox, RadioGroup, Grid } from "@mui/joy";
import CloseIcon from '@mui/icons-material/Close';
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { addEmployee} from "../../redux/features/EmployeeSlice";
import AppForm from "../../components/Common/AppForm";
import { EmpConfig, FieldConfig } from "./EmpCofig";
import SiteComponent from "../../components/AssetSections/SiteComponent";
import LocationComponent from "../../components/AssetSections/LocationComponent";
import DepartmentComponent from "../../components/AssetSections/DepartmentComponent";
import SelectOption from "../../components/AssetSections/SelectOption";
import { ClientConfig } from "./ClientConfig";
import { addClient } from "../../redux/features/ClientSlice";

interface AddClientProps {
  open: boolean;
  onClose: any;
  onAddClient: any;
}

const AddClient: FunctionComponent<AddClientProps> = ({ open, onClose, onAddClient}) => {
  const [employee, setClient] = useState<any>({});
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

  const handleSelectChange = (name: string, value: string | null) => {
    setFormData({
      ...formData,
      [name]: value || '',
    });
  };

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
      case "checkbox":

      case "select":
            return <SelectOption {...commonProps} />

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
      dispatch(addClient(formData));
      setClient({});
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
        borderRadius: 1,
        bgcolor:'#fff',
        p: 4,
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
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
            <Typography>Add Client</Typography>
            <IconButton 
            onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Typography>
        <Divider></Divider>
        <Box>
        {ClientConfig && ClientConfig.map((field , index) => (
      <FormControl key={index}>
       <Grid key={index}>
        {handleInputValue(
          field,
          formData,
          handleChange,
          handleSelectChange,
        )}
        </Grid>
      </FormControl>
    ))}
          </Box>

        <ButtonGroup sx={{border:"1px solid #E0E1E3"}}>
          <Button
          type="submit"
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
}

export default AddClient;
