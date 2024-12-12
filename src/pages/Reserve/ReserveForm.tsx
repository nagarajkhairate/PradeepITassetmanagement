import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Table,
  Input,
  Button,
  Radio,
  Checkbox,
  RadioGroup,
  FormLabel,
  FormControl,
  Grid,
  Chip,
} from '@mui/joy'
import AppView from '../../components/Common/AppView'
import AppForm from '../../components/Common/AppForm'
import { fetchCheckOut } from '../../redux/features/CheckOutSlice'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import SiteComponent from '../../components/AssetSections/SiteComponent'
import LocationComponent from '../../components/AssetSections/LocationComponent'
import SelectOption from '../../components/AssetSections/SelectOption'
import { fetchEmployee } from '../../redux/features/EmployeeSlice'
import { useNavigate } from 'react-router-dom'
import { fetchReserveFields } from '../../redux/features/ReserveFieldSlice'
import { addReserve } from '../../redux/features/ReserveSlice'
import AddNewEmpployee from '../CheckOut/AddNewEmpployee'
import AddNewCustomer from '../Lease/AddNewCustomer'

interface CheckOutFormProps {
  selectedAssets: any
}

const ReserveForm: React.FC<CheckOutFormProps> = ({ selectedAssets }) => {
  const [open, setOpen] = useState(false)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [filteredFields, setFilteredFields] = useState([]);
  const [formData, setFormData] = useState<any>({})
  const navigate = useNavigate()
  const [reserverFor, setReserverFor] = useState('person')
  const checkOut = useSelector((state: RootState) => state.checkOut.data)
  const reserveFields = useSelector(
    (state: RootState) => state.reserveField.data,
  )
  const employees = useSelector((state: RootState) => state.addEmployee.data)
  // const [filteredFields, setFilteredFields] = useState('person')

  useEffect(() => {
    dispatch(fetchCheckOut())
    dispatch(fetchReserveFields())
    dispatch(fetchEmployee())
  }, [dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSelectChange = (newValue: any, title: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [title]: newValue,
    }))
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setReserverFor(value)
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

   await setFormData((prevData: any) => {
      const formData = {
        ...prevData,
        assetId: selectedAssets[0].id,
      }
      setOpen(false)
      dispatch(addReserve(formData))

    })
    navigate(`/assets/list-of-assets`);

  }

  const radioOptions = [
    { value: 'person', label: 'Person' },
    { value: 'site', label: 'Site / Location' },
    { value: 'customer', label: 'Customer' },
  ]

  const handleInputValue = (
    field: any,
    formData: any,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSelectChange: (value: string | null, name: string) => void,
    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    mode?: string,
  ) => {
    const commonProps = {
      field,
      formData,
      handleChange,
      handleSelectChange,
      handleRadioChange,
      mode,
    }

    const renderWithAsterisk = (
      component: React.ReactNode,
      fieldName: string,
    ) => (
      <FormControl>
        <FormLabel>
          {fieldName} <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        {component}
      </FormControl>
    )

    switch (field.components.type) {
      case 'text':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              type={field.components.type}
              name={field.name}
              value={formData && formData[field.name] as string}
              onChange={handleChange}
              sx={{
                padding: '10px',
              }}
            />
          </FormControl>
        )
      case 'date':
        return (
          <FormControl >
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              type={field.components.type}
              name={field.name}
              value={formData && formData[field.name] as string}
              onChange={handleChange}
              sx={{
                padding: '10px',
                minWidth: 200
              }}
            />
          </FormControl>
        )
      case 'number':
      case 'email':
        return (
          <FormControl >
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              type={field.components.type}
              name={field.name}
              value={formData && formData[field.name] as string}
              onChange={handleChange}
              sx={{
                padding: '10px',
                minWidth: 200
              }}
            />
          </FormControl>
        )
      case 'radio':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <RadioGroup
              type={field.components.type}
              name={field.name}
              value={formData && formData[field.name] as string}
              onChange={handleRadioChange}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: '20px',
              }}
            >
              {radioOptions.map((option) => (
                <Radio
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  sx={{
                    margin: '0 8px',
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )
      case 'textarea':
        return (
          <FormControl >
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              type={field.components.type}
              name={field.name}
              value={formData && formData[field.name] as string}
              onChange={handleChange}
              sx={{
                padding: '10px',
                minWidth: 200
              }}
            />
          </FormControl>
        )

      case 'checkbox':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Checkbox
              type={field.components.type}
              name={field.name}
              checked={formData && formData[field.name] as boolean}
              onChange={handleChange}
            />
          </FormControl>
        )

      case 'select':
        if (field.name === 'siteId') {
          return <SiteComponent {...commonProps} />
        } else if (field.name === 'locationId') {
          return <LocationComponent {...commonProps} />
        }else if (field.name === 'employeeId') {
          return <AddNewEmpployee {...commonProps} />
        }else if (field.name === 'customerId') {
          return <AddNewCustomer {...commonProps} />
        }
          return <SelectOption {...commonProps} />
        
      default:
        return null
    }
  }

  const getEmployeName = (empId: number) => {
    const employeeName = employees && employees.find((emp) => emp.id === empId)
    return employeeName ? employeeName.empName : null
  }

  const getAssignTo = (id: any) => {
    const assignment =
      checkOut && checkOut.find((assign) => assign.assetId === id)
    return assignment ? getEmployeName(assignment.assignedTo) : null
  }

  const statusColorMap: Record<string, string> = {
    Available: 'success',
    CheckedOut: 'neutral',
    Leased: 'neutral',
    Disposed: 'neutral'
  }

  useEffect(() => {

    const filtered = reserveFields.filter((field) => {
      if (reserverFor === 'person') {
        return field.name !== 'siteId' && field.name !== 'locationId' && field.name !== 'customerId';
      } else if (reserverFor === 'site') {
        return field.name !== 'employeeId' && field.name !== 'customerId';
      } else if (reserverFor === 'customer') {
        return field.name !== 'employeeId' && field.name !== 'siteId' && field.name !== 'locationId';
      }
      return true;
    });
    console.log("filtered");

    setFilteredFields(filtered);
  }, [reserverFor, reserveFields]);

  

  return (
    <AppForm onSubmit={handleFormSubmit}>
      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          padding: '32px',
        }}
      >
        <Typography component="h2" sx={{ ml: '10px', mb: '15px' }}>
          Assets Pending Reserve
        </Typography>
        <Box
          sx={{
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            marginBottom: '15px',
          }}
        >
          <Table
            sx={{
              border: '1px solid #f2f2f2',
              width: '100%',
              minWidth: '800px',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    width: '30px',
                    background: '#fff8e6',
                  }}
                >
                  <Checkbox />
                </th>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    background: '#fff8e6',
                  }}
                >
                  Asset Tag ID
                </th>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    background: '#fff8e6',
                  }}
                >
                  Description
                </th>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    background: '#fff8e6',
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    background: '#fff8e6',
                  }}
                >
                  Assigned to
                </th>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    background: '#fff8e6',
                  }}
                >
                  Site
                </th>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    background: '#fff8e6',
                  }}
                >
                  Location
                </th>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    background: '#fff8e6',
                  }}
                >
                  Lease To
                </th>
              </tr>
            </thead>

            <tbody>
              {selectedAssets &&
                selectedAssets.map((asset: any) => (
                  <tr key={asset.id}>
                    <td
                      style={{
                        padding: '8px',
                        border: '1px solid #f2f2f2',
                        width: '20px',
                      }}
                    >
                      <Checkbox />
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #f2f2f2' }}>
                      {asset.assetTagId}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #f2f2f2' }}>
                      {asset.description}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #f2f2f2' }}>
                      <Chip
                        variant="soft"
                        size="sm"
                        color={
                          statusColorMap[
                            asset.status as keyof typeof statusColorMap
                          ] as 'success' | 'neutral'
                        }
                      >
                        {asset.status}
                      </Chip>
                    </td>

                    <td style={{ padding: '8px', border: '1px solid #f2f2f2' }}>
                      {getAssignTo(asset.id)}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #f2f2f2' }}>
                      {asset.site.name}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #f2f2f2' }}>
                      {asset.location.name}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #f2f2f2' }}>
                      {asset.leaseTo}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Box>

        <Box
          sx={{
            padding: {xs: '5px', sm: '5px', md: '10px', lg:'20px'},
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Grid container columnSpacing={10} >
          {filteredFields.length>0 &&
    filteredFields.map((field, index) => (
                  <Grid key={index} xs={12} sm={12} md={6} lg={6}>
                    {handleInputValue(
                      field,
                      formData,
                      handleChange,
                      handleSelectChange,
                      handleRadioChange,
                    )}
                  </Grid>
                ))}
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            sx={{ padding: '20px', gap: '15px' }}
          >
            <Grid>
              <Button
                type="submit"
                sx={{
                  background: '#FABC1E',
                  '&:hover': { background: '#e0a71b' },
                }}
              >
                Reserve
              </Button>
            </Grid>
            <Grid>
              <Button
                size="md"
                onClick={() => setOpen(false)}
                sx={{
                  background: '#000000',
                  '&:hover': {
                    background: '#333333',
                  },
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </AppForm>
  )
}

export default ReserveForm