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
  fetchAlertsAddContractById,
  updateAlertsAddContract,
} from '../../../redux/features/AlertsAddContractSlice'
import AppForm from '../../../components/Common/AppForm'
import { useNavigate, useParams } from 'react-router-dom'

export const EditContract: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<any>({})
  const [contractFields, setContractFields] = useState<any[]>([])
  const { contractId } = useParams<{ contractId: string }>()
  const [errors, setErrors] = useState<{ date?: string }>({})

  const { id } = useParams<{ id: string }>()
  const contractDatabase = useSelector(
    (state: RootState) => state.contractDatabase.data,
  )

  const alertsAddContract = useSelector(
    (state: RootState) => state.alertsAddContract.data,
  )
  console.log(formData)

  useEffect(() => {
    dispatch(fetchContractDatabase())
  }, [dispatch])

  useEffect(() => {
    if (id) {
      dispatch(fetchAlertsAddContractById(id))
    }
  }, [dispatch, id])

  // useEffect(() => {
  //   if (alertsAddContract.length > 0) {
  //     setContractFields(alertsAddContract)
  //   }
  // }, [alertsAddContract])

  useEffect(() => {
    if (alertsAddContract.length > 0) {
      const initialData = alertsAddContract[0]; // Assuming you want to set the first contract data as the initial form data
  
      // Clear formData and set with only the updated data
      setFormData({ ...initialData });
  
      setContractFields(alertsAddContract); // Update the contract fields
    }
  }, [alertsAddContract]);
  

  // useEffect(() => {
  //   setFormData(alertsAddContract[0])
  // }, [alertsAddContract])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => {
      const updatedFormData = { ...prevFormData, [name]: value };
  
      // Validate dates when either start or end date changes
      if (name === 'startDate' || name === 'endDate') {
        const dateError = validateDates(updatedFormData.startDate, updatedFormData.endDate);
        setErrors({ date: dateError });
      }
      return updatedFormData;
    });
  };
  

  const validateDates = (startDate?: string, endDate?: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
  
    if (startDate && !dateRegex.test(startDate)) {
      return 'Start date must be in YYYY-MM-DD format.';
    }
  
    if (endDate && !dateRegex.test(endDate)) {
      return 'End date must be in YYYY-MM-DD format.';
    }
  
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        return 'Start date should be less than or equal to end date.';
      }
    }
  
    return '';
  };
  

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
            // gap:3,
            width: '100%',
          }}
        >
          <FormLabel
            sx={{
              minWidth: { md: '150px', xs: '90px' },
              textAlign: 'left',
              wordBreak: 'break-word',
              whiteSpace: 'normal',
            }}
          >
            {fieldName} <span style={{ color: 'red' }}>*</span>
          </FormLabel>
          {component}
        </FormControl>
      </Box>
    )

    switch (field.components.type) {
      case 'text':
      case 'date':
      case 'number':
      case 'textarea':
        return renderWithAsterisk(
          <Input
            type={field.components.type}
            name={field.name}
            value={(formData?.[field.name]) as string}
            onChange={handleChange}
            sx={{
              padding: '10px',
              width: { md: '300px', xs: '270px' },
            }}
          />,
          field.fieldName,
        )

      case 'checkbox':
        return renderWithAsterisk(
          <Checkbox
            // type={field.components.type}
            name={field.name}
            checked={(formData && formData[field.name]) as boolean}
            onChange={handleChange}
          />,
          field.fieldName,
        )

      case 'radio':
        return renderWithAsterisk(
          <FormControl>
            {/* <FormLabel>{field.fieldName}</FormLabel> */}
            <RadioGroup
              name={field.name}
              value={(formData?.[field.name]) || 'no'}
              onChange={handleRadioChange}
              sx={{
                display: 'flex',
                flexDirection: 'row',
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
                }}
              >
                <Radio value="yes" label="Yes" />
                <Radio value="no" label="No" />
              </Box>
            </RadioGroup>
          </FormControl>,
          field.fieldName,
        )

      default:
        return null
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    dispatch(updateAlertsAddContract(formData))
    navigate(`/alerts/contracts-expiring/view-contract/${id}`, {
      state: { selectedColumns: Object.keys(formData) },
    })
  }

  return (
    <AppView>
      <Typography level="h3">Edit a Contract / Software License</Typography>

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
              Edit a Contract / Software License
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
                    {errors.date && field.name === 'startDate' && (
        <Typography sx={{color:'red'}}>{errors.date}</Typography>
      )}
                  </Box>
                ))}

                <Divider sx={{ mt: 3 }} />

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: { md: 'row' },
                    justifyContent: {
                      xs: 'space-between',
                      md: 'space-between',
                    },
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
                    onClick={() => navigate(`/alerts/contracts-expiring`)}
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
                    // onClick={() => navigate('/alerts/contracts-expiring')}
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

export default React.memo(EditContract)
