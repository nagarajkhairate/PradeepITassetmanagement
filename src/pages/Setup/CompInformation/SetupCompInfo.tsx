import React, { FormEvent, useEffect, useState } from 'react'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined'
import { Box, Typography, Divider, Grid, Button } from '@mui/joy'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import { CompanyInfoFields } from '../../../pages/Setup/CompInformation/Data'
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined'
import FieldComponent from '../../../utils/FieldComponent'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import {
  fetchCompanyInfo,
  updateCompanyInfo,
} from '../../../redux/features/CompanyInfoSlice'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import AppForm from '../../../components/Common/AppForm'

export interface FormData {
  companyName: string
  country: string
  address: string
  aptSuite: string
  city: string
  state: string
  zipCode: number
  timezone: string
  currency: string
  date: Date
  month: string
  financialDays: number
  companyLogo: string
}

const Company: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<any>({})
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const companyInfo = useSelector((state: RootState) => state.companyInfo.data)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string | null) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files.length > 0) {
      const file = files[0]
      setFile(file)
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: file,
      }))
    }
  }

  useEffect(() => {
    if (companyInfo.length > 0) {
      setFormData(companyInfo[0])
    }
  }, [companyInfo])

  useEffect(() => {
    if (companyInfo.length === 0) {
      dispatch(fetchCompanyInfo())
    }
  }, [dispatch, companyInfo.length])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const companyFormDataToSend = new FormData()
    for (const key in formData) {
      if (formData[key] !== null) {
        if (key === 'companyLogo' && file) {
          companyFormDataToSend.append(key, file)
        } else {
          if (key !== 'companyLogo') {
            companyFormDataToSend.append(key, formData[key])
          }
        }
      }
    }
    await dispatch(updateCompanyInfo(companyFormDataToSend))
  }

  return (
    <AppForm onSubmit={handleSubmit} encType="multipart/form-data">
      <Typography
        level="h4"
        sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
      >
        <TuneOutlinedIcon style={{ fontSize: '1.4rem', color: '#FBC12E' }} />
        Company Information
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            borderRadius: '16px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            background: '#ffffff',
            padding:1
          }}
        >
          <Grid container spacing={2} justifyContent="center">
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
                <ContactMailOutlinedIcon
                  style={{ fontSize: '1.1rem', color: '#FBC21E' }}
                />
                Company Details
              </Typography>
              <Typography
                sx={{
                  marginTop: '15px',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '30px',
                  textAlign: { xs: 'center', md: 'left' },
                  whiteSpace: 'nowrap',
                }}
              >
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

          <Grid container spacing={2} justifyContent="center">
            <Grid xs={12}>
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 500,
                  lineHeight: '30px',
                  textAlign: { xs: 'center', md: 'left' },
                  whiteSpace: 'nowrap',
                }}
              >
                <CurrencyExchangeOutlinedIcon
                  style={{ fontSize: '1.1rem', color: '#FBC21E' }}
                />
                Timezone & Currency
              </Typography>
              <Typography
                sx={{
                  marginTop: '15px',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '30px',
                  textAlign: { xs: 'center', md: 'left' },
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                }}
              >
                Adjust the settings to fit your company’s local timezone,
                currency, and date format.
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
                  fontWeight: 500,
                  lineHeight: '15px',
                  textAlign: { xs: 'center', md: 'left' },
                  whiteSpace: 'nowrap',
                }}
              >
                <CollectionsOutlinedIcon
                  style={{ fontSize: '1.1rem', color: '#FBC21E' }}
                />
                Company Logo
              </Typography>
              <Typography
                sx={{
                  marginTop: '15px',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '30px',
                  textAlign: { xs: 'center', md: 'left' },
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                }}
              >
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
                    justifyContent: { md: 'center', xs: 'center' },
                    display: 'flex',
                    flexDirection: { md: 'center', xs: 'center' },
                    marginLeft: { md: '15%', xs: '10%' },
                    fontSize: '14px',
                  }}
                >
                  <FieldComponent
                    field={field}
                    formData={formData}
                    handleFileChange={handleFileChange}
                  />
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
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 2 }}
          >
            <Button
              type="submit"
              sx={{
                background: '#FABC1E',
                color: 'black',
                '&:hover': { background: '#E1A91B' },
                borderRadius: '10px',
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </AppForm>
  )
}

export default Company
