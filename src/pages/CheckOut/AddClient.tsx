import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Divider, Input, Textarea, Modal, IconButton, Option, ButtonGroup, Select, FormControl, FormLabel, Checkbox, RadioGroup, Grid } from "@mui/joy";
import CloseIcon from '@mui/icons-material/Close';
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import AppForm from "../../components/Common/AppForm";
import SiteComponent from "../../components/AssetSections/SiteComponent";
import SelectOption from "../../components/AssetSections/SelectOption";
import { ClientConfig } from "./ClientConfig";
import { addClient } from "../../redux/features/ClientSlice";
import IndustryComponent from "./IndustryComponent";
import { fetchClientField } from "../../redux/features/ClientFieldSlice";
import AppButton from "../../components/Common/AppButton";

interface AddClientProps {
  open: boolean;
  onClose: () => void;
  onAddClient: (name: string) => void;
}

const AddClient: React.FC<AddClientProps> = ({ open, onClose, onAddClient}) => {
  const [client, setClient] = useState<any>({});
  const [formData, setFormData] = useState<any>({})
  // const [errors, setErrors] = useState<EmployeeErrors>({});
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
const clientFields=  useSelector((state: RootState) => state.clientField.data);

useEffect(()=>{
  dispatch(fetchClientField())
},[dispatch])

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
        if (field.name === "industry") {
          return <IndustryComponent {...commonProps} />;
        } 
        else {
          return <SelectOption {...commonProps} />
        }
  }    
    } 
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
    console.log(formData)
      dispatch(addClient(formData));
      setClient({});
      onClose()
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
            <Typography sx={{ marginBottom: 2, position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>Add Client</Typography>
            <IconButton 
            onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Typography>
        <Divider></Divider>
       
          <Grid container spacing={1}>
          {clientFields && clientFields.map((field:any , index:any) => (

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
        
      

        <Box sx={{ display: 'flex',mt:2, justifyContent: 'flex-end', position: 'sticky', bottom: 0, background: '#fff', zIndex: 1 , gap:"10px"  }}>
          <AppButton
         onClick={handleAdd}
            sx={{
              borderRadius:"15px"
            }}
          >
            Add
          </AppButton>
          <AppButton
            onClick={onClose}
            sx={{
              borderRadius:"15px"
            }}
          >
            Cancel
          </AppButton>
        </Box>
      
      </AppForm>
      </Box>
      </Modal>
  );
}
export default AddClient;
