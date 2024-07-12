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

interface DataItem {
  id: number; // Adjust according to your data structure
  fieldName: string;
  componentsId: string;
  category: string;
  isRequired: string;
}

interface DataBaseAddProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataBases: { customAsset: DataItem[] };
  handleAddSkill: (formData: DataItem) => void;
}

const AddEmployeeData: React.FC<DataBaseAddProps> = ({
  open,
  setOpen,
  handleAddSkill,
}) => {
  const [formData, setFormData] = useState<DataItem>({
    id: 1, // or assign an appropriate initial value for id
    fieldName: '',
    componentsId: '',
    category: '',
    isRequired: '',
  });

  const components = useSelector((state: RootState) => state.components.data)

  const handleClickOpen = () => {
    setOpen(true)
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddSkill(formData);
    setFormData({
      id: 0, // Reset id or assign a new value if needed
      fieldName: '',
      componentsId: '',
      category: '',
      isRequired: '',
    });
    setOpen(false); // Close modal after submission
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      id: 0, // Reset id or assign a new value if needed
      fieldName: '',
      componentsId: '',
      category: '',
      isRequired: '',
    });
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

        <AppForm onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel sx={{ paddingTop: '30px', marginLeft: '20px' }}>
              Custom Field Label*:
              <Input
                variant="outlined"
                type="text"
                id="custom"
                name="custom"
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
              value={formData.isRequired ? 'yes' : 'optional'}
              onChange={handleChange}
            >l
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
export default AddEmployeeData
