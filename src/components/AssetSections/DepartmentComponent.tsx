import React, { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import {
  Select,
  Option,
  Button,
  Typography,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { ThunkDispatch } from 'redux-thunk'
import SetupAddDept from '../../pages/Setup/Departments/SetupAddDept'
import { fetchDepartment } from '../../redux/features/DepartmentSlice'

interface DepartmentProps {
  field: {
    fieldName: string
    name: string
    options: { value: string; label: string }[]
  }
  formData: any
  handleSelectChange: (value: string | null, name: string) => void
}

const DepartmentComponent: React.FC<DepartmentProps> = ({
  field,
  formData,
  handleSelectChange,
}) => {
  const [error, setError] = useState<string>('')
  const departments = useSelector((state: RootState) => state.departments.data)
  const [open, setOpen] = useState<boolean>(false)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  const selectChange = (e: any, newValue: string | null) => {
    handleSelectChange(newValue, field.name)
  }

  useEffect(() => {
    dispatch(fetchDepartment())
  }, [dispatch])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: 2 }}>
      <FormControl sx={{ width: '300px' }}>
        <FormLabel>{field.fieldName}</FormLabel>

        <Select
          placeholder="Select Department"
          name={field.name}
          value={formData['department']?.id as string}
          onChange={selectChange}
        >
          {departments.map((department) => (
            <Option key={department.id} value={department.id}>
              {department.departmentName}
            </Option>
          ))}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>

      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        size="sm"
        sx={{
          mt:3,
          borderRadius: '15px',
          background: '#E4E4E4',
          '&:hover': {
            background: '#d9d9d9',
          },
          color: '#767676',
        }}
      >
        <Typography sx={{ mr: '10px', color: '#767676' }}>
          <AddIcon />
        </Typography>
        <Typography sx={{ mr: '10px', color: '#767676' }}>New </Typography>
      </Button>
      {open && <SetupAddDept open={open} setOpen={setOpen} />}
    </Box>
  )
}

export default DepartmentComponent
