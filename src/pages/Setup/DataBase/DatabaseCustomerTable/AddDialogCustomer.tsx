import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import React, { ChangeEvent, useEffect, useState } from 'react'
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
} from '@mui/joy'
import AppForm from '../../../../components/Common/AppForm'
import { RootState } from '../../../../redux/store'

interface DataBaseAddProps {
  open: any
  setOpen: any
  dataBases: { customAsset: string[] }
  setDataBases: React.Dispatch<
    React.SetStateAction<{ customAsset: string[] }>
  >
}

const AddDialogCustomer: React.FC<DataBaseAddProps> = ({
  open,
  setOpen,
  setDataBases,
}) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  const components = useSelector((state: RootState) => state.components.data)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [formData, setFormData] = useState({
    custom: '',
    componentsId: '',
    selectedCategories: '',
    dataRequired: '',
  })

  // React.useEffect(() => {
  //   dispatch(fetchComponents())
  // }, [dispatch])

  const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // addCustomField(formData);
    setDataBases((prevData: any) => ({
      ...prevData,
      customAsset: [
        ...prevData.customAsset,
        {
          fieldName: formData.custom,
          componentsId: formData.componentsId,
          category: formData.selectedCategories,
          isRequired: formData.dataRequired,
        },
      ],
    }))
    // dispatch(addDataBase(formData))
    handleClose()
    setOpen(false)
    setFormData({
      custom: '',
      componentsId: '',
      dataRequired: '',
      selectedCategories: '',
    })
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    // const val =  value;
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setFormData((prevData) => ({ ...prevData, componentsId: newValue || '' }))
  }

  return (
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

        <AppForm onSubmit={handleAddSkill}>
          <FormControl>
            <FormLabel sx={{ paddingTop: '30px', marginLeft: '20px' }}>
              Custom Field Label*:
              <Input
                variant="outlined"
                type="text"
                id="custom"
                name="custom"
                value={formData.custom}
                onChange={handleChange}
                required
                sx={{ width: '45%', marginLeft: '20px' }}
              />
            </FormLabel>
          </FormControl>

          <FormControl>
            <FormLabel sx={{ paddingTop: '30px', marginLeft: '20px' }}>
              Data Types*:
              <Select
                placeholder="Select Data Types"
                sx={{ width: '50%', marginLeft: '70px' }}
                name="dataType"
                value={formData.componentsId}
                onChange={handleSelectChange}
              >
                {components &&
                  components.map((comp) => (
                    <Option key={comp.id} value={comp.id}>
                      {comp.compName}
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
            <FormLabel sx={{ paddingTop: '36px', marginLeft: '20px' }}>
              Data Required:
            </FormLabel>
            <RadioGroup
              name="dataRequired"
              value={formData.dataRequired.toString()}
              onChange={handleChange}
            >
              <Box>
                <Radio
                  value="yes"
                  label="Yes"
                  variant="outlined"
                  sx={{ paddingTop: '10px', marginLeft: '55px' }}
                />
                <Radio
                  value="optional"
                  label="Optional"
                  variant="outlined"
                  sx={{ paddingTop: '30px', marginLeft: '10px' }}
                />
              </Box>
            </RadioGroup>
          </FormControl>

          {/* <Box>
            <FormLabel
              sx={{
                paddingTop: '25px',
                marginLeft: '20px',
                display: 'flex',
                flexDirection: { md: 'flex-end', xs: 'flex-end' },
              }}
            >
              Selected <span style={{ marginRight: '8px' }}>Categories:</span>
              <span style={{ marginLeft: '10px' }}>
                Is this field visible to assets of selective 'Categories'?
              </span>
            </FormLabel>

            <RadioGroup
              name="selectedCategories"
              value={formData.selectedCategories.toString()}
              onChange={handleChange}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { md: 'flex-end', xs: 'center' },
                }}
              >
                <Radio
                  value="All Categories"
                  label="All Categories"
                  variant="outlined"
                  sx={{ paddingTop: '20px', marginLeft: '165px' }}
                />
                <Radio
                  value="Limited Categories"
                  label="Limited Categories"
                  variant="outlined"
                  sx={{ paddingTop: '20px', marginLeft: '15px' }}
                />
              </Box>
            </RadioGroup>
          </Box> */}

          <Button
            autoFocus
            type="submit"
            variant="solid"
            sx={{
              background: '#fdd835',
              color: 'black',
              marginTop: '25px',
              marginLeft: '30%',
            }}
          >
            Save
          </Button>

          <Button
            type="button"
            onClick={handleClose}
            autoFocus
            variant="solid"
            sx={{ background: 'black', color: 'white', marginLeft: '25px' }}
          >
            Cancel
          </Button>
        </AppForm>
      </div>
    </Sheet>
  )
}
export default AddDialogCustomer
