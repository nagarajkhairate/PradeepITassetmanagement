

import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import React, { ChangeEvent, FormEvent, forwardRef, Ref, useEffect, useState } from 'react'
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
} from '@mui/joy'
import AppForm from '../../../../components/Common/AppForm'
import { RootState } from '../../../../redux/store'
import { addDefaultFields } from '../../../../redux/features/DefaultFieldAssetSlice'
import { addDataBase, updateDataBase } from '../../../../redux/features/DataBaseSlice'

interface DataBaseAddProps {
  open: any
  setOpen: any
  dataBases: { customAsset: string[] }
  setDataBases: React.Dispatch<React.SetStateAction<{ customAsset: string[] }>>
  handleClose: () => void;
  isEditMode: boolean;
  existingFieldData?: any; // Adjust the type based on your actual data
}
interface AddDialogDataProps {
  open: boolean;
  handleClose: () => void;
  isEditMode: boolean;
  existingFieldData?: any; // Adjust the type based on your actual data
}


const AddDialogData = forwardRef(({
  open,
  setOpen,
  setDataBases,
  isEditMode,
}: DataBaseAddProps, ref: Ref<HTMLDivElement>) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [limitedCategories, setLimitedCategories] = useState<string[]>([])
  const components = useSelector((state: RootState) => state.components.data)

  const categoryOptions = useSelector((state: RootState) => state.dataBase.data); // Assuming this is where your category options are stored

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [formData, setFormData] = useState({
    fieldName: '',
    componentsId: 0,
    categoryId: 0,
    dataRequired: '',
    limitedCategories: [] as string[],
  })

  React.useEffect(() => {
    dispatch(fetchComponents())
  }, [dispatch])

  console.log(components)

  const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // addCustomField(formData);
    const selectedComponent = components.find(
      (component) => component.id === formData.componentsId
    )
    setDataBases((prevData: any) => ({
      ...prevData,
      customAsset: [
        ...prevData.customAsset,
        {
          fieldName: formData.fieldName,
          componentsId: formData.componentsId,
          categoryId: formData.categoryId,
          isRequired: formData.dataRequired,
          componentType: selectedComponent ? selectedComponent.type : '',
          limitedCategories,
        },
      ],
    }))
    dispatch(addDefaultFields(formData)); 
    handleClose()
    setOpen(false)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    // const val =  value;
    const categoryIdValue = name === 'categoryId' ? parseInt(value, 10) : value;
    setFormData((prevData) => ({ ...prevData, [name]: categoryIdValue }))
  }
  

  const handleSelectChange = (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
    value: unknown
  ) => {
    setFormData((prevData:any) => ({
      ...prevData,
      componentsId: value ? parseInt(value as string, 10) : 0,
    }))
  }
  
  // const handleLimitedCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target
  //   setLimitedCategories((prevCategories) =>
  //     prevCategories.includes(value)
  //       ? prevCategories.filter((category) => category !== value)
  //       : [...prevCategories, value]
  //   )
  // }

  const handleLimitedCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      limitedCategories: prevData.limitedCategories.includes(value)
        ? prevData.limitedCategories.filter((category) => category !== value)
        : [...prevData.limitedCategories, value],
    }));
    console.log("Updated Limited Categories:", formData.limitedCategories);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(updateDataBase(formData));
    } else {
      dispatch(addDataBase(formData));
    }
    handleClose();
  };

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
                id="fieldName"
                name="fieldName"
                value={formData.fieldName}
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
                name="componentsId"
                value={formData.componentsId}
                onChange={(event, value)=> handleSelectChange(event,value)}
              >
                {components &&
                  components.map((option, index) => (
                    <Option 
                    key={index}
                     value={option.id}
                    >
                      {option.type}
                      {/* <Components  /> */}
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
              value={formData.dataRequired}
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

          <Box>
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
                  sx={{ paddingTop: '20px', marginLeft: '15px' }}
                />
              </Box>
            </RadioGroup>

            {formData.categoryId === 1 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                <FormLabel>Limited Categories:</FormLabel>
                {categoryOptions.map((option) => (
                  <Radio
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    checked={formData.limitedCategories.includes(option.value)}
                    onChange={handleLimitedCategoryChange}
                    variant="outlined"
                    sx={{ paddingTop: '10px', marginLeft: '55px' }}
                  />
                ))}
              </Box>
            )}
          </Box>

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
})
export default AddDialogData