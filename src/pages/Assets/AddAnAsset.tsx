import React, { useEffect, useState } from 'react'
import {
  Typography,
  Box,
  Grid,
  Input,
  Select,
  Option,
  Button,
  FormControl,
  FormLabel,
  TextField,
  MenuItem,
  Checkbox,
} from '@mui/joy'
import { formConfig, FormFieldConfig } from './formConfig'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import AppView from '../../components/Common/AppView'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import AppForm from '../../components/Common/AppForm'
import AddCategory from '../../components/Companyinfo/Category/AddCategory'
import AddSite from '../Setup/SetupSites/AddSite'
import AddLocation from '../../components/Companyinfo/Location/AddLocation'
import SetupAddDept from '../Setup/Departments/SetupAddDept'
import { fetchLocation } from '../../redux/features/LocationSlice'
import {
  addDepartment,
  fetchDepartment,
} from '../../redux/features/DepartmentSlice'
import { addCategory, fetchCategory } from '../../redux/features/CategorySlice'
import { addAssets } from '../../redux/features/AssetSlice'
import { fetchAssetFieldMapping } from '../../redux/features/AssetFieldMappingSlice'
import SiteComponent from '../../components/AssetSections/EditAsset/AddAssetSection/SiteComponent'
import LocationComponent from '../../components/AssetSections/EditAsset/AddAssetSection/LocationComponent'
import DepartmentComponent from '../../components/AssetSections/EditAsset/AddAssetSection/DepartmentComponent'
import CategoryComponent from '../../components/AssetSections/EditAsset/AddAssetSection/CategoryComponent'
import { fetchSubCategories } from '../../redux/features/CategorySubSlice'
import SubCategoryComponent from '../../components/AssetSections/EditAsset/AddAssetSection/SubCategorycomponent'
import FileField from '../../components/Common/AppFile/FileField'
import AssetFileField from '../../components/Common/AppFile/AssetFileField'

interface ValidationMessages {
  [key: string]: string
}

const AddAnAsset: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  // Initialize state dynamically based on formConfig

  const [formData, setFormData] = useState<any>({})

  const [open, setOpen] = useState<boolean>(false)
  const [validationMessages, setValidationMessages] =
    useState<ValidationMessages>({})
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    dispatch(fetchLocation())
    dispatch(fetchDepartment())
    dispatch(fetchCategory())
    dispatch(fetchSubCategories())
    dispatch(fetchAssetFieldMapping())
  }, [dispatch])

  const handleSelectChange = (
    event: React.SyntheticEvent<Element, Event> | null,
    newValue: any,
    title: string,
  ) => {
    if (!event) return
    setFormData((prevData:any) => ({
      ...prevData,
      [title]: newValue,
    }))
    setValidationMessages((prevState) => ({ ...prevState, [title]: '' }))
  }
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    title: string,
  ) => {
    const { name, value } = e.target
    setFormData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }))
    setValidationMessages((prevState) => ({ ...prevState, [title]: '' }))
  }

  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files.length > 0) {
      const file = files[0]
      setFile(file)
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: file.name,
      }))
    }
  }

  const handleDeletePhoto = (index: number) => {
    setFormData((prevData:any) => {
      const updatedFiles = [...(prevData.assetPhoto as File[])]
      updatedFiles.splice(index, 1)
      return { ...prevData, assetPhoto: updatedFiles }
    })
    setPhotoPreviews((prevPreviews) => {
      const updatedPreviews = [...prevPreviews]
      updatedPreviews.splice(index, 1)
      return updatedPreviews
    })
  }

  console.log(openDialog)

  const handleCloseDialog = () => {
    setOpenDialog(null)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newValidationMessages: ValidationMessages = {}
    formConfig.forEach((field) => {
      if (field.title !== 'assetPhoto' && !formData[field.title]) {
        // newValidationMessages[field.validationMessageKey] =
        //     `${field.title} is required.`;
      }
    })

    if (Object.keys(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages)
      return
    }

    const formDataToSend = new FormData()
    for (const key in formData) {
      if (formData[key] !== null) {
        if (key === 'assetPhoto' && file) {
          
            formDataToSend.append(key, file)
          }
      else {
          formDataToSend.append(key, formData[key] as string)
        }
      }
    }
    
    console.log('Form Data:', formDataToSend)

    try {
      await dispatch(addAssets(formDataToSend))
      console.log('Form submitted successfully')
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleInputValue = (
    field: any,
    formData: any,
    handleInputChange?: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void,
    handleSelectChange?: (
      event: React.SyntheticEvent<Element, Event> | null,
      value: string | null,
      name: string,
    ) => void,
    handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    mode?: string,
  ) => {
    const commonProps = {
      field,
      formData,
      handleInputChange,
      handleSelectChange: handleSelectChange || (() => {}),
      handleFileChange: handleFileChange || (() => {}),
      mode,
    }

    // console.log(JSON.stringify(field))
    console.log(field.name)
    switch (field.components.type) {
      case 'text':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleInputChange}
              sx={field.stylings}
            />
          </FormControl>
        )
      case 'date':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              type="date"
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleInputChange}
              sx={field.stylings}
            />
          </FormControl>
        )
      case 'select':
        if (field.name === 'siteId') {
          return <SiteComponent {...commonProps} />
        } else if (field.name === 'locationId') {
          return <LocationComponent {...commonProps} />
        }
       else if (field.name === 'departmentId') {
        return <DepartmentComponent {...commonProps} />
      } 
      else if (field.name === 'categoryId') {
        return <CategoryComponent {...commonProps} />
      } 
      else if (field.name === 'subCategoryId') {
        return <SubCategoryComponent {...commonProps} />
      } 
      else {
          return <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Select
              name={field.name}
              value={formData[field.name]}
              onChange={(event) =>
                handleSelectChange &&
                handleSelectChange(event, event.target.value, field.name)
              }
              sx={field.stylings}
            >         
            </Select>
          </FormControl>
        }
        case 'number':
          return (
            <FormControl key={field.name}>
              <FormLabel>{field.fieldName}</FormLabel>
              <Input
                type="number"
                name={field.name}
                value={formData[field.name] as number}
                onChange={handleInputChange}
                sx={field.stylings}
              />
            </FormControl>
          );
      //
      // case 'checkbox':
      //   return (
      //     <FormControl
      //       control={
      //         <Checkbox
      //           name={field.name}
      //           checked={formData[field.name] as boolean}
      //           onChange={handleInputChange}
      //         />
      //       }
      //       label={field.fieldName}
      //     />
      //   )
      case 'textarea':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              // multiline
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleInputChange}
              sx={field.stylings}
            />
          </FormControl>
        )
      case 'file':
        if (field.name === 'assetPhoto') {
          return <AssetFileField {...commonProps} />
        }
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              type="file"
              name={field.name}
              onChange={handleFileChange}
              sx={field.stylings}
            />
            <Box>
              {photoPreviews.map((preview, index) => (
                <Box key={index}>
                  <img src={preview} alt={`Preview ${index}`} />
                  <Button onClick={() => handleDeletePhoto(index)}>
                    Delete
                  </Button>
                </Box>
              ))}
            </Box>
          </FormControl>
        )
      default:
        return null
    }
  }

  return (
    <AppForm onSubmit={handleSubmit} encType="multipart/form-data">
      <AppView>
        <Typography level="h3" sx={{ ml: '52px' }}>
          Add An Asset
        </Typography>

        <Box
          sx={{
            borderRadius: 'none',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            background: '#ffffff',
            gap: '5px',
          }}
        >
          <Box sx={{ paddingBottom: '30px' }}>
            <Box>
              <Grid
                container
                spacing={1}
                sx={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Grid xs={12}>
                  {formConfig &&
                    formConfig.map((group, index) => (
                      <Grid key={index}>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            mb: 0,
                            paddingLeft: '32px',
                          }}
                        >
                          {group.title}
                        </Typography>

                        {group.fields &&
                          group.fields.map((field, index) => (
                            <Grid key={index}>
                              {handleInputValue(
                                field,
                                formData,
                                handleInputChange,
                                handleSelectChange,
                                handleFileChange,
                              )}
                            </Grid>
                          ))}
                      </Grid>
                    ))}
                </Grid>

                {/* {formConfig.slice(0, 6).map((field: any) => (
                  <Grid
                    key={field.label}
                    sx={{ paddingLeft: '32px' }}
                    xs={12}
                    md={
                      field.stateKey === 'description'
                        ? 12
                        : field.stateKey === 'assetName' ||
                            field.stateKey === 'assetTagId'
                          ? 6
                          : 4
                    }
                  >
                    <Typography
                      level="body-xs"
                      sx={{ color: '#767676', mt: '8px', mb: '5px' }}
                    >
                      {field.label}
                    </Typography>
                    {field.type === 'select' ? (
                      <Select
                        value={formData[field.stateKey] as string}
                        onChange={(e, newValue) =>
                          handleSelectChange(e, newValue, field.stateKey)
                        }
                        sx={field.stylings}
                      >
                        {field.options?.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <Box>
                        <Input
                          value={formData[field.stateKey] as string}
                          onChange={(e) => handleInputChange(e, field.stateKey)}
                          {...field}
                          sx={field.stylings}
                        />
                      </Box>
                    )}

                    {validationMessages[field.validationMessageKey] && (
                      <Typography level="body-xs" sx={{ color: 'red', mt: 1 }}>
                        {validationMessages[field.validationMessageKey]}
                      </Typography>
                    )}
                  </Grid>
                ))} */}
              </Grid>
              {/* <Box>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    mb: 0,
                    paddingLeft: '48px',
                    paddingTop: '15px',
                  }}
                >
                  Site, Location, Category and Department
                </Typography>
              </Box> */}
              {/* <Box>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                  }}
                >
                  {dynamicFormConfig.slice(10, 14).map((field) => (
                    <Grid
                      key={field.title}
                      sx={{ paddingLeft: '32px', paddingBottom: '20px' }}
                    >
                      <Typography
                        level="body-xs"
                        sx={{ color: '#767676', mt: '8px', mb: '5px' }}
                      >
                        {field.title}
                      </Typography>
                      <Grid container spacing={1}>
                        <Select
                          value={formData[field.title] as string}
                          onChange={(e, newValue) =>
                            handleSelectChange(e, newValue, field.title)
                          }
                          sx={field.sx}
                        >
                          {field.options?.map((option) => (
                            <Option key={option.value} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>

                        <Button
                          onClick={() => handleOpenDialog(field.title)}
                          variant="outlined"
                          size="sm"
                          sx={{
                            ml: { md: 4, xs: '0' },
                            width: '187px',
                            fontSize: '20px',
                            borderRadius: '15px',
                            background: '#E4E4E4',
                            '&:hover': {
                              background: '#d9d9d9',
                            },
                            color: '#767676',
                            mt: { xs: '10px', md: '0' },
                          }}
                        >
                          <Typography sx={{ mr: '25px', color: '#767676' }}>
                            <AddIcon />
                          </Typography>
                          <Typography sx={{ mr: '25px', color: '#767676' }}>
                            New
                          </Typography>
                        </Button>
                      </Grid>
                      {validationMessages[field.validationMessageKey] && (
                        <Typography
                          level="body-xs"
                          sx={{ color: 'red', mt: 1 }}
                        >
                          {validationMessages[field.validationMessageKey]}
                        </Typography>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Box> */}
              {/* <Box sx={{ paddingLeft: '48px', mb: '30px', mt: '20px' }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Assets Photo
                </Typography>
              </Box>
              <Box
                sx={{
                  height: '170px',
                  borderRadius: '10px',
                  border: '2px dashed #D3D3D3',
                  lineHeight: '1.5px',
                  mx: '48px',
                  background: '#FBFBFB',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '20px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <Box
                    sx={{
                      height: '55px',
                      width: '55px',
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#13B457',
                      color: 'white',
                    }}
                  >
                    <Button
                      onClick={() =>
                        document.getElementById('fileInput')?.click()
                      }
                      sx={{
                        borderRadius: '10px',
                        border: 'none',
                        background: 'none',
                        '&:hover': {
                          background: '#13B457',
                        },
                      }}
                    >
                      <CloudUploadIcon sx={{ size: '20' }} />
                    </Button>
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                      multiple
                      accept=".jpg,.jpeg,.png,.gif"
                    />
                  </Box>
                </Box>
                {photoPreviews.length > 0 ? (
                  <Grid container spacing={2}>
                    {photoPreviews.map((preview, index) => (
                      <Grid key={index}>
                        <Box
                          sx={{
                            position: 'relative',
                            display: 'inline-block',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: '1px solid #ccc',
                          }}
                        >
                          <img
                            src={preview}
                            alt={`Asset Preview ${index + 1}`}
                            style={{ height: '100px', width: 'auto' }}
                          />
                          <Button
                            sx={{
                              position: 'absolute',
                              top: '5px',
                              right: '5px',
                              backgroundColor: 'rgba(255, 255, 255, 0.8)',
                              borderRadius: '50%',
                              width: '25px',
                              height: '25px',
                              minWidth: '25px',
                              padding: 0,
                            }}
                            onClick={() => handleDeletePhoto(index)}
                          >
                            <DeleteIcon sx={{ color: '#d9534f' }} />
                          </Button>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography level="body-xs">
                    Only (JPG, GIF, PNG) Allowed
                  </Typography>
                )}
                {validationMessages.assetPhoto && (
                  <Typography level="body-xs" sx={{ color: 'red', mt: 1 }}>
                    {validationMessages.assetPhoto}
                  </Typography>
                )}
              </Box> */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    md: 'row',
                  },
                  justifyContent: 'flex-end',
                  gap: '15px',
                  mx: '35px',
                  mt: '40px',
                }}
              >
                <Button
                  size="lg"
                  type="submit"
                  sx={{
                    color: '#000000',
                    borderRadius: '15px',
                    padding: '18px 70px',
                    background: '#FABC1E',
                    '&:hover': {
                      background: '#e0a71b',
                    },
                  }}
                >
                  Save
                </Button>
                <Button
                  size="lg"
                  // onClick={handleCancel}
                  sx={{
                    borderRadius: '15px',
                    padding: '18px 70px',
                    background: '#000000',
                    '&:hover': {
                      background: '#333333',
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </AppView>
    </AppForm>
  )
}

export default AddAnAsset
