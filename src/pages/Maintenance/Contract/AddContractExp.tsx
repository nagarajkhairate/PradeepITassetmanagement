import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Typography,
  } from '@mui/joy'
  import AppView from '../../../components/Common/AppView'
  import React, { useEffect, useState } from 'react'
  import { ThunkDispatch } from 'redux-thunk'
  import { RootState } from '../../../redux/store'
  import { useDispatch, useSelector } from 'react-redux'
  import { fetchContractDatabase } from '../../../redux/features/ContractDatabaseSlice'
import { addAlertsAddContract, fetchAlertsAddContract } from '../../../redux/features/AlertsAddContractSlice'
  
  export const AddContractExp: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
    const [formData, setFormData] = useState<any>({})
    const contractDatabase = useSelector(
      (state: RootState) => state.contractDatabase.data,
    )
  
    useEffect(() => {
      dispatch(fetchContractDatabase())
    }, [dispatch])


  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [event.target.name]: event.target.value })
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
    //   handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
      mode?: string
    ) => {
      const commonProps = {
        field,
        formData,
        handleChange,
        handleSelectChange,
        // handleRadioChange,
        mode,
      };
  
      const renderWithAsterisk = (component: React.ReactNode, fieldName: string) => (
        <FormControl>
          <FormLabel>
            {fieldName} <span style={{ color: 'red' }}>*</span>
          </FormLabel>
          {component}
        </FormControl>
      );
  
      switch (commonProps.field.components.type) {
        case "text":
        case 'date':
        case "number":
        case 'textarea':
          return renderWithAsterisk(
            <Input
              type={commonProps.field.components.type}
              name={commonProps.field.name}
              value={commonProps.formData[commonProps.field.name] as string}
              onChange={commonProps.handleChange}
              sx={{
                padding: '10px',
                width: "300px",
              }}
            />,
            commonProps.field.fieldName
          );

        case "checkbox":
          return renderWithAsterisk(
            <Checkbox
              type={commonProps.field.components.type}
              name={commonProps.field.name}
              checked={commonProps.formData[commonProps.field.name] as boolean}
              onChange={commonProps.handleChange}
            />,
            commonProps.field.fieldName
          );
        default:
          return null;
      }
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      // Add your form submission logic here
      console.log("Form submitted:", formData);
      dispatch(addAlertsAddContract(formData))
    };
  
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
              }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container alignItems="center">
                  {contractDatabase.map((field, index) => (
                    <React.Fragment key={index}>
                      <Grid xs={12}>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            mb: '10px',
                            mt: '10px',
                            paddingLeft: '10px',
                          }}
                        >
                          {/* {field.fieldName} */}
                        </Typography>
                      </Grid>
                      <Grid xs={12}>
                        {handleInputValue(
                          field,
                          formData,
                          handleChange,
                          handleSelectChange,
                        //   handleRadioChange
                        )}
                      </Grid>
                    </React.Fragment>
                  ))}
  
                  <Divider sx={{ mt: 3 }} />
  
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
                      // onClick={handleClose}
                      autoFocus
                      variant="solid"
                      sx={{
                        background: 'black',
                        '&:hover': { background: '#424242' },
                        color: 'white',
                        // marginLeft: '50px',
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
                        // marginTop: '25px',
                        // marginLeft: '40%',
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </form>
            </Box>
          </Box>
        </Box>
      </AppView>
    )
  }
  
  export default React.memo(AddContractExp)
  