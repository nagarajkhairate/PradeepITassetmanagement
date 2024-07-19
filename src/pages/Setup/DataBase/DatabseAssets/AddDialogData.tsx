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
}

const AddDialogData: React.FC<DataBaseAddProps> = ({ open, setOpen }) => {
  const components = useSelector((state: RootState) => state.components.data)
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
    isRequired: '',
    categoryId: 1,
  })

  console.log(components)

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form Data:', {
      ...formData,
    })

    setOpen(false)
    dispatch(addAssetCustomDatabase(formData))
  }

  const handleClose = () => {
    setOpen(false)
    // setFormData({
    //   fieldName: '',
    //   componentsId: components.length > 0 ? components[0].id : null,
    //   isRequired: '',
    //   categoryId: components.length > 0 ? components[0].id : null,
    // })
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
            <FormControl>
              <FormLabel sx={{ paddingTop: '20px', marginLeft: '15%' }}>
                Custom Field Label*:
                <Input
                  variant="outlined"
                  type="text"
                  id="fieldName"
                  name="fieldName"
                  value={formData.fieldName}
                  onChange={handleChange}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement
                    target.value = target.value.replace(/[^a-zA-Z0-9-]/g, '')
                  }}
                  required
                  sx={{  marginLeft: '30px' }}
                />
              </FormLabel>
            </FormControl>

            <FormControl>
              <FormLabel sx={{ paddingTop: '30px', marginLeft: '24%' }}>
                Data Types*:
                <Select
                  placeholder="Select Data Types in your fields"
                  sx={{ marginLeft: '35px', width:'13.5rem' }}
                  name="componentsId"
                  value={formData.componentsId}
                 
                  onChange={(event, value) => handleSelectChange(event, value)}
                >
                  {components &&
                    components.map((option, index) => (
                      <Option key={index} value={option.id}>
                        {option.title}
                      </Option>
                    ))}
                </Select>
              </FormLabel>
            </FormControl>

            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FormLabel sx={{ paddingTop: '36px', marginLeft: '22%' }}>
                Data Required:
              </FormLabel>
              <RadioGroup
                name="isRequired"
                value={formData.isRequired}
                onChange={handleRadioChange}
              >
                <Box>
                  <Radio
                    value="yes"
                    label="Yes"
                    variant="outlined"
                    sx={{ paddingTop: '10px', marginLeft: '40px' }}
                  />
                  <Radio
                    value="optional"
                    label="Optional"
                    variant="outlined"
                    sx={{ paddingTop: '30px', marginLeft: '30px' }}
                  />
                </Box>
              </RadioGroup>
            </FormControl>

            <Box>
              <FormLabel
                sx={{
                  paddingTop: '25px',
                  marginLeft: '15%',
                  display: 'flex',
                  flexDirection: { md: 'flex-end', xs: 'flex-end' },
                }}
              >
                Selected Categories:
               
              </FormLabel>
              <FormLabel>
              <span style={{ marginLeft: '40%', wordBreak:'normal' }}>
                  Is this field visible to assets of selective 'Categories'?
                </span>
                </FormLabel>
              <RadioGroup
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { md: 'flex-end', xs: 'center' },
                  }}
                >
                  <Radio
                    value={0}
                    label="All Categories"
                    variant="outlined"
                    sx={{ paddingTop: '20px', marginLeft: '165px' }}
                  />
                  <Radio
                    value={1}
                    label="Limited Categories"
                    variant="outlined"
                    sx={{ paddingTop: '20px', marginLeft: '80px' }}
                  />
                
              {formData.categoryId === 1 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 'none',
                  }}
                >
                  <FormLabel
                  sx={{marginTop:'80px'}}
                  >Limited Categories:</FormLabel>
                  <Select
                    placeholder="Select Category"
                  
                    name="categoryId"
                    // value={formData.categoryId}
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
            </Box>

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
                autoFocus
                type="submit"
                variant="solid"
                sx={{
                  background: '#fdd835',
                  '&:hover': { background: '#E1A91B' },
                  color: 'black',
                }}
              >
                Save
              </Button>

              <Button
                type="button"
                onClick={() => setOpen(false)}
                autoFocus
                variant="solid"
                sx={{
                  background: 'black',
                  '&:hover': { background: 'black' },
                  color: 'white',
                }}
              >
                Cancel
              </Button>
            </Box>
          </AppForm>
        </div>
      </Sheet>
    </Modal>
  )
}
export default React.memo(AddDialogData)
