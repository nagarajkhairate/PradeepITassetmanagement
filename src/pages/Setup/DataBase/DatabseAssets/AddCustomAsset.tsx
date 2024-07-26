import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import React, {
  ChangeEvent,
  FormEvent,
  forwardRef,
  Ref,
  useEffect,
  useState,
} from 'react'
import { fetchComponents } from '../../../../redux/features/ComponentsIdSlice'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Option,
  Radio,
  RadioGroup,
  Select,
  Sheet,
  Typography,
  Divider,
  Modal,
} from '@mui/joy'
import AppForm from '../../../../components/Common/AppForm'
import { RootState } from '../../../../redux/store'
import { addAssetCustomDatabase } from '../../../../redux/features/AssetCustomDatabaseSlice'
import { fetchCategory } from '../../../../redux/features/CategorySlice'

interface DataBaseAddProps {
  open: boolean
  setOpen: (open: boolean) => void
  components:any[]
}

const AddCustomAsset: React.FC<DataBaseAddProps> = ({ open, setOpen, components }) => {
  // const components = useSelector((state: RootState) => state.components.data)
  const category = useSelector((state: RootState) => state.category.data)
  console.log(category)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  React.useEffect(() => {
    dispatch(fetchComponents())
  }, [dispatch])

  React.useEffect(() => {
    dispatch(fetchCategory())
  }, [dispatch])

  const [formData, setFormData] = useState({
    fieldName: '',
    componentsId: 1,
    isRequired: 'optional',
    // categoryId: 1,
  })


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'categoryId' ? parseInt(value, 10) : value,
    }))
  }

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, isRequired: value }))
  }

  const handleSelectChange = (
    event:
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>
      | React.FocusEvent<Element, Element>
      | null,
    value: unknown,
  ) => {
    setFormData((prevData: any) => ({
      ...prevData,
      componentsId: value ? parseInt(value as string, 10) : 0,
    }))
  }

  const handleCategorySelectChange = (
    event:
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>
      | React.FocusEvent<Element, Element>
      | null,
    value: unknown,
  ) => {
    setFormData((prevData: any) => ({
      ...prevData,
      categoryId: value ? parseInt(value as string, 10) : 0,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await dispatch(addAssetCustomDatabase(formData))
    setOpen(false)
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="responsive-dialog-title"
      aria-describedby="modal-desc"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 600,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <div>
          <Typography
            id="responsive-dialog-title"
            component="h2"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            {'Add Custom Fields here'}
          </Typography>
          <Divider />

          <AppForm onSubmit={handleSubmit}>
          <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'row', // Align children in a row
                alignItems: 'center', // Center items vertically
                paddingTop: '20px',
                marginLeft: '5px',
              }}
            >
              <FormLabel
                sx={{
                  marginRight: '10px', // Space between label and input
                }}
              >
                Custom Field Label*:
              </FormLabel>
              <Input
                variant="outlined"
                type="text"
                name="fieldName"
                value={formData.fieldName}
                onChange={handleChange}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement
                  target.value = target.value.replace(/[^a-zA-Z0-9-]/g, '')
                }}
                required
                sx={{ width: '200px' }} // Adjust the width as needed
              />
            </FormControl>
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'row', // Align children in a row
                alignItems: 'center', // Center items vertically
                paddingTop: '30px',
                marginLeft: '10px',
              }}
            >
              <FormLabel
                sx={{
                  marginRight: '40px', // Space between label and select
                  flexShrink: 0, // Prevent label from shrinking
                }}
              >
                Data Types*:
              </FormLabel>
              <Select
                placeholder="Select Data Types"
                sx={{
                  marginLeft: { md: '18px', xs: '1px' }, // Space between label and select
                  flexGrow: 1, // Allow select to take up remaining space
                  width: '200px', // Adjust width as needed
                }}
                name="componentsId"
                required
                value={formData.componentsId}
                onChange={handleSelectChange}
              >
                {components &&
                  components.map((comp) => (
                    <Option key={comp.id} value={comp.id}>
                      {comp.title}
                    </Option>
                  ))}
              </Select>
            </FormControl>

            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FormLabel sx={{ paddingTop: '26px' }}>Data Required:</FormLabel>
              <RadioGroup
                name="isRequired"
                value={formData.isRequired}
                onChange={handleChange}
                sx={{ marginLeft: 'none' }}
              >
                <Box>
                  <Radio
                    value="yes"
                    label="Yes"
                    variant="outlined"
                    sx={{
                      paddingTop: '10px',
                      marginLeft: { md: '49px', xs: '39px' },
                    }}
                  />
                  <Radio
                    value="optional"
                    label="Optional"
                    variant="outlined"
                    sx={{
                      paddingTop: '20px',
                      marginLeft: { md: '30px', xs: '15px' },
                    }}
                  />
                </Box>
              </RadioGroup>
            </FormControl>

            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
            <FormLabel>Selected Categories</FormLabel>
            <FormLabel>Is this field visible to assets of selective Categories?</FormLabel>
            <RadioGroup name="selectedCategories" value={formData?.selectedCategories} onChange={handleChange}>
              <Box>
                <Radio value="all" label="All Categories" variant="outlined" />
                <Radio value="limitedCategories" label="Limited Categories" variant="outlined" sx={{ paddingTop: "30px", marginLeft: "20px" }} />
              </Box>
            </RadioGroup>
          </Box>

            {/* <Box>
              <Box
                sx={{
                  paddingTop: '15px',
                  ml: { xs: 0, md: '3px' },
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'center',
                  
                }}
              >
                <FormLabel sx={{ mr: 2, wordBreak:'break-word' }}>Selected Categories :</FormLabel>
                <FormLabel
                sx={{ wordBreak:'break-word' }}
                >
                  <span>Is this field visible to assets of selective 'Categories'?</span>
                </FormLabel>
              </Box>
              <RadioGroup
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    // flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Radio
                    value={0}
                    label="All Categories"
                    variant="outlined"
                    sx={{ paddingTop: '25px',
                      //  ml: { xs: 0, md: '150px' }
                       }}
                  />
                  <Radio
                    value={1}
                    label="Limited Categories"
                    variant="outlined"
                    sx={{ paddingTop: '25px', 
                      ml: { xs: '25px', md: '30px' }
                     }}
                  />

                  {formData.categoryId === 1 && (
                    <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      mt: 2,
                    }}
                    >
                      <FormLabel sx={{ mt: { xs: 2, md: 0 } }}>Limited Categories:</FormLabel>
                      <Select
                        placeholder="Select Category"
                        name="categoryId"
                        onChange={handleCategorySelectChange}
                      >
                        {category &&
                          category.map((opt, index) => (
                            <Option key={index} value={opt.id}>
                              {opt.categoryName}
                            </Option>
                          ))}
                      </Select>
                    </Box>
                  )}
                </Box>
              </RadioGroup>
            </Box> */}

<Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: { md: 'row' },
                justifyContent: { xs: 'space-between', md: 'flex-end' },
                gap: '5px',
                mt: 4,
                flexWrap: 'wrap',
              }}
            >
              <Button
                type="button"
                onClick={() => setOpen(false)}
                autoFocus
                variant="solid"
                sx={{
                  background: 'black',
                  '&:hover': { background: '#424242' },
                  color: 'white',
                }}
              >
                Cancel
              </Button>
              <Button
                autoFocus
                type="submit"
                variant="solid"
                sx={{
                  background: '#fdd835',
                  '&:hover': { background: '#E1A91B' },
                  color: 'black',
                }}
              >
                Add
              </Button>
            </Box>
          </AppForm>
        </div>
      </Sheet>
    </Modal>
  )
}
export default AddCustomAsset
