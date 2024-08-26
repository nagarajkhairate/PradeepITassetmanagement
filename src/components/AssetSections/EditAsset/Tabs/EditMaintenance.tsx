import React, { useState, useEffect, ChangeEvent, memo } from 'react'
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Divider,
  Input,
  IconButton,
  Checkbox,
} from '@mui/joy'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close';
import AppForm from '../../../Common/AppForm'
import { updateMaintenance } from '../../../../redux/features/MaintenanceSlice'
import SelectOption from '../../SelectOption'
import MaintenanceStatus from '../../MaintenanceStatus'
import { Maintt } from './Maintenance'
import AppButton from '../../../Common/AppButton'
import { fetchMaintenanceFields } from '../../../../redux/features/MaintenanceFieldSlice'

interface EditMainProps {
  open: boolean
  onClose: () => void
  maintt: Maintt | null
}

const EditMaintenance: React.FC<EditMainProps> = ({ open, onClose, maintt }) => {
  const [formData, setFormData] = useState<any>(maintt)
  const [editedMain, setEditedMain] = useState<Maintt | null>(maintt)
  const [selectedMain, setSelectedMain] = useState<any>(null)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const maintenanceFields = useSelector(
    (state: RootState) => state.maintenanceField.data,
  )
 
  useEffect(() => {
    if (open && maintt) {
      setFormData(maintt);
    }
  }, [open, maintt]);

  React.useEffect(() => {
    setEditedMain(maintt)
  }, [maintt])

  useEffect(() => {
    dispatch(fetchMaintenanceFields())
  }, [dispatch]);


  const handleSelectChange = (newValue: any, title: string) => {
    setFormData((prevData: any) => ({
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

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState:any) => ({ ...prevState, [name]: value }));
  }

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      await dispatch(updateMaintenance(formData));
      onClose();
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <>
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography level="h4">Asset Maintenance</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        {editedMain && 
        <Grid container spacing={1} sx={{ mt: 2 }}>
        {maintenanceFields && maintenanceFields.map((field, index) => (
          <Grid key={index} item xs={12} sm={12} md={6} lg={6}>
            {handleInputValue(field, formData, handleChange, handleSelectChange, handleRadioChange)}
          </Grid>
        ))}
      </Grid>
      }    
        <Box sx={{ display: 'flex', mt: 2, justifyContent: 'flex-end', position: 'sticky', bottom: 0, background: '#fff', zIndex: 1, gap: '10px' }}>
          <AppButton onClick={handleAdd} sx={{ borderRadius: '15px' }}>
            Submit
          </AppButton>
          <AppButton onClick={onClose} sx={{ borderRadius: '15px' }}>
            Cancel
          </AppButton>
        </Box>
      </Box>
    </Modal>
    </>
  )
}

export default memo(EditMaintenance)

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'White',
  p: 4,
  borderRadius: 10,
  maxWidth: '600px',
  maxHeight: '90vh',
  overflowY: 'auto',
}
