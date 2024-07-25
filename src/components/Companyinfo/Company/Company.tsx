import React, { FormEvent, useEffect, useState } from 'react';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import { Box, Typography, Divider, Grid, Button } from '@mui/joy';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import { CompanyInfoFields } from '../../../pages/Setup/CompInformation/Data';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import FieldComponent from '../../../utils/FieldComponent';

import { addCompanyInfo, fetchCompanyInfo, updateCompanyInfo } from '../../../redux/features/CompanyInfoSlice';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import AppForm from '../../Common/AppForm';
import { notifyError, notifySuccess, ToastContainer } from '../../Common/Toast/Toast';

export interface FormData {
  companyName: string;
  country: string;
  address: string;
  aptSuite: string;
  city: string;
  state: string;
  zipCode: number;
  timezone: string;
  currency: string;
  date: Date;
  month: string;
  financialDays: number;
  logo: string;
}

interface CompanyProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const Company: React.FC<CompanyProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<any>({});
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const companyInfo = useSelector((state: RootState) => state.companyInfo.data);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string | null) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: file,
      }));
    }
  };

  useEffect(() => {
    if (companyInfo.length > 0) {
      setFormData(companyInfo[0]);
    }
  }, [companyInfo]);

  useEffect(() => {
    if (companyInfo.length === 0) {
      dispatch(fetchCompanyInfo());
    }
  }, [dispatch, companyInfo.length]);

  const handleNextTab = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const companyFormDataToSend = new FormData();
    for (const key in formData) {

      if (formData[key] !== null) {
        if (key === 'companyLogo' && file) {
          companyFormDataToSend.append(key, file);
        } else {
          if(key !== 'companyLogo'){
            companyFormDataToSend.append(key, formData[key]);
          }
          }
          
      }
    }

    if (companyInfo.length > 0 && companyInfo[0].id) {
      await dispatch(updateCompanyInfo(companyFormDataToSend));
      notifySuccess(`Successfully Updated:`);
      notifyError('dsagfsdg');
    } else {
      await dispatch(addCompanyInfo(companyFormDataToSend));
      notifySuccess(`Successfully Added:`);
    }

    setActiveTab(activeTab + 1);
  };

  const handleBack = () => {
    setActiveTab(activeTab - 1);
  };

  return (
    <AppForm onSubmit={handleNextTab} encType="multipart/form-data">
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            background: '#ffffff',
            gap: '5px',
            width: '80%',
            p: 2,
          }}
        >
          <Typography
            sx={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}
          >
            <ContactMailOutlinedIcon style={{ color: '#FBC21E' }} />
            <Box component="span" sx={{ marginLeft: 1, fontSize: '16px' }}>
              <strong>Company Details</strong>
            </Box>
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            Provide the name and site of the main office.
          </Typography>
          <Grid container spacing={2}>
            {CompanyInfoFields &&
              CompanyInfoFields.slice(0, 7).map((field, index) => (
                <Grid
                  md={8}
                  xs={12}
                  sm={8}
                  key={index}
                  sx={{
                    justifyContent: 'center',
                    marginLeft: '10%',
                    fontSize: '14px',
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
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <CurrencyExchangeOutlinedIcon style={{ color: '#FBC21E' }} />
                <Box component="span" sx={{ marginLeft: 1, fontSize: '16px' }}>
                  <strong>Timezone & Currency</strong>
                </Box>
              </Typography>
              <Typography sx={{ fontSize: '14px' }}>
                Adjust the settings to fit your company’s local timezone,
                currency, and date format.
              </Typography>
            </Grid>
            {CompanyInfoFields &&
              CompanyInfoFields.slice(7, 12).map((field, index) => (
                <Grid
                  key={index}
                  md={8}
                  xs={8}
                  sm={8}
                  sx={{
                    justifyContent: 'center',
                    marginLeft: '10%',
                    fontSize: '14px',
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
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <CollectionsOutlinedIcon style={{ color: '#FBC21E' }} />
                <Box component="span" sx={{ marginLeft: 1, fontSize: '16px' }}>
                  <strong>Company Logo</strong>
                </Box>
              </Typography>
              <Typography sx={{ fontSize: '14px' }}>
                Upload your organization’s logo to make this space your own.
              </Typography>
            </Grid>
            {CompanyInfoFields &&
              CompanyInfoFields.slice(12, 13).map((field, index) => (
                <Grid
                  key={index}
                  md={8}
                  xs={8}
                  sm={8}
                  sx={{
                    justifyContent: 'center',
                    marginLeft: '10%',
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              sx={{
                background: '#388e3c',
                color: 'white',
                '&:hover': { background: '#388e3B' },
                borderRadius: '10px',
              }}
              disabled={activeTab === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              type='submit'
              sx={{
                background: '#FABC1E',
                color: 'black',
                '&:hover': { background: '#E1A91B' },
                borderRadius: '10px',
              }}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </AppForm>
  );
};

export default Company;
