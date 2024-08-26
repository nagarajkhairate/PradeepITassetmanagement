import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Divider, Input, Textarea, Modal, IconButton, Option, ButtonGroup, Select, FormControl, FormLabel, Checkbox, RadioGroup, Grid } from "@mui/joy";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchMaintenanceFields } from "../../../../redux/features/MaintenanceFieldSlice";
import { RootState } from "../../../../redux/store";
import MaintenanceStatus from "../../MaintenanceStatus";
import SelectOption from "../../SelectOption";
import { addMaintenance } from "../../../../redux/features/MaintenanceSlice";
import AppForm from "../../../Common/AppForm";
import AppButton from "../../../Common/AppButton";
import { useParams } from "react-router-dom";

interface AddMainProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

const AddMaintenance: React.FC<AddMainProps> = ({ open, onClose, onAdd }) =>
   {
  const [maint, setMaint] = useState<any>({});
  const { id: assetId } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<any>({})
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const maintenanceFields = useSelector(
    (state: RootState) => state.maintenanceField.data,
  )

  useEffect(()=>{
    dispatch(fetchMaintenanceFields())
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

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
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
    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    mode?: string,
  ) => {
    const commonProps = {
      field,
      formData,
      handleChange,
      handleSelectChange,
      handleRadioChange,
      mode,
    }

    const renderWithAsterisk = (
      component: React.ReactNode,
      fieldName: string,
    ) => (
      <FormControl>
        <FormLabel>
          {fieldName} <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        {component}
      </FormControl>
    )

    switch (field.components.type) {
      case 'text':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              type={field.components.type}
              name={field.name}
              value={formData && formData[field.name] as string}
              onChange={handleChange}
              sx={{
                padding: '10px',
              }}
            />
          </FormControl>
        )
      case 'date':
        return (
          <FormControl >
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              type={field.components.type}
              name={field.name}
              value={formData && formData[field.name] as string}
              onChange={handleChange}
              sx={{
                padding: '10px',
                minWidth: 200
              }}
            />
          </FormControl>
        )
        case 'date-time':
          return (
            <FormControl >
              <FormLabel>{field.fieldName}</FormLabel>
              <Input
                type={field.components.type}
                name={field.name}
                value={formData && formData[field.name] as string}
                onChange={handleChange}
                sx={{
                  padding: '10px',
                  minWidth: 200
                }}
              />
            </FormControl>
          )
      case 'number':
      case 'email':
        return (
          <FormControl >
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              type={field.components.type}
              name={field.name}
              value={formData && formData[field.name] as string}
              onChange={handleChange}
              sx={{
                padding: '10px',
                minWidth: 200
              }}
            />
          </FormControl>
        )
      case 'radio':
      case 'textarea':
        return (
          <FormControl >
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              type={field.components.type}
              name={field.name}
              value={formData && formData[field.name] as string}
              onChange={handleChange}
              sx={{
                padding: '10px',
                minWidth: 200
              }}
            />
          </FormControl>
        )

      case 'checkbox':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Checkbox
              type={field.components.type}
              name={field.name}
              checked={formData && formData[field.name] as boolean}
              onChange={handleChange}
            />
          </FormControl>
        )

      case 'select':
         if (field.name === 'maintenanceStatus') {
          return <MaintenanceStatus {...commonProps} />
        } 
          return <SelectOption {...commonProps} />
        
      default:
        return null
    }
  }
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await setFormData((prevData: any) => {
      const formData = {
        ...prevData,
        assetId,
      }
      dispatch(addMaintenance(formData))

    })
      setMaint({});
      onClose()
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
            <Typography>Add Maintenance</Typography>
            <IconButton 
            onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Typography>
        <Divider></Divider>

          <Grid container spacing={1}>
          {maintenanceFields &&
              maintenanceFields.map((field, index) => (
                  <Grid key={index} xs={12} sm={12} md={6} lg={6}>
                    {handleInputValue(
                      field,
                      formData,
                      handleChange,
                      handleSelectChange,
                      handleRadioChange,
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
};

export default AddMaintenance;
