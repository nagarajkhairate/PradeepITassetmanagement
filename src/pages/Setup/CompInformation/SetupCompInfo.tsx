// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Divider, Grid, Button } from '@mui/joy';
// import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined'
// import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
// import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
// import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined'
// import { useDispatch, useSelector } from 'react-redux';
// import { ThunkDispatch } from 'redux-thunk';
// import { RootState } from '../../../redux/store';
// import {
//   fetchCompanyInfo,
//   updateCompanyInfo,
// } from '../../../redux/features/CompanyInfoSlice';
// import { CompanyInfoFields } from './Data';
// import AppForm from '../../../components/Common/AppForm';
// import FieldComponent from '../../../utils/FieldComponent';
// import AppView from '../../../components/Common/AppView';

// const SetupCompInfo: React.FC = () => {
//   const [formData, setFormData] = useState<{ [key: string]: string | File | null }>({});
//   const [file, setFile] = useState<File | null>(null);
//   const [zipCodeError, setZipCodeError] = useState<string | null>(null);
//   const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
//   const companyInfo = useSelector((state: RootState) => state.companyInfo.data);

//   useEffect(() => {
//     dispatch(fetchCompanyInfo());
//   }, [dispatch]);

//   useEffect(() => {
//     if (companyInfo.length > 0) {
//       setFormData(companyInfo[0]);
//     }
//   }, [companyInfo]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === 'zipCode') {
//       const zipCodeRegex = /^\d*$/;
//       if (!zipCodeRegex.test(value)) {
//         setZipCodeError('Zip Code must be numeric');
//         return;
//       } else {
//         setZipCodeError(null);
//       }
//     }
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSelectChange = (name: string, value: string | null) => {
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (files && files.length > 0) {
//       const file = files[0];
//       setFile(file);
//       setFormData((prevData) => ({ ...prevData, [name]: file.name }));
//     }
//   };

//   const handleCancel = () => {
//     setFormData({});
//     setFile(null);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       if (formData[key] !== null) {
//         if (key === 'companyLogo' && file) {
//           formDataToSend.append(key, file);
//         } else {
//           formDataToSend.append(key, formData[key] as string);
//         }
//       }
//     }
//     await dispatch(updateCompanyInfo(formDataToSend));
//   };

//   return (
//     <AppView>
//       <AppForm onSubmit={handleSubmit} encType="multipart/form-data">
//         <Typography level="h4" sx={{ display: 'flex', alignItems: 'center' }}>
//           <TuneOutlinedIcon style={{ fontSize: '1.4rem', color: '#FBC12E' }} />
//           Company Information
//         </Typography>

//         <Box
//           sx={{
//             borderRadius: '16px',
//             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//             background: '#ffffff',
//             padding: 2,
//           }}
//         >
//           <Grid container spacing={2} justifyContent="center">
//             <Grid xs={12}>
//               <Typography
//                 level="h4"
//                 sx={{
//                   fontSize: '20px',
//                   fontWeight: 500,
//                   lineHeight: '30px',
//                   textAlign: { xs: 'center', md: 'left' },
//                   whiteSpace: 'nowrap',
//                 }}
//               >
//                 <ContactMailOutlinedIcon style={{ fontSize: '1.1rem', color: '#FBC21E' }} />
//                 Company Details
//               </Typography>
//               <Typography
//                 sx={{
//                   marginTop: '15px',
//                   fontSize: '14px',
//                   fontWeight: 500,
//                   lineHeight: '30px',
//                   textAlign: { xs: 'center', md: 'left' },
//                   whiteSpace: 'nowrap',
//                 }}
//               >
//                 Provide the name and site of the main office.
//               </Typography>
//             </Grid>

//             {CompanyInfoFields.slice(0, 7).map((field, index) => (
//               <Grid
//                 key={index}
//                 md={8}
//                 xs={12}
//                 sm={8}
//                 sx={{
//                   justifyContent: 'center',
//                   fontSize: '14px',
//                   textAlign: { xs: 'center', md: 'left' },
//                 }}
//               >
//                 <FieldComponent
//                   field={field}
//                   formData={formData}
//                   handleInputChange={handleInputChange}
//                   handleSelectChange={handleSelectChange}
//                 />
//               </Grid>
//             ))}
//           </Grid>

//           <Divider sx={{ my: 3 }} />

//           <Grid container spacing={2} justifyContent="center">
//             <Grid xs={12}>
//               <Typography
//                 level="h4"
//                 sx={{
//                   fontSize: '20px',
//                   fontWeight: 500,
//                   lineHeight: '30px',
//                   textAlign: { xs: 'center', md: 'left' },
//                   whiteSpace: 'nowrap',
//                 }}
//               >
//                 <CurrencyExchangeOutlinedIcon style={{ fontSize: '1.1rem', color: '#FBC21E' }} />
//                 Timezone & Currency
//               </Typography>
//               <Typography
//                 sx={{
//                   marginTop: '15px',
//                   fontSize: '14px',
//                   fontWeight: 500,
//                   lineHeight: '30px',
//                   textAlign: { xs: 'center', md: 'left' },
//                   whiteSpace: 'normal',
//                   wordBreak: 'break-word',
//                 }}
//               >
//                 Adjust your company’s local timezone, currency, and date format.
//               </Typography>
//             </Grid>

//             {CompanyInfoFields.slice(7, 12).map((field, index) => (
//               <Grid
//                 key={index}
//                 md={8}
//                 xs={12}
//                 sm={8}
//                 sx={{
//                   justifyContent: 'center',
//                   fontSize: '14px',
//                   textAlign: { xs: 'center', md: 'left' },
//                 }}
//               >
//                 <FieldComponent
//                   field={field}
//                   formData={formData}
//                   handleInputChange={handleInputChange}
//                   handleSelectChange={handleSelectChange}
//                 />
//               </Grid>
//             ))}
//           </Grid>

//           <Divider sx={{ my: 3 }} />

//           <Grid container spacing={2}>
//             <Grid xs={12}>
//               <Typography
//                 level="h4"
//                 sx={{
//                   fontWeight: 500,
//                   lineHeight: '30px',
//                   textAlign: { xs: 'center', md: 'left' },
//                   whiteSpace: 'nowrap',
//                 }}
//               >
//                 <CollectionsOutlinedIcon style={{ fontSize: '1.1rem', color: '#FBC21E' }} />
//                 Company Logo
//               </Typography>
//               <Typography
//                 sx={{
//                   marginTop: '15px',
//                   fontSize: '14px',
//                   fontWeight: 500,
//                   lineHeight: '30px',
//                   textAlign: { xs: 'center', md: 'left' },
//                   whiteSpace: 'normal',
//                   wordBreak: 'break-word',
//                 }}
//               >
//                 Upload your organization’s logo to make this space your own.
//               </Typography>
//             </Grid>

//             {CompanyInfoFields.slice(12, 13).map((field, index) => (
//               <Grid
//                 key={index}
//                 md={8}
//                 xs={10}
//                 sm={12}
//                 sx={{
//                   justifyContent: { md: 'center', xs: 'center' },
//                   display: 'flex',
//                   flexDirection: { md: 'center', xs: 'center' },
//                   marginLeft: { md: '15%', xs: '10%' },
//                   fontSize: '14px',
//                 }}
//               >
//                 <FieldComponent
//                   field={field}
//                   formData={formData}
//                   handleFileChange={handleFileChange}
//                 />
//               </Grid>
//             ))}
//           </Grid>

//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '10px',
//               justifyContent: 'center',
//               marginBottom: '10px',
//             }}
//           ></Box>

//           <Divider sx={{ my: 3 }} />

//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               flexDirection: { md: 'row' },
//               justifyContent: { xs: 'space-between', md: 'flex-end' },
//               gap: '5px',
//               mt: 4,
//               flexWrap: 'wrap',
//             }}
//           >
//             <Button
//               onClick={handleCancel}
//               sx={{
//                 background: '#388e3c',
//                 color: 'white',
//                 '&:hover': { background: '#1b5e20' },
//                 borderRadius: 'none',
//                 width: {
//                   xs: 'auto',
//                   sm: 'auto',
//                   md: 'auto',
//                   lg: 'auto',
//                 },
//                 flexShrink: 0,
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               sx={{
//                 background: '#fdd835',
//                 color: 'black',
//                 '&:hover': { background: '#e0a800' },
//                 borderRadius: 'none',
//                 width: {
//                   xs: 'auto',
//                   sm: 'auto',
//                   md: 'auto',
//                   lg: 'auto',
//                 },
//                 flexShrink: 0,
//               }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Box>
//       </AppForm>
//     </AppView>
//   );
// };

// export default SetupCompInfo;




import React, { FormEvent, useState } from 'react'
import { Box, Typography, Divider, Grid } from '@mui/joy'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import Button from '@mui/joy/Button'
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined'
import { CompanyInfoFields } from './Data'
import AppForm from '../../../components/Common/AppForm'
import FieldComponent from '../../../utils/FieldComponent'
import { useDispatch, useSelector } from 'react-redux'
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
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [file, setFile] = useState<File | null>(null)
  const [zipCodeError, setZipCodeError] = useState<string | null>(null)
  const companyInfo = useSelector((state: RootState) =>state.companyInfo.data)
 
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
    const updatedEventForm = { ...formData };
    console.log(JSON.stringify(formData, null, 2))
    dispatch(updateCompanyInfo(updatedEventForm))
    console.log(JSON.stringify(formData, null, 2));
  }
  

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formDataToSend = new FormData();
  //   for (const key in formData) {
  //     if (formData[key] !== null) {
  //       if (key === 'companyLogo' && file) {
  //         formDataToSend.append(key, file);
  //       } else {
  //         formDataToSend.append(key, formData[key] as string);
  //       }
  //     }
  //   }
  //   await dispatch(updateCompanyInfo(formDataToSend));
  // };

  React.useEffect(() => {
    if(companyInfo.length > 0){
      setFormData(companyInfo[0])
    }
    
  }, [companyInfo]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
      dispatch(fetchCompanyInfo());
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
