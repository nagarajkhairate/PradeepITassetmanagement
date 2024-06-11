import React, { useState } from 'react';

import {
  Box,
  Typography,
  Divider,
  Grid,
} from '@mui/joy';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import Button from '@mui/joy/Button';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import { CompanyInfoFields } from './Data';
import AppForm from '../../../components/Common/AppForm';
import FieldComponent from '../../../utils/FieldComponent';
import { RootState } from '../../../Redux/store';
import { useDispatch } from 'react-redux';
import { addCompanyInfo } from '../../../Redux/features/CompanyInfoSlice';
import { ThunkDispatch } from 'redux-thunk';

const SetupCompInfo: React.FC = ({}) => {
  const [formData, setFormData] = useState<{ [key: string]: string | null }>({});
  const dispatch: ThunkDispatch<RootState, void, any>= useDispatch()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string | null) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", JSON.stringify(formData));
    dispatch(addCompanyInfo(formData))
  };
  

  return (
    <AppForm onSubmit={handleSubmit}>
      <Typography level="h4">
        <Box component={TuneOutlinedIcon} color="#FABC1E" />
        Company Information
      </Typography>
 
      <Box 
        sx={{
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          padding: 5,
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Typography
              level="h4"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <ContactMailOutlinedIcon />
              Company Details
            </Typography>
            <Typography>Provide the name and site of the main office.</Typography>
          </Grid>
          
          {CompanyInfoFields &&
            CompanyInfoFields.slice(0, 7).map((field, index) => (
              <Grid md={8} xs={12} sm={8} key={index}>
                <FieldComponent 
                  field={field}
                  formData={formData}
                  handleInputChange={handleInputChange} 
                  handleSelectChange={handleSelectChange}
                />
              </Grid>
            ))}
        </Grid>
        <Grid container spacing={2}>
        <Grid xs={12}>
            <Typography
              level="h4"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <ContactMailOutlinedIcon />
              Timezone & Currency
            </Typography>
            <Typography>Adjust the settings to fit your company’s local timezone, currency, and date format.</Typography>
          </Grid>
          {CompanyInfoFields &&
            CompanyInfoFields.slice(7, 11).map((field, index) => (
              <Grid key={index} md={8} xs={8} sm={8}>
                
                <FieldComponent 
                field={field}
                  formData={formData}
                  handleInputChange={handleInputChange} 
                  handleSelectChange={handleSelectChange}
                  />
              
              </Grid>
            ))}
        </Grid>
        <Grid container spacing={2}>
        <Grid xs={12}>
            <Typography
              level="h4"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <ContactMailOutlinedIcon />
              Company Logo
            </Typography>
            <Typography>Upload your organization’s logo to make this space your own.</Typography>
          </Grid>
          {CompanyInfoFields &&
            CompanyInfoFields.slice(11, 12).map((field, index) => (
              <Grid key={index} md={8} xs={8} sm={8}>
                
                <FieldComponent 
                field={field}
                  formData={formData}
                  handleInputChange={handleInputChange} 
                  handleSelectChange={handleSelectChange}
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
        >
        </Box>
        <Button type='submit'>Submit</Button>
        <Divider />
      </Box>
    </AppForm>
  );
};

export default SetupCompInfo;
