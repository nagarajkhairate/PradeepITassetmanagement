import React, { useState, useRef, ChangeEvent } from "react";
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import { Box, Typography, styled, Divider, Grid} from "@mui/joy";
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import Button from "@mui/joy/Button";
import { CompanyInfoFields } from '../../../pages/Setup/CompInformation/Data'
import AppForm from '../../../components/Common/AppForm';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import FieldComponent from '../../../utils/FieldComponent';
import AppView from "../../Common/AppView";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import { addCompanyInfo, fetchCompanyInfo } from "../../../redux/features/CompanyInfoSlice";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import HandleTabButtons from "../../Common/HandleTabButtons";

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
  companyFormData: any;
  setCompanyFormData: any;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const Company: React.FC<CompanyProps> = ({
  companyFormData,
  setCompanyFormData,
  activeTab,
  setActiveTab,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [zipCodeError, setZipCodeError] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null);
  const dispatch: ThunkDispatch<RootState, void, any>= useDispatch()
  
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file); 
      setCompanyFormData((prevData: any) => ({
        ...prevData,
        [name]: file.name
      }));
    }
  };

  const handleNextTab = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const companyFormDataToSend = new FormData();
    for (const key in companyFormData) {
      if (companyFormData[key] !== null) {
        if (key === 'companyLogo' && file) {
          companyFormDataToSend.append(key, file);
        } else {
          companyFormDataToSend.append(key, companyFormData[key] as string);
        }
      }
    }
    setCompanyFormData((prevData: any) => ({
      company:{ ...prevData,
        company: companyFormDataToSend,}
     
    }));
    setActiveTab(activeTab + 1); 
    await dispatch(addCompanyInfo(companyFormDataToSend));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClickDropZone = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'zipCode') {
      const zipCodeRegex = /^\d*$/
      if (!zipCodeRegex.test(value)) {
        setZipCodeError('Zip Code must be numeric')
        return
      } else {
        setZipCodeError(null)
      }
    }
    setCompanyFormData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string | null) => {
    setCompanyFormData((prevData:any) => ({ ...prevData, [name]: value }));
  };

  return (
    <AppView>
   <AppForm onSubmit={handleNextTab} encType="multipart/form-data">
        <Box
          sx={{
            borderRadius: '16px',
            // boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            background: '#ffffff',
            // padding: 2,
          }}
        >
            <Grid container spacing={2}>
          <Grid xs={12}>
            <Typography
              
              sx={{ display: 'flex', alignItems: 'center', fontSize:"16px" }}
            >
              <ContactMailOutlinedIcon  style={{ color: '#FBC21E' }}/>
              <Box component="span" sx={{ marginLeft: 1, fontSize:"16px" }}><strong>Company Details</strong></Box>
            </Typography>
            <Typography sx={{fontSize:"14px"}}>Provide the name and site of the main office.</Typography>
          </Grid>
          {CompanyInfoFields &&
            CompanyInfoFields.slice(0, 7).map((field, index) => (
              <Grid md={8} xs={12} sm={8} key={index} sx={ {justifyContent: 'center' , marginLeft:'10%',fontSize:"14px"}}>
                <FieldComponent 
                  field={field}
                  formData={companyFormData}
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
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <CurrencyExchangeOutlinedIcon  style={{ color: '#FBC21E' }}/>
              <Box component="span" sx={{ marginLeft: 1,fontSize:"16px" }}><strong>Timezone & Currency</strong></Box>
            </Typography>
            <Typography sx={{fontSize:"14px"}}>Adjust the settings to fit your company’s local timezone, currency, and date format.</Typography>
          </Grid>
          {CompanyInfoFields &&
            CompanyInfoFields.slice(7, 12).map((field, index) => (
              <Grid key={index} md={8} xs={8} sm={8} sx={{  justifyContent: 'center',marginLeft:'10%',fontSize:"14px" }}>
                
                <FieldComponent 
                field={field}
                  formData={companyFormData}
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
              <Box component="span" sx={{ marginLeft: 1 , fontSize:"16px"}}><strong>Company Logo</strong></Box>
              </Typography>
            <Typography sx={{fontSize:"14px"}}>Upload your organization’s logo to make this space your own.</Typography>
          </Grid>
          {CompanyInfoFields &&
            CompanyInfoFields.slice(12, 13).map((field, index) => (
              <Grid key={index} md={8} xs={8} sm={8} sx={{  justifyContent: 'center',marginLeft:'10%',fontSize:"14px" }}>
                
                <FieldComponent 
                field={field}
                  formData={companyFormData}
                  handleFileChange={handleFileChange}
                  />
              </Grid> 
            ))}
        </Grid>
                
                {/* <Box>
                <div>
    <Typography
      level="h4"
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "0px",
        marginTop: "10px",
      }}
    >
      
      <CollectionsOutlinedIcon />
      Company Logo
    </Typography>
    <Typography level="body-sm">
      Upload your organization's logo to make this space your own.
    </Typography>
  </div>

  <div>
    <Box>
      <DropZone
        onClick={handleClickDropZone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        sx={{
          width: { xs: "50%", sm: "80%", md: "400px" },
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          margin: "auto",
          border: "2px dashed grey",
          textAlign: "center",        
          cursor: "pointer",
        }}
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          "Drop your image here"
        )}
      </DropZone>
    </Box>
    <CustomInput
      ref={fileInputRef}
      type="file"
      id="logo"
      name="logo"
      accept="image/*"
      onChange={handleImageChange}
      style={{ display: "none" }}
    />
    <label htmlFor="logo">
      only (JPG, GIF, PNG) are allowed.
    </label>
  </div>
                </Box> */}
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
        <Divider sx={{ my: 3 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'flex-end' },
            gap: 2,
          }}
        >
        <HandleTabButtons
               backgroundColor="#FABC1E"
               hoverColor="#E1A91B"
               onClick={handleNextTab}
             >
               Continue
               <NavigateNextOutlinedIcon />
               </HandleTabButtons>
          </Box>
      </Box>
   </AppForm>
   </AppView>
  );
};

export default Company;



