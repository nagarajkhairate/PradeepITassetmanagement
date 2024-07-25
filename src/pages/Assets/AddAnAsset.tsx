import React, { useEffect, useState } from 'react'
import {
  Typography,
  Box,
  Grid,
  Input,
  Button,
  FormControl,
  FormLabel,
  Snackbar,
  Divider,
} from '@mui/joy'
import { formConfig } from './formConfig'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import AppForm from '../../components/Common/AppForm'
import {
  addAssets,
  fetchAssetsDefaultFields,
} from '../../redux/features/AssetSlice'
import SiteComponent from '../../components/AssetSections/SiteComponent'
import LocationComponent from '../../components/AssetSections/LocationComponent'
import DepartmentComponent from '../../components/AssetSections/DepartmentComponent'
import CategoryComponent from '../../components/AssetSections/CategoryComponent'
import AssetFileField from '../../components/Common/AppFile/AssetFileField'
import SelectOption from '../../components/AssetSections/SelectOption'
import SubCategoryComponent from '../../components/AssetSections/SubCategoryComponent'
import { fetchAssetFieldMapping } from '../../redux/features/AssetFieldMappingSlice'
import { useNavigate } from 'react-router-dom'

const AddAnAsset: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [formData, setFormData] = useState<any>({})
  const navigate = useNavigate()
  const [errors, setErrors] = useState<any>({})
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const assetMappings = useSelector(
    (state: RootState) => state.assetMapping.data,
  )

  useEffect(() => {
    dispatch(fetchAssetFieldMapping())
  }, [dispatch])

  const handleSelectChange = (newValue: any, title: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [title]: newValue,
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [name]: '',
      }))
    }
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
    setFormData((prevData: any) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors: any = {}
    assetMappings.forEach((group: any) => {
      group.fields.forEach((field: any) => {
        if (field.required && !formData[field.name]) {
          validationErrors[field.name] = 'This field is required'
        }
      })
    })

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const formDataToSend = new FormData()
    for (const key in formData) {
      if (formData[key] !== null) {
        if (key === 'assetPhoto' && file) {
          formDataToSend.append(key, file)
        } else {
          formDataToSend.append(key, formData[key] as string)
        }
      }
    }

    console.log('Form Data:', formDataToSend)

    try {
      await dispatch(addAssets(formDataToSend))
      console.log('Form submitted successfully')
      setSnackbarMessage('Asset successfully added')
      setOpenSnackbar(true)
      setTimeout(() => setOpenSnackbar(false), 4000)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleInputValue = (
    field: any,
    formData: any,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSelectChange: (value: string | null, name: string) => void,
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    mode?: string,
  ) => {
    const commonProps = {
      field,
      formData,
      handleInputChange,
      handleSelectChange,
      handleFileChange,
      mode,
    }

    const isRequiredField = field.required
    switch (field.components.type) {
      case 'text':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}
            {isRequiredField && <span style={{ color: 'red' }}>*</span>}
            </FormLabel>
            <Input
              type={field.components.type}
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleInputChange}
              sx={{
                padding: '10px',
                display: 'grid',
              }}
            />
             {errors[field.name] && (
              <Typography sx={{color:"red"}}>{errors[field.name]}</Typography>
            )}
          </FormControl>
        )
      case 'date':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}
            {isRequiredField && <span style={{ color: 'red' }}>*</span>}
            </FormLabel>
            <Input
              type={field.components.type}
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleInputChange}
              sx={{
                minWidth: '205px',
                padding: '10px',
                display: 'grid',
              }}
            />
             {errors[field.name] && (
              <Typography sx={{color:"red"}}>{errors[field.name]}</Typography>
            )}
          </FormControl>
        )
      case 'number':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}
            {field.fieldName}
            {isRequiredField && <span style={{ color: 'red' }}>*</span>}
            </FormLabel>
            <Input
              type={field.components.type}
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleInputChange}
              sx={{
                padding: '10px',
                display: 'grid',
              }}
            />
            {errors[field.name] && (
              <Typography sx={{color:"red"}}>{errors[field.name]}</Typography>
            )}
          </FormControl>
        )
      case 'textarea':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}
            {isRequiredField && <span style={{ color: 'red' }}>*</span>}

            </FormLabel>
            <Input
              type={field.components.type}
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleInputChange}
              sx={{
                padding: '10px',
              }}
            />
            {errors[field.name] && (
              <Typography sx={{color:"red"}}>{errors[field.name]}</Typography>
            )}
          </FormControl>
        )

      case 'select':
        if (field.name === 'siteId') {
          return <SiteComponent {...commonProps} />
        } else if (field.name === 'locationId') {
          return <LocationComponent {...commonProps} />
        } else if (field.name === 'departmentId') {
          return <DepartmentComponent {...commonProps} />
        } else if (field.name === 'categoryId') {
          return <CategoryComponent {...commonProps} />
        } else if (field.name === 'subCategoryId') {
          return <SubCategoryComponent {...commonProps} />
        } else {
          return <SelectOption {...commonProps} />
        }

      case 'file':
        if (field.name === 'assetPhoto') {
          return <AssetFileField {...commonProps} />
        }
        return (
          <FormControl>
            <FormLabel>{field.fieldName}
            {isRequiredField && <span style={{ color: 'red' }}>*</span>}

            </FormLabel>
            <Input
              type="file"
              name={field.name}
              onChange={handleFileChange}
              // sx={field.stylings}
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
            {errors[field.name] && (
              <Typography sx={{color:"red"}}>{errors[field.name]}</Typography>
            )}
          </FormControl>
        )

      default:
        return null
    }
  }

  return (
    <AppForm onSubmit={handleSubmit} encType="multipart/form-data">
      <Typography level="h3" sx={{ ml: '32px', mb: '30px' }}>
        Add An Asset
      </Typography>
      <Box
        sx={{
          borderRadius: 'none',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          paddingBottom: '30px',
        }}
      >
        <Box
          sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {assetMappings &&
            assetMappings.map((group, index) => (
              <Grid key={index} xs={12}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    mb: '20px',
                    mt: '10px',
                    paddingLeft: '20px',
                  }}
                >
                  {group.title}
                </Typography>
                <Grid container spacing={2} sx={{padding:"20px"}}>
                  {group.fields &&
                    group.fields.map((field, index) => {
                      let styleData = { xs: 12, sm: 6, md: 4, lg: 3 } // Default values
                      try {
                        styleData = JSON.parse(
                          field.styling.replace(/(\w+):/g, '"$1":'),
                        )
                      } catch (error) {
                        console.error('Error parsing JSON:', error)
                      }
                      return (
                        <Grid
                          key={index}
                          xs={styleData.xs}
                          md={styleData.md}
                          sm={styleData.sm}
                          lg={styleData.lg}
                        >
                          {handleInputValue(
                            field,
                            formData,
                            handleInputChange,
                            handleSelectChange,
                            handleFileChange,
                          )}
                        </Grid>
                      )
                    })}
                </Grid>
                <Divider sx={{ mt: '20px' }} />
              </Grid>
            ))}
        </Box>

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
            size="md"
            type="submit"
            sx={{
              color: '#000000',
              borderRadius: '15px',

              background: '#FABC1E',
              '&:hover': {
                background: '#e0a71b',
              },
            }}
          >
            Submit
          </Button>
          <Button
            size="md"
            onClick={() => navigate('/assets/list-of-assets')}
            sx={{
              borderRadius: '15px',

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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: 'green',
            color: 'black',
            fontWeight: 'bold',
          },
        }}
      />
    </AppForm>
  )
}

export default AddAnAsset
