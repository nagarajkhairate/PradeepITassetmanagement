import React, { useState } from 'react'
import { Box, Typography, Divider, Grid } from '@mui/joy'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import Button from '@mui/joy/Button'
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined'
import { CompanyInfoFields } from './Data'
import AppForm from '../../../components/Common/AppForm'
import FieldComponent from '../../../utils/FieldComponent'
import { useDispatch } from 'react-redux'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  fetchCompanyInfo,
  updateCompanyInfo,
} from '../../../redux/features/CompanyInfoSlice'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../redux/store'
import AppView from '../../../components/Common/AppView'

const SetupCompInfo: React.FC = ({}) => {
  const [formData, setFormData] = useState<{
    [key: string]: string | File | null
  }>({})
  
  const [file, setFile] = useState<File | null>(null)
  const [zipCodeError, setZipCodeError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'zipCode') {
      const zipCodeRegex = /^\d*$/
      if (!zipCodeRegex.test(value)) {
        setZipCodeError('Zip Code must be numeric')
        return
      } else {
        setZipCodeError(null)
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCancel = () => {
    setFormData({})
    setFile(null)
  }

  const handleSelectChange = (name: string, value: string | null) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files.length > 0) {
      const file = files[0]
      setFile(file)
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: file.name,
      }))
    }
  }

  const capitalizeKeys = (data: { [key: string]: any }) => {
    const result: { [key: string]: any } = {};
    for (const key in data) {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      result[capitalizedKey] = data[key];
    }
    return result;
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    for (const key in formData) {
      if (formData[key] !== null) {
        if (key === 'companyLogo' && file) {
          formDataToSend.append(key, file)
        } else {
          formDataToSend.append(key, formData[key] as string)
        }
      }
    }
    // await dispatch(updateCompanyInfo(formDataToSend))
  }
  const handleSubmit = () => {
    // setCompanyFormData((prevData: any) => ({
    //   ...prevData,
    //   eventOption: eventForm,
    // }))
    const updatedEventForm = { ...formData };
    console.log(JSON.stringify(formData, null, 2))
    dispatch(updateCompanyInfo(updatedEventForm))
    console.log(JSON.stringify(formData, null, 2));
  }
  

  // console.log('Form Data:', JSON.stringify(formData))

  React.useEffect(() => {
    const fetchData = async () => {
      try {
      const data = await dispatch(fetchCompanyInfo());
      const capitalizedData = capitalizeKeys(data);
      setFormData(capitalizedData);
    } catch (error) {
      console.error('Error fetching company info:', error);
    }
  };
    fetchData();
  }, [dispatch]);
  
  return (
    <AppView>
    <AppForm onSubmit={handleEdit} encType="multipart/form-data">
      <Typography level="h4"
      sx={{ display: 'flex', alignItems: 'center' }}
      >
       <TuneOutlinedIcon
                      style={{ fontSize: "1.4rem", color: "#FBC12E" }}
                    />
        Company Information
      </Typography>

      <Box
        sx={{
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          padding: 2,
        }}
      >
        <Grid container spacing={2}  justifyContent="center">
          <Grid xs={12}>
            <Typography
              level="h4"
              sx={{
               
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '30px',
                textAlign: { xs: 'center', md: 'left' },
                whiteSpace: 'nowrap',
                
              }}
            >
              <ContactMailOutlinedIcon style={{  fontSize: "1.1rem",color: '#FBC21E' }} />
              Company Details
            </Typography>
            <Typography 
            sx={{marginTop:'15px', fontSize: '14px',fontWeight: 500,
                lineHeight: '30px',
                textAlign: { xs: 'center', md: 'left' },
                whiteSpace: 'nowrap', }}>
              Provide the name and site of the main office.
            </Typography>
          </Grid>

          {CompanyInfoFields &&
            CompanyInfoFields.slice(0, 7).map((field, index) => (
              <Grid
                md={8}
                xs={12}
                sm={8}
                key={index}
                sx={{
                  justifyContent: 'center',
                  // marginLeft: '10%',
                  fontSize: '14px',
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <FieldComponent
                  field={field}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                />
              </Grid>
            ))}
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={2}  justifyContent="center">
          <Grid xs={12}>
            <Typography
             level="h4"
             sx={{
              
               fontSize: '20px',
               fontWeight: 500,
               lineHeight: '30px',
               textAlign: { xs: 'center', md: 'left' },
               whiteSpace: 'nowrap',
               
             }}
            >
               <CurrencyExchangeOutlinedIcon style={{  fontSize: "1.1rem",color: '#FBC21E' }} />
               Timezone & Currency
            </Typography>
            <Typography sx={{marginTop:'15px', fontSize: '14px',fontWeight: 500,
                lineHeight: '30px',
                textAlign: { xs: 'center', md: 'left' },
                whiteSpace: 'normal', wordBreak: 'break-word', }}>
              Adjust your company’s local timezone, currency, and date format.
            </Typography>
          </Grid>
          {CompanyInfoFields &&
            CompanyInfoFields.slice(7, 12).map((field, index) => (
              <Grid
                key={index}
                md={8}
                xs={12}
                sm={8}
                sx={{
                  justifyContent: 'center',
                  // marginLeft: '10%',
                  fontSize: '14px',
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <FieldComponent
                  field={field}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                />
              </Grid>
            ))}
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Typography
              level="h4"
              sx={{
              
                // fontSize: '20px',
                fontWeight: 500,
                lineHeight: '30px',
                textAlign: { xs: 'center', md: 'left' },
                whiteSpace: 'nowrap',
                
              }}
            >
              <CollectionsOutlinedIcon style={{  fontSize: "1.1rem",color: '#FBC21E' }} />
              Company Logo
            </Typography>
            <Typography sx={{marginTop:'15px', fontSize: '14px',fontWeight: 500,
                lineHeight: '30px',
                textAlign: { xs: 'center', md: 'left' },
                whiteSpace: 'normal', wordBreak: 'break-word', }}>
              Upload your organization’s logo to make this space your own.
            </Typography>
          </Grid>
          {CompanyInfoFields &&
            CompanyInfoFields.slice(12, 13).map((field, index) => (
              <Grid
                key={index}
                md={8}
                xs={10}
                sm={12}
                sx={{
                  justifyContent: {md:'center', xs:"center"},
                  display:"flex",
                  flexDirection:{md:'center', xs:"center"},
                  marginLeft: {md:"15%", xs:"10%" },
                  fontSize: '14px',
                }}
              >
                <FieldComponent
                  field={field}
                  formData={formData}
                  handleFileChange={handleFileChange}
                />
                 {/* <CloudUploadIcon style={{fontSize:'15px'}}/> */}
              </Grid>
            ))}
        </Grid>

        <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '10px',
  }}
></Box>
<Divider sx={{ my: 3 }} />
<Box
  sx={{
    display: 'flex',
    // justifyContent: 'space-between', // Ensures buttons are spaced evenly
    // gap: '10px', // Adds gap between the buttons
    // flexWrap: 'wrap', // Allows wrapping on smaller screens

            alignItems: 'center',
            flexDirection: { md: 'row'},
            justifyContent: { xs: 'space-between', md: 'flex-end' },
            gap: '5px',
            mt: 4,
            flexWrap:'wrap'
  }}
>
  <Button
    onClick={handleCancel}
    sx={{
      background: '#388e3c',
      color: 'white',
      '&:hover': { background: '#1b5e20' },
      borderRadius: 'none',
      width: {
        xs: 'auto',  // Auto width for extra-small screens
        sm: 'auto',  // Auto width for small screens
        md: 'auto',  // Auto width for medium screens
        lg: 'auto',  // Auto width for large screens
      },
      flexShrink: 0, // Prevent shrinking
    }}
  >
    Cancel
  </Button>
  <Button
    type="submit"
    onClick={handleSubmit}
    sx={{
      background: '#fdd835',
              color: 'black',
              '&:hover': { background: '#e0a800' },
              borderRadius: 'none',
      width: {
        xs: 'auto',  // Auto width for extra-small screens
        sm: 'auto',  // Auto width for small screens
        md: 'auto',  // Auto width for medium screens
        lg: 'auto',  // Auto width for large screens
      },
      flexShrink: 0, // Prevent shrinking
    }}
  >
    Submit
  </Button>
</Box>

      </Box>
    </AppForm>
    </AppView>
  )
}

export default SetupCompInfo
