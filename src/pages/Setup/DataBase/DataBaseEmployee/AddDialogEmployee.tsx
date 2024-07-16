import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
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
import { customEmployee } from './EmployeeData'
import { addEmpCustomDatabase } from '../../../../redux/features/EmpCustomDatabseSlice'

interface DataBaseAddProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddEmployeeData: React.FC<DataBaseAddProps> = ({
  open,
  setOpen,
}) => {
  const [formData, setFormData] = useState({
    fieldName: '',
    componentsId: 1,
    isRequired: '',
  })

  const components = useSelector((state: RootState) => state.components.data)

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  const empCustomDatabase = useSelector((state: RootState) => state.empCustomDatabase.data);



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
    event: React.SyntheticEvent | null,
    newValue: number | null,
  ) => {
    setFormData((prevData) => ({ ...prevData, componentsId: newValue || 1 }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // handleAddSkill(formData)
    setFormData({
      fieldName: '',
      componentsId: 1,
      isRequired: '',
    })
    setOpen(false)
    console.log('Form Data:', formData)
    dispatch(addEmpCustomDatabase(formData))
  }

  const handleClose = () => {
    setOpen(false)
    setFormData({
      fieldName: '',
      componentsId: 1,
      isRequired: '',
    })
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

        <AppForm onSubmit={handleSubmit}>
          <FormControl>
  <FormLabel sx={{ paddingTop: '30px', marginLeft: '20px' }}>
    Custom Field Label*:
    <Input
      variant="outlined"
      type="text"
      name="fieldName"
      value={formData.fieldName}
      onChange={handleChange}
      onInput={(e) => {
        const target = e.target as HTMLInputElement;
        target.value = target.value.replace(/[^a-zA-Z0-9-]/g, '');
      }}
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
            <FormLabel sx={{ paddingTop: '20px' }}>Data Required:</FormLabel>
            <RadioGroup
              name="isRequired"
              value={formData.isRequired}
              onChange={handleRadioChange}
              sx={{ marginLeft: '20px' }}
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
export default React.memo(AddEmployeeData)