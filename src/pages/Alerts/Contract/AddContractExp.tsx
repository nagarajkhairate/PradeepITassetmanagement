import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/joy'
import AppView from '../../../components/Common/AppView'
import React, { useEffect, useState } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchContractDatabase } from '../../../redux/features/ContractDatabaseSlice'
import {
  addAlertsAddContract,
  fetchAlertsAddContract,
} from '../../../redux/features/AlertsAddContractSlice'
import AppForm from '../../../components/Common/AppForm'
import { useNavigate } from 'react-router-dom'

export const AddContractExp: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<any>({})
  const [errors, setErrors] = useState<{ date?: string }>({})
  const contractDatabase = useSelector(
    (state: RootState) => state.contractDatabase.data,
  )

  useEffect(() => {
    dispatch(fetchContractDatabase())
  }, [dispatch])

  useEffect(() => {
    if (contractDatabase.length > 0) {
      const initialFormData = contractDatabase.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || ''
        return acc
      }, {})
      setFormData(initialFormData)
    }
  }, [ contractDatabase])

  useEffect(() => {
    if (contractDatabase.length > 0) {
      setFormData(contractDatabase)
    }
  }, [contractDatabase])

  const validateDates = (startDate?: string, endDate?: string) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        return 'Start date should be less than or equal to end date.';
      }
    }
    return '';
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value }= event.target;
    if((name === 'cost' || name === 'noofLicenses') && ! /^\d*\.?\d*$/.test(value)){
      return;
    }

    if(name === 'phone'){
      const phoneRegex = /^[1-9]*$/;
      if(!phoneRegex.test(value)){
        return;
      }
    }

    if((name === 'description' || name === 'contractTitle' || name === 'vendor' || name === 'contractPerson' )){
      const stringRegex = /^[a-zA-Z\s]*$/;
      if(!stringRegex.test(value)){
        return;
      }
    }
    if (name === 'hyperlink') {
      const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
      if (!urlRegex.test(value)) {
        return; // Prevent input if it doesn't match the regex
      }
    }

    setFormData({ ...formData, [name]:value }) 
    
    setFormData(prevFormData => {
      const updatedFormData = { ...prevFormData, [name]: value };

      // Validate dates when either start or end date changes
      if (name === 'startDate' || name === 'endDate') {
        const dateError = validateDates(updatedFormData.startDate, updatedFormData.endDate);
        setErrors({ date: dateError });
      }

      return updatedFormData;
    });
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.checked })
  }

  const handleSelectChange = (value: string | null, name: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

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
      <Box sx={{ marginBottom: 3 }}>
      <FormControl
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        width: '100%',
        }}
      >
        <FormLabel
        sx={{
          minWidth: {md:'150px', xs:'90px'}, 
          textAlign: 'left', 
          wordBreak:'break-word',
          whiteSpace:'normal'
        }}
        >
          {fieldName} <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        {component}
      </FormControl>
      </Box>
    )

    switch (commonProps.field.components.type) {
      case 'text':
      case 'date':
      case 'number':
      case 'textarea':
        return renderWithAsterisk(
          <Input
            type={commonProps.field.components.type}
            name={commonProps.field.name}
            value={commonProps.formData[commonProps.field.name] as string}
            onChange={commonProps.handleChange}
            sx={{
              padding: '10px',  
              width: {md:"300px", xs:'270px'},
            }}
          />,
          commonProps.field.fieldName,
        )

      case 'checkbox':
        return renderWithAsterisk(
          <Checkbox
            type={commonProps.field.components.type}
            name={commonProps.field.name}
            checked={commonProps.formData[commonProps.field.name] as boolean}
            onChange={commonProps.handleChange}
          />,
          commonProps.field.fieldName,
        )

      case 'radio':
        return renderWithAsterisk(
          <FormControl
          sx={{
            display: 'flex',
            flexDirection: 'row', 
            justifyContent: { xs: 'flex-start', md: 'flex-start' },
            gap: 2,
          }}
          >
            <RadioGroup
              name={commonProps.field.name}
              value={commonProps.formData[commonProps.field.name] || "no"}
              onChange={commonProps.handleRadioChange}
              sx={{
                display: 'flex',
                flexDirection:  'row' , 
                justifyContent: { xs: 'flex-start', md: 'flex-start' },
                gap: 2,
              }}
            >
              <Box
               sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: { xs: 'flex-start', md: 'flex-start' },
                alignItems: 'flex-start',
                gap: 3,
                width: { md: '300px', xs: '270px' },
              }}>
                <Radio value="yes" label="Yes" />
                <Radio value="no" label="No" />
              </Box>
            </RadioGroup>
          </FormControl>,
          commonProps.field.fieldName,
        )

      default:
        return null
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const { startDate, endDate } = formData;
    const dateError = validateDates(startDate, endDate);

    if (dateError) {
      setErrors({ date: dateError });
      return;
    }
    console.log('Form submitted:', formData)
    dispatch(addAlertsAddContract(formData))
    // navigate('/alerts/contracts-expiring', {
    //   state: { selectedColumns: Object.keys(formData) },
    // })
  }

  return (
    <AppView>
      <Typography level="h3">Add a Contract / Software License</Typography>

      <Box
        sx={{
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#FFF',
          flexGrow: 1,
          marginTop: { xs: '10px', sm: '22px' },
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              level="h4"
              sx={{
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '30px',
                textAlign: { xs: 'center', md: 'left' },
                whiteSpace: 'nowrap',
                mt: 0,
              }}
            >
              Add a Contract / Software License
            </Typography>

            <Typography
              sx={{
                p: 1,
              }}
            >
              Include detailed information about your new contract/software
              license. Then, tag specific assets on the Contract / Software
              License View page.
            </Typography>
          </Box>

          <Box
            sx={{
              padding: '5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', 
              textAlign: 'center', 
              
            }}
          >
            <AppForm onSubmit={handleSubmit}>
            <Box>
              {contractDatabase.map((field, index) => (
              
                  <Box key={index}>
                    {handleInputValue(
                      field,
                      formData,
                      handleChange,
                      handleSelectChange,
                      handleRadioChange,
                    )}
                  </Box>  
              ))}
            {errors.date && (
              <Typography sx={{ color: 'red', mb: 2 }}>
                {errors.date}
              </Typography>
            )}

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: { md: 'row' },
                  justifyContent: { xs: 'space-between', md: 'space-between' },
                  gap: '5px',
                  mt: 4,
                  flexWrap: 'wrap',
                }}
              >
                <Button
                  type="button"
                  // onClick={handleClose}
                  autoFocus
                  variant="solid"
                  sx={{
                    background: 'black',
                    '&:hover': { background: '#424242' },
                    color: 'white',
                    // marginLeft: '50px',
                  }}
                  // onClick={() => navigate('/alerts/contracts-expiring')}
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
                    // marginTop: '25px',
                    // marginLeft: '40%',
                  }}
                >
                  Submit
                </Button>
              </Box>
              </Box>
            </AppForm>
          </Box>
        </Box>
      </Box>
    </AppView>
  )
}

export default React.memo(AddContractExp)
