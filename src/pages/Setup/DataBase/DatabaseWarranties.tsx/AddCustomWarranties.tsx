import { ThunkDispatch } from 'redux-thunk'
// import { addDataBase } from '../../../../redux/features/DataBaseSlice'
import { useDispatch, useSelector } from 'react-redux'
import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  Option,
  Radio,
  RadioGroup,
  Select,
  Sheet,
  Typography,
} from '@mui/joy'
import AppForm from '../../../../components/Common/AppForm'
import { RootState } from '../../../../redux/store'
import { fetchComponents } from '../../../../redux/features/ComponentsIdSlice'
import { addWarrantiesCustomDatabase } from '../../../../redux/features/WarrantiesCustomDatabaseSlice'

interface DataBaseAddProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddCustomWarranties: React.FC<DataBaseAddProps> = ({
  open,
  setOpen,
}) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  const components = useSelector((state: RootState) => state.components.data)
  React.useEffect(() => {
    dispatch(fetchComponents())
  }, [dispatch])

  const [formData, setFormData] = useState({
    fieldName: '',
    componentsId: 1,
    isRequired: 'optional',
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, isRequired: value }))
  }

  const handleSelectChange = (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
    value: unknown
  ) => {
    setFormData((prevData:any) => ({
      ...prevData,
      componentsId: value ? parseInt(value as string, 10) : 1,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormData({
      fieldName: '',
      componentsId: 1,
      isRequired: 'optional',
    })
    setOpen(false) // Close modal after submission
    dispatch(addWarrantiesCustomDatabase(formData))
    console.log('Form Data:', formData)
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
              p:2
            }}
          >
    <Sheet
      variant="outlined"
      sx={{
        maxWidth: 500,
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
                onChange={handleRadioChange}
                sx={{ marginLeft: 'none' }}
              >
                <Box>
                  <Radio
                    value="yes"
                    label="Yes"
                    variant="outlined"
                    sx={{ paddingTop: '10px', marginLeft: {md:'49px',xs:'39px'} }}
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
            Save
          </Button>

          </Box>
        </AppForm>
      </div>
    </Sheet>
    </Modal>
  )
}
export default React.memo(AddCustomWarranties)
